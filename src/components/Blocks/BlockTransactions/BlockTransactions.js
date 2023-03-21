import React,  { useState, useEffect } from "react";
import classes from './BlockTransactions.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from 'ethers';

const BlockTransactions = () => {

    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { blockNo } = useParams();

    const fetchData = () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: Number(blockNo),
            })
        };
        setLoading(true);
        fetch('https://testnetbackv2.musascan.io/specifictran', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(JSON.stringify(data.message) === '{}') {

            } else {
                setTranData(data.message.txx);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className={classes.blockDataWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
                    <div className={classes.allBlocksDetailsContainer}>
                        <div className={classes.blocksTextContainer}>
                            <span className={classes.blockTextValue}>
                                Transactions of Block { " " + blockNo}
                            </span>
                        </div>
                        <div className={classes.tableContainer}>
                            <div className={classes.tableHeadingContainer}>
                                <span className={classes.majorDataText}>
                                    Txn Hash
                                </span>
                                <span className={classes.minorDataText}>
                                    Block
                                </span>
                                {/* <span className={classes.minorDataText}>
                                    Age
                                </span> */}
                                <span className={classes.majorDataText}>
                                    From
                                </span>
                                <span className={classes.majorDataText}>
                                    To
                                </span>
                                <span className={classes.minorDataText}>
                                    Value
                                </span>
                                <span className={classes.minorDataText}>
                                    Fee
                                </span>
                            </div>
                            {
                                tranData.map((data, ind) => {
                                    return(
                                            <div key={ind} className={classes.textDetailsContainer}>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/tx/${data.hash}`)}>
                                                {data.hash}
                                            </span>
                                            <span className={classes.minorDataText} onClick={() => navigate(`/blocks/${data.blockNumber}`)}>
                                                {data.blockNumber}
                                            </span>
                                            {/* <span className={classes.minorDataText}>
                                                {data.age}
                                            </span> */}
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.from}`)}>
                                                {data.from}
                                            </span>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/address/${data.to}`)}>
                                                {data.to}
                                            </span>
                                            <span className={classes.minorDataText}>
                                            {ethers.utils.formatEther(data.value)}
                                            </span>
                                            <span className={classes.minorDataText}>
                                            {ethers.utils.formatEther(data.gasUsed)}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </div>
        
    )
};

export default BlockTransactions;