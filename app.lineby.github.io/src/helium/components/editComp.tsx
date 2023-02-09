import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';


function EditBox() {
    
    const test_rect = {
        height:'12vh',
        width:'22vw',
        margin:'5%',
        background:'#000000',
        borderRadius:'10px'
    }
    
    return <>
        <div style={test_rect}>
        </div>
    </>
}

export default EditBox;