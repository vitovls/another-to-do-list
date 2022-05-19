import PropTypes from 'prop-types';
import React from 'react';
import './Modal.css';

function EmptyFields({ actions }) {
  return (
    <section className="modal">
      <h1 className="modal-headling">Campos vazios</h1>
      <p className="modal-paragraph">Por favor, preencha todos os campos.</p>
      <button className="modal-btn" onClick={() => actions.closeModal()} type="button">Fechar</button>
    </section>
  );
}

EmptyFields.propTypes = {
  actions: PropTypes.shape({
    closeModal: PropTypes.func,
  }).isRequired,
};

export default EmptyFields;
