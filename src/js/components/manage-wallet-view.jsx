import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ManageWalletView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.wallet.unlocked) {
            return <Redirect to={{pathname: '/'}}/>;
        }

        return (
            <Container style={{
                marginTop: 50,
                paddingLeft: 25
            }}>
                <Row className="mb-3">
                    <Button variant="light"
                            className={'btn btn-w-md btn-accent'} style={{
                        float: 'left',
                        marginLeft: '80px'
                    }} onClick={() => {
                        this.props.history.replace('/unlock/');
                    }}>
                        <FontAwesomeIcon icon="fingerprint"
                                         size="1x"/> unlock
                    </Button>
                </Row>
                <div className="container-center lg">
                    <Row>
                        <Col sm={6} style={{textAlign: 'right'}}>
                            <Button variant="light"
                                    className={'btn btn-w-md btn-accent'}
                                    style={{
                                        width: '80%',
                                        paddingTop: '14.66%',
                                        paddingBottom: '20.66%'
                                    }} onClick={() => this.props.history.push('/new-wallet/')}>
                                <FontAwesomeIcon icon="wallet" size="8x"
                                                 style={{
                                                     margin: '0 auto',
                                                     display: 'block'
                                                 }}/> new wallet
                            </Button>
                        </Col>
                        <Col sm={6}>
                            <Button variant="light"
                                    className={'btn btn-w-md btn-accent'}
                                    style={{
                                        width: '80%',
                                        paddingTop: '24.3%',
                                        paddingBottom: '18.66%'
                                    }} onClick={() => this.props.history.push('/import-wallet/')}>
                                <FontAwesomeIcon icon="key" size="6x"
                                                 style={{
                                                     margin: '0 auto',
                                                     display: 'block'
                                                 }}/> import wallet
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}


export default connect(
    state => ({
        wallet: state.wallet
    })
)(ManageWalletView);
