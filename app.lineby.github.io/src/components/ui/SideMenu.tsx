import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Icon } from 'react-bootstrap-icons';

import '../../App.css';

export interface Preference {
    collapsed: boolean
}

function getDefaultPreference() {
    const defaultPreference: Preference = {
        collapsed: false
    }
    return defaultPreference;
}

function getPreexistingPreference() {
    const preexistingPreferenceString = localStorage.getItem('preference');
    const defaultPreference = getDefaultPreference();

    if (preexistingPreferenceString == null) {
        return defaultPreference;
    } else {
        try {
            return JSON.parse(preexistingPreferenceString) as Preference;
        } catch (e) {
            localStorage.setItem('state', JSON.stringify(defaultPreference));
            return defaultPreference;
        }
    }
}

const InnerLayoutContext = React.createContext<Preference>(getDefaultPreference());

interface sideMenuEntryProps {
    label: string,
    href: string,
}

const SideMenuEntry: React.FunctionComponent<sideMenuEntryProps> = props => {
    const style = {
        color: '#fff'
    }

    if (React.useContext(InnerLayoutContext).collapsed) {
        // Menu collaped
        return <a style={style} href={props.href}>
            <button>Open</button>
        </a>
    } else {
        return <a style={style} href={props.href}>
            <Button>Close</Button>
        </a>
    }
}


interface InnerLayoutProps {}

const InnerLayout: React.FunctionComponent<React.PropsWithChildren<InnerLayoutProps>> = props => {
    const [preference, setMenuPreference] = React.useState(getPreexistingPreference());
    
    const setPreference = (data: Preference) => {
        localStorage.setItem('preference', JSON.stringify(data));
        setMenuPreference(data);
    }

    const widthvw = preference.collapsed ? 2 : 30;

    const SideMenuParentSpace = {
        width: `${widthvw}vw`,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0)'
   }

    const expandedArea = {
        display: 'flex',
        fontFamily: 'Space Grotesk',
        fontWeight: 'Bold',
        alignSelf: 'center',
        background: 'radial-gradient(circle at 17.3372% 0%, rgb(243, 254, 255) 0%, 17.5%, rgba(243, 254, 255, 0) 35%), radial-gradient(circle at 0% 80.9994%, rgb(245, 249, 255) 0%, 42%, rgba(245, 249, 255, 0) 70%), radial-gradient(circle at 92.6611% 13.5026%, rgb(243, 254, 255) 0%, 42%, rgba(243, 254, 255, 0) 70%), radial-gradient(circle at 48.9014% 49.5215%, rgb(145, 200, 255) 0%, 100%, rgba(145, 200, 255, 0) 100%)',
        height: '80vh',
        width: '25vw',
        boxShadow: 'drop-shadow(4px 0px 23px rgba(0, 0, 0, 0.25))',
        borderRadius: '10px',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    return (
        <InnerLayoutContext.Provider value={preference}>

            <div style={SideMenuParentSpace as React.CSSProperties}>
                {preference.collapsed 
                    ? true:
                    <div style={expandedArea as React.CSSProperties}>
                        <div style={{width:'23vw',height: '77vh',alignSelf:'center',background:'#fff', borderRadius:'10px'}}>
                            <Button variant='info' onClick={_ => setPreference({collapsed: !preference.collapsed})}>Menu</Button>
                        </div>
                    </div>
                }
                <Button variant='info' onClick={_ => setPreference({collapsed: !preference.collapsed})}>Menu</Button>
            </div>

        </InnerLayoutContext.Provider>
    )
}

export default InnerLayout;