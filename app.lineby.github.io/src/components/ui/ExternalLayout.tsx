import React from 'react';

// Import items here
import Topbar from './Topbar';


interface ExternalLayoutProps {
    Fixed: boolean,
    TransparentTop: boolean;
    children: React.ReactNode | React.ReactNode[]
}

class ExternalLayout extends React.Component<ExternalLayoutProps> {
    render() {
        const app_view = {display: "flex", flexDirection: "row"};

        return <>
            <div style={app_view as React.CSSProperties}>
                <Topbar/>
                {this.props.children}
            </div>
        </>
    }
}

export default ExternalLayout