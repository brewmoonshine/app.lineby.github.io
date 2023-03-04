import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown, Form, InputGroup} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

import TopBar from "../components/topbar";
import Thumbnail from '../components/thumbNailComp';
import EditBox from '../components/editComp';
import TimelineEditor from "../components/timelineEditComp";
import TranscriptEditor from "../components/transcriptEditComp";
import VideoBrowser from "../components/videoBrowserComp";

import { MdVideoSettings } from 'react-icons/md';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'



function Header() {
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [scriptMode, setScriptMode] = React.useState(false)
    global.ScriptQueryViewMode = scriptMode;

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

    function ChangeView(mode: boolean) {
        setScriptMode(mode);
        global.ScriptQueryViewMode = mode;
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
                <div style={{height:'1vh'}} />
                <div className="d-flex flex-row justiff-content-between" style={{height:'10vh', padding:'0 2.5% 0 2.5%'}}>
                    <div className="d-flex flex-row" style={{width:'100%'}}>
                        <p style={{margin:'0 2% 0 0'}}>Script Mode</p>
                        <Form.Check
                            type="switch"
                            onChange={() => ChangeView(!scriptMode)}
                        />
                    </div>
                    <div className="d-flex flex-row" style={{width:'100%'}}>
                        <p style={{margin:'0 2% 0 0'}}>Video Duration</p>
                        <Form.Range
                            style={{width:'50%'}}
                        />
                    </div>
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

            // TODO: update global lists
            global.Query.push([global.NextID, query, global.escapeCode, [0,0]]);
            global.NextID = global.NextID + 1;

            console.log(global.Query)
            console.log(global.NextID)
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

        <Modal show={showTSearch} onHide={() => setShowTSearch(false)} centered fullscreen>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column' style={{height:'50vh'}}>
                <VideoBrowser source={global.ProjMedia}/>
            </Modal.Body>
        </Modal>

        <Modal show={showMSearch} onHide={() => setShowMSearch(false)} centered fullscreen>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column' style={{height:'50vh'}}>
                <VideoBrowser source={global.ProjMedia}/>
            </Modal.Body>
        </Modal>
    </>
}

function QueryBox (currQuery: string, Results: Array<number>) {
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

    var ReturnArr: Array<JSX.Element> = [];
    
    for (var idx in Results) {
        ReturnArr.push(<><Thumbnail.Thumbnail heightPoint={120} source={global.AllMedia[Results[idx]]}/></>)
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
                            {ReturnArr}
                            <Button style={{alignSelf:'center', margin:'1%', fontSize:'12px'}}>Try Again</Button>
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

// OBSOLETE: see QueryState3 and QueryManager3
/*
function QueryState(qid: number) {
    var QID = qid
    var QT: string = global.QueryText[qid];
    var FP: string = global.SelQuFilePath[qid];
    var FNs: [number, number] = global.FrameNums[qid]

    if (QT != global.escapeCode) {
        if (FP != global.escapeCode) {
            return <>{QueryBoxTimeline(QT, (FNs[1]-FNs[0]), QID.toString())}</>
        } else {
            return <>{QueryBox(QT, global.LastSearchRes, QID.toString())}</>
        }
    } else {
        return <>{NewQueryBox()}</>
    }
}
function QueryManager() {
    let ReturnArr: Array<JSX.Element> = []

    for (let i = 0; i < global.QueryId.length; i++) {
        ReturnArr.push(QueryState(i))
    }

    return <>
        {ReturnArr}
    </>
}
function QueryState2(query: [number, string, string, [number, number]]) {
    var QID = query[0];
    var QT = query[1]; 
    var FP = query[2];
    var FNs = query[3];

    if (QT != global.escapeCode) {
        if (FP != global.escapeCode) {
            return <>{QueryBoxTimeline(QT, (FNs[1]-FNs[0]), QID.toString())}</>
        } else {
            return <>{QueryBox(QT, global.LastSearchRes, QID.toString())}</>
        }
    } else {
        return <>{NewQueryBox()}</>
    }
}
function QueryManager2() {
    let ReturnArr: Array<JSX.Element> = [];
    let KeyArr: Array<number> = [];

    for (let i = 0; i < global.Query.length; i++) {
        var query = global.Query[i];
        var key = query[0];
        ReturnArr.push(QueryState2(query));
        KeyArr.push(key);
    }

    return <>
        {ReturnArr}
 
    </>
}
*/

const QueryState3: React.FunctionComponent<{query: [number, string, string, [number, number]], key: number}> = props => {
    var QT = props.query[1]; 
    var FP = props.query[2];
    var FNs = props.query[3];

    if (QT != global.escapeCode) {
        if (FP != global.escapeCode) {
            return <>{QueryBoxTimeline(QT, (FNs[1]-FNs[0]))}</>
        } else {
            return <>{QueryBox(QT, global.LastSearchRes)}</>
        }
    } else {
        return <>{NewQueryBox()}</>
    }
}

function QueryManager3() {
    let QueryArr = global.Query;
    
    return ( 
        <>
            {QueryArr.map(query => (
                <>
                    <QueryState3 query={query} key={query[0]}/>
                </>
            ))}
            {NewQueryBox()}
        </>
    )
}

function ScriptEditor() {
    
    return <>
        <div className="section_box_spec" style={{height:'92.5%', width:'100%'}}>
        </div>
    </>
}


function VertTimeLine () {
    const section = {width: '50vw', height:'95.75vh', padding:'0.5%'}
    const bufferSpace = {height:'6vh'}

    if (global.ScriptQueryViewMode == true) {
        return <>
            <div style={section}>
                <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                    <Header/>
                    <div style={bufferSpace}/>
                        <ScriptEditor />
                </div>
            </div>
        </>
    } else {
        return <>
            <div style={section}>
                <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                    <Header/>
                    <div style={bufferSpace}/>
                    <QueryManager3 />
                    <div style={bufferSpace}/>
                </div>
            </div>
        </>
    }
}


function VidPlayer () {
    const section = {width: '50vw', height:'61vh', padding:'1%'}

    const [heightRat, setHeightRat] = React.useState(9);
    const [widthRat, setWidthRat] = React.useState(16);
    const heightpx = document.documentElement.clientHeight*0.45
    const widthpx = (widthRat/heightRat)*heightpx;

    const [vidSpeed, setVidSpeed] = React.useState(1);
    const [volume, setVolume] = React.useState(1);
    const [loop, setLoop] = React.useState(false)

    function setAspectRatio(h: number, w: number) {
        setHeightRat(h)
        setWidthRat(w)
    }

    function SideMenu () {
        return <>
            <div className="vid_side_menu" style={{zIndex:'2', position:'absolute', overflow:'hidden'}}>
                <div className="d-flex flex-row" style={{width:'35px', height:'35px', padding:'0 0 0 10px'}}>
                    <MdVideoSettings className="vid_side_menu_icon" style={{alignSelf:'center'}}/>
                </div>
                
                <div style={{padding:'3%'}}>
                    <div className="d-flex flex-row">
                        <Dropdown>
                            <Dropdown.Toggle id='aspectR' style={{alignSelf:'center'}}>Aspect Ratio</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setAspectRatio(9, 16)}>16:9</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAspectRatio(16, 9)}>9:16</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAspectRatio(3, 4)}>4:3</Dropdown.Item>
                                <Dropdown.Item onClick={() => setAspectRatio(1,1)}>1:1</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div style={{width:'5%'}}/>
                        <Dropdown>
                            <Dropdown.Toggle id='speed' style={{alignSelf:'center'}}>Speed</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setVidSpeed(0.25)}>x0.25</Dropdown.Item>
                                <Dropdown.Item onClick={() => setVidSpeed(0.5)}>x0.5</Dropdown.Item>
                                <Dropdown.Item onClick={() => setVidSpeed(1)}>x1.0</Dropdown.Item>
                                <Dropdown.Item onClick={() => setVidSpeed(1.25)}>x1.25</Dropdown.Item>
                                <Dropdown.Item onClick={() => setVidSpeed(1.5)}>x1.5</Dropdown.Item>
                                <Dropdown.Item onClick={() => setVidSpeed(2)}>x2.0</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div style={{height:'12px'}}/>

                    <div>
                        <p style={{color:'#1a1b25'}}>Volume</p>
                        <Form.Range
                            min={0}
                            max={1}
                            step={0.05}
                            defaultValue={volume} 
                        />
                    </div>

                    <div className="d-flex flex-row">
                        <p style={{color:'#1a1b25', margin:'0 1% 0 0'}}>Loop</p>
                        <Form.Check
                            type='switch'
                            onChange={() => setLoop(!loop)}
                        />
                    </div>

                </div>
            </div>
        </>
    }

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                {SideMenu()}
                <div className="view_port d-flex flex-column" style={{zIndex:'1', height:'100%', width:'100%', padding:'1%'}}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' width={widthpx} height={heightpx} style={{alignSelf:'center'}}/>
                    
                    <ButtonGroup style={{alignSelf:'center', width:'30%', margin:'1%'}}>
                        <Button variant='success'>Start</Button>
                        <Button variant='danger'>Stop</Button>

                    </ButtonGroup>
                </div>
            </div>
        </div>
    </>
}

/*
    function SideMenu () {
        return <>
            <div className="vid_side_menu" style={{zIndex:'2', position:'absolute',}}></div>
        </>
    }

    function VidPlay_ToolBar() {
        return <>
            <div className="d-flex flex-column" style={{zIndex:'1', height:'100%', width:'100%'}}>
                <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' width={widthpx} height={heightpx} style={{alignSelf:'flex-end'}}/>
                
                <ButtonGroup style={{alignSelf:'flex-end', width:'30%', margin:'1%'}}>
                    <Button variant='success'>Start</Button>
                    <Button variant='danger'>Stop</Button>
                    <Dropdown>
                        <Dropdown.Toggle id='aspectR' style={{alignSelf:'flex-start', margin:'2%'}}>Aspect Ratio</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setAspectRatio(9, 16)}>16:9</Dropdown.Item>
                            <Dropdown.Item onClick={() => setAspectRatio(16, 9)}>9:16</Dropdown.Item>
                            <Dropdown.Item onClick={() => setAspectRatio(3, 4)}>4:3</Dropdown.Item>
                            <Dropdown.Item onClick={() => setAspectRatio(1,1)}>1:1</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ButtonGroup>
            </div>
        </>
    }

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                {SideMenu()}
                {VidPlay_ToolBar()}
            </div>
        </div>
    </>
*/


function MenuGroup () {
    const section = {width: '50vw',height:'34.5vh', padding:'1%'}

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