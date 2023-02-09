import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';

import Thumbnail from './thumbNailComp';

// CSS
import '../../css/HeliumApp.css';
import '../../css/custom.min.css';

const VideoBrowser: React.FunctionComponent<{source: Array<string>}> = props => {
   
    const [recSource, setRecSource] = React.useState('');
    
    function changeSource(source: string) {
        setRecSource(source) 
    }
    
    let ReturnArr: Array<JSX.Element> = [];
    const HP = 140;

    for (var fp in props.source) {
        ReturnArr.push(<><Thumbnail.Thumbnail_select heightPoint={HP} source={fp} display={setRecSource}/></>)
    }

    return <>
        <div className='d-flex flex-row'>
            <div className='d-flex flex-row flex-wrap' style={{width:'50%', height:'48vh', overflow:'scroll'}}>
                {ReturnArr}
            </div>
            <div style={{width:'50%', height:'100%'}}>
                <p>Video: {recSource}</p>
                
            </div>
        </div>
    </>
}

export default VideoBrowser;