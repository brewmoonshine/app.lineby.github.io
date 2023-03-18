import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';

import TestVals from './TestApiData';
import Project from './pages/projetcs'
import Edit from "./pages/edit";

// CSS
import '../css/HeliumApp.css'
import '../css/custom.min.css';



function App () {
    if (window.innerWidth < 1440) {
        global.mobile = true;
    } else {
        global.mobile = false;
    }

    //global.mobile = true;

    return <>
        <TestVals.TestVals3 />
        <Edit />
    </>

}

export default App;