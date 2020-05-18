import React from 'react';
import Pagination from 'react-bootstrap/Pagination'
import PropTypes from 'prop-types'

function PaginationItems(props){

    function firstPage(){
        return(
            <Pagination.First 
                key="pagFirst"
                onClick = {() => props.changePage(1)}
                disabled = {props.pageActual === 1}
            />
        )
    }

    function prevPage(){
        return(
            <Pagination.Prev 
                key="pagPrev"
                onClick = {() => props.changePage(props.pageActual - 1)}
                disabled = {props.pageActual === 1}
            />
        )
    }

    function numericItem(page){
        return(
            <Pagination.Item 
            key = {page}
            active = {page === props.pageActual}
            onClick = {() => props.changePage(page)}>
                {page}
            </Pagination.Item>
        );
    }

    function lastPage(numPage){
        return(
            <Pagination.Last 
                key="pagLast"
                onClick = {() => props.changePage(numPage)}
                disabled = {props.pageActual === numPage}
            />
        )
    }
    function nextPage(numPage){
        return(
            <Pagination.Next 
                key="pagNext"
                onClick = {() => props.changePage(props.pageActual + 1)}
                disabled = {props.pageActual === numPage}
            />
        )
    }

    function getPagination(){
        const numPage = Math.ceil(props.totalItem / props.itemsPerPage);
        let items = [];
        console.log(props.totalItem);
        items.push(firstPage());
        items.push(prevPage());

        for(let page = 1; page <= numPage; page++){
            items.push(numericItem(page));
        }

        items.push(nextPage(numPage));
        items.push(lastPage(numPage))
        return items;
    }

    return(
        <Pagination>
            {getPagination()}
        </Pagination>
    );
}

PaginationItems.propTypes = {
    totalItem: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    pageActual: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default PaginationItems;