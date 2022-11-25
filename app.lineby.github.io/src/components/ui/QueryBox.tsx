import React from "react";
import { Row, Col, Button, Modal, ModalTitle, ModalBody, Card} from 'react-bootstrap';

interface OptionModalProps {
    show: boolean;
    onHide: () => void;
}

function OptionModal({show, onHide}:OptionModalProps) {
    return <>
    <Modal size='lg' centered>
        <Modal.Header closeButton>
            <ModalTitle>Options</ModalTitle>
        </Modal.Header>
        <ModalBody>
            <p>Add video clip search options</p>
        </ModalBody>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
}

function CreateModal() {
    const [modalShow, setModalShow] = React.useState(false);
    
    return <>
        <Button onClick={() => setModalShow(true)}>Overlay</Button>
        <OptionModal show={modalShow} onHide={() => setModalShow(false)}/>
    </>          
}

class QueryBox extends React.Component {
    render () {
        const QueryBoxPos = {
            flex: '1', 
            height: '15vh', 
            background: 'rgba(0,0,0,0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }

        const QueryBoxLayout = {
            height: '12vh',
            width: '60vw',
            alignSelf: 'center',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0px 0px 23px 10px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
        }

        return <>
        <div style={QueryBoxPos as React.CSSProperties}>
            <div style={QueryBoxLayout as React.CSSProperties}>
                <Card>Hello</Card>
            </div>
        </div>
        </>
    }
}

export default QueryBox