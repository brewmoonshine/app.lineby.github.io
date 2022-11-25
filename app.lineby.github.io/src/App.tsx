import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

import UserEdit from './pages/UserEdit/UserEdit';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*

        <Route path='/' element={<SignIn />} />
        <Route path='/create' element={<UserEdit />} />

*/