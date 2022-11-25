import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function CreateNewQuery() {
    //TODO
}

class ToolBar extends React.Component {
    render() {
        const ToolBarPos = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flex: '1', 
            height: '15vh',
            background: 'rgba(255, 255, 255, 0)' 
        }

        const ToolBarItem = {
            height: '10vh',
            width: '63vw',
            alignSelf: 'center',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 0px 23px 10px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
        }

        const OptionsRow = {
            display: 'flex',
        }

        return <>
            <div style={ToolBarPos as React.CSSProperties}>
                <div style={ToolBarItem as React.CSSProperties}>
                    <input placeholder="Search your footage"></input>
                    <div style={OptionsRow}>
                        <Button onClick={() => CreateNewQuery()}>New Query</Button>
                        <Button>Options</Button>                        
                    </div>

                </div>

            </div>
        </>
    }
}

export default ToolBar;