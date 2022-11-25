import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import Workspace from '../../components/ui/Workspace';
import SideMenu from '../../components/ui/SideMenu';

interface ExternalLayoutProps {
    Fixed: boolean;
    children: React.ReactNode | React.ReactNode[];
}

class ExternalLayout extends React.Component<ExternalLayoutProps>{
    render() {
        const row = {display: "flex", flexDireciton: "row", alignItems: 'strech'}
        const col = {display: "flex", flexDirection: "column", alignItems: 'strech'};

        return <>
            <div style={row as React.CSSProperties}>
                <SideMenu/>
                <Workspace>
                    {this.props.children}
                </Workspace>
            </div>
        </>
    }
}

export default ExternalLayout;