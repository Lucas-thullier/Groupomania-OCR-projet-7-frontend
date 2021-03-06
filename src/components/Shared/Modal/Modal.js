import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const crossElement = <FontAwesomeIcon icon={faTimes} />
require('./Modal.css')
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? 'modal display-block'
    : 'modal display-none'

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section
        className="modal-main"
        onClick={(clickEvent) => clickEvent.stopPropagation()}
      >
        <button className="closeModal" type="button" onClick={handleClose}>
          {crossElement}
        </button>
        {children}
      </section>
    </div>
  )
}

export default Modal
