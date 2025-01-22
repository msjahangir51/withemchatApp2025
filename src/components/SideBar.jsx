import React, { useEffect, useState } from "react";
import { messageStore } from "../store/messageStore";

function SideBar() {
  const { sidebarUsers, SidebarUserLoading, sidebarUser, selectedUsers, onlineUsers } = messageStore();
  const LoadingArray = new Array(6).fill("skeleton");

  useEffect(() => {
    sidebarUser();
  }, [sidebarUser]);

  return (
    <div className="w-full max-w-xs bg-base-300 h-screen md:h-[calc(100vh-5rem)] sm:h-[calc(100vh-4rem)] md:rounded-sm shadow-lg">
      {/* Sidebar Header */}
      <div className="w-full flex items-center justify-between border-b border-primary/50 p-4 sm:p-3 bg-base-100">
        <h1 className="text-xl sm:text-lg font-semibold text-primary">Chats</h1>
        <button className="btn btn-sm btn-primary">+ New</button>
      </div>
      {/* End Sidebar Header */}

      {/* Sidebar Users */}
      <div className="w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] overflow-y-auto p-4 sm:p-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-base-200">
        {SidebarUserLoading ?  (
          <div className="space-y-4">
            {LoadingArray.map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 sm:gap-2 mb-4 animate-pulse"
              >
                {/* Profile Picture Skeleton */}
                <div className="w-12 h-12 sm:w-10 sm:h-10 bg-gray-400/30 rounded-full"></div>

                {/* Text Skeleton */}
                <div className="flex-1">
                  <div className="w-3/4 h-4 sm:h-3 bg-gray-400/30 rounded mb-2"></div>
                  <div className="w-1/2 h-3 sm:h-2 bg-gray-400/30 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sidebarUsers &&
              sidebarUsers.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectedUsers(item)}
                  className="flex items-center gap-4 sm:gap-2 bg-primary/5 p-3 rounded-md cursor-pointer hover:bg-primary/10 transition-all"
                >
                  {/* Profile Picture */}
                  <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={item.profilePic ? item.profilePic : "/avatar.png"}
                      alt={item.fullname}
                    />


                    {onlineUsers.includes(item._id) && (
                      <>
                        <div className="absolute bottom-2 right-0 z-10 size-2 bg-green-500 rounded-full"></div>
                      </>
                    )}
                  </div>
                  {/* End Profile Picture */}

                  {/* User Info */}
                  <div>
                    <h1 className="text-sm font-medium sm:text-xs text-primary">
                      {item.fullname}
                    </h1>
                    <p className="text-xs text-gray-500">
                      {item.lastMessage || "No message yet"}
                    </p>
                  </div>
                  {/* End User Info */}
                </div>
              ))}
          </div>
        )}
      </div>
      {/* End Sidebar Users */}
    </div>
  );
}

export default SideBar;
