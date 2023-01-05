import React from 'react'
import areUSure from '../../Images/areUSure.png'

const Modal = ({open, onClose, deleteHandler, id}) => {
    if(!open) return null;

  return (
    <div className='overlay'>
        <div className="modalContainer">
            <img src={areUSure} alt="doubt emoji" />
            <div className="modal-right">
                <p onClick={onClose}>X</p>
                <div className="modal-text">Are you sure?</div>
                <div className="modal-button">
                    <div onClick={deleteHandler(id)} className="confirm-button">Yes, delete</div>
                    <div className="back-button">No, dont delete</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal