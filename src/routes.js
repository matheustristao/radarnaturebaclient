import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Product from './pages/Product';
import Loja from './pages/Loja';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/produto/:id" component={Product} />
            <Route path="/loja/:id" component={Loja} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
