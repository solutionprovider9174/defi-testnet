import React from "react";
import Block from "./Block/Block";
import classes from './BlockTransaction.module.css';
import Transaction from "./Transaction/Transaction";

const BlockTransaction = () => {
    return(
        <div className={classes.blockTransactionContainer}>
            <div className={classes.blockTxnMgn}>
                <Block />
            </div>
            <div className={classes.blockTxnMgn}>
                <Transaction />
            </div>
        </div>
    )
};

export default BlockTransaction;