import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Ordination from './ordination';
import ItemListTasks from './ItemListTasks';
import PaginationItems from './paginationItems';


function TaskList() {
    const ITEMS_PER_PAGE = 5;

    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);
    //pagination
    const [totalItem, setTotalItem] = useState(0);
    const [pageActual, setPageActual] = useState(1);
    //Ordination
    const [sortAsc, setSortAsc] = useState(false);
    const [sortDesc, setSortDesc] = useState(false);
    //Filtering
    const [filterTask, setFilterTask] = useState([]);

    useEffect(() => {
        function getTasks() {
            const tasksDb = localStorage['tasks'];
            let listTasks = tasksDb ? JSON.parse(tasksDb) : [];
            //filtering
            listTasks = listTasks.filter( 
                task => task.name.indexOf(filterTask) === 0           
            );
            //ordination
            if(sortAsc){
                listTasks.sort((t1, t2) => (t1.name.toLowerCase() > t2.name.toLowerCase()) ? 1 : -1);
            }else if(sortDesc){
                listTasks.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase()) ? 1 : -1);
            }
            //Pagination
            setTotalItem(listTasks.length);
            setTasks(listTasks.splice((pageActual - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE));
        }
        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }
    }, [loadTasks, pageActual, sortDesc, sortAsc, filterTask]);

    function handleChangePage(page){
        setPageActual(page);
        setLoadTasks(true);
    }

    function handleSort(event){
        event.preventDefault();

        if(!sortAsc && !sortDesc){
            setSortAsc(true);
            setSortDesc(false);
            console.log(sortAsc);
            console.log(sortDesc);
        }else if(sortAsc){
            setSortAsc(false);
            setSortDesc(true);
            console.log(sortAsc);
            console.log(sortDesc);
        }else{
            setSortAsc(false);
            setSortDesc(false);
            console.log(sortAsc);
            console.log(sortDesc);
        }
        setLoadTasks(true);
    }

    function handleFilter(event){
        setFilterTask(event.target.value);
        setLoadTasks(true);
    }

    return (
        <div className="text-center">
            <h3>Tasks To Do</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                         
                        <th>
                            <a href="/" onClick={handleSort}>
                            Tarefa 
                            &nbsp; 
                            <Ordination sortAsc = {sortAsc} sortDesc = {sortDesc} /></a>
                        </th>
                        
                        <th>
                            <Link to="/register"
                                className="btn btn-success btn-sm">
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;
                                Nova Tarefa
                            </Link>
                        </th>
                    </tr>
                    <tr>
                        <th>
                        <Form.Control 
                        type= "text"
                        value= {filterTask}
                        onChange = {handleFilter}
                        className = "filter-task"
                        />
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                   
                </thead>
                <tbody>
                    <ItemListTasks tasks={tasks} reloadTasks={setLoadTasks} />
                </tbody>
            </Table>
        <div className="center-align">
            <PaginationItems 
                totalItem={ totalItem }
                itemsPerPage={ITEMS_PER_PAGE}
                
                pageActual={ pageActual }
                changePage={handleChangePage}
            />
        </div>
        </div>
    );
}

export default TaskList;