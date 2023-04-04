import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';
import { displayPartsToString } from 'typescript';

const Thumbnail_select: React.FunctionComponent<{heightPoint: number, source: string, display: React.Dispatch<React.SetStateAction<string>>}> = props => {
    const widthpx = (16/9)*props.heightPoint;
    const test_rect = {
        height:`${props.heightPoint}px`, 
        width:`${widthpx}px`, 
        margin:'2%' ,
        background:'#000000',
        borderRadius:'10px',
        overflow: 'hidden'
    }

    function clickOn(source: string) {
        props.display(source)
    }

    return <>
        <div className='thumbnail d-flex flex-row' style={test_rect} onClick={() => clickOn(props.source)}>
            <div style={{height:`${props.heightPoint}px`, width:`${widthpx}px`, position:'absolute'}}/> 
            <ReactPlayer url={props.source} height={props.heightPoint} width={widthpx} light controls={false}/>
        </div>    
    </>
}


const Thumbnail_multi_select: React.FunctionComponent<{
    heightPoint: number, 
    source: string, 
    display: React.Dispatch<React.SetStateAction<string>>, 
    remove: React.Dispatch<React.SetStateAction<string>>
}> = props => {
    const [filePath, setFilePath] = React.useState('');
    
    const widthpx = (16/9)*(props.heightPoint);

    const test_rect  = {
        height:`${props.heightPoint}px`, 
        width:`${widthpx}px`, 
        margin:'2%' ,
        background:'#000000',
        borderRadius:'10px'
    }

    const test_rect_select  = {
        height:`${props.heightPoint}px`, 
        width:`${widthpx}px`, 
        margin:'2%' ,
        background:'#000000',
        borderRadius:'10px'
    }

    function clickOn() {
        setFilePath(props.source)
        props.display(props.source)
        props.remove('')
    }

    function clickOff() {
        setFilePath('')
        props.display('')
        props.remove(props.source)
    }

    if (filePath != '') {
    return <>
        <div className='thumbnail' style={test_rect_select} onClick={() => clickOff()}/>
    </>
    } else {
        return <>
            <div className='thumbnail' style={test_rect} onClick={() => clickOn()}/>
        </>
    }
}


const Thumbnail: React.FunctionComponent<{heightPoint: number, source: string}> = props => {
    const [showVid, setShowVid] = React.useState(false);
    const [chosenVidPath, setChosenVidPath] = React.useState('');
    const [chosenFrameNums, setChosenFrameNums] = React.useState([0,0]);
    
    function getVid() {
        return [chosenVidPath, chosenFrameNums];
    }

    const widthpx = (16/9)*props.heightPoint;

    const test_rect = {
        height:`${props.heightPoint}px`, 
        width:`${widthpx}px`, 
        margin:'1%' ,
        background:'#000000',
        borderRadius:'10px',
        overflow:'hidden'
    }

    function chooseVid(fp: string, fn: [number, number]) {
        setChosenVidPath('f')
        setChosenFrameNums([1,1])
    }

    return <>
        <div className='thumbnail d-flex flex-row' style={test_rect} onClick={() => setShowVid(true)}>
            <div style={{height:`${props.heightPoint}px`, width:`${widthpx}px`, position:'absolute'}}/> 
            <ReactPlayer url={props.source} height={props.heightPoint} width={widthpx} light controls={false}/>
        </div>  

        <Modal className='modal-xl' show={showVid} onHide={() => setShowVid(false)} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column' style={{height:'50vh'}}>
                <ReactPlayer url={props.source} width='90%' height='90%' style={{alignSelf:'center'}}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowVid(false)}>Close</Button>
                <Button onClick={() => chooseVid('fp', [1,1])}>Use Video</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default {Thumbnail, Thumbnail_select, Thumbnail_multi_select};