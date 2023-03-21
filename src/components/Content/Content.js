import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Content.module.css';
import { ethers } from "ethers";

const Content = () => {

    const [inputVal, setInputVal] = useState('');
    const inputPlaceHolder = "Search by Address/Txn Hash/Block";
    const provider = new ethers.providers.JsonRpcProvider("https://testnet-rpc-musachain.io/");

    const navigate = useNavigate();
    
    const handleSearch = async(e) => {
        e.preventDefault();
        console.log(inputVal);
        if(/^\d+$/.test(inputVal)){
            navigate(`/blocks/${inputVal}`);
        }
        if(inputVal.length == 66) {
            navigate(`/tx/${inputVal}`);
        }

        // const a = await provider.getCode(inputVal)!== '0x';
        // console.log(a);

        if(inputVal.length == 42) {
            try {
                if(await provider.getCode(inputVal)!== '0x') {
                    navigate(`/token/${inputVal}`);
                }
            } catch(err) {
                navigate(`/address/${inputVal}`);
            }
        }

        // if(await provider.getCode(inputVal)!== '0x') {
        //     navigate(`/token/${inputVal}`);
        // }
        // if(inputVal.length == 42) {
        //     navigate(`/address/${inputVal}`);
        // }
        setInputVal('');   
    }

    return(
        <div className={classes.contentContainer}>
            <div className={classes.contentHeadingContainer}>
                <span className={classes.contentHeadingText}>
                    The Musa Testnet Block Explorer
                </span>
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.inputFieldContainer}>
                    <input 
                        className={classes.inputField}
                        placeholder={inputPlaceHolder} 
                        type="text" 
                        value={inputVal} 
                        onChange={(e) => setInputVal(e.target.value)}
                     />
                </span>
                <span className={classes.inputSearchText} onClick={(e) => handleSearch(e)}>
                    Search
                </span>
            </div>
        </div>
    )
};

export default Content;