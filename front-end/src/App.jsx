import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const BASE_URL = process.env.REACT_APP_URL_BASE;

  const [task, setTask] = useState({
    name: '',
    status: '',
  });

  const [listTask, setListTask] = useState([]);

  const [filter, setFilter] = useState('');

  const functionSetterTask = (event) => {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const dateNow = (date) => `${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`;

  const removeTask = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    setListTask(listTask.filter((taskElement) => taskElement.id !== id));
  };

  const postTaskInServer = async () => {
    if (task.name === '' || task.status === '') {
      alert('Preencha todos os campos');
      return;
    }

    const response = await axios.post(`${BASE_URL}`, task);

    setListTask([...listTask, response.data]);
    setTask({
      name: '',
      status: '',
    });
  };

  const filterByDate = () => {
    axios.get(`${BASE_URL}/filter/?filter=createdAt`).then((response) => {
      setListTask(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const filterByStatus = () => {
    axios.get(`${BASE_URL}/filter/?filter=status`).then((response) => {
      setListTask(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const filterByName = () => {
    axios.get(`${BASE_URL}/filter/?filter=name`).then((response) => {
      setListTask(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const noFilter = () => {
    axios.get(`${BASE_URL}/filter/?filter=`).then((response) => {
      setListTask(response.data);
    });
  };

  const changeFilter = (selectFilter) => {
    if (selectFilter === filter) {
      return setFilter('');
    }
    return setFilter(selectFilter);
  };

  useEffect(() => {
    if (filter === 'status') {
      filterByStatus();
    }
    if (filter === 'name') {
      filterByName();
    }
    if (filter === 'createdAt') {
      filterByDate();
    }
    if (filter === '') {
      noFilter();
    }
  }, [filter, listTask]);

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
        <button onClick={() => postTaskInServer()} type="button">Adicionar</button>
      </header>
      <table>
        <thead>
          <tr>
            <th onClick={() => changeFilter('name')}>Nome</th>
            <th onClick={() => changeFilter('status')}>Status</th>
            <th onClick={() => changeFilter('createdAt')}>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {listTask.map((taskElement) => (
            <tr key={`Tarefa ${taskElement._id}`}>
              <td>{taskElement.name}</td>
              <td>{taskElement.status}</td>
              <td>{dateNow(taskElement.createdAt)}</td>
              <td>
                <button onClick={() => removeTask(taskElement._id)} type="button"> X </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
