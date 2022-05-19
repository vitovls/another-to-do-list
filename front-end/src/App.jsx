import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from './Components/Modals';

function App() {
  const BASE_URL = process.env.REACT_APP_URL_BASE;

  const closedModal = {
    isOpen: false,
    modal: {
      title: '',
      message: '',
      buttons: [],
    },
  };

  const formatDate = (date) => `${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`;

  const tableBodyClass = (idx) => {
    if (idx % 2 === 0) {
      return 'table-body-row table-body-row-even';
    }
    return 'table-body-row table-body-row-odd';
  };

  const [task, setTask] = useState({
    name: '',
    status: '',
  });

  const [listTask, setListTask] = useState([]);

  const [filter, setFilter] = useState('');

  const [modal, setModal] = useState(closedModal);

  const functionSetterTaskState = (event) => {
    const { name, value } = event.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const removeTask = (id) => {
    axios.delete(`${BASE_URL}/${id}`).then((response) => {
      setListTask(listTask.filter((taskElement) => taskElement.id !== id));
    });
  };

  const ModalConfirmExcludeAllTask = {
    title: 'Cuidado',
    message: 'Você tem certeza que deseja excluir todas as tarefa?',
    buttons: [
      {
        text: 'Sim',
        onClick: () => {
          axios.delete(`${BASE_URL}/delete/?deleteAll=yes`).then((_response) => {
            setListTask([]);
            setModal(closedModal);
          }).catch((error) => {
            console.log(error);
          });
        },
      },
      {
        text: 'Não',
        onClick: () => setModal(closedModal),
      },
    ],
  };

  const excludeAllTask = () => {
    setModal({
      isOpen: true,
      modalName: <Modal modalOptions={ModalConfirmExcludeAllTask} />,
    });
  };

  const ModalEmptyFields = {
    title: 'Campos Vazios',
    message: 'Por favor, preencha todos os campos.',
    buttons: [{
      text: 'Fechar',
      onClick: () => setModal(closedModal),
    }],
  };

  const postTaskInServer = () => {
    if (task.name === '' || task.status === '') {
      setModal({
        isOpen: true,
        modalName: <Modal modalOptions={ModalEmptyFields} />,
      });
      return;
    }

    axios.post(`${BASE_URL}`, task).then((response) => {
      setListTask([...listTask, response.data]);
    });
    setTask({
      name: '',
      status: '',
    });
  };

  const getByFilter = () => {
    axios.get(`${BASE_URL}/filter/?filter=${filter}`).then((response) => {
      setListTask(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

  const getNoFilter = () => {
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

  const filterActivated = (e) => {
    if (e === filter) {
      return 'filter-active';
    }
    return '';
  };

  useEffect(() => {
    if (filter) {
      getByFilter();
    }
    if (filter === '') {
      getNoFilter();
    }
  }, [filter, listTask]);

  return (
    <main className="App main-app">
      {modal.isOpen && (
        modal.modalName
      )}
      <h1 className="headling-app">
        Another To Do List
      </h1>
      <header className="header-app">
        <input value={task.name} className="input-header-app" name="name" onChange={functionSetterTaskState} type="text" placeholder="Nova Tarefa" />
        <select value={task.status} className="select-header-app" name="status" onChange={functionSetterTaskState}>
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
              <td>{formatDate(taskElement.createdAt)}</td>
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
