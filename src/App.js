import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repository, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])
  function handleAddRepository() {
    api.post('/repositories', {
      title: `Repository ${Date.now()}`,
      url:'vai',
      techs: [
        'React',
        'Nodejs'
      ]
    }).then(response => {
      setRepositories([...repository, response.data]);
    });
  }

  function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      const noDeleted = repository.filter((repository) => repository.id !== id);
      setRepositories(noDeleted)
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
