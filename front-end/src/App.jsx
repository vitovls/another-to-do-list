import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './App.css';
import ModalExclude from './Components/ModalExclude';

function App() {
  const BASE_URL = process.env.REACT_APP_URL_BASE;

  const [task, setTask] = useState({
    name: '',
    status: '',
  });

  const [listTask, setListTask] = useState([]);

  const [filter, setFilter] = useState('');

  const [modal, setModal] = useState({
    isOpen: false,
    modalName: '',
  });

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

  const tableBodyClass = (idx) => {
    if (idx % 2 === 0) {
      return 'table-body-row table-body-row-even';
    }

    return 'table-body-row table-body-row-odd';
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

  const filterActivated = (e) => {
    if (e === filter) {
      return 'filter-active';
    }
    return '';
  };

  const excludeAllTask = () => {
    setModal({
      isOpen: true,
      modalName: 'excludeAllTask',
    });
  };

  const actionsModalExclude = {
    closeModal: () => {
      setModal({
        isOpen: false,
        modalName: '',
      });
    },
    confirmExclude: async () => {
      await axios.delete(`${BASE_URL}/delete/?deleteAll=yes`);
      setListTask([]);
      setModal({
        isOpen: false,
        modalName: '',
      });
    },
  };

  return (
    <main className="App main-app">
      { modal.isOpen && (
      <ModalExclude actions={actionsModalExclude} />
      ) }
      <h1 className="headling-app">
        Another To Do List
      </h1>
      <header className="header-app">
        <input className="input-header-app" name="name" onChange={functionSetterTask} type="text" placeholder="Nova Tarefa" />
        <select className="select-header-app" name="status" onChange={functionSetterTask}>
          <option value="">Status da Tarefa</option>
          <option value="A Fazer">A Fazer</option>
          <option value="Feito">Feito</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Em Andamento">Em Andamento</option>
        </select>
        <button className="btn-header-app" onClick={() => postTaskInServer()} type="button">Adicionar</button>
      </header>
      <table className="table-app">
        <thead>
          <tr>
            <th value="name" className={`table-header-app ${filterActivated('name')}`} onClick={() => changeFilter('name')}>Nome</th>
            <th value="status" className={`table-header-app ${filterActivated('status')}`} onClick={() => changeFilter('status')}>Status</th>
            <th className={`table-header-app ${filterActivated('createdAt')}`} onClick={() => changeFilter('createdAt')}>Data de Criação</th>
            <th onClick={() => excludeAllTask()} className="table-header-app table-header-app-exclude-all"> Excluir Todas Tarefas </th>
          </tr>
        </thead>
        <tbody>
          {listTask.map((taskElement, idx) => (
            <tr className={tableBodyClass(idx)} key={`Tarefa ${taskElement._id}`}>
              <td>{taskElement.name}</td>
              <td>{taskElement.status}</td>
              <td>{dateNow(taskElement.createdAt)}</td>
              <td>
                <button className="table-btn-remove-task-app" onClick={() => removeTask(taskElement._id)} type="button"> X </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
