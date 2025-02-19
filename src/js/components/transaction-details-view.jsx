import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {Button, Col, Row} from 'react-bootstrap';
import {clearTransactionDetails, updateTransactionDetails} from '../redux/actions/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import config from '../../config';
import moment from 'moment';


class TransactionDetailsView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.transaction) {
            this.props.updateTransactionDetails(decodeURIComponent(this.props.match.params.transaction_id), config.GENESIS_SHARD_ID);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let transactionID = decodeURIComponent(nextProps.match.params.transaction_id);
        if (this.props.transaction && transactionID !== this.props.transaction.transaction_id) {
            this.props.clearTransactionDetails();
            this.props.updateTransactionDetails(transactionID, config.GENESIS_SHARD_ID);
        }
    }

    render() {
        let {transaction} = this.props;
        return (
            <div>
                <Row className="mb-3 mt-3">
                    <Col className="pl-0" style={{
                        display       : 'flex',
                        justifyContent: 'flex-start',
                        marginLeft    : 10
                    }}>
                        <Button variant="light"
                                className={'btn btn-w-md btn-accent'}
                                onClick={this.props.history.goBack}>
                            <FontAwesomeIcon icon="arrow-circle-left"
                                             size="2x"/>
                            <span style={{
                                position   : 'relative',
                                top        : -5,
                                marginRight: 10,
                                marginLeft : 10
                            }}> Back</span>
                        </Button>
                    </Col>
                </Row>
                <div className={'panel panel-filled'}>
                    <div className={'panel-heading'}>transaction details</div>
                    <hr className={'hrPanel'}/>
                    <div className={'panel-body'}>
                        <Row className="mb-3"
                             style={{color: 'lightcyan'}}>
                            <h5>transaction:</h5>
                        </Row>
                        <Row className="mb-3">
                            <span>transaction id: {decodeURIComponent(this.props.match.params.transaction_id)}</span>
                        </Row>
                        {transaction && transaction.transaction_id && (
                            <>
                                <Row className="mb-3"
                                     style={{color: 'lightcyan'}}>
                                    <h5>parent transactions:</h5>
                                </Row>

                                {transaction.transaction_parent_list && transaction.transaction_parent_list.map((parent, idx) => {
                                    let parentTransactionID = parent.transaction_id_child === transaction.transaction_id ?
                                                              parent.transaction_id_parent : parent.transaction_id_child;
                                    return <Row className="mb-3"
                                                key={'transaction_parent_' + idx}>
                                        {parentTransactionID !== config.GENESIS_TRANSACTION_ID ? (
                                            <Link
                                                to={'/transaction/' + encodeURIComponent(parentTransactionID)}>
                                                {parentTransactionID}
                                            </Link>
                                        ) : (
                                             <span>{parentTransactionID} (genesis)</span>
                                         )}
                                    </Row>;
                                })}
                                <Row className="mb-3"
                                     style={{color: 'lightcyan'}}>
                                    <h5>inputs</h5>
                                </Row>
                                {transaction.transaction_input_list && transaction.transaction_input_list.map((input, idx) =>
                                    <>
                                        <Row className="mb-3">
                                            {input.output_transaction_id !== config.GENESIS_TRANSACTION_ID ? (
                                                <span>Transaction: <Link
                                                    to={'/transaction/' + encodeURIComponent(input.output_transaction_id)}>
                                            {input.output_transaction_id}
                                        </Link></span>
                                            ) : (
                                                 <span>{input.output_transaction_id} (genesis)</span>
                                             )}
                                        </Row>
                                        <Row className="mb-3">
                                            <span>output index: {input.output_position}</span>
                                        </Row>
                                        <Row className="mb-3">
                                            <span>input index: {input.input_position}</span>
                                        </Row>
                                        <Row className="mb-3">
                                            <span>address: {input.address}</span>
                                        </Row>
                                    </>
                                )}
                                <Row className="mb-3"
                                     style={{color: 'lightcyan'}}>
                                    <h5>outputs</h5>
                                </Row>
                                {transaction.transaction_output_list && transaction.transaction_output_list.map((output, idx) =>
                                    <>
                                        <Row className="mb-3">
                                            <span>output index: {output.output_position}</span>
                                        </Row>
                                        <Row className="mb-3">
                                            <span>address: {output.address}</span>
                                        </Row>
                                        <Row className="mb-3">
                                            <span>amount: {output.amount.toLocaleString('en-US')}</span>
                                        </Row>
                                    </>
                                )}
                                <Row className="mb-3">
                                    <span>date: {moment.utc(typeof (transaction.transaction_date) === 'number' ? transaction.transaction_date * 1000 : transaction.transaction_date).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </Row>
                                <Row className="mb-3">
                                    <span>node id: {transaction.node_id_origin}</span>
                                </Row>
                                {transaction.node_id_proxy &&
                                 (<Row className="mb-3">
                                     <span>proxy id: {transaction.node_id_proxy}</span>
                                 </Row>)
                                }
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        transaction: state.transactionDetails
    }),
    {
        clearTransactionDetails,
        updateTransactionDetails
    })(withRouter(TransactionDetailsView));
