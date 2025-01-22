import React from 'react'

function StyleIngSingLeftSide() {
    const demoArray = new Array(9).fill()
    return (
        <div className="w-full h-screen hidden md:flex items-center justify-center">
            <div className="w-3/4 grid grid-cols-3 gap-8 p-4 rounded-lg shadow-md">
                {demoArray.map((item, index) => (
                    <div
                        key={index}
                        className={`aspect-square rounded-2xl bg-gray-500 shadow-lg transform transition-transform duration-300 ${
                            index % 2 === 0 ? "animate-pulse hover:scale-110" : "hover:scale-105"
                          }`}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default StyleIngSingLeftSide