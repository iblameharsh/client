import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

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
  }, [roomId, code]);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('code-change', { roomId, code: value });
  };

  return (
    <div className="editor-wrapper">
      <header className="editor-header">
        <div className="editor-title">
          <span role="img" aria-label="spark">💻</span> CodeLens — Collaborative Editor
        </div>
        <div className="room-id">Room ID: <code>{roomId}</code></div>
      </header>

      <div className="monaco-editor-container">
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
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
