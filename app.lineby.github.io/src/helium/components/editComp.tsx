import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Nav, Navbar} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//Icon
import { MdLayers } from 'react-icons/md'
import VidPlayer from './VidPlayer';

function LayerBox() {
    
    const test_rect = {
        height:'12vh',
        width:'22vw',
        margin:'5%',
        background:'#000000',
        borderRadius:'10px'
    }
    
    return <>
        <div style={test_rect}>
        </div>
    </>
}


function EditPage() {

    function LayerMenu() {
        
        function MiniLayerBox() {
            
            return <>
            
            </>
        }

        return <>
            <div className='section_box d-flex flex-column' style={{height:'100%', width:'100%', background:'#FFF'}}>
                <div className='d-flex flex-row' style={{overflow:'hidden'}}>
                    <div>
                        <MdLayers style={{scale:'2', margin:'20px'}}/>
                    </div>
                    <div>
                        <p>Select a layer to edit</p>
                    </div>
                </div>
                <div>

                </div>
            </div> 
        </>
    }

    function SettingMenu() {
        return <>
            <div>
                Select a layer to edit
            </div>
        </>
    }

    function Timeline() {
        return <>
            <div>
                Timeline
            </div>
        </>
    }

    return <>
        <div className='section_box d-flex flex-column justify-content-between' style={{height:'100%', width:'100%'}}>
            <div className='d-flex flex-row justify-content-between' style={{padding:'1%'}}>
                <div className='eLayerMenu'>
                    <LayerMenu />    
                </div>
                <VidPlayer.EditVidPlayer/>
                <div className='section_box_spec' style={{height:'100%', width:'20%', padding:'0.5%', background:'#FFF'}}>
                    <SettingMenu />
                </div>
            </div>
            <div style={{height:'100%', padding:'0 1% 1% 1%'}}>
                <div className='section_box_spec' style={{height:'100%', width:'100%', background:'#FFF', padding:'0.5%'}}>
                    <Timeline />
                </div>
            </div>

        </div>
    </>
}

/*
            <div className='section_box d-flex flex-row justify-content-between' style={{height:'80%'}}>
                <div className='section_box d-flex flex-column' style={{width:'19%', height:'97.5%'}}>
                    
                </div>
                <div className='section_box d-flex' style={{width:'60%', height:'97.5%', background:'#1a1b25'}}>
                    <p>Video Viewer</p>
                </div>
                <div className='section_box' style={{width:'19%', height:'97.5%'}}>
                    <p>Layer settings</p>
                </div>
            </div>
            <div className='section_box' style={{width:'100%', height:'20%'}}>
                <p>Timeline</p>
            </div>
*/


export default {EditPage, LayerBox};