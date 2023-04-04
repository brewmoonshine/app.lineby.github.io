import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown, Form, InputGroup, ListGroup } from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

// Icons
import { MdVideoSettings, MdMenu, MdMenuOpen, MdOutlineAccountCircle, MdPadding, MdPause, MdPlayArrow } from 'react-icons/md';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//MP4
import test_vid from '../../img/test.mp4';


/* Things I need to add here:
- Settings page: Aspect ratio, playback speed, 
- Pause, Play, Forwards, Backwards, 
*/

function SideMenu2() {
    return <>
        <div className="vSideMenu2">
            <MdVideoSettings />
        </div>
    </>
}

function VidMenu() {

    const [heightRat, setHeightRat] = React.useState(9);
    const [widthRat, setWidthRat] = React.useState(16);

    function setAspectRatio(h: number, w: number) {
        setHeightRat(h)
        setWidthRat(w)
    }

    return <>
        <div className="section_box" style={{background:'#FFF', padding:'1%', height:'100%'}}>
            <Dropdown>
                <Dropdown.Toggle id='aspectR' style={{alignSelf:'center'}}>Aspect Ratio</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setAspectRatio(9, 16)}>16:9</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAspectRatio(16, 9)}>9:16</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAspectRatio(3, 4)}>4:3</Dropdown.Item>
                    <Dropdown.Item onClick={() => setAspectRatio(1,1)}>1:1</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </>
}

const HomeVidPlayer1: React.FunctionComponent<{}> = props => {
    const widthvw = window.innerWidth*0.5;
    const heightvh = window.innerHeight*0.61;
    const section = {width: `${widthvw}px`, height:`${heightvh}px`, padding:'1%'}

    const [heightRat, setHeightRat] = React.useState(9);
    const [widthRat, setWidthRat] = React.useState(16);
    const heightpx = document.documentElement.clientHeight*0.45
    const widthpx = (widthRat/heightRat)*heightpx;
    const view_sec = {width:`${widthpx}px`, height:`${heightpx}px`}

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
                    <MdVideoSettings className="vid_side_menu_icon" style={{alignSelf:'center', scale:'2'}}/>
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
            <div className="section_box d-flex flex-column justify-content-between" style={{background:'#FFF', height:'100%', width:'100%', padding:'2%'}}>
                <div className="view_port" id='view_port_div' style={view_sec}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' height={document.getElementById('view_port_div')?.clientHeight} width={document.getElementById('view_port_div')?.clientWidth}/>
                </div>
                
                <div className="vBottomMenu">
                    <VidMenu />
                </div>
            </div>
        </div>  
    </>

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row-reverse" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                <SideMenu2 />
                <div className="view_port d-flex flex-column" style={{zIndex:'1', height:'80%', width:'80%', padding:'2%'}}>
                    <ReactPlayer url='https://lineby-media.s3.us-west-1.amazonaws.com/baby_penguin.mp4' width={widthpx} height={heightpx} style={{alignSelf:'flex-start'}}/>
                </div>
            </div>
        </div>
    </>
}




const BottomMenu: React.FunctionComponent<{
    setHeightRat: React.Dispatch<React.SetStateAction<number>>,
    setWidthRat: React.Dispatch<React.SetStateAction<number>>,
    vidSpeed: number,
    setVidSpeed: React.Dispatch<React.SetStateAction<number>>,
    loop: boolean,
    setLoop: React.Dispatch<React.SetStateAction<boolean>>
    mute: boolean,
    setMute: React.Dispatch<React.SetStateAction<boolean>>
    volume: number,
    setVolume: React.Dispatch<React.SetStateAction<number>>
}> = props => {

    const [aspectRat, setAspectRat] = React.useState('16:9')

    function setAspectRatio(h: number, w: number) {
        props.setHeightRat(h)
        props.setWidthRat(w)
        setAspectRat(''.concat(String(w), ':', String(h)))
    }

    return <>
        <div className="section_box d-flex flex-column-reverse" style={{background:'#FFF', padding:'1.25%', height:'100%'}}>
            <div className="d-flex flex-row">
                <MdPause style={{alignSelf:'center', scale:'1.5'}}/>
                <MdPlayArrow style={{alignSelf:'center', scale:'1.5', margin:'0 0 0 1%'}}/>
                <Form.Range
                    style={{alignSelf:'center', margin:'0 0 0 1%'}}
                />
            </div>
            <div className="d-flex flex-row justify-content-between" style={{margin:'0 0 1.5% 0'}}>
                <div className="d-flex flex-row">
                    <p style={{color:'#1a1b25', margin:'0 1% 0 0'}}>Loop</p>
                    <Form.Check
                        style={{margin:'0 0 0 7px'}}
                        type='switch'
                        onChange={() => props.setLoop(!props.loop)}
                    />
                </div>
                <div className="d-flex flex-row">
                    <p style={{color:'#1a1b25', margin:'0 1% 0 0'}}>Mute</p>
                    <Form.Check
                        style={{margin:'0 0 0 7px'}}
                        type='switch'
                        onChange={() => props.setMute(!props.mute)}
                    />
                </div>
                <div className="d-flex flex-row" style={{width:'25%'}}>
                    <p style={{color:'#1a1b25', margin:'0 10px 0 0'}}>Volume</p>
                    <Form.Range
                    />
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between" style={{margin:'0 0 1.5% 0'}}>
                <ListGroup horizontal defaultActiveKey='def'>
                    <ListGroup.Item key='def' action onClick={() => setAspectRatio(9, 16)}>16:9</ListGroup.Item>
                    <ListGroup.Item action onClick={() => setAspectRatio(16, 9)}>9:16</ListGroup.Item>
                    <ListGroup.Item action onClick={() => setAspectRatio(3, 4)}>4:3</ListGroup.Item>
                    <ListGroup.Item action onClick={() => setAspectRatio(1, 1)}>1:1</ListGroup.Item>
                </ListGroup>
                <p>Aspect Ratio: {aspectRat}</p>

                <ListGroup horizontal variant="primary">
                    <ListGroup.Item action onClick={() => props.setVidSpeed(0.25)}>x0.25</ListGroup.Item>
                    <ListGroup.Item action onClick={() => props.setVidSpeed(0.5)}>x0.5</ListGroup.Item>
                    <ListGroup.Item action onClick={() => props.setVidSpeed(1)}>x1.0</ListGroup.Item>
                    <ListGroup.Item action onClick={() => props.setVidSpeed(1.25)}>x1.25</ListGroup.Item>
                    <ListGroup.Item action onClick={() => props.setVidSpeed(1.5)}>x1.5</ListGroup.Item>
                    <ListGroup.Item action onClick={() => props.setVidSpeed(2)}>x2.0</ListGroup.Item>
                    
                </ListGroup>
                <p>Speed: {props.vidSpeed}</p>
            </div>
        </div>
    </>
}

const HomeVidPlayer: React.FunctionComponent<{}> = props => {
    const widthvw = window.innerWidth*0.5;
    const heightvh = window.innerHeight*0.61;
    const section = {width: `${widthvw}px`, height:`${heightvh}px`, padding:'1%'}
    
    const [heightRat, setHeightRat] = React.useState(9);
    const [widthRat, setWidthRat] = React.useState(16);
    const heightpx = document.documentElement.clientHeight*0.45
    const widthpx = (widthRat/heightRat)*heightpx;
    const view_sec = {width:`${widthpx}px`, height:`${heightpx}px`, alignSelf:'center'}

    const [vidSpeed, setVidSpeed] = React.useState(1);
    const [loop, setLoop] = React.useState(false);
    const [mute, setMute] = React.useState(false);
    const [volume, setVolume] = React.useState(0.5);

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-column justify-content-between" style={{background:'#FFF', height:'100%', width:'100%', padding:'2%'}}>
                <div className="view_port" id='view_port_div' style={view_sec}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' height={document.getElementById('view_port_div')?.clientHeight} width={document.getElementById('view_port_div')?.clientWidth}/>
                </div>
                
                <div className="vBottomMenu">
                    <BottomMenu 
                    setHeightRat={setHeightRat} 
                    setWidthRat={setWidthRat} 
                    vidSpeed={vidSpeed} 
                    setVidSpeed={setVidSpeed} 
                    loop={loop}
                    setLoop={setLoop}
                    mute={mute}
                    setMute={setMute}
                    volume={volume}
                    setVolume={setVolume}
                    />
                </div>
            </div>
        </div>
    </>
}


const EditVidPlayer: React.FunctionComponent<{}> = props => {
    const widthvw = window.innerWidth*0.715;
    const section = {width: `${widthvw}px`, height:`100%`, margin:'0 1% 1% 1%'}
    
    const [heightRat, setHeightRat] = React.useState(9);
    const [widthRat, setWidthRat] = React.useState(16);
    const heightpx = document.documentElement.clientHeight*0.45
    const widthpx = (widthRat/heightRat)*heightpx;
    const view_sec = {width:`${widthpx}px`, height:`${heightpx}px`, alignSelf:'center'}

    const [vidSpeed, setVidSpeed] = React.useState(1);
    const [loop, setLoop] = React.useState(false);
    const [mute, setMute] = React.useState(false);
    const [volume, setVolume] = React.useState(0.5);

    return <>
        <div style={section}>
            <div className="section_box_spec d-flex flex-column justify-content-between" style={{background:'#FFF', height:'100%', width:'100%', padding:'2%'}}>
                <div className="view_port" id='view_port_div' style={view_sec}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' height={document.getElementById('view_port_div')?.clientHeight} width={document.getElementById('view_port_div')?.clientWidth}/>
                </div>
                
                <div className="vBottomMenu">
                    <BottomMenu 
                    setHeightRat={setHeightRat} 
                    setWidthRat={setWidthRat} 
                    vidSpeed={vidSpeed} 
                    setVidSpeed={setVidSpeed} 
                    loop={loop}
                    setLoop={setLoop}
                    mute={mute}
                    setMute={setMute}
                    volume={volume}
                    setVolume={setVolume}
                    />
                </div>
            </div>
        </div>
    </>
}

export default {HomeVidPlayer, EditVidPlayer};