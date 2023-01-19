import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";
import Video from '../components/videoComp';

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
        <div className="headerBox d-flex flex-row justify-content-between" style={{width:'47vw', position:'absolute'}}>
            <input className='headerBox_title' placeholder='Untitled Project'value={title}onChange={handleChange}onKeyDown={handleKeyDown} />
            <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>
        </div>
    </>
}

/* Process of a query box:
1) starts as a QueryBox
2) Becomes QueryBox_vid
3) ends as QueryBox_timeline

*/

function QueryBox() {
    const [query, setQuery] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery(query)
            console.log(''.concat('New Query: ', query))
        }
    }

    const bufferSpace = {height:'2vh'}

    return <>
        <div className="section_box d-flex flex-row justify-content-between" style={{height:'12vh', padding:'2%'}}>
            <div style={{width:'100%', alignSelf:'center'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input className='queryBox_searchBar' placeholder='something to be here'value={query}onChange={handleChange}onKeyDown={handleKeyDown} />
                    <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>                    
                </div>
                <div style={{height:'1.5vh'}} />
                <div>
                    <Button>More</Button>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>
    </>
}

const QueryBox_vid: React.FunctionComponent<{currQuery: string}> = props => {
    const [query, setQuery] = React.useState(props.currQuery)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery(query)
            console.log(''.concat('Re Query: ', query))
        }
    }

    const bufferSpace = {height:'2vh'}

    return <>
        <div className="section_box d-flex flex-row justify-content-between" style={{height:'20vh', padding:'2%'}}>
            <div style={{width:'100%', alignSelf:'center'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input className='queryBox_searchBar' placeholder='something to be here'value={query}onChange={handleChange}onKeyDown={handleKeyDown} />
                    <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>                    
                </div>
                <div style={{height:'1.5vh'}} />
                <div className="d-flex flex-row justify-content-between">
                    <Button style={{alignSelf:'flex-start'}}>More</Button>
                    <div style={{width:'90%'}} className="queryBox_searchResults d-flex flex-row-reverse justify-content-between">
                        <Video heightPoint={120}/>
                        <Video heightPoint={120}/>
                        <Video heightPoint={120}/>
                        <Video heightPoint={120}/>
                    </div>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>
    </>
}

const QueryBox_timeline: React.FunctionComponent<{currQuery: string, vidLenSec: number}> = props => {
    const minHeightvh = 13
    const lenHeight = props.vidLenSec*2
    var heightvh = 0;
    if (lenHeight > minHeightvh) {
        heightvh = lenHeight;
    } else {
        heightvh = minHeightvh;
    }

    const [query, setQuery] = React.useState(props.currQuery)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery(query)
            console.log(''.concat('Re Query: ', query))
        }
    }

    const bufferSpace = {height:'2vh'}
    const test_rect = {height:'100%', width:'7vw', background:'#000000'}

    return <>
        <div className="section_box d-flex flex-row justify-content-between" style={{height:`${heightvh}vh`}}>
            <div style={test_rect}>

            </div>

            <div style={{width:'100%', alignSelf:'flex-start', padding:'2%'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input className='queryBox_searchBar' placeholder='something to be here'value={query}onChange={handleChange}onKeyDown={handleKeyDown} />
                    <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>                    
                </div>
                <div style={{height:'1.5vh'}} />
                <div>
                    <Button>More</Button>
                </div>
            </div>


        </div>
        <div style={bufferSpace}/>
    </>
}

function VertTimeLine () {
    const section = {width: '50vw', height:'95.75vh', padding:'0.5%'}
    const bufferSpace = {height:'9vh'}

    return <>
        <div style={section}>
            <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                <Header/>
                <div style={bufferSpace}/>
                <QueryBox_timeline currQuery="Yasssss 40" vidLenSec={40}/>
                <QueryBox_timeline currQuery="Yasssss 60" vidLenSec={60}/>
                <QueryBox_timeline currQuery="Yasssss 2" vidLenSec={2}/>
                <QueryBox_vid currQuery='Video select querybox'/>
                <QueryBox />


                <div style={bufferSpace}/>
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