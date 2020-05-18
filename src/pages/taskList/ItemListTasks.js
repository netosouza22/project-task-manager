import React from 'react';
import Proptypes from 'prop-types';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import CompleteTask from './complete-task'
import RemoveTask from './removeTask'

function ItemListTasks(props){

    function checkedTask(task){
        return task.concluded ? 'line-through' : 'none';
    }

    return(
        props.tasks.map(task => 
            <tr key = {task.id}>
                <td width = "75%"
                style= {{textDecoration: checkedTask(task)}}>
                    {task.name}
                </td>
                <td
                className = "text-right">
                
                    <CompleteTask  
                    task = { task } 
                    reloadTasks = { props.reloadTasks } 
                    className={task.concluded ? 'hidden' : null} />
                    &nbsp;

                    <Link to={"/update/" + task.id} 
                    className = {task.concluded ? 'hidden' : 'btn btn-warning btn-sm'}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>

                    &nbsp;

                    <RemoveTask
                    task= { task }
                    reloadTasks = { props.reloadTasks } 
                    />
                </td>
            </tr>
        )
    );
}

ItemListTasks.propTypes = {
    tasks: Proptypes.array.isRequired,
    reloadTasks: Proptypes.func.isRequired,
};

export default ItemListTasks;