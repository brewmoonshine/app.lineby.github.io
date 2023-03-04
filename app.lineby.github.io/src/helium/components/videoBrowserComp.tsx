import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar, Dropdown} from 'react-bootstrap';

import ReactPlayer from "react-player/lazy";

import Thumbnail from './thumbNailComp';

// CSS
import '../../css/HeliumApp.css';
import '../../css/custom.min.css';

const VideoBrowser: React.FunctionComponent<{source: Array<number>}> = props => {
   
    const [recSource, setRecSource] = React.useState('');
    
    function changeSource(source: string) {
        setRecSource(source) 
    }
    
    let ReturnArr: Array<JSX.Element> = [];
    const HP = 140;

    for (var fp in props.source) {
        ReturnArr.push(<><Thumbnail.Thumbnail_select heightPoint={HP} source={global.AllMedia[props.source[fp]]} display={setRecSource}/></>)
    }

    return <>
        <div className='d-flex flex-row'>
            <div className='d-flex flex-row flex-wrap space-evenly' style={{width:'50%', overflow:'scroll'}}>
                {ReturnArr}
            </div>
            <div className='d-flex flex-column' style={{width:'50%', height:'90vh'}}>

                <div className="section_box" style={{height:'100%', width:'100%', background:'#1A1B25'}}>
                    <div className="vid_pos">
                        <ReactPlayer url={recSource} width='90%' height='90%' style={{alignSelf:'center'}}/>
                        
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
                <div className='section_box' style={{alignSelf:'center', height:'50vh', width:'90%', margin:'2%', padding:'2%'}}>
                    <p>Video: {recSource}</p> 
                </div>
            </div>
        </div>
    </>
}

export default VideoBrowser;