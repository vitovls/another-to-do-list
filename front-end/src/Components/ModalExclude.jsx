import PropTypes from 'prop-types';
import React from 'react';
import './ModalExcludes.css';

function ModalExclude({ actions }) {
  return (
    <section className="modal">
      <h1 className="modal-headling">CUIDADO!!!</h1>
      <p className="modal-paragraph">Tem certeza que deseja excluir todas as tarefas ?</p>
      <button onClick={() => actions.confirmExclude()} className="modal-btn" type="button">Sim</button>
      <button onClick={() => actions.closeModal()} className="modal-btn" type="button">Não</button>
    </section>
  );
}

ModalExclude.propTypes = {
  actions: PropTypes.shape({
    closeModal: PropTypes.func,
    confirmExclude: PropTypes.func,
  }).isRequired,
};

export default ModalExclude;
