import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar, Dropdown} from 'react-bootstrap';

import ReactPlayer from "react-player/lazy";

import Thumbnail from './thumbNailComp';

// CSS
import '../../css/HeliumApp.css';
import '../../css/custom.min.css';

const VideoBrowser: React.FunctionComponent<{source: Array<number>, exit: React.Dispatch<React.SetStateAction<string>>}> = props => {
    const VBwidth = window.innerWidth*0.497;
    const VBheight = window.innerHeight*0.85;
    const section = {width:`${VBwidth}px`, height:`${VBheight}px`, background:'#1a1b25'}

    const [recSource, setRecSource] = React.useState('');
    
    function changeSource(source: string) {
        setRecSource(source) 
    }
    
    let ReturnArr: Array<JSX.Element> = [];
    const HP = 100;

    for (var fp in props.source) {
        ReturnArr.push(<><Thumbnail.Thumbnail_select heightPoint={HP} source={global.AllMedia[props.source[fp]]} display={setRecSource}/></>)
    }

    return <>
        <div className='d-flex flex-row'>
            <div className='section_box' style={{width:'48%', height:'92vh', overflow:'scroll', margin:'0 1.5% 0 0'}}>
                <div className='d-flex flex-row flex-wrap' style={{overflow:'scroll'}}>
                    {ReturnArr}
                </div>
            </div>
            <div className='d-flex flex-column' style={{width:'50%', height:'90vh'}}>

                <div className="section_box" style={section}>
                    <div className='d-flex flex-column' style={{width:'100%', height:'100%', padding:'2%'}}>
                        <div style={{height:'15%'}}/>
                        <ReactPlayer url={recSource} style={{alignSelf:'center', scale:'1.3'}}/>
                    </div>
                </div>
                <div className='section_box' style={{height:'50vh', width:`${VBwidth}px`, margin:'2% 0 0 0', padding:'2%'}}>
                    <p>Video: {recSource}</p>
                    <Button onClick={() => props.exit(recSource)}>Use Video</Button> 
                </div>
            </div>
        </div>
    </>
}

export default VideoBrowser;