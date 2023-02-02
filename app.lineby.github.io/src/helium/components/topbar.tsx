import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';


// SVG
import Cust_logo_name from '../../img/cust_logo_name.svg';
import Cust_user_icon from '../../img/cust_user_icon.svg';
import Cust_pro from '../../img/cust_pro.svg';
import Cust_lite from '../../img/cust_lite.svg';


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

function TopBar () {
    const svg_button = {background:'transparent', border:'none'}

    const [showAcc, setAccShow] = React.useState(false);
    const [showLvl, setLvlShow] = React.useState(false); 

    const section = {width: '100vw', height: '4.25vh', padding: '0.5%'}    
    return <>
        <div style={section} className='d-flex flex-row justify-content-between'>
            <button style={svg_button}>
                <img style={{alignSelf:'flex-start', height:'4vh'}} src={Cust_logo_name} alt='Logo'/>
            </button>                
            <div>
                <button style={svg_button} onClick={() => setLvlShow(true)}>
                    <img style={{alignSelf:'flex-start', height:'3vh'}} src={Cust_pro} alt='Pro'/>
                </button>
                <button style={svg_button} onClick={() => setAccShow(true)}>
                    <img style={{alignSelf:'flex-start',height:'4vh'}} src={Cust_user_icon} alt='User'/>
                </button>
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

export default TopBar;