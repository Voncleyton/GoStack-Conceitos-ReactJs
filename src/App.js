import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `NewRepository ${Date.now()}`,
      "url": "http://github.com/voncleyton/OmniStack",
      "techs": [
        "Node.js",
        "ReactJs",
        "React Native"
      ]
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    const newRepositories = repositories;

    newRepositories.splice(repositoryIndex, 1)

    setRepository([...newRepositories]);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div >
  );
}

export default App;
