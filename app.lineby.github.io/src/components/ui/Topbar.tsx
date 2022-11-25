import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class TopBar extends React.Component {
    render () {
        const TopBarPos = {
            width: '100vw', 
            height: '5vh', 
            background:'rgba(235, 0, 255, 0.15)'
        }

        return <>
        <div style={TopBarPos as React.CSSProperties}>
            <h1>TopBar</h1>
        </div>
        </>
    }
}

export default TopBar;