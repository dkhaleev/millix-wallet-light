import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import WalletView from './wallet-view';
import ImportWalletView from './import-wallet-view';
import UnlockWalletView from './unlock-wallet-view';
import UnlockedWalletRequiredRoute from './utils/unlocked-wallet-required-route';
import TransactionHistoryView from './transaction-history-view';
import UnspentTransactionOutputView from './unspent-transaction-output-view';
import TransactionDetails from './transaction-details-view';
import PeerListView from './peer-list-view';
import PeerInfoView from './peer-info-view';
import CreateAdView from './create-ad-view';
import ListAdView from './list-ad-view';
/*
 import EventLogView from './event-log-view';
 */
import ConfigView from './config-view';
import ActionView from './action-view';
import NewWalletView from './new-wallet-view';
import ManageWalletView from './manage-wallet-view';
import StatsView from './stats-view';


class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*let scroll = $('body').getNiceScroll();
         if (scroll.length === 0) {
         scroll = $('body').niceScroll();
         }
         else {
         scroll.resize();
         }
         setInterval(() => scroll.resize(), 500);*/
    }

    render() {
        return <Provider store={this.props.store}>
            <Router>
                <Switch>
                    <Route path="/unlock/" component={UnlockWalletView}/>
                    <Route path="/manage-wallet/" component={ManageWalletView}/>
                    <Route path="/new-wallet/" component={NewWalletView}/>
                    <Route path="/import-wallet/" component={ImportWalletView}/>
                    <UnlockedWalletRequiredRoute path="/create-ad/"
                                                 component={CreateAdView}/>
                    <UnlockedWalletRequiredRoute path="/list-ad/"
                                                 component={ListAdView}/>
                    <UnlockedWalletRequiredRoute path="/peers"
                                                 component={PeerListView}/>
                    <UnlockedWalletRequiredRoute path="/peer/:peer"
                                                 component={PeerInfoView}/>
                    <UnlockedWalletRequiredRoute path="/config"
                                                 component={ConfigView}/>

                    {/*<UnlockedWalletRequiredRoute path='/log'*/}
                    {/*                             component={EventLogView}/>*/}

                    <UnlockedWalletRequiredRoute path="/actions"
                                                 component={ActionView}/>
                    <UnlockedWalletRequiredRoute path="/status"
                                                 component={StatsView}/>
                    <UnlockedWalletRequiredRoute
                        path="/transaction/:transaction_id"
                        component={TransactionDetails}/>
                    <UnlockedWalletRequiredRoute path="/history"
                                                 component={TransactionHistoryView}/>
                    <UnlockedWalletRequiredRoute path="/utxo/:state"
                                                 component={UnspentTransactionOutputView}/>
                    <UnlockedWalletRequiredRoute component={WalletView}/>
                </Switch>
            </Router>
        </Provider>;
    }
}


AppContainer.propTypes = {
    store: PropTypes.object.isRequired
};

export default AppContainer;
