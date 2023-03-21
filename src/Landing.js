import React from "react";
import BlockTransaction from './components/BlockTransaction/BlockTransaction';
import Content from './components/Content/Content';
import classes from './LandingPage.module.css';

const LandingPage = () => {
    return(
        <div className={classes.landingWrapper}>
            <Content />
            {/* <Stats /> */}
            <BlockTransaction />
        </div>
    )
};

export default LandingPage;