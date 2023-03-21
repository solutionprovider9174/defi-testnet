import React,  { useState, useEffect } from "react";
import classes from './Transactions1.module.css';
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import { FaBackward, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Transactions = () => {

    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [records, setRecords] = useState(25);

    const handlePrev = () => {
        if(count > 1) {
            setCount(count => count -1 );
        }
    };

    const handleNext = () => {
        setCount(count => count + 1);
    };

    const handleFirst = () => {
        setCount(1);
    };

    const fetchData = () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: (records * count),
                m: ((records * (count - 1)) + 1)
            })
        };
        setLoading(true);
        fetch('https://testnetbackv2.musascan.io/fetchtranrange', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            setTranData(val);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, [count, records]);

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
                                Transactions
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
                        <div className={classes.blocksPaginationContainer}>
                            <span className={classes.blocksPaginationRecordsContainer}>
                                <span className={classes.blocksShowText}>Show</span>
                                <span className={classes.blocksRecordsWrapper}>
                                    <select value={records} className={classes.blocksSelectRecordsWrapper} onChange={(e) => setRecords(e.target.value)}>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </span>
                                <span className={classes.blocksShowText}>
                                    Records
                                </span>
                            </span>
                            <span className={classes.blocksPaginationWrapperIconValue}>
                                <span className={ (count > 1) ?  classes.blocksPrevContainer : classes.blocksPrevContainerLight} onClick={handleFirst}>
                                    <FaBackward />
                                </span>
                                <span className={ (count > 1) ?  classes.blocksPrevContainer : classes.blocksPrevContainerLight} onClick={handlePrev}>
                                    <FaChevronLeft />
                                </span>
                                <span className={classes.blocksPrevContainerValue}>
                                    {count}
                                </span>
                                <span className={classes.blocksPrevContainer} onClick={handleNext}>
                                    <FaChevronRight />
                                </span>
                            </span>
                        </div>
                    </div>
            }
        </div>
        
    )
};

export default Transactions;