import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';

import Edit from "./pages/edit";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeliumApp.css'


function App () {
    return (
        <Edit />
    );
}

export default App;