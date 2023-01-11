import React from "react";
import ReactDOM from "react-dom";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

const PortalModal = ({ children, wrapperId }) => {
  return ReactDOM.createPortal(children, document.getElementById(wrapperId));
};

const Modal = ({ 
    show,
    title,
    children,
    confirmLabel, 
    onConfirm,
    cancelLabel,
    onClose,
    btnType
}) => {
  return (
    <PortalModal wrapperId="portal-root">
      <MDBModal show={show}  tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title || "Modal title"}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
            </MDBModalHeader>
           { children && <MDBModalBody>{children}</MDBModalBody>}

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={onClose}>
                {cancelLabel || "Cancel"}
              </MDBBtn>
              <MDBBtn color={btnType} onClick={onConfirm}>{confirmLabel || "Ok"}</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </PortalModal>
  );
};

export default Modal;
