import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';



const Video: React.FunctionComponent<{heightPoint: number}> = props => {
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
        borderRadius:'10px'
    }

    function chooseVid(fp: string, fn: [number, number]) {
        setChosenVidPath('f')
        setChosenFrameNums([1,1])
    }

    return <>
        <div className='thumbnail' style={test_rect} onClick={() => setShowVid(true)}></div>

        <Modal className='modal-xl' show={showVid} onHide={() => setShowVid(false)} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <ReactPlayer url='https://www.youtube.com/watch?v=QH2-TGUlwu4' width='90%' height='90%' style={{alignSelf:'center'}}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowVid(false)}>Close</Button>
                <Button onClick={() => chooseVid('fp', [1,1])}>Use Video</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default Video