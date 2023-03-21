import React, { Fragment, useEffect, useState } from "react";
import classes from './Block.module.css';
import { useNavigate } from "react-router-dom";
import { timeConvert } from "../../../utils/timeconvert";
import { ethers } from 'ethers';

const Block = () => {

    const [blockData, setblockData] = useState([]);
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
    };

    const fetchData = () => {
        fetch('https://testnetbackv2.musascan.io/fetchblockrange', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            if(JSON.stringify(data.message) === '{}') {

            } else {
                setblockData(val);
            }
            setLoading(false);
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
                <div className={classes.blockContainer}>
                    <div className={classes.latestBlockContainer}>
                        <span className={classes.latestBlockText}>
                            Latest Blocks
                        </span>
                    </div>
                    <div className={classes.border} />
                    <div>
                        {
                            blockData.map((data, ind) => {
                                return(
                                    <Fragment key={ind}>
                                        <div className={classes.blockDataContainer}>
                                            <span className={classes.blockDataNoTimeContainer}>
                                                <span className={classes.blockDataNoText} onClick={() => navigate(`/blocks/${data.blockNumber}`)}>{data.blockNumber}</span>
                                                <span className={classes.blockDataTimeText}>{timeConvert(Number(data.timestamp))}</span>
                                            </span>
                                            <span className={classes.blockTxnDetailsContainer}>
                                                <span className={classes.blockTxnRecipientName}>
                                                    <span className={classes.blockTxnRecipientNameText}>
                                                        Fee Recipient 
                                                    </span>
                                                    <span  className={classes.blockTxnRecipientNameValue} onClick={() => navigate(`/address/${data.miner}`)}>
                                                        {" " + data.miner }
                                                        <span className={classes.tooltp}>{data.miner}</span>
                                                    </span>
                                                </span>

                                            </span>
                                            <span className={classes.blockTxnValueContainer}>
                                                <span className={classes.blockTxnValueContainerText}>
                                                {ethers.utils.formatEther(data.gasUsed)}
                                                </span>
                                            </span>
                                        </div>
                                        <div className={classes.border} />
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                    <div className={classes.blockViewContainer} onClick={() => navigate(`/blocks`)}>
                        <span className={classes.blockViewText}>
                            View All Blocks
                        </span>
                    </div>
                </div>
            }
        </>
        
    )
};

export default Block;