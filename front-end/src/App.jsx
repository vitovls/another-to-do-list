import React from 'react';
import './App.css';

function App() {
  return (
    <main className="App">
      <h1>
        Another To Do List
      </h1>
      <header>
        <input type="text" placeholder="Nova Tarefa" />
        <select>
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
