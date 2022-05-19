import React, { useState } from 'react';
import './App.css';

function App() {
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
    </main>
  );
}

export default App;
