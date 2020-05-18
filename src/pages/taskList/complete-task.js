import React, {useState}from 'react';
import PropTypes from 'prop-types';

import {Modal, Button, ModalFooter} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'


function CompleteTask(props){
    //variável state para usar o modal
    const [showModal, setShowModal] = useState(false);

    function handleOpenModal (event){
        event.preventDefault();
        setShowModal(true);
    }

    function handleCloseModal (){

        setShowModal(false);
    }

    function handleCompleteTask(event) {
        event.preventDefault();

        const tasksDb = localStorage['tasks'];
        let tasks = tasksDb ? JSON.parse(tasksDb) : [];

        tasks = tasks.map( task => {
            if(task.id === props.task.id){
                task.concluded = true;
            }
            return task;
        });

        localStorage['tasks'] = JSON.stringify(tasks);
        setShowModal(false);
        props.reloadTasks(true);
    }

    return (
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={faClipboardCheck}/>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want complete the following task?
                    <br />
                    <strong>{props.task.name}</strong>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="primary" onClick={handleCompleteTask}>
                        Sim
                    </Button>
                    <Button variant="danger" onClick = {handleCloseModal}>
                        Não
                    </Button>
                </ModalFooter>
            </Modal>
        </span>
    );
}



export default CompleteTask;

