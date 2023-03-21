import React, { useState, useEffect } from "react";
import classes from './ERC20.module.css';
import { useNavigate } from "react-router-dom";
import { FaBackward, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ERC20 = () => {

    const [tokenData, setTokenData] = useState([]);
    const [loading, setLoading] = useState(true);
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
        fetch('https://testnetbackv2.musascan.io/fetchtokenmn', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const val = data.message;
            setTokenData(val);
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
            <div className={classes.blockDMainWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
                <>
                    <div className={classes.allBlocksDetailsContainer}>
                        <div className={classes.blocksTextContainer}>
                            <span className={classes.blockTextValue}>
                                Tokens
                            </span>
                        </div>
                        <div className={classes.tableContainer}>
                            <div className={classes.tableHeadingContainer}>
                                <span className={classes.minorDataText}>
                                    Name
                                </span>
                                <span className={classes.minorDataText}>
                                    Total Supply
                                </span>
                                <span className={classes.majorDataText}>
                                    Address
                                </span>
                                <span className={classes.majorDataText}>
                                    Decimal
                                </span>
                                <span className={classes.minorDataText}>
                                    Symbol
                                </span>
                            </div>
                            {
                                tokenData.map((data, ind) => {
                                    return(
                                            <div key={ind} className={classes.textDetailsContainer}>
                                            <span className={classes.minorDataText}>
                                                {data.name}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {data.totalSupply}
                                            </span>
                                            <span className={classes.majorDataText} onClick={() => navigate(`/token/${data.contractAddress}`)}>
                                                {data.contractAddress}
                                            </span>
                                            <span className={classes.majorDataText}>
                                                {data.decimal}
                                            </span>
                                            <span className={classes.minorDataText}>
                                                {data.symbol}
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
                </>
            }
            </div>
        </div>
    )
};

export default ERC20;