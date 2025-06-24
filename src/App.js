import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputId, setInputId] = useState('');
  const navigate = useNavigate();

  const createNewSession = () => {
    const id = uuidv4();
    navigate(`/session/${id}`);
  };

  const joinSession = (e) => {
    e.preventDefault();
    if (inputId.trim() !== '') {
      navigate(`/session/${inputId.trim()}`);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">CodeLens – Real-Time Code Sharing</h1>

      <button className="btn btn-primary mb-4" onClick={createNewSession}>
        ➕ Create New Session
      </button>

      <form onSubmit={joinSession} className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter Session ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          🔗 Join
        </button>
      </form>
    </div>
  );
}

export default App;
