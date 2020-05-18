import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {Modal, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function RemoveTask(props){
    const [showModal, setShowModal] = useState(false);

    function handleOpenModal(event){
        event.preventDefault();
        setShowModal(true);
    }

    function handleCloseModal(){

        setShowModal(false);
    }

    function handleDeleteTask(event){
        event.preventDefault();

        const tasksDB = localStorage['tasks'];
        let tasks = tasksDB ? JSON.parse(tasksDB) : [];

        tasks = tasks.filter(task => task.id !== props.task.id)

        localStorage['tasks'] = JSON.stringify(tasks);
        setShowModal(false);
        props.reloadTasks(true);

    };

    return(
        <span >
            <Button variant="danger" className ="btn-sm" onClick={handleOpenModal}>
                <FontAwesomeIcon icon={ faTrashAlt }/>
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Excluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Do you want delete the following task
                    <br/>
                    <strong> {props.task.name} </strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleDeleteTask}> Sim </Button>
                    <Button variant="danger" onClick={handleCloseModal}> Não </Button>
                </Modal.Footer>
                
            </Modal>
        </span>
    );
}

RemoveTask.propTypes = {
    task: PropTypes.object.isRequired,
    reloadTasks: PropTypes.func.isRequired,
}

export default RemoveTask;