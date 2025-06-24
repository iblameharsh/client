import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';

const socket = io('http://localhost:5000');

const CodeEditor = () => {
  const { id: roomId } = useParams();
  const [code, setCode] = useState('// Start typing JavaScript code...');

  useEffect(() => {
    socket.emit('join', roomId);

    socket.on('code-change', (newCode) => {
      if (newCode !== code) {
        setCode(newCode);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('code-change', { roomId, code: value });
  };

  return (
    <div className="container mt-4">
      <h5>Session ID: <code>{roomId}</code></h5>

      <Editor
        height="80vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
