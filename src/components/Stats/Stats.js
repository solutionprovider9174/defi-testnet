import React from "react";
import classes from './Stats.module.css';

const Stats = () => {
    return(
        <div className={classes.statsContainer}>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>PRICE</span>
                <span className={classes.statsSingleHeadingValue}>$1000</span>
                <span className={classes.statsSingleHeadingValueChange}>{'(-0.5%)'}</span>
            </div>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>TRANSACTIONS</span>
                <span className={classes.statsSingleHeadingValue}>1.2M</span>
                <span className={classes.statsSingleHeadingValueChange2}>{'(10TPS)'}</span>
            </div>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>MED GAS PRICE</span>
                <span className={classes.statsSingleHeadingValue}>12 Gwei</span>
                <span className={classes.statsSingleHeadingValueChange2}>{'($0.3)'}</span>
            </div>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>MARKET CAP</span>
                <span className={classes.statsSingleHeadingValue}>$120,000,124,000</span>
            </div>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>LAST FINALISED BLOCK</span>
                <span className={classes.statsSingleHeadingValue}>100440</span>
            </div>
            <div className={classes.statsSingleContainer}>
                <span className={classes.statsSingleHeading}>LAST SAFE BLOCK</span>
                <span className={classes.statsSingleHeadingValue}>45256</span>
            </div>
        </div>
    )
};

export default Stats;