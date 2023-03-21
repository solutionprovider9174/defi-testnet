import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { timeConvert } from "../../utils/timeconvert";
import classes from './Address.module.css';
import { ethers } from 'ethers';

const Address = () => {

    const { addressId } = useParams();

    const [status, setStatus] = useState('all');
    const [addressData, setAddressData] = useState();
    const [loading, setLoading] = useState(true);
    const [addressHoldings, setAddressHoldings] = useState();
    const [ercTxn, setErcTxn] = useState([]);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const fetchData = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "address": addressId,
                "m": 1,
                "n": 25
            })
        };

        const newOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "addre": addressId,
            })
        };

        const newOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "addr": addressId,
                "m": 1,
                "n": 25
            })
        };
        
        fetch('https://testnetbackv2.musascan.io/holding', newOptions)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setAddressHoldings(data.message)
            fetch('https://testnetbackv2.musascan.io/fetchaddress', options)
            .then((response) => {
                return response.json();
            })
            .then((data1) => {
                setAddressData(data1.message);
                setData(data1.message);          
                fetch('https://testnetbackv2.musascan.io/fetcherc20tx', newOptions1)
                .then((response) => {
                    return response.json();
                })
                .then((data2) => {
                    setErcTxn(data2.message)
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
            })
            .catch((err) => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (type) => {
        if(type === 'all') {
            setStatus('all');
            setData(addressData);
        } else {
            setStatus('erc');
            setData(ercTxn);
        }
    };

    return(
        <div className={classes.addressDataWrapper}>
        <div className={classes.addParentWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
        <div className={classes.addMainDetailsContainer}>
            <div className={classes.addressNoContainer}>
                <span className={classes.addNoText}>
                    Address Details
                </span>
            </div>
            {/* <div className={classes.overviewAddContainer}>
                <span className={classes.overviewAddText}>
                    Overview of Address:
                </span>
            </div>
            
            <div className={classes.overviewDetailsContainer}>
                <span className={classes.overviewDetailKeyText}>
                    Transaction Count - 
                </span>
                <span>
                    {addressData}
                </span>
            </div> */}
            <div className={classes.blockDetailsContainer}>
                <div className={classes.blockDataContainer}>
                    <div className={classes.blockDetailKeyContainer}>
                        <span className={classes.blockDetailKeyText}>
                            Address
                        </span>
                    </div>
                    <div className={classes.blockDetailValueContainer}>
                        <span className={classes.blockDetailValueText}>
                            {addressId}
                        </span>
                    </div>
                </div>
                <div className={classes.border} />
                <div className={classes.blockDataContainer}>
                    <div className={classes.blockDetailKeyContainer}>
                        <span className={classes.blockDetailKeyText}>
                            Balance
                        </span>
                    </div>
                    <div className={classes.blockDetailValueContainer}>
                        <span className={classes.blockDetailValueText}>
                            {addressHoldings.bal}
                        </span>
                    </div>
                </div>              
                <div className={classes.border} />
                <div className={classes.blockDataContainer}>
                    <div className={classes.blockDetailKeyContainer}>
                        <span className={classes.blockDetailKeyText}>
                            Holdings
                        </span>
                    </div>
                    <div className={classes.blockDetailValueContainer}>
                        <span className={classes.blockDetailValueText}>
                            {addressHoldings.hold}
                        </span>
                    </div>
                </div>
            </div>
            <div className={classes.addressTxnsTextContainer}>
                {
                    status === 'all' ?
                    <span className={classes.addressTxnTextActive}>
                        Transactions
                    </span>
                    :
                    <span className={classes.addressTxnText} onClick={() => handleChange('all')}>
                        Transactions
                    </span>
                }
                {
                    status === 'erc' ?
                    <span className={classes.addressTxnTextActive}>
                        Erc20 Transfers
                    </span>
                    :
                    <span className={classes.addressTxnText} onClick={() => handleChange('erc')}>
                        Erc20 Transfers
                    </span>
                }
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
                    data.map((data, ind) => {
                        return(
                            <div key={ind} className={classes.textDetailsContainer}>
                                <span className={classes.majorDataText} onClick={() => navigate(`/tx/${data.hash}`)}>
                                    {data.hash}
                                </span>
                                <span className={classes.minorDataText} onClick={() => navigate(`/blocks/${data.blockNumber}`)}>
                                    {data.blockNumber}
                                </span>
                                {/* <span className={classes.minorDataText}>
                                    {timeConvert(Number(data.timestamp))}
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
        </div>
    )
};

export default Address;