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



const VidPlayer: React.FunctionComponent<{}> = props => {
    const widthvw = window.innerWidth*0.5;
    const heightvh = window.innerHeight*0.61;
    const section = {width: `${widthvw}px`, height:`${heightvh}px`, padding:'1%'}

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
            <div className="section_box d-flex flex-row-reverse" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                {SideMenu()}
                <div className="view_port d-flex flex-column" style={{zIndex:'1', height:'100%', width:'100%', padding:'2%'}}>
                    <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' light width={widthpx} height={heightpx} style={{alignSelf:'flex-start'}}/>
                    
                    <ButtonGroup style={{alignSelf:'center', width:'30%', margin:'1%'}}>
                        <Button variant='success'>Start</Button>
                        <Button variant='danger'>Stop</Button>

                    </ButtonGroup>
                </div>
            </div>
        </div>
    </>
}

export default VidPlayer;