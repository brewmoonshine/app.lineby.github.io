import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";
import Thumbnail from '../components/thumbNailComp';
import EditBox from '../components/editComp';
import TimelineEditor from "../components/timelineEditComp";
import TranscriptEditor from "../components/transcriptEditComp";
import VideoBrowser from "../components/videoBrowserComp";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'



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
                <div style={{height:'0.5vh'}} />
                <div style={{background:'pink', height:'10vh'}}>
                    <p>TODO: Add view options here</p>
                </div>
            </div>

        </div>
    </>
}

function NewQueryBox() {
    const [query, setQuery] = React.useState('');
    const [showTSearch, setShowTSearch] = React.useState(false);
    const [showMSearch, setShowMSearch] = React.useState(false);

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
                    <Dropdown>
                        <Dropdown.Toggle id='MoreSearch'>More</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setShowTSearch(true)}>Search With Transcript</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowMSearch(true)}>Manually Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>

        <Modal className='modal-xl' show={showTSearch} onHide={() => setShowTSearch(false)} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column' style={{height:'50vh'}}>
                <VideoBrowser source={global.ProjMedia}/>
            </Modal.Body>
        </Modal>

        <Modal className='modal-xl' show={showMSearch} onHide={() => setShowMSearch(false)} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column' style={{height:'50vh'}}>
                <VideoBrowser source={global.ProjMedia}/>
            </Modal.Body>
        </Modal>
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
    
    //TODO: Allow for more than 3 video choices
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
                    <Dropdown>
                        <Dropdown.Toggle id='MoreSearch' style={{alignSelf:'flex-start', margin:'2%'}}>More</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Search With Transcript</Dropdown.Item>
                            <Dropdown.Item>Manually Search</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div style={{width:'90%', overflow:'hidden'}} className="queryBox_searchResults d-flex flex-row ">
                        <div className="d-flex flex-row" style={{overflow:'scroll', width:'100%'}}>
                            <Thumbnail.Thumbnail heightPoint={120} source=''/>
                            <Thumbnail.Thumbnail heightPoint={120} source=''/>
                            <Thumbnail.Thumbnail heightPoint={120} source=''/>
                            <Button style={{alignSelf:'center', margin:'1%'}}>Try Again</Button>
                        </div> 
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
                <div className="d-flex flex-row justify-content-between" style={{height:`${heightvh-10}vh`}}>
                    <Button onClick={() => setShowEdit(true)} style={{alignSelf:'flex-start', margin:'1%'}}>Edit</Button>
                    <div className="d-flex flex-column" style={{height:'100%', width:'100%'}}>
                        <div style={{alignSelf:'center', overflowY:'scroll', width:'25vw'}}>
                            <EditBox/>
                            <EditBox/>
                        </div>
                    </div>
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
    var FP: string = global.SelQuFilePath[qid];
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

    let ReturnArr: Array<JSX.Element> = []

    for (let i = 0; i < global.QueryId.length; i++) {
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
                    
                    <ButtonGroup style={{alignSelf:'center', width:'30%', margin:'1%'}}>
                        <Button variant='success'>Start</Button>
                        <Button variant='danger'>Stop</Button>
                        <Dropdown>
                        <Dropdown.Toggle id='aspectR' style={{alignSelf:'flex-start', margin:'2%'}}>Aspect Ratio</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>16:9</Dropdown.Item>
                            <Dropdown.Item>4:3</Dropdown.Item>
                            <Dropdown.Item>1:1</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    </>
}


function MenuGroup () {
    const section = {width: '50vw', height:'47.875vh', padding:'1%'}

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row" style={{height:'100%', width:'100%'}}>
                <div className="sideMenu">
                </div>
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