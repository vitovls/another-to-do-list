import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const BASE_URL = process.env.REACT_APP_URL_BASE;

  const [task, setTask] = useState({
    name: '',
    status: '',
  });

  const [listTask, setListTask] = useState([]);

  const functionSetterTask = (event) => {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get(BASE_URL).then((response) => {
      setListTask(response.data);
    });
  }, [listTask]);

  return (
    <main className="App">
      <h1>
        Another To Do List
      </h1>
      <header>
        <input name="name" onChange={functionSetterTask} type="text" placeholder="Nova Tarefa" />
        <select name="status" onChange={functionSetterTask}>
          <option value="">Status da Tarefa</option>
          <option value="A Fazer">A Fazer</option>
          <option value="Feito">Feito</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Em Andamento">Em Andamento</option>
        </select>
        <button type="button">Adicionar</button>
      </header>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listTask.map((taskElement) => (
            <tr key={taskElement._id}>
              <td>{taskElement.name}</td>
              <td>{taskElement.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
