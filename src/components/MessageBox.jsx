import React, { useState, useEffect, useRef } from 'react';
import { messageStore } from '../store/messageStore';
import InfiniteScroll from 'react-infinite-scroll-component';

function MessageBox() {
  const { selectUserData, sendMessage, closedUsers, resetMessages, loadMessages, messages, hasMore, subscribeToMessages, UnsubscribeToMessages, onlineUsers } = messageStore();
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    resetMessages();
    loadMessages(selectUserData._id);
    subscribeToMessages()
    return () => UnsubscribeToMessages()
  }, [loadMessages, resetMessages, selectUserData._id, UnsubscribeToMessages, subscribeToMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (text.trim() !== "") {
      sendMessage(selectUserData._id, text);
      setText("");
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col z-10 absolute top-0 left-0 right-0 bottom-0 md:static w-full h-screen md:h-[calc(100vh-4.5rem)] bg-base-200">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 bg-base-100 border-b border-base-300">
        <div className='flex items-center'>
          <img
            src={selectUserData.profilePic || '/avatar.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className='ml-2'>
            <h1 className="text-lg font-semibold">{selectUserData.fullname || "User"}</h1>


            {onlineUsers.includes(selectUserData._id) && (
              <>
                <p className="text-sm text-gray-500">Active now</p>
              </>
            )}
          </div>
        </div>
        <button onClick={() => closedUsers()} className='btn-error btn btn-sm'>Exit</button>
      </div>

      {/* Message area */}
      <div
        id="message-box"
        className="flex-1 w-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-100"
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMessages}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-4">
              <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          }
          scrollableTarget="message-box"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${message.receiverId === selectUserData._id
                ? 'chat-end'
                : 'chat-start'
                }`}
            >
              <div
                className={`chat-bubble ${message.receiverId === selectUserData._id
                  ? 'chat-bubble-primary'
                  : ''
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </InfiniteScroll>
        <div ref={messagesEndRef}></div>
      </div>

      {/* Send message box */}
      <div className="w-full bg-base-100 p-4 border-t border-base-300">
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Type your message here..."
            className="input input-bordered w-full"
          />
          <button onClick={handleSendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;



