import React, { useState } from 'react'
import socket from '../../Context/SocketContext'

const Join = ({joined , setJoined , roomId , setRoomId , userName , setUserName}) => {

    
    
    

    const joinRoom = () => {
        if (roomId && userName) {
            socket.emit("join", { roomId, userName});
            setJoined(true);
          }
    }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">Join Code Room</h1>
            <input type="text" placeholder='Room Id' value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <input type="text" placeholder='UserName' value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full rounded"
            />
            <button onClick={joinRoom} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Join Room</button>
        </div>
    </div>
  )
}

export default Join
