import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const CodeEditor = () => {
  const { id: roomId } = useParams();
  const [code, setCode] = useState('');

  useEffect(() => {
    socket.emit('join', roomId);

    socket.on('code-change', (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit('code-change', { roomId, code: newCode });
  };

  return (
    <div className="container mt-4">
      <h5>Session ID: <code>{roomId}</code></h5>
      <textarea
        className="form-control mt-3"
        value={code}
        onChange={handleChange}
        rows={20}
        placeholder="Start writing your code here..."
      />
    </div>
  );
};

export default CodeEditor;
