import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UserProjectLayoutPage from "../components/UsersPage/UserProjectLayoutPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import ProductProjectLayoutPage from "../components/ProductsPage/ProductProjectLayoutPage";
import SingleProductsPage from "../components/ProductsPage/SingleProductsPage";
import StockProjectLayoutPage from "../components/StocksPage/StockProjectLayoutPage";
import SingleStocksPage from "../components/StocksPage/SingleStocksPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
<Route path="/usersLayout/users" exact element={<UserProjectLayoutPage />} />
<Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
<Route path="/users" exact element={<UserProjectLayoutPage />} />
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/stocks/:singleStocksId" exact element={<SingleStocksPage />} />
<Route path="/stocks" exact element={<StockProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
