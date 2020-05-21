import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Jumbotron } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

function UpdateTask(props) {
    const history = useHistory();
    const [task, setTask] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formValidated, setFormValidated] = useState(false);
    const [loadTask, setLoadTask] = useState(true);

    const getid = props.match.params.id;
    const  id= getid.replace(":", " ");
    useEffect(() => {
        if (loadTask) {
            const tasksDb = localStorage['tasks'];
            const tasks = tasksDb ? JSON.parse(tasksDb) : [];

            const task = tasks.filter(
                t => t.id === parseInt(id)
            )[0];
            setTask(task.name);
            setLoadTask(true);
        }
    }, [loadTask, props]);

    function handleCloseModal(event) {
        setShowModal(false);
        history.push('/');
    }

    function updateTask(event) {
        event.preventDefault();
        setFormValidated(true);
        if (event.currentTarget.checkValidity() === true) {
            setShowModal(true);

            const tasksDb = localStorage['tasks']
            let tasks = tasksDb ? JSON.parse(tasksDb) : [];

            tasks = tasks.map((taskDb) => {
                if(taskDb.id === parseInt(id)){
                    taskDb.name = task;
                }
                return taskDb;
            });
            localStorage['tasks'] = JSON.stringify(tasks);
            setShowModal(true);
        }
    }

    function handleTxtTask(event) {
        setTask(event.target.value);
    }

    return (
        <div>
            <h3 className="text-center">Update Task</h3>
            <Jumbotron>
                <Form onSubmit={updateTask} noValidate={formValidated}>
                    <Form.Group>
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type the name of task"
                            minLength="5"
                            maxLength="60"
                            required
                            value={task}
                            onChange={handleTxtTask}
                        />
                        <Form.Control.Feedback type="invalid">
                            The must have at least 5 words
                            </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button variant="success" type="submit">
                            Update
                            </Button>
                            &nbsp;
                            <Link to="/"><Button> Back </Button></Link>
                    </Form.Group>
                </Form>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Task updated without problems
                    </Modal.Body>
                    <Modal.Footer className="text-center">
                        <Button variant="success" onClick={handleCloseModal}>
                            Keep going
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Jumbotron>
        </div>
    );

}

UpdateTask.propTypes = {
    id: PropTypes.number.isRequired,
}
export default UpdateTask;