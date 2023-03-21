import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Transaction.module.css';
import { timeConvert } from "../../../utils/timeconvert";
import { ethers } from 'ethers';

const Transaction = () => {

    const sampleTransactionData = [
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '8 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '10 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '12 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '18 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
        {txnNo: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', txnTime: '28 secs ago', from: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990', to: '0x690b9a9e9aa1c9db991c7721a92d351db4fac991', value: '0.4MUSA'},
    ];
    
    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(false);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            n: 10,
            m: 1
        })
    }

    const fetchData = () => {
        fetch('https://testnetbackv2.musascan.io/fetchtranrange', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            if(JSON.stringify(data.message) === '{}') {

            } else {
                setTranData(val);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
        const callFunc = setInterval(fetchData, 10000);
        
        return () => clearInterval(callFunc);
    }, []);

    const navigate = useNavigate();

    return(
        <>
            {
                loading ?
                <div className={classes.loadingText}>
                Loading...
                </div>
                :
        <div className={classes.transactionContainer}>
            <div className={classes.latestTransactionContainer}>
                <span className={classes.latestTransactionText}>
                    Latest Transactions
                </span>
            </div>
            <div className={classes.border} />
            <div>
                {
                    tranData.map((data, ind) => {
                        return(
                            <Fragment key={ind}>
                                <div className={classes.transactionDataContainer}>
                                    <span className={classes.txnDataNoTimeContainer}>
                                        <span className={classes.txnDataNoText} onClick={() => navigate(`/tx/${data.hash}`)}>{data.hash}</span>
                                        {/* <span className={classes.txnkDataTimeText}>{timeConvert(Number(data.timestamp))}</span> */}
                                    </span>
                                    <span className={classes.txnTxnDetailsContainer}>
                                        <span className={classes.txnTxnRecipientName}>
                                            <span className={classes.txnTxnRecipientNameText}>
                                                From
                                            </span>
                                            <span className={classes.txnTxnRecipientNameValue} onClick={() => navigate(`/address/${data.from}`)}>
                                                {" " + data.from }
                                            </span>
                                        </span>
                                        <span>
                                            <span className={classes.txnTxnCountValue}>To</span>
                                            <span className={classes.txnTxnTimeValue} onClick={() => navigate(`/address/${data.to}`)}>{" " + data.to}</span>
                                        </span>
                                    </span>
                                    <span className={classes.txnValueTextContainer}>
                                    {ethers.utils.formatEther(data.value)}
                                    </span>
                                </div>
                                <div className={classes.border} />
                            </Fragment>
                        )
                    })
                }
            </div>
            <div className={classes.txnsViewContainer} onClick={() => navigate(`/transactions`)}>
                <span className={classes.txnsViewText}>
                    View All Transactions
                </span>
            </div>
        </div>
            }
        </>
    )
};

export default Transaction;