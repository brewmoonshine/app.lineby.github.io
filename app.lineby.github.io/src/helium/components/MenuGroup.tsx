import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton, Dropdown, Form, InputGroup} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

// Internal
import Thumbnail from "./thumbNailComp";
import ProjectItem from "./projectComp";

// Icons
import { MdVideoSettings, MdMenu, MdMenuOpen, MdOutlineAccountCircle } from 'react-icons/md';

// CSS
import '../../css/HeliumApp.css'
import '../../css/custom.min.css';

//SVG


function MenuGroup () {
    const widthvw = window.innerWidth*0.5;
    const heightvh = window.innerHeight*0.3875;
    const section = {width: `${widthvw}px`, height:`${heightvh}px`, padding:'1%'}
    const [menuSelect, setMenuSelect] = React.useState(<><Home/></>)
    

    function Account () {
        return <>
            <div className="menuPage">
                <div style={{padding:'1%'}} className="d-flex flex-row">
                    <p style={{fontWeight:'600', fontSize:'20px'}}>Account</p>
                </div>
            </div>
        </>
    }

    function Home () {
        const [showEdit, setShowEdit] = React.useState(false);
        
        let ReturnArr: Array<JSX.Element> = [];
        let HP = 81;
        
        for (var fp in global.ProjMedia) {
            ReturnArr.push(<><Thumbnail.Thumbnail heightPoint={HP} source={global.AllMedia[global.ProjMedia[fp]]}/></>)
        }

        // <Thumbnail.Thumbnail_multi_select heightPoint={100} source="" display={} remove={}/>

        return <>
            <div className="menuPage">
                <div className="d-flex flex-row justify-content-between">
                    <div className="section_box_spec d-flex flex-row" style={{padding:'1.5%', margin:'2% 0 2% 2%', width:'40%'}}>
                        <p style={{fontWeight:'600', fontSize:'18px'}}>Project Settings</p>
                    </div>
                    <div className="section_box_spec d-flex flex-column" style={{width:'60%', height:`34vh`, padding:'1%', margin:'2%'}}>
                        <div className="d-flex flex-row justify-content-between" style={{padding:'1%'}}>
                            <p style={{fontWeight:'600', fontSize:'18px'}}>Project Media</p>
                            <Button onClick={() => setShowEdit(true)}>Edit</Button>
                        </div>
                        <div className="d-flex flex-row flex-wrap" style={{overflow:'scroll'}}>
                            {ReturnArr}
                        </div>
                    </div>
                </div>
            </div>

            <Modal className='modal-xl' show={showEdit} onHide={() => setShowEdit(false)} centered fullscreen>
                <Modal.Header closeButton>
                    Add and remove media from your project
                </Modal.Header>
                <Modal.Body className='d-flex flex-row justify-content-between' style={{padding:'1%'}}>
                    <div className="section_box d-flex flex-column justify-content-between" style={{padding:'1%', width:'49.5%'}}>
                        <div>
                            <p>My Media</p>
                        </div>
                        <div>
                            <Button>Add</Button>
                        </div>
                    </div>
                    <div className="section_box d-flex flex-column justify-content-between" style={{padding:'1%', width:'49.5%'}}>
                        <div>
                            <p>Project Media</p>
                            <div className="d-flex flex-row flex-wrap" style={{overflow:'scroll'}}>

                            </div>
                        </div>
                        <div>
                            <Button>Remove</Button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    }

    function Projects () {
        return <>
            <div className="menuPage">
                <div style={{padding:'1.5%'}} className="d-flex flex-column">
                    <p style={{fontWeight:'600', fontSize:'18px'}}>Projects</p>
                    <div className="d-flex flex-row flex-wrap" style={{overflow:'scroll'}}>
                        <div/>
                        <ProjectItem projName="Test" HP={100}/>
                        <ProjectItem projName="Test" HP={100}/>
                    </div> 
                </div>
            </div>
        </>
    }

    function Media () {
        return <>
            <div className="menuPage">
                <div style={{padding:'1%'}} className="d-flex flex-row">
                    <p style={{fontWeight:'600', fontSize:'20px'}}>Media</p>
                </div>
            </div>
        </>
    }

    function Objects () {
        return <>
            <div className="menuPage">
                <div style={{padding:'1%', height:'100%', width:'100%'}} className="d-flex flex-column">
                    <div style={{height:'45%'}}/>
                    <p style={{fontWeight:'400', fontSize:'16px', alignSelf:'center'}}>New feature coming soon...</p>
                </div>
            </div>
        </>
    }


    function SideMenu() {
        return <>
            <div className="d-flex flex-row justify-between-content" style={{height:'100%'}}>
                <div className="d-flex flex-column" style={{padding:'15px', height:'100%', alignSelf:'center'}}>
                    <MdMenuOpen style={{color:'#FFF', scale:'2'}}/>
                </div>
                <div style={{height:'100%'}} className="d-flex flex-column">
                    <Button variant="altdark" onClick={() => setMenuSelect(<><Home/></>)}>Home</Button>
                    <Button variant="altdark" onClick={() => setMenuSelect(<><Projects/></>)}>Projects</Button>
                    <Button variant="altdark" onClick={() => setMenuSelect(<><Media/></>)}>Media</Button>
                    <Button variant="altdark" onClick={() => setMenuSelect(<><Objects/></>)}>Objects</Button>
                    <div style={{height:'50%'}}/>
                    <Button variant="altdark" onClick={() => setMenuSelect(<><Account/></>)}><MdOutlineAccountCircle style={{scale:'2', alignSelf:'center', color:'#FFF', margin:'12%'}}/></Button>
                </div>
            </div>  
        </>
    }

    return <>
        <div style={section}>
            <div className="section_box d-flex flex-row-reverse" style={{height:'100%', width:'100%', background:'#FFF'}}>
                <div className="mgSideMenu">
                    <SideMenu />
                </div>
                {menuSelect}
            </div>
        </div>
    </>
}

/*
                <SideMenu />
                <MenuShown />
*/

export default MenuGroup;