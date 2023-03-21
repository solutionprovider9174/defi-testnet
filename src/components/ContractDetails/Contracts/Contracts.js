import React, { useState } from "react";
import classes from './Contracts.module.css';
import AceEditor from 'react-ace';
import { FaCopy, FaExpand, FaCompress } from 'react-icons/fa';
import { useEffect } from "react";


const Contracts = ({address}) => {
    const [isContractExpaned, setIsContractExpanded] = useState(false);
    const [isByteExpaned, setIsByteExpanded] = useState(false);
    const [isAbiExpaned, setIsAbiExpanded] = useState(false);

    const [code, setCode] = useState('');
    const [byte, setByte] = useState('');
    const [abi, setAbi] = useState('');

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: address
            })
        };

        fetch('https://testnetbackv2.musascan.io/fetchcontractData', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let val = data.message[0];
            setCode(val.code);
            setAbi(val.abi);
            setByte(val.bytecode);
        })
        .catch((err) => {
            console.log(err);
        })
    } , []);

    return (
        <div className={classes.contractDetailsMainWrapper}>
            <div className={classes.contractDetailsSingleItemWrapper}>
                <span>
                    Contract Code: 
                </span>
                <span className={classes.contractDetailsIconContainer}>
                    <span className={classes.contractDetailsCopyIcon}>
                        <FaCopy />
                    </span>
                    {
                        isContractExpaned ?
                        <span onClick={() =>setIsContractExpanded(false)}>
                            <FaCompress />
                        </span>
                        :
                        <span onClick={() =>setIsContractExpanded(true)}>
                            <FaExpand />
                        </span>
                    }
                </span>
            </div>
            <div>
                {
                    isContractExpaned ?
                    <span className={classes.contractDetailEditorContainer1}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={code}
                        />
                    </span>
                    :
                    <span className={classes.contractDetailEditorContainer}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={code}
                        />
                    </span>
                }
            </div>
            <div className={classes.contractDetailsSingleItemWrapper}>
                <span>
                    ABI: 
                </span>
                <span className={classes.contractDetailsIconContainer}>
                    <span className={classes.contractDetailsCopyIcon}>
                        <FaCopy />
                    </span>
                    {
                        isAbiExpaned ?
                        <span onClick={() =>setIsAbiExpanded(false)}>
                            <FaCompress />
                        </span>
                        :
                        <span onClick={() =>setIsAbiExpanded(true)}>
                            <FaExpand />
                        </span>
                    }
                </span>
            </div>
            <div>
                {
                    isAbiExpaned ?
                    <span className={classes.contractDetailEditorContainer1}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={abi}
                        />
                    </span>
                    :
                    <span className={classes.contractDetailEditorContainer}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={abi}
                        />
                    </span>
                }
            </div>
            <div className={classes.contractDetailsSingleItemWrapper}>
                <span>
                    Byte Code: 
                </span>
                <span className={classes.contractDetailsIconContainer}>
                    <span className={classes.contractDetailsCopyIcon}>
                        <FaCopy />
                    </span>
                    {
                        isByteExpaned ?
                        <span onClick={() =>setIsByteExpanded(false)}>
                            <FaCompress />
                        </span>
                        :
                        <span onClick={() =>setIsByteExpanded(true)}>
                            <FaExpand />
                        </span>
                    }
                </span>
            </div>
            <div>
                {
                    isByteExpaned ?
                    <span className={classes.contractDetailEditorContainer1}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={byte}
                        />
                    </span>
                    :
                    <span className={classes.contractDetailEditorContainer}>
                        <AceEditor 
                            width="100%"
                            readOnly={true}
                            value={byte}
                        />
                    </span>
                }
            </div>
        </div>
    )
};

export default Contracts;