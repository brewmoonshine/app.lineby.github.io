import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";
import Video from '../components/videoComp';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'


// Global vars
declare global {
    // Query ID: the index of the query in the query text array below
    var QueryID: Array<number>;
    
    // Query text
    var QueryText: Array<string>;
    
    // File path to S3 bucket for selected clip
    var FilePath: Array<string>;

    // Frame nums [start, end] for selected 
    var FrameNums: Array<[number, number]>; 

    var escapeCode: string;
}


function Header() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitle(title);
            console.log(''.concat('Title:', title))
        }
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
    }
    const handleDescKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setDesc(desc);
            console.log(''.concat('Description:', desc))
        }
    }
    
    return <>
        <div className="headerBox" style={{width:'47vw', position:'absolute'}}>
            <div className=" headerBox_title d-flex flex-row justify-content-between">
                <input 
                    className='headerBox_title_text' 
                    placeholder='Untitled Project'
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleTitleKeyDown}
                    style={{margin:'0.25%'}} 
                />
                <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>  
            </div>
            <div style={{height:'0.5vh'}}/>
            <div>
                <div className="headerBox_desc d-flex flex-row justify-content-between">
                    <input 
                        className='headerBox_desc_text' 
                        placeholder='Describe your video here'
                        value={desc}
                        onChange={handleDescChange}
                        onKeyDown={handleDescKeyDown}
                        style={{alignSelf:'flex-start' ,margin:'0.25%'}} 
                    />
                    <img style={{alignSelf:'center'}} src={Cust_Save_Icon} alt='Save Icon'/>
                </div>
                <div style={{height:'0.5vh'}}/>
                <div>

                </div>
            </div>

        </div>
    </>
}

function NewQueryBox() {
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
        <div className="d-flex flex-row justify-content-between" style={{height:'10vh'}}>
            <div style={{width:'100%', alignSelf:'center'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input 
                        className='queryBox_searchBar' 
                        placeholder='something to be here'
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                    />
                    <img style={{alignSelf:'center'}} src={Cust_Search_Icon} alt='Search Icon'/>                    
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

function QueryBox (currQuery: string) {
    const [query, setQuery] = React.useState(currQuery)

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
        <div className="section_box_spec d-flex flex-row justify-content-between" style={{height:'20vh', padding:'2%'}}>
            <div style={{width:'100%', alignSelf:'center'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input 
                        className='queryBox_searchBar' 
                        placeholder='something to be here'
                        value={query}onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                    />
                    <img style={{alignSelf:'center'}} src={Cust_Search_Icon} alt='Search Icon'/>                    
                </div>
                <div style={{height:'1.5vh'}} />
                <div className="d-flex flex-row justify-content-between">
                    <Button style={{alignSelf:'flex-start', margin:'1%'}}>More</Button>
                    <div style={{width:'90%', overflow:'auto'}} className="queryBox_searchResults d-flex flex-row ">
                        <Video heightPoint={120}/>
                        <Video heightPoint={120}/>
                        <Button style={{alignSelf:'center', margin:'1%'}}>Try Again</Button>
                    </div>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>
    </>
}

//TODO: Add edit warning system
function QueryBoxTimeline(currQuery: string, vidLenSec: number) {
    const minHeightvh = 13
    const lenHeight = vidLenSec*2
    var heightvh = 0;
    if (lenHeight > minHeightvh) {
        heightvh = lenHeight;
    } else {
        heightvh = minHeightvh;
    }

    const [query, setQuery] = React.useState(currQuery)
    const [showEdit, setShowEdit] = React.useState(false);
    const [showWarn, setShowWarn] = React.useState(false);
    //const [edit, setEdit] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowWarn(true)
            setQuery(query)
            console.log(''.concat('Re Query: ', query))

        }
    }

    const bufferSpace = {height:'2vh'}
    const test_rect = {height:'100%', width:'7vw', background:'#000000'}


    return <>
        <div className="section_box_spec d-flex flex-row justify-content-between" style={{height:`${heightvh}vh`}}>
            <div style={test_rect}>

            </div>

            <div style={{width:'100%', alignSelf:'flex-start', padding:'2%'}}>
                <div className="queryBox_pre d-flex flex-row justify-content-between" >
                    <input 
                        className='queryBox_searchBar' 
                        placeholder='something to be here'
                        value={query}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                    />
                    <img style={{alignSelf:'center'}} src={Cust_Search_Icon} alt='Search Icon'/>                    
                </div>
                <div style={{height:'1.5vh'}} />
                <div className="d-flex flex-row justify-content-between">
                    <Button onClick={() => setShowEdit(true)} style={{alignSelf:'flex-start', margin:'1%'}}>More</Button>

                </div>
            </div>
        </div>
        <div style={bufferSpace}/>

        <Modal show={showEdit} onHide={() => setShowEdit(false)} size='lg' centered>
            <Modal.Header closeButton> </Modal.Header>
            <Modal.Body>
                <p>Clip editor</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEdit(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showWarn} onhide={() => setShowWarn(false)} centered>
            <Modal.Header closeButton> </Modal.Header>
            <Modal.Body>
                <p>Are you sure?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => setShowWarn(false)}>Continue</Button>
            </Modal.Footer>
        </Modal>
    </>
}

function QueryState(qid: number) {
    /* Process of a query box:
    1) starts as a QueryBox
    2) Becomes QueryBox_vid
    3) ends as QueryBox_timeline
    */

    var QT: string = global.QueryText[qid];
    var FP: string = global.FilePath[qid];
    var FNs: [number, number] = global.FrameNums[qid]

    if (QT != global.escapeCode) {
        if (FP != global.escapeCode) {
            return <>{QueryBoxTimeline(QT, (FNs[1]-FNs[0]))}</>
        } else {
            return <>{QueryBox(QT)}</>
        }
    } else {
        return <>{NewQueryBox()}</>
    }
}

function QueryManager() {
    global.escapeCode = '-1';

    // TODO: Attach these arrays to API
    global.QueryID = [0, 1, 2, 4]
    global.QueryText = ['60 frames', '10 frames', 'hello', global.escapeCode]
    global.FilePath = ['filepath', 'filepath', global.escapeCode, global.escapeCode]
    global.FrameNums = [[0, 60], [120, 130], [0, 0], [0,0]]

    let ReturnArr: Array<JSX.Element> = []

    for (let i = 0; i < global.QueryID.length; i++) {
        ReturnArr.push(QueryState(i))
    }

    return <>
        {ReturnArr}
    </>

}

function VertTimeLine () {
    const section = {width: '50vw', height:'95.75vh', padding:'0.5%'}
    const bufferSpace = {height:'6vh'}

    return <>
        <div style={section}>
            <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                <Header/>
                <div style={bufferSpace}/>
                <QueryManager />
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
                <div style={{background:'#470FF4'}}>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    </>
}

/*
                <Navbar bg='primary' variant="dark" style={{borderRadius:'20px 20px 0px 0px'}}>
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href='#'>Home</Nav.Link>
                            <Nav.Link href='#'>Objects</Nav.Link>
                            <Nav.Link href='#'>My Media</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
*/

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