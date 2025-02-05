import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import socket from '../../Context/SocketContext';

const CodeEditor = ({ roomId }) => {
  const [code, setCode] = useState('// Start coding here...\n');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    socket.emit('join-room', roomId);

    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off('code-update');
    };
  }, [roomId]);

  const handleChange = (newCode) => {
    setCode(newCode);
    
    // Clear existing timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    
    // Set typing indicator
    setIsTyping(true);
    
    // Emit code changes after a brief delay to prevent too many updates
    const timeout = setTimeout(() => {
      socket.emit('code-change', { roomId, code: newCode });
      setIsTyping(false);
    }, 500);
    
    setTypingTimeout(timeout);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Code Editor</h2>
        {isTyping && (
          <span className="text-sm text-gray-500">Someone is typing...</span>
        )}
      </div>
      <div className="flex-1">
        <CodeMirror
          value={code}
          height="100%"
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;