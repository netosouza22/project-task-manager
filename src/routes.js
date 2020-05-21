import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TaskList from './pages/taskList';
import Register from './pages/register';
import Update from './pages/updateTask';

//rAdicionar rotas aqui
function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TaskList} />
                <Route path="/register" component={Register} />
                <Route path="/update/:id" component={Update} />
            </Switch>
        </BrowserRouter>
        )

}

export default Routes;