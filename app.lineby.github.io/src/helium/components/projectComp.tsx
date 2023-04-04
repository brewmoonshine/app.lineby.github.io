import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar, Dropdown} from 'react-bootstrap';

import ReactPlayer from "react-player/lazy";

// Internal
import Thumbnail from './thumbNailComp';

// CSS
import '../../css/HeliumApp.css';
import '../../css/custom.min.css';


const ProjectItem: React.FunctionComponent<{projName: string, HP: number, }> = props => {

    const thumbh = props.HP;
    const thumbw = (16/9)*thumbh;
    const proj_pos_size = {
        height:`${1.5*thumbh}px`,
        width:`${1.2*thumbw}px`,
        padding:'1%',
        margin:'3%'
    }
    const thumb_size_pos = {
        height:`${thumbh}px`, 
        width:`${thumbw}px`, 
        borderRadius:'10px', 
        margin:'1%',
        background:'#000',
        alignSelf:'center'
    };


    return <>
        <div className='section_box_spec d-flex flex-column justify-content-between' style={proj_pos_size}>
            <div style={thumb_size_pos}>
            
            </div>
            <p style={{alignSelf:'center'}}>{props.projName}</p>
        </div>
    </>
} 

export default ProjectItem