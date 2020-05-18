import React from 'react';
import PropTypes  from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons';

function Ordination(props){
    function handleAscDesc(){
        return (props.sortAsc || props.sortDesc ) ? 'hidden': '';
    }
    function handleAsc(){
        return (!props.sortAsc) ? 'hidden' : '';
    }
    function handleDesc(){
        return (!props.sortDesc) ? 'hidden' : '';
    }

    return (
        <span>
            <FontAwesomeIcon
            icon = {faSort}
            className = {handleAscDesc()}>
            </FontAwesomeIcon>

            <FontAwesomeIcon
            icon = {faSortUp}
            className = {handleAsc()}>
            </FontAwesomeIcon>

            <FontAwesomeIcon
            icon = {faSortDown}
            className = {handleDesc()}>
            </FontAwesomeIcon>
        </span>
    );
}
Ordination.propTypes = {
    sortAsc: PropTypes.bool.isRequired,
    sortDesc: PropTypes.bool.isRequired,
}

export default Ordination;
