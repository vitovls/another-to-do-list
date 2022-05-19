import PropTypes from 'prop-types';
import React from 'react';
import './Modal.css';

function Modal({ modalOptions }) {
  return (
    <section className="modal">
      <h1 className="modal-headling">{modalOptions.title}</h1>
      <p className="modal-paragraph">{modalOptions.message}</p>
      {modalOptions.buttons.map((button) => (
        <button
          key={`Botão de ${button.text}`}
          className="modal-btn"
          onClick={button.onClick}
          type="button"
        >
          {button.text}
        </button>
      ))}
    </section>
  );
}

Modal.propTypes = {
  modalOptions: PropTypes.shape({
    buttons: PropTypes.shape({
      map: PropTypes.func,
    }),
    message: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default Modal;
