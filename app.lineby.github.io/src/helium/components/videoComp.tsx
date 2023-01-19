import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HeliumApp.css'



const Video: React.FunctionComponent<{heightPoint: number}> = props => {
    const widthpx = (16/9)*props.heightPoint;

    const test_rect = {height:`${props.heightPoint}px`, width:`${widthpx}px`, background:'#000000'}

    return <>
        <div style={test_rect}></div>
    </>
}

export default Video