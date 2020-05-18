import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal} from 'react-bootstrap';
import {Link, useHistory} from "react-router-dom"

import Task from '../../models/task.model'


function RegisterTask(){
    //para alterar o que for preciso em tela
        const [task, setTask] = useState('');
        const [formValidate, setFormValidate] = useState(false);
        const [showModal, setshowModal] = useState(false);

    // Para redirecionar para qualquer rota
        const history = useHistory();

    /* Registrar a tarefa {
      - Modifica o formValidate pra true - l3
      - Mostra o Modal
    */
        function handleRegister(e){
            e.preventDefault();
            setFormValidate(true);
            if(e.currentTarget.checkValidity() === true){
                //get Tasks of the localStorage and converting to 
                const taskDb = localStorage['tasks']
                const tasks = taskDb ? JSON.parse(taskDb) : [];

                //insert tasks and converting to string and store in the localStorage
                tasks.push(new Task(new Date().getTime(), task, false));
                localStorage['tasks'] = JSON.stringify(tasks);

                setshowModal(true);
            }   
        }
        //setar tarefa
        function handleTask(e){
            setTask(e.target.value);
        }

        function handleCloseModal(){
            history.push('/')
        }
        return(
        <div>
            <h3 className="text-center">Register Task</h3>

            <Jumbotron>
                <Form
                //validate form and submit the form
                    validated = {formValidate}
                    noValidate
                    onSubmit= {handleRegister}>
                    <Form.Group className="text-center">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Insert your task"
                            minLength ="5"
                            maxLength = "100"
                            required 
                            value= {task}
                            onChange = {handleTask} />
                        <Form.Control.Feedback type="invalid" >
                            A tarefa deve conter ao menos 5 carácteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="text-center">
                        <Button 
                            variant="success"
                            type= "submit">
                                Register
                            </Button>
                            &nbsp;
                        <Link to="/"><Button variant="success">Voltar</Button></Link>
                    </Form.Group>
                </Form>

                <Modal show={showModal} onHide = {handleCloseModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa adicionada com sucesso
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant = "success"
                            onClick = {handleCloseModal}
                        >Continuar</Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>

        </div>

        );

}

export default RegisterTask;