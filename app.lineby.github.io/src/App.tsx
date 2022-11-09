import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import SignIn from './pages/SignIn';
import UserProjects from './pages/UserProjects';
import UserEdit from './pages/UserEdit';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/projects' element={<UserProjects />} />
        <Route path='/create' element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
