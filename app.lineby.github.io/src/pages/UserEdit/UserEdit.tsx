import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ExternalLayout from './ExternalLayout';
import QueryBox from '../../components/ui/QueryBox';

function Footer () {
    const style={height: '1vh'}

    return <>
        <div style={style}/>
    </>
}

class UserEdit extends React.Component{
    render() {
        const parent = {width: '100vw', height:'100vh'}
        const footerWhiteSpace = {flexBasis: '100%', height: '50vh'};
        
        return <>
        <div style={parent}>
            <ExternalLayout Fixed={true}>
                    <QueryBox/>
                    <QueryBox/>
                    <QueryBox/>
                    <QueryBox/>
                    <QueryBox/>
                    <QueryBox/>
                    <QueryBox/>
                    <div style={footerWhiteSpace}/>
            </ExternalLayout>            
        </div>

        </>
    }
}

export default UserEdit;