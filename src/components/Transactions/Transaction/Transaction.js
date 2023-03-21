import React, { useState, useEffect } from "react";
import classes from './Transaction.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from 'ethers';
import { timeConvert } from "../../../utils/timeconvert";

const Transaction = () => {

    const { tId } = useParams();


    const navigate = useNavigate();
    const [blockData, setblockData] = useState({});
    const [loading, setLoading] = useState(true);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: tId
        })
    };

    const fetchData = () => {
        fetch('https://testnetbackv2.musascan.io/trantime', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setblockData(data.message[0]);
            // if(data.status && data.tran !== null && data.block !== null) {
            //     setblockData(data);
                setLoading(false);
            // }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className={classes.transactionDataWrapper}>
        <div className={classes.txnDataMainPWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
                <div className={classes.transactionMainDataContainer}>
                    <div className={classes.transactionDetailContainer}>
                        <span className={classes.transactionDetailText}>
                            Transaction Details
                        </span>
                    </div>
                    <div className={classes.txnDetailsContainer}>
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Transaction Hash
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.hash}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Status
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {
                                        blockData.status ?
                                        'Success'
                                        : 'Pending'
                                    }
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Block
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {blockData.blockNumber}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    To
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText} onClick={() => navigate(`/address/${blockData.to}`)}>
                                    {blockData.to}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    From
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText} onClick={() => navigate(`/address/${blockData.from}`)}>
                                    {blockData.from}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Gas Price
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {ethers.utils.formatEther(blockData.gasPrice)}
                                    {/* {Number(blockData.block.gasPrice.hex)} */}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Transaction Fees
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {ethers.utils.formatEther(blockData.gasUsed)}
                                    {/* {Number(blockData.tran.gasUsed.hex)} */}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Timestamp
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {(Number(blockData.timestamp))}
                                    {/* {Number(blockData.block.value.hex)} */}
                                </span>
                            </div>
                        </div>
                        <div className={classes.border} />
                        <div className={classes.txnDataContainer}>
                            <div className={classes.txnDetailKeyContainer}>
                                <span className={classes.txnDetailKeyText}>
                                    Value
                                </span>
                            </div>
                            <div className={classes.txnDetailValueContainer}>
                                <span className={classes.txnDetailValueText}>
                                    {ethers.utils.formatEther(blockData.value)}
                                    {/* {Number(blockData.block.value.hex)} */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
        </div>
    )
};

export default Transaction;