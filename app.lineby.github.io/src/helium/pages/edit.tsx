import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../HeliumApp.css'

//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'


function Header() {
    const [title, setTitle] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitle(title);
            console.log(''.concat('Title:', title))
        }
    }
    
    return <>
        <div className="headerBox">
                <input className='headerBox_title' placeholder='Untitled Project'value={title}onChange={handleChange}onKeyDown={handleKeyDown} />
                <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>
        </div>
    </>
}

function QueryBox() {
    return <>
    
    </>
}

function VertTimeLine () {
    const section = {width: '50vw', height:'95.75vh', padding:'0.5%'}

    return <>
        <div style={section}>
            <div className="section_box" style={{height:'100%', width:'100%'}}>
                <Header />

            </div>
        </div>
    </>
}

function VidPlayer () {
    const section = {width: '50vw', height:'47.875vh', padding:'1%'}

    return <>
        <div style={section}>
            <div className="section_box" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                <div className="vid_pos">
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' width='90%' height='90%' style={{alignSelf:'center'}}/>
                    
                    <ButtonGroup style={{width:'25%', alignSelf:'center'}}>
                        <Button variant='success'>Start</Button>
                        <Button variant='danger'>Stop</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    </>
}

//


function MenuGroup () {
    const section = {width: '50vw', height:'47.875vh', padding:'1%'}

    return <>
        <div style={section}>
            <div className="section_box" style={{height:'100%', width:'100%'}}>
                <Navbar bg='primary' variant="dark" style={{borderRadius:'20px 20px 0px 0px'}}>
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href='#'>Home</Nav.Link>
                            <Nav.Link href='#obj'>Objects</Nav.Link>
                            <Nav.Link href='#media'>My Media</Nav.Link>
                            <Nav.Link>My Projects</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    </>
}

function Edit () {
    return <>
        <Row className="g-0">
            <Col>
                <TopBar/>
                <Row className="g-0">
                    <VertTimeLine/>
                    <Col>
                        <VidPlayer/>
                        <MenuGroup/>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}

export default Edit;