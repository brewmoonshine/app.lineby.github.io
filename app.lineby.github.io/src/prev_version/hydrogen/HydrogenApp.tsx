import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
//import 'bootstrap/dist/css/bootstrap.min.css'; //TODO: integrate default 

import { Container, Row, Col, Button, Card, Modal, ButtonGroup, ToggleButton } from 'react-bootstrap';
import Draggable, { DraggableData, PositionOffsetControlPosition } from 'react-draggable';

import { MdArrowBackIosNew, MdArrowForwardIos, MdMenuOpen, MdSwapVert, MdMoreVert } from "react-icons/md";
import CustSearch from '../../img/cust_search_icon.svg';
import CustSave from '../../img/cust_save_icon.svg';


const queryStringList: string[] = ['Start on this frame', 'go to this frame', 'fade into this frame', 'slide into the next scene'];

// 1 Components

/// 1.1 Internal UI Components 

//// 1.1.1 Dynamic Query Box
const QueryBox: React.FunctionComponent<{query: string}> = props =>{
  const [nQuery, setnQuery] = React.useState(props.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnQuery(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewQuery(nQuery);
      console.log(''.concat('Query Change: ', nQuery));
    }
  }

  const [position, setPosition] = React.useState({x: 0, y:0});

  const trackPos = (data: DraggableData) => {
    setPosition({x: data.x, y:data.y})
  }

  return <>
    <Container className='queryBoxPos'>
      <Draggable onDrag={(e, data) => trackPos(data)} handle='#handle'>
        <Card className='queryBox'>
          <div style={{display:'flex', flexDirection:'row'}}>
            <MdSwapVert style={{padding:'1px 1px 1px 5px', alignSelf:'center'}} size={20} id='handle'/>
            <input className='toolBar_input'onChange={handleChange}onKeyDown={handleKeyDown}value={nQuery}/>
            <img style={{alignSelf:'flex-end'}} src={CustSave} alt='Save Icon'/>
          </div>
        </Card>
      </Draggable>
    </Container>
  </>
}


//// 1.1.2 Docked Tool bar

function setNewQuery(query: string) {
  console.log(query);
  console.log(queryStringList);
  queryStringList.push(query)
}

function openOptions() {
  //TODO
}

function openManualSearch() {
  //TODO
}

function ToolBar () { 
  const [query, setQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewQuery(query);
      console.log(''.concat('New Query: ', query));
      setQuery('');
    }
  }

  return <>
    <Container className='toolBarPos'>
      <Card className='toolBar'>
        <div style={{display:'flex', flexDirection:'row'}}>
          <input className='toolBar_input'placeholder='Search all files'onChange={handleChange}onKeyDown={handleKeyDown}value={query}/>
          <img style={{alignSelf:'flex-end'}} src={CustSearch} alt='Search Icon'/>
        </div>
        <hr style={{borderTop: 'dashed 1px',borderBottom:'0px', color:'edecea', width:'98%'}} />
        <div style={{display:'flex',justifyContent:'flex-start', flex:'1'}}>
          <div style={{height: '25px', width: '15px'}}/>
          <Button className='button' style= {{alignSelf: 'center'}} onClick={() => openManualSearch}>Manual Search</Button>
          <div style={{height: '25px', width: '15px'}}/>
          <Button className='button' style={{alignSelf:'center'}} onClick={() => openOptions()}>Options</Button>
          <div style={{height: '25px', width: '15px'}}/>
        </div>
      </Card>
    </Container>
  </>

}



//// 1.1.3 Project Header
function HeaderBox() {
  const [title, setTitle] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTitle(title);
      console.log(''.concat('Title: ', title));
    }
  }

  
  return <>
    <Container className='headerBoxPos'>
      <Card className='headerBox'>
        <div style={{display:'flex', flexDirection:'row'}}>
          <input className='headerBox_title' placeholder='Untitled Project'value={title}onChange={handleChange}onKeyDown={handleKeyDown} />
          <img style={{alignSelf:'center'}} src={CustSave} alt='Save Icon'/>
        </div>
        <hr style={{borderTop: 'dashed 1px',borderBottom:'0px', color:'edecea', width:'98%'}} />
      </Card>
    </Container>
  </>
  }


/// 1.2 UI Layout Components

//// 1.2.1 Workspace 

class Workspace extends React.Component<{children: React.ReactNode | React.ReactNode[]}>{
  render() {
    const ToolBarPos = {alignSelf: 'flex-end', position: 'absolute'};
    
    return<>
      <Container className='workspace'>
        <div className='workspace_dynamicSpace'>
          {this.props.children}
          <div style={ToolBarPos as React.CSSProperties}><ToolBar/></div>
        </div>
      </Container>
    </>
  }
} 


//// 1.2.2 Side Menu

export interface SideMenuStatus {
  l_collapsed: boolean
  r_collapsed: boolean
}

function getDefaultSMStatus() {
  const defaultSMStatus: SideMenuStatus = {
    l_collapsed: true,
    r_collapsed: true
  }
  return defaultSMStatus;
}

function getPreexistingSMStatus(json_string: string) {
  const preexistingSMStatusString = localStorage.getItem(json_string);
  const defaultSMStatus = getDefaultSMStatus();

  if (preexistingSMStatusString == null) {
    return defaultSMStatus;
  } else {
    try {
      return JSON.parse(preexistingSMStatusString) as SideMenuStatus;
    } catch (e) {
      localStorage.setItem(json_string, JSON.stringify(defaultSMStatus));
      return defaultSMStatus;
    }
  }
}

const SMInnerLayoutContext = React.createContext<SideMenuStatus>(getDefaultSMStatus());

function SideMenuLeft () {
  const [SMState, setSMState] = React.useState(getPreexistingSMStatus('l_status'));
  const setSMStateInterface = (data: SideMenuStatus) => {
    localStorage.setItem('l_status', JSON.stringify(data));
    setSMState(data);
  }

  const widthvw = SMState.l_collapsed ? 4: 30;  
  const sideMenuParentWidth = {width: `${widthvw}vw`};

  const [toggleValue, setToggleValue] = React.useState('1');  
  const toggles = [
    {name: 'Projects', value: '1'},
    {name: 'Files', value: '2'}
  ];

  if (!SMState.l_collapsed) {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <Container className='sideMenu_parent' style={sideMenuParentWidth}>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}>
            <MdArrowBackIosNew style={{alignSelf:'center'}} size={42} onClick={_ => setSMStateInterface({l_collapsed: !SMState.l_collapsed, r_collapsed: SMState.r_collapsed})}/>
            <p style={{alignSelf:'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Close</p>
          </div>
          <div className='sideMenu_child_expanded'>
            <ButtonGroup className='button'>
              {toggles.map((toggle, idx) => (
                <ToggleButton 
                  key={idx}
                  id={`toggle-${idx}`}
                  type="radio"
                  variant={'primary'}
                  name='toggle'
                  value={toggle.value}
                  checked={toggleValue == toggle.value}
                  onChange={(e) => setToggleValue(e.currentTarget.value)}
                >
                  {toggle.name} 
                </ToggleButton>
              ))}
            </ButtonGroup> 
          </div>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}/>
        </Container>
      </SMInnerLayoutContext.Provider>
    )
  } else {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <Container className='sideMenu_parent' style={sideMenuParentWidth}>
          <div className='sideMenu_child_closed'>
            <MdArrowForwardIos style={{alignSelf: 'center'}} size={42} onClick={_ => setSMStateInterface({l_collapsed: !SMState.l_collapsed, r_collapsed: SMState.r_collapsed})}/>
            <p style={{alignSelf: 'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Explore</p>
          </div>
        </Container>
      </SMInnerLayoutContext.Provider>    
    )
  }
}

function SideMenuRight () {
  const [SMState, setSMState] = React.useState(getPreexistingSMStatus('r_status'));

  const setSMStateInterface = (data: SideMenuStatus) => {
    localStorage.setItem('r_status', JSON.stringify(data));
    setSMState(data);
  }

  const widthvw = SMState.r_collapsed ? 4: 30;
  const sideMenuParentWidth = {width: `${widthvw}vw`};

  const [toggleValue, setToggleValue] = React.useState('1')
  const toggles = [
    {name: 'Project Items', value: '1'},
    {name: 'Voices', value: '2'},
    {name: 'Explore', value: '3'}
  ];

  if (!SMState.r_collapsed) {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <Container className='sideMenu_parent_right' style={sideMenuParentWidth}>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}/>
          <div className='sideMenu_child_expanded_right'>
            <ButtonGroup>
              {toggles.map((toggle, idx) => (
                <ToggleButton 
                  key={idx}
                  id={`toggle-${idx}`}
                  type="radio"
                  variant={'primary'}
                  name='toggle'
                  value={toggle.value}
                  checked={toggleValue == toggle.value}
                  onChange={(e) => setToggleValue(e.currentTarget.value)}
                >
                  {toggle.name} 
                </ToggleButton>
              ))}
            </ButtonGroup> 
          </div>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}>
            <MdArrowForwardIos style={{alignSelf:'center'}} size={42} onClick={_ => setSMStateInterface({l_collapsed: SMState.l_collapsed, r_collapsed: !SMState.r_collapsed})}/>
            <p style={{alignSelf:'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Close</p>
          </div>          

        </Container>
      </SMInnerLayoutContext.Provider>
    )
  } else {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <Container className='sideMenu_parent_right' style={sideMenuParentWidth}>
          <div className='sideMenu_child_closed'>
            <MdMenuOpen style={{alignSelf: 'center'}} size={42} onClick={_ => setSMStateInterface({l_collapsed: SMState.l_collapsed, r_collapsed: !SMState.r_collapsed})}/>
            <p style={{alignSelf: 'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Details</p>
          </div>
        </Container>
      </SMInnerLayoutContext.Provider>    
    )
  }
}


/// 1.3 Final Layout

class EditLayout extends React.Component<{children: React.ReactNode | React.ReactNode[]}>{
  render () {
    return <>
      <div id='root' className='row' style={{}}>
        <SideMenuLeft/>
        <Workspace>
          {this.props.children}
        </Workspace>
        <SideMenuRight/>
      </div>
    </>
  }
}


//TODO: Need to make the query box generation dynamic -> The current content in EditLayout is just a test
class EditPage extends React.Component{
  render() {
    const parent = {width: '100%', height: '100%'};
    const footerWhiteSpace = {flexBasis: '100%', height: '50vh'};

    return <>
      <Container style={parent}>
        <EditLayout>
          <HeaderBox/>
            {queryStringList.map((query, idx) => (
              <QueryBox query={query} key={idx}/>
            ))}
          <div style={footerWhiteSpace}/>
        </EditLayout>
      </Container>
    </>
  }
}


// 2 Run the App
function App() {
  return (
    <EditPage/>
  );
}

export default App;
