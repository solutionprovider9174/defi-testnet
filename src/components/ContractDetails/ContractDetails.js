import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './ContractDetails.module.css';
import { ethers } from "ethers";
import { FaCheckSquare } from 'react-icons/fa';
import Contracts from "./Contracts/Contracts";
import { FaBackward, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ContractDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [blockData, setblockData] = useState({});
    const [loading, setLoading] = useState(true);
    const [contractName, setContractName] = useState('');
    const [code, setCode] = useState('');
    const [params, setParams] = useState('');
    const [activePanel, setActivePanel] = useState('txn');
    const [isContractVerified, setIsContractVerified] = useState(false);
    const [count, setCount] = useState(1);
    const [tranData, setTranData] = useState([]);
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
                contractad: id
            })
        };

        fetch('https://testnetbackv2.musascan.io/addToken', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            setblockData(data);
            setIsContractVerified(data.verify);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const fetchTranData = () => {
        setLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "address": id,
                "m": 1,
                "n": 25
            })
        };

        fetch('https://testnetbackv2.musascan.io/fetchaddress', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(JSON.stringify(data.message) === '{}') {

            } else {
                setTranData(data.message);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchData();
        fetchTranData();
    }, []);

    const handleVerification = (e) => {
        e.preventDefault();
        setIsContractVerified(false);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                contract: contractName,
                param1: params,
                deployedc: id
            })
        };
        fetch('https://testnetbackv2.musascan.io/byt', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.status || data.message === "verified") {
                setCode('');
                setParams('');
                setContractName('');
                setIsContractVerified(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    let ele;
    if(contractName !== '' && code !== '' && params !== '') {
        ele =                     <div className={classes.contractDetailsInputContainer}>
        <div className={classes.contractDetailsInputText2}>
            <span className={classes.contractDetailsVerifyText} onClick={(e) => handleVerification(e)}>Verify</span>
        </div>
    </div>
    } else {
        ele = <div className={classes.contractDetailsInputContainer}>
        <div className={classes.contractDetailsInputText}>
            <span className={classes.contractDetailsVerifyText1}>Verify</span>
        </div>
    </div>
    }

    return(
        <div className={classes.cblockDataWrapper}>
        <div className={classes.contractDMainWrapper}>
            {
                loading ?
                <div className={classes.loadingText}>
                    Loading...
                </div>
                :
            <div className={classes.blockDataMainContainer}>
                <div className={classes.blockNoContainer}>
                    <span className={classes.blockNoText}>
                        Contract Details
                    </span>
                </div>
                <div className={classes.blockDetailsContainer}>
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Contract Address
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {id}
                            </span>
                        </div>
                    </div>              
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Token Name
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.tokenname}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Decimal
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.decimal}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Token Supply
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.totalsupply}
                            </span>
                        </div>
                    </div>                
                    <div className={classes.border} />
                    <div className={classes.blockDataContainer}>
                        <div className={classes.blockDetailKeyContainer}>
                            <span className={classes.blockDetailKeyText}>
                                Symbol
                            </span>
                        </div>
                        <div className={classes.blockDetailValueContainer}>
                            <span className={classes.blockDetailValueText}>
                                {blockData.tokenSymbol}
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={classes.contractMenuOptionsContainer}>
                    <span className={activePanel  === 'txn' ? classes.contractMenuOptions : classes.contractMenuOptions1} onClick={() => setActivePanel('txn')}>
                        Transactions
                    </span>
                    <span className={activePanel  === 'contract' ? classes.contractMenuOptions : classes.contractMenuOptions1} onClick={() => setActivePanel('contract')}>
                        Contract
                    </span>
                </div>
                {
                    activePanel === 'contract' ?
                    <div className={classes.contractDetailsMainVerifyForm}>
                        {
                            isContractVerified ?
                                <>
                                <div>
                                    <span className={classes.contractVeriText}>
                                        Contract is verified. <FaCheckSquare />
                                    </span>
                                </div>
                                <Contracts address={id} />
                                </>
                            :
                            <>
                            <div className={classes.contractDetailsVerifyTextContainer}>
                            <span className={classes.contractDetailsVerifyText}>
                                Verify Contract
                            </span>
                                </div>
                                <div className={classes.contractDetailsInputContainer}>
                                    <div className={classes.contractDetailsInputText}>
                                        Contract Name
                                    </div>
                                    <div>
                                            <input 
                                                type="text" 
                                                value={contractName} 
                                                onChange={(e) => setContractName(e.target.value)} 
                                                placeholder="Add Contract Name"
                                                className={classes.contractDetailsInputClass}
                                            />
                                    </div>
                                </div>
                                <div className={classes.contractDetailsInputContainer}>
                                    <div className={classes.contractDetailsInputText}>
                                        Contract Code
                                    </div>
                                    <div>
                                        <span>
                                            <textarea 
                                                value={code} 
                                                rows="4"
                                                placeholder="Add contract code"
                                                onChange={(e) => setCode(e.target.value)} 
                                                className={classes.contractDetailsInputClass}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className={classes.contractDetailsInputContainer}>
                                    <div className={classes.contractDetailsInputText}>
                                        Contract Parameters
                                    </div>
                                    <div>
                                        <span>
                                            <input 
                                                type="text" 
                                                value={params} 
                                                placeholder="Send params as 'a', 'b' "
                                                onChange={(e) => setParams(e.target.value)} 
                                                className={classes.contractDetailsInputClass}
                                            />
                                        </span>
                                    </div>
                                </div>
                                {
                                    ele
                                }
                            </>
                        }
                        
                    </div>
                    : 
                    null
                }
                {
                    activePanel === 'txn'
                    ?
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
                    :
                    null
                }

            </div>
            }
        </div>
        </div>
        

    )
};

export default ContractDetails;