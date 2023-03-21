import React, { Fragment, useState, useEffect } from "react";
import classes from './Transactions.module.css';
import { timeConvert } from "../../utils/timeconvert";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const txnsDetails = [
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
        {txnHash: '0x2877a85e7758efff97cad5b9d97bbf90c207c06517d2fdeb35dfbfab4a5b82f6', blockNo: 144425, age: '14 secs ago', from: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', to: '0xffd22b84fb1d46ef74ed6530b2635be61340f347', value: '30MUSA', txnFee: '1MUSA'},
    ];

    const [tranData, setTranData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [count, setCount] = useState(1);

    const handlePrev = () => {
        if(count > 1) {
            setCount(count => count -1 );
        }
    }

    const handleNext = () => {
        setCount(count => count + 1);
    }

    const fetchData = () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                n: (25 * count),
                m: ((25* (count - 1)) + 1)
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

    return(
        <div className={classes.transactionsWrapper}>
        <div className={classes.allTxnsDetailsContainer}>
            <div className={classes.txnTextContainer}>
                <span className={classes.txnTextValue}>
                    Transactions
                </span>
            </div>
            {
                loading ?
                <div className={classes.loadingText}>
                Loading...
                </div>
                :
            <table className={classes.tableContainer}>
                <tr className={classes.tableHeadingContainer}>
                    <th className={classes.majorDataText}>
                        Txn Hash
                    </th>
                    <th className={classes.minorDataText}>
                        Block
                    </th>
                    <th className={classes.minorDataText}>
                        Age
                    </th>
                    <th className={classes.majorDataText}>
                        From
                    </th>
                    <th className={classes.majorDataText}>
                        To
                    </th>
                    <th className={classes.minorDataText}>
                        Value
                    </th>
                    <th className={classes.minorDataText}>
                        Txn Fee
                    </th>
                </tr>
                {
                    tranData.map((data, ind) => {
                        return(
                            <Fragment key={ind}>
                                <tr className={classes.textDetailsContainer}>
                                <td className={classes.majorDataText}>
                                    {data.txnHash}
                                </td>
                                <td className={classes.minorDataText}>
                                    {data.blockNo}
                                </td>
                                <td className={classes.minorDataText}>
                                    {data.age}
                                </td>
                                <td className={classes.majorDataText}>
                                    {data.from}
                                </td>
                                <td className={classes.majorDataText}>
                                    {data.to}
                                </td>
                                <td className={classes.minorDataText}>
                                    {data.value}
                                </td>
                                <td className={classes.minorDataText}>
                                    {data.txnFee}
                                </td>
                            </tr>
                            </Fragment>
                        )
                    })
                }
            </table>
            }   
        </div>
        </div>
        
    )
};

export default Transactions;