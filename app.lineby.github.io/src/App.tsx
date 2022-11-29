import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Button, Card, Modal, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Icon } from 'react-bootstrap-icons';
import { MdArrowBackIosNew, MdArrowForwardIos, MdMenuOpen } from "react-icons/md";

// 1 Components

/// 1.1 Internal UI Components 

//// 1.1.1 Dynamic Query Box
class QueryBox extends React.Component<{query: string}>{
  render () {
    return <>
      <div className='queryBoxPos'>
        <Card className='queryBox'>
          <p>{this.props.query}</p>
        </Card>
      </div>
    </>
  }
}


//// 1.1.2 Docked Tool bar

function setNewQuery(query: string) {
  console.log(query);
  // TODO
}

function openOptions() {
  //TODO
}

function ToolBar () {
  const [query, setQuery] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return <>
    <div className='toolBarPos'>
      <Card className='toolBar'>
        <input className='toolBar_input'placeholder='Search all files'onChange={handleChange}value={query}/>
        <hr style={{borderTop: 'dashed 1px',borderBottom:'0px', color:'edecea', width:'98%'}} />
        <div style={{display:'flex',justifyContent:'flex-end', flex:'1'}}>
          <Button style={{alignSelf:'center'}} onClick={() => openOptions()}>Options</Button>
          <Button style={{alignSelf:'center'}} onClick={() => setNewQuery(query)}>New Query</Button>
        </div>
      </Card>
    </div>
  </>

}



//// 1.1.3 Project Header
class HeaderBox extends React.Component{
  render() {
    return <>
      <div className='headerBoxPos'>
        <Card className='headerBox'>

        </Card>
      </div>
    </>
  }
}


/// 1.2 UI Layout Components

//// 1.2.1 Workspace 

class Workspace extends React.Component<{children: React.ReactNode | React.ReactNode[]}>{
  render() {
    const ToolBarPos = {alignSelf: 'flex-end', position: 'absolute'};
    
    return<>
      <div className='workspace'>
        <div className='workspace_dynamicSpace'>
          {this.props.children}
          <div style={ToolBarPos as React.CSSProperties}><ToolBar/></div>
        </div>

      </div>
    </>
  }
} 


//// 1.2.2 Side Menu

export interface SideMenuStatus {
  collapsed: boolean
}

function getDefaultSMStatus() {
  const defaultSMStatus: SideMenuStatus = {
    collapsed: true
  }
  return defaultSMStatus;
}

function getPreexistingSMStatus() {
  const preexistingSMStatusString = localStorage.getItem('status');
  const defaultSMStatus = getDefaultSMStatus();

  if (preexistingSMStatusString == null) {
    return defaultSMStatus;
  } else {
    try {
      return JSON.parse(preexistingSMStatusString) as SideMenuStatus;
    } catch (e) {
      localStorage.setItem('state', JSON.stringify(defaultSMStatus));
      return defaultSMStatus;
    }
  }
}

const SMInnerLayoutContext = React.createContext<SideMenuStatus>(getDefaultSMStatus());

function SideMenuLeft () {
  const [SMState, setSMState] = React.useState(getPreexistingSMStatus());
  const setSMStateInterface = (data: SideMenuStatus) => {
    localStorage.setItem('state', JSON.stringify(data))
    setSMState(data);
  }

  const widthvw = SMState.collapsed ? 4: 30;  
  const sideMenuParentWidth = {width: `${widthvw}vw`};

  const [toggleValue, setToggleValue] = React.useState('1');  
  const toggles = [
    {name: 'Projects', value: '1'},
    {name: 'Files', value: '2'}
  ];

  if (!SMState.collapsed) {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <div className='sideMenu_parent' style={sideMenuParentWidth}>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}>
            <MdArrowBackIosNew style={{alignSelf:'center'}} size={42} onClick={_ => setSMStateInterface({collapsed: !SMState.collapsed})}/>
            <p style={{alignSelf:'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Close</p>
          </div>
          <div className='sideMenu_child_expanded'>
            <ButtonGroup>
              {toggles.map((toggle, idx) => (
                <ToggleButton 
                  key={idx}
                  id={`toggle-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-success' : 'outline-danger'}
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
        </div>
      </SMInnerLayoutContext.Provider>
    )
  } else {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <div className='sideMenu_parent' style={sideMenuParentWidth}>
          <div className='sideMenu_child_closed'>
            <MdArrowForwardIos style={{alignSelf: 'center'}} size={42} onClick={_ => setSMStateInterface({collapsed: !SMState.collapsed})}/>
            <p style={{alignSelf: 'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Explore</p>
          </div>
        </div>
      </SMInnerLayoutContext.Provider>    
    )
  }
}

function SideMenuRight () {
  const [SMState, setSMState] = React.useState(getPreexistingSMStatus());

  const setSMStateInterface = (data: SideMenuStatus) => {
    localStorage.setItem('state', JSON.stringify(data))
    setSMState(data);
  }

  const widthvw = SMState.collapsed ? 4: 30;
  const sideMenuParentWidth = {width: `${widthvw}vw`};

  const [toggleValue, setToggleValue] = React.useState('1')
  const toggles = [
    {name: 'Project Items', value: '1'},
    {name: 'Voices', value: '2'},
    {name: 'Explore', value: '3'}
  ];

  if (!SMState.collapsed) {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <div className='sideMenu_parent_right' style={sideMenuParentWidth}>
          <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', flex:'1'}}/>
          <div className='sideMenu_child_expanded_right'>
            <ButtonGroup>
              {toggles.map((toggle, idx) => (
                <ToggleButton 
                  key={idx}
                  id={`toggle-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-success' : 'outline-danger'}
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
            <MdArrowForwardIos style={{alignSelf:'center'}} size={42} onClick={_ => setSMStateInterface({collapsed: !SMState.collapsed})}/>
            <p style={{alignSelf:'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Close</p>
          </div>          

        </div>
      </SMInnerLayoutContext.Provider>
    )
  } else {
    return (
      <SMInnerLayoutContext.Provider value={SMState}>
        <div className='sideMenu_parent_right' style={sideMenuParentWidth}>
          <div className='sideMenu_child_closed'>
            <MdMenuOpen style={{alignSelf: 'center'}} size={42} onClick={_ => setSMStateInterface({collapsed: !SMState.collapsed})}/>
            <p style={{alignSelf: 'center', fontFamily: 'space-grotesk-light', fontSize: '10px'}}>Details</p>
          </div>
        </div>
      </SMInnerLayoutContext.Provider>    
    )
  }
}


/// 1.3 Final Layout

class EditLayout extends React.Component<{children: React.ReactNode | React.ReactNode[]}>{
  render () {
    return <>
      <div id='root' className='row' style={{alignItems: 'strech'}}>
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
      <div style={parent}>
        <EditLayout>
          <HeaderBox/>
          <QueryBox query='1'/>
          <QueryBox query='2'/>
          <QueryBox query='3'/>
          <QueryBox query='4'/>
          <QueryBox query='5'/>
          <QueryBox query='6'/>
          <div style={footerWhiteSpace}/>
        </EditLayout>
      </div>
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
