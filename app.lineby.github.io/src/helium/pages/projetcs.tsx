import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';


//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'

function Project () {
    const size = {height:'100%', width:'100%'}
    
    return <>
        <div style={size}>
            
        </div>
    </>
}

function Proj_tilings () {
    const size = {height:''}
    
    return <>
    
    </>
}

function Projects () {
    return <>
        <TopBar/>
        <Proj_tilings/>
    </>
}

export default Projects;