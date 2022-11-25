import React from "react";
import { Row, Col, Button } from 'react-bootstrap';

import ToolBar from './ToolBar';

interface WorkspaceLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

class Workspace extends React.Component<WorkspaceLayoutProps>{
    render() {
        const row = {display: 'flex', flexDirection: 'row'};
        const col = {display: 'flex', flexDirection: 'col'};

        const workspace = {
            display: 'flex', 
            flexDirection: 'column',
            height: '100vh', 
            flex: '1', 
        };

        const dynamicSpace = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            overflow: 'auto',
            height: '90vh',
            flex: '1'
        }

        const ToolBarPos = {alignSelf: 'flex-end', width: '100%', position:'absolute'};

        return <>
            <div style={workspace as React.CSSProperties}>
                <div style={dynamicSpace as React.CSSProperties}>
                    {this.props.children}
                <div style={ToolBarPos as React.CSSProperties}>
                    <ToolBar/>
                </div>
                </div>

            </div>
        </>
    }
}

export default Workspace;