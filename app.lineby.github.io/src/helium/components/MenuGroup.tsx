import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown, Form, InputGroup} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

// Icons
import { MdVideoSettings, MdMenu, MdMenuOpen, MdOutlineAccountCircle } from 'react-icons/md';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG


function MenuGroup () {
    const widthvw = window.innerWidth*0.5;
    const heightvh = window.innerHeight*0.3875;
    const section = {width: `${widthvw}px`, height:'100%', padding:'1%'}
    const [menuSelect, setMenuSelect] = React.useState('home')

    function Home () {
            
        const [showAcc, setAccShow] = React.useState(false);
        const [showLvl, setLvlShow] = React.useState(false); 

        function AccountInfo() {
            return <>
                <p>Hello!</p>
            </>
        }

        function LevelInfo() {
            return <>
                <p>Hello!</p>
            </>
        }

        return <>
            <div className="menuPage">
                <div style={{padding:'1.5%'}} className="d-flex flex-row-reverse">
                    <MdOutlineAccountCircle style={{scale:'3'}} onClick={() => setAccShow(true)}/>
                </div>
            </div>

            <Modal show={showAcc} onHide={() => setAccShow(false)} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AccountInfo/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAccShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showLvl} onHide={() => setLvlShow(false)} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>You're Pro!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LevelInfo/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setLvlShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    }

    function Projects () {
        return <>
            <div className="menuPage">
                <p>Projects</p>
            </div>
        </>
    }

    function Media () {
        return <>
            <div className="menuPage">
                <p>Media</p>
            </div>
        </>
    }

    function Objects () {
        return <>
            <div className="menuPage">
                <p>Objects</p>
            </div>
        </>
    }

    function MenuShown () {
        if (menuSelect == 'home') {
            return <> <Home /> </>
        } else if (menuSelect == 'projects') {
            return <> <Projects /> </>
        } else if (menuSelect == 'media') {
            return <> <Media/> </>
        } else if (menuSelect == 'objects') {
            return <> <Objects /> </>
        } else {
            return <> <Home/> </>
        }
    }

    function SideMenu() {
        return <>
            <div className="d-flex flex-row justify-between-content" style={{height:'100%'}}>
                <div className="d-flex flex-column" style={{padding:'15px', height:'100%', alignSelf:'center'}}>
                    <MdMenuOpen style={{color:'#FFF', scale:'2'}}/>
                </div>
                <div style={{height:'100%'}} className="d-flex flex-column justify-content-space-evenly">
                    <Button onClick={() => setMenuSelect('home')}>Home</Button>
                    <Button onClick={() => setMenuSelect('projects')}>Projects</Button>
                    <Button onClick={() => setMenuSelect('media')}>Media</Button>
                    <Button onClick={() => setMenuSelect('objects')}>Objects</Button>
                </div>
            </div>    
        </>
    }

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row-reverse" style={{height:'100%', width:'100%', background:'#FFF'}}>
                <div className="sideMenu">
                    <SideMenu />
                </div>
                <MenuShown />
            </div>
        </div>
    </>
}

export default MenuGroup;