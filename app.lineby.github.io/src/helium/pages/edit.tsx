// External
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown, Form, InputGroup} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


// Internal
import VidPlayer from "../components/VidPlayer";
import MenuGroup from "../components/MenuGroup";

import TopBar from "../components/topbar";
import Thumbnail from '../components/thumbNailComp';
import EditComp from '../components/editComp';
import TimelineEditor from "../components/timelineEditComp";
import TranscriptEditor from "../components/transcriptEditComp";
import VideoBrowser from "../components/videoBrowserComp";

// Icons
import { MdVideoSettings, MdMenu, MdMenuOpen, MdOutlineAccountCircle } from 'react-icons/md';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG
import Cust_Search_Icon from '../../img/cust_search_icon.svg'
import Cust_Save_Icon from '../../img/cust_save_icon.svg'



const Header: React.FunctionComponent<{mobile: boolean}> = props => {
    var section = {}
    if (props.mobile == true) {
        section = {width:'90.5vw', position:'absolute'}
    } else {
        section = {width:'47vw', position:'absolute'}
    }

    const [title, setTitle] = React.useState(global.openProject);
    const [desc, setDesc] = React.useState('');
    const [scriptMode, setScriptMode] = React.useState(false)
    global.ScriptQueryViewMode = scriptMode;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitle(title);
            global.openProject = title;
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
        <div className="headerBox" style={section}>
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
    const [vid, setVid] = React.useState('');

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
            <TranscriptEditor source={global.ProjMedia}/>
        </Modal>

        <Modal show={showMSearch} onHide={() => setShowMSearch(false)} centered fullscreen>
            <Modal.Header closeButton>
                Manual Search: Select video to search
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <VideoBrowser source={global.ProjMedia} exit={setVid}/>
            </Modal.Body>
        </Modal>
    </>
}

function QueryBox (currQuery: string, Results: Array<number>) {
    const [query, setQuery] = React.useState(currQuery);
    const [seeMore, setSeeMore] = React.useState(false);
    const [vid, setVid] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setQuery(query)
            console.log(''.concat('Re Query: ', query))
        }
    }

    function selectVid (source: string) {
        setVid(source)
    }

    /*
    var ReturnArr: Array<JSX.Element> = [];
    
    for (var idx in Results) {
        ReturnArr.push(<><Thumbnail.Thumbnail heightPoint={100} source={global.AllMedia[Results[idx]]}/></>)
        console.log('result')
    } 
    */

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
                            <div style={{height:'100px', width:'177px', background:'#F00', margin:'1%'}}>I need</div>
                            <div style={{height:'100px', width:'177px', background:'#0F0', margin:'1%'}}>to fix</div>
                            <div style={{height:'100px', width:'177px', background:'#00F', margin:'1%'}}>this</div>
                            <Button onClick={() => setSeeMore(true)} style={{alignSelf:'center', margin:'1%', fontSize:'12px'}}>See More</Button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>

        <Modal show={seeMore} onHide={() => setSeeMore(false)} centered fullscreen>
            <Modal.Header closeButton>
                More Options For: {query}
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <VideoBrowser source={global.ProjMedia} exit={setVid}/>
            </Modal.Body>
        </Modal>
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
    const timeline = {height:'100%', width:'7vw', overflow:'hidden'}

    const heightpx = window.innerHeight*(heightvh/100);
    const timelinewidthpx = window.innerWidth*(7/100);
    const timeline_imgheightpx = (9/16)*timelinewidthpx;
    const num_img = Math.floor(heightpx/timeline_imgheightpx)+1;

    let imgArr: Array<JSX.Element> = [];

    for (var i=0; i<num_img; i++) {
        imgArr.push(<>
            <div style={{width:`${timelinewidthpx}px`, height:`${timeline_imgheightpx}px`}}>
                <p>{i}</p>
            </div> 
        </>)
    }

    return <>
        <div className="section_box_spec d-flex flex-row justify-content-between" style={{height:`${heightvh}vh`}}>
            <div className="d-flex flex-column" style={timeline}>
                {imgArr}
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
                            <EditComp.LayerBox/>
                            <EditComp.LayerBox/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style={bufferSpace}/>

        <Modal show={showEdit} onHide={() => setShowEdit(false)} size='lg' centered fullscreen>
            <Modal.Header closeButton>
                Edit the clip found for: {currQuery}
            </Modal.Header>
            <Modal.Body>
                <EditComp.EditPage/>
            </Modal.Body>
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
    /* Script Mode:
    Queries that have been run and editied: Green highlight
    Queries that have been run: Orange highlight
    Queries that have not yet been run: no highlight
    
    */
    function getQueries() {
        var query_string: string = '';
        for (var query in global.Query) {
            query_string.concat(query_string, query[1]);
            query_string.concat(query_string, '\n');
        }
        return query_string;
    } 

    // TODO: This doesnt seem to work?
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createWithContent(
            ContentState.createFromText(getQueries())
        )
    )

    return <>
        <div className="section_box_spec" style={{height:'94%', width:'100%', padding:'1.5%'}}>
            <Editor editorState={editorState} onChange={setEditorState} />
        </div>
    </>
}


const VertTimeLine: React.FunctionComponent <{mobile: boolean}> = props => {
    var section = {}
    if (props.mobile == true) {
        section = {width:'100%', height:'100vh', padding:'0.5%'}
    } else {
        section = {width: '50vw', height:'100vh', padding:'0.5%'}
    }
    const bufferSpace = {height:'6.5vh'}

    if (global.ScriptQueryViewMode == true) {
        return <>
            <div style={section}>
                <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                    <Header mobile={props.mobile}/>
                    <div style={bufferSpace}/>
                        <ScriptEditor />
                </div>
            </div>
        </>
    } else {
        return <>
            <div style={section}>
                <div className="section_box" style={{height:'100%', width:'100%', padding:'2% 2% 2% 2%'}}>
                    <Header mobile={props.mobile}/>
                    <div style={bufferSpace}/>
                    <QueryManager3 />
                    <div style={bufferSpace}/>
                </div>
            </div>
        </>
    }
}


function MobileEdit() {
    const vertTimeLine = {width:'95vw', height:'100v'};
    const testR2 = {height:'50vh'};
    const testR3 = {height:'50vh'};

    return <>
        <Row className="g-0">
            <Col>
                <Row className="g-0">
                    <div style={vertTimeLine}>
                        <VertTimeLine mobile={true}/>
                    </div>
                    <Col>
                        <div className="r_side_menu" style={testR2}>
                            <VidPlayer.HomeVidPlayer />
                        </div>
                        <div className="r_side_menu" style={testR3}>
                            <MenuGroup />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}


function Edit () {
    if (global.mobile == true) {
        return <>
            <MobileEdit />
        </>
    } else {
        return <>
            <Row className="g-0">
                <Col>
                    <Row className="g-0">
                        <VertTimeLine mobile={false}/>
                        <Col>
                            <VidPlayer.HomeVidPlayer/>
                            <MenuGroup/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    }


}

export default Edit;