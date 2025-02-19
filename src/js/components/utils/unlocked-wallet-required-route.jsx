import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import Sidebar from '../sidebar';
import {Col, Container} from 'react-bootstrap';
import '../../../../node_modules/mohithg-switchery/switchery.css';
import $ from 'jquery';
import API from '../../api';
import {setBackLogSize, setLogSize, updateNetworkState, walletUpdateBalance} from '../../redux/actions';

const UnlockedWalletRequiredRoute = ({
                                         component: Component,
                                         ...rest
                                     }) => {
    useEffect(() => {
        if (!rest.wallet.unlocked) {
            return;
        }
        let timeoutID;
        const getNodeStat = () => {
            timeoutID = setTimeout(() => API.getNodeStat()
                                            .then(data => {
                                                rest.walletUpdateBalance({
                                                    balance_stable                   : data.balance.stable,
                                                    balance_pending                  : data.balance.unstable,
                                                    transaction_wallet_unstable_count: data.transaction.transaction_wallet_unstable_count || 0,
                                                    transaction_count                : data.transaction.transaction_count || 0
                                                });
                                                rest.setBackLogSize(data.log.backlog_count);
                                                rest.setLogSize(data.log.log_count);
                                                rest.updateNetworkState({
                                                    ...data.network,
                                                    connections: data.network.peer_count
                                                });
                                                getNodeStat();
                                            })
                                            .catch(() => {
                                                getNodeStat();
                                            })
                , 1000);
        };
        getNodeStat();
        return () => clearTimeout(timeoutID);
    }, [rest.wallet.unlocked]);
    return (<Route {...rest} render={props => (
        rest.wallet.unlocked ? (
            <>
                <nav className={'navbar navbar-default navbar-fixed-top'}>
                    <div className={'container-fluid'}>
                        <div className={'navbar-header'}>
                            <div id="mobile-menu">
                                <div className={'left-nav-toggle'}>
                                    <a
                                        onClick={() => $('body').toggleClass('nav-toggle')}>
                                        <i className={'stroke-hamburgermenu'}/>
                                    </a>
                                </div>
                            </div>
                            <a className={'navbar-brand'}>
                                millix
                                <span>{rest.node.node_version && `v.${rest.node.node_version}`}</span>
                            </a>
                        </div>
                        <div id="navbar" className={'navbar-collapse collapse'}>
                            <div className={'left-nav-toggle'}>
                                <a
                                    onClick={() => $('body').toggleClass('nav-toggle')}>
                                    <i className={'stroke-hamburgermenu'}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <Sidebar {...rest} {...props}/>
                <section className={'content'}>
                    <Container fluid={true}>
                        <div>
                            <Col md="12">
                                <Component {...props} />
                            </Col>
                        </div>
                    </Container>
                </section>
            </>
        ) : (
            <Redirect to={{
                pathname: '/unlock/',
                state   : {from: props.location}
            }}/>
        )
    )}/>);
};

export default connect(
    state => ({
        clock : state.clock,
        wallet: state.wallet,
        node  : state.node
    }), {
        walletUpdateBalance,
        updateNetworkState,
        setBackLogSize,
        setLogSize
    })(UnlockedWalletRequiredRoute);
