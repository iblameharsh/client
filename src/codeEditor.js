import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const socket = io('http://localhost:5000');

const languageOptions = {
  javascript: '// Start typing JavaScript code...',
  python: '# Start typing Python code...',
  cpp: '// Start typing C++ code...',
  java: '// Start typing Java code...',
};

const CodeEditor = () => {
  const { id: roomId } = useParams();
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(languageOptions['javascript']);

useEffect(() => {
  socket.emit('join', roomId);

  const handleCodeChange = ({ code: newCode, language: lang }) => {
    setCode(newCode);
    setLanguage(lang);
  };

  socket.on('code-change', handleCodeChange);

  return () => {
    socket.off('code-change', handleCodeChange); // Proper cleanup
    socket.disconnect();
  };
}, [roomId]);


  const handleEditorChange = (value) => {
  setCode(value);
  socket.emit('code-change', { roomId, code: value, language });
};

const handleLanguageChange = (e) => {
  const newLang = e.target.value;
  const starterCode = languageOptions[newLang] || '';
  setLanguage(newLang);
  setCode(starterCode);
  socket.emit('code-change', { roomId, code: starterCode, language: newLang });
};

  return (
    <div className="editor-wrapper">
      <header className="editor-header">
        <div className="editor-title">
          <span role="img" aria-label="spark">💻</span> CodeLens — Collaborative Editor
        </div>
        <div className="room-id">
          Room ID: <code>{roomId}</code>
        </div>
      </header>

      <div className="editor-controls">
        <label htmlFor="language-select">Language:</label>
        <select id="language-select" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="monaco-editor-container">
        <Editor
          height="80vh"
          language={language}
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
