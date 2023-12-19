import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header1 from '../Header1';
import Todo from '../Todo';
import Create from '../Create';
import Mystory from '../Mystory';
import Login from '../Login';
import Page404 from '../Page404';


const AppRouter = () => (
    // <div>
        <BrowserRouter>
        <Routes>
                <Route path='/' element={<Header1 />} />
                <Route path='/dashboard' element={<Todo />} />
                <Route path='/create' element={<Create />} />
                <Route path='/myStory' element={<Mystory />} />
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    // </div>
);

export default AppRouter;