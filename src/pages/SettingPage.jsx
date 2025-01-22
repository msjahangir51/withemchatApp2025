import React, { useState } from "react";
import { Edit, Check, X, Loader, Camera } from "lucide-react"; // For icons (optional)
import { authStore } from "../store/authStore";
import { userStore } from "../store/userStore";

function SettingPage() {
  const [isEditingfullname, setIsEditingfullname] = useState(false);
  const [isEditingusername, setIsEditingusername] = useState(false);
  const [isEditinggender, setIsEditinggender] = useState(false);
  const [isEditingdateofBirth, setIsEditingdateofBirth] = useState(false);
  const { authUser } = authStore()
  console.log(authUser)
  const notSETProfile = "/avatar.png";
  const [updatedData, SetUpdatedData] = useState({
    fullname: authUser.fullname,
    username: authUser.username,
    gender: authUser.gender,
    dateOfbirth: authUser.dateOfbirth,
  })

  const { updateFullname, updateUsername, updateGender, updateDateOfbirth, updatePassword, updateProfile, isUpdatingProfile } = userStore()



  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };






  return (
    <div className='py-20 w-full min-h-screen h-auto'>


      <div className='max-w-md mx-auto mt-8 space-y-6'>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || notSETProfile}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "
            />
            <label
              htmlFor="avatar-upload"
              className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className='w-full h-12 border rounded-sm relative flex items-center justify-between'>

          {
            isEditingfullname ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, fullname: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.fullname} />

                <button onClick={() => setIsEditingfullname(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button onClick={() => {

                  updateFullname({ fullname: updatedData.fullname })
                  setIsEditingfullname(false)
                }
                } className="btn btn-sm  btn-success mr-3"><Check className="size-4" /></button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>Fullname</p>
                <p className='ml-3'>{updatedData.fullname}</p>
                <button onClick={() => setIsEditingfullname(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }
        </div>


        {/* start of username  */}
        <div className='w-full h-12 border rounded-sm relative flex items-center justify-between'>

          {
            isEditingusername ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, username: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.username} />

                <button onClick={() => setIsEditingusername(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button onClick={() => {

                  updateUsername({ username: updatedData.username })
                  setIsEditingusername(false)
                }
                } className="btn btn-sm  btn-success mr-3"><Check className="size-4" /></button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>username</p>
                <p className='ml-3'>{updatedData.username}</p>
                <button onClick={() => setIsEditingusername(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }
        </div>
        {/* end of username  */}


        {/* start of gender  */}
        <div className='w-full h-12 border rounded-sm relative flex items-center justify-between'>

          {
            isEditinggender ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, gender: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.gender} placeholder="Male/Female" />

                <button onClick={() => setIsEditinggender(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button onClick={() => {

                  updateGender({ gender: updatedData.gender })
                  setIsEditinggender(false)
                }
                } className="btn btn-sm  btn-success mr-3"><Check className="size-4" /></button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>gender</p>
                <p className='ml-3'>{updatedData.gender}</p>
                <button onClick={() => setIsEditinggender(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }
        </div>
        {/* end of gender  */}



        {/* start of date of birtch  */}
        <div className='w-full h-12 border rounded-sm relative flex items-center justify-between'>

          {
            isEditingdateofBirth ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, dateOfbirth: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.dateOfbirth} placeholder="DD-MM-YYYY" />

                <button onClick={() => setIsEditingdateofBirth(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button onClick={() => {

                  updateDateOfbirth({ dateOfbirth: updatedData.dateOfbirth })
                  setIsEditingdateofBirth(false)
                }
                } className="btn btn-sm  btn-success mr-3"><Check className="size-4" /></button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>date Of birth</p>
                <p className='ml-3'>{updatedData.dateOfbirth}</p>
                <button onClick={() => setIsEditingdateofBirth(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }
        </div>
        {/* end of dateofbirtch  */}
      </div>
    </div >
  )
}

export default SettingPage