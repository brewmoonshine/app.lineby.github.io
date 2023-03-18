import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

//Internal
import VideoBrowser from './videoBrowserComp';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';


const TranscriptEditor: React.FunctionComponent<{source:Array<number>}> = props => {
    const [vid, setVid] = React.useState('');
    
    function TranscriptEdit () {
        return <>
            <p>Transcript Editor</p>
        </>
    }

    if (vid == '') {
        return <>
            <Modal.Header closeButton>
                Search by Transcript: Select video to search
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <VideoBrowser source={props.source} exit={setVid}/>
            </Modal.Body>
        </>
    } else {
        return <>
            <Modal.Header closeButton>
                Search by Transcript: Select text of video to crop out
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <TranscriptEdit/>
            </Modal.Body>
        </>
    }
}

export default TranscriptEditor; 