# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




{
            isEditing ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, fullname: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.fullname} />

                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button disabled={fullnameUpdateLoading} onClick={() => {

                  updateFullname({ fullname: updatedData.fullname })
                  setIsEditing(false)
                }
                } className="btn btn-sm  btn-success mr-3">{fullnameUpdateLoading ? <Loader className="size-4 loading-spinner" /> : <Check className="size-4" />}</button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>Fullname</p>
                <p className='ml-3'>{updatedData.fullname}</p>
                <button onClick={() => setIsEditing(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }











          <div className='w-full h-12 border rounded-sm relative flex items-center justify-between'>

          {
            isEditing ? (
              <>
                <input onChange={(e) => SetUpdatedData({ ...updatedData, fullname: e.target.value })} className="input input-bordered w-full h-full" value={updatedData.fullname} />

                <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-error mr-3"><X className="size-4" /></button>
                <button disabled={fullnameUpdateLoading} onClick={() => {

                  updateFullname({ fullname: updatedData.fullname })
                  setIsEditing(false)
                }
                } className="btn btn-sm  btn-success mr-3">{fullnameUpdateLoading ? <Loader className="size-4 loading-spinner" /> : <Check className="size-4" />}</button>
              </>
            ) : (
              <>
                <p className='absolute -top-3 left-2 bg-base-100 rounded-sm px-2 '>Fullname</p>
                <p className='ml-3'>{updatedData.fullname}</p>
                <button onClick={() => setIsEditing(true)} className="btn btn-sm mr-3">Edit</button>
              </>
            )
          }
        </div>