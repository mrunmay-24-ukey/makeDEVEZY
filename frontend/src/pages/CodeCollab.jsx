import React, { useEffect, useState } from 'react'
import Join from '../components/CodeEditor/Join';
import Editor from '@monaco-editor/react'
import { ClipboardCopy, Users, Type, Code, LogOut , Play } from "lucide-react"
import socket from '../Context/SocketContext';



const CodeCollab = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName , setUserName] = useState("");
  const [language , setLanguage] = useState("javascript");  
  const [code , setCode] = useState("// start code here");
  const [copySuccess , setCopySuccess] = useState("");
  const [users , setUsers] = useState([]);
  const [typing , setTyping] = useState("");
  const [output , setOutput] = useState("");
  const [version , setVersion] = useState("*");




  //hooks
  useEffect(()=> {
    socket.on("userJoined" , (users) => {
      setUsers(users);
    })

    socket.on("codeUpdate" , (newCode) => {
      setCode(newCode);
    })

    socket.on("userTyping" , (user) => {
      setTyping(`${user} is typing...`)
      setTimeout(() => setTyping("") , 2000)
    })

    socket.on("languageUpdate" , (newLanguage) => {
      setLanguage(newLanguage);
    })

    socket.on('codeResponse' , (response) => {
      setOutput(response.run.output);

    })

    return () => {
      socket.off('userJoined');
      socket.off('codeUpdate');
      socket.off('userTyping');
      socket.off('languageUpdate')
      socket.off('codeResponse')
    }
  } , [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");

    }
    window.addEventListener("beforeunload" , handleBeforeUnload)

    // clean up function
    return () => {
      window.removeEventListener("beforeunload" , handleBeforeUnload);
    }
  })

  
  // function
  const copyRoomId = () => {
      navigator.clipboard.writeText(roomId);
      setCopySuccess("Copied"); 
      console.log('ho gaya copy')
      console.log(copySuccess)
      setTimeout(()=>setCopySuccess("") , 2000)
  }

  const handleCodeChange = (newCode) => {
      setCode(newCode);
      socket.emit("codeChange" , {roomId , code: newCode});
      socket.emit("typing" , {roomId , userName})

  }

  const handleLanguageChange = e => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange" , {roomId , language : newLanguage});
  }


  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined("");
    setRoomId("");
    setUserName("")
    setCode("// start code here");
    setLanguage("");
    setLanguage("javascript")
  }


  const runCode = () => {
    socket.emit("compileCode" , {code , roomId, language , version})
  }

  

  if (!joined) {
    return <div>
      <Join joined={joined} setJoined={setJoined} roomId={roomId} setRoomId={setRoomId} userName={userName} setUserName={setUserName} />
    </div>
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Room Code</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={roomId}
              readOnly
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-white"
            />
            <div className="relative">
              <button
                onClick={copyRoomId}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Copy Room ID"
              >
                <ClipboardCopy size={20} />
              </button>
              {copySuccess && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md">
                  {copySuccess}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
            <Users size={16} className="mr-2" />
            Users in Room
          </h3>
          <ul className="space-y-1">
            {
              users.map((user, index) => (
               
                  user && (
                    <li key={index} className="text-sm text-gray-600 dark:text-white">{user.slice(0,8)}...</li>
                  )
                
              ))
            }
            
          </ul> 
        </div>

        <p className="flex items-center text-xs text-green-600 dark:text-green-400">
          <Type size={14} className="mr-1" />
          {typing}
        </p>

        <div className="space-y-2">
          <label
            htmlFor="language"
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <Code size={16} className="mr-2" />
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-white"
          >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <button onClick={leaveRoom} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          <LogOut size={16} className="mr-2"  />
          Leave Room
        </button>
      </div>
    </div>

    <div className="flex-1">
      <Editor
        height="60%"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
      {/* console */}
      <div className="h-1/3 bg-gray-800 text-white p-4 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Console</h3>
            <button
              onClick={runCode}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out"
            >
              <Play size={16} className="mr-2" />
              Execute
            </button>
          </div>
          <div className="flex-1 bg-gray-900 rounded-lg p-3 overflow-auto">
            <pre className="font-mono text-sm">{output || "Output will appear here"}</pre>
          </div>
        </div>
    </div>
  </div>

  )
}

export default CodeCollab
