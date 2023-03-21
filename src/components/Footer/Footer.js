import React from "react";
import classes from './Footer.module.css';
import Logo from '../../assets/images/Logo.svg';
import { FaTelegram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Metamask from '../../assets/images/Metamask.png';
import { ToastContainer, toast } from 'react-toastify';

const Footer = () => {

    const navigate = useNavigate();

    const networks = {
        musa: {
            chainId: `0x${Number(100).toString(16)}`,
            chainName: "MUSA Testnet",
            nativeCurrency: {
                name: "MUSA",
                symbol: "MUSA",
                decimals: 18
            },
            rpcUrls: ["https://testnet-rpc-musachain.io/"],
            blockExplorerUrls: ["https://testnet.musascan.io/"]
        }
    };

    window.addEventListener("load",  function() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', function (accounts) {
                console.log('accountsChanges',accounts);
            });
            window.ethereum.on('chainChanged', function(networkId){
                console.log('chainChanged',networkId);
            });
        } else {
            console.log('No wallet!');
        }
    });

    const changeNetwork = async () => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                ...networks["musa"]
                }
            ],
            });
            const a= await window.ethereum.request({method:'eth_requestAccounts'})
            console.log(a);
        } catch (err) {
            toast('No crypto wallet found');
        }
    };

    return(
        <div className={classes.footerContainer}>
            <div className={classes.footerContainerWrapper}>
            <div>
                <div className={classes.footerMainTextContainer}>
                    <div className={classes.footerMainDataContainer}>
                        <div className={classes.footerMainDataHeadingContainer}>
                            <span className={classes.footerMainDataHeadingText}>
                                Explore
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                Api Documentation
                            </span> 
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText} onClick={() => navigate(`/tokens`)}>
                                Verify Contracts
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                Dex Transactions
                            </span>
                        </div>
                    </div>
                    <div className={classes.footerMainDataContainer}>
                        <div className={classes.footerMainDataHeadingContainer}>
                            <span className={classes.footerMainDataHeadingText}>
                                Communtiy
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://t.me/Pomeranian_portal" target="_blank" className={classes.footerAText}>
                                    Telegram
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://twitter.com/MusaChain" target="_blank" className={classes.footerAText}>
                                    Twitter
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                Medium
                            </span>
                        </div>
                    </div>
                    <div className={classes.footerMainDataContainer}>
                        <div className={classes.footerMainDataHeadingContainer}>
                            <span className={classes.footerMainDataHeadingText}>
                                About
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="http://musachain.com/" target="_blank" className={classes.footerAText}>
                                    Website
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                Docs
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://github.com/Musachain/" target="_blank" className={classes.footerAText}>
                                    Github
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                Email
                            </span>
                        </div>
                    </div>
                    <div className={classes.footerMainDataContainer}>
                        <div className={classes.footerMainDataHeadingContainer}>
                            <span className={classes.footerMainDataHeadingText}>
                                More
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://faucet.musachain.io/" target="_blank" className={classes.footerAText}>
                                    Testnet Faucet
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://testnet.musascan.io/" target="_blank" className={classes.footerAText}>
                                    Testnet Explorer
                                </a>
                            </span>
                        </div>
                        <div className={classes.footerMainDataValuesContainer}>
                            <span className={classes.footerMainDataValuesText}>
                                <a href="https://testnet.launchpad.musachain.io/" target="_blank" className={classes.footerAText}>
                                    Create a new Contract
                                </a>
                            </span>
                        </div>
                    </div>
                    {/* <div className={classes.footerMainExplorerContainer}>
                        <span className={classes.footerMainExplorerText}>
                            <img src={Logo} alt="Logo" className={classes.footerImg} />
                        </span>
                    </div>
                    <div className={classes.footerMainExplorerContainer}>
                        <span className={classes.footerMainAboutText}>
                            Testnet Explorer
                        </span>
                        <span className={classes.footerMainAboutText}>
                            Testnet Faucet
                        </span>
                        <span className={classes.footerMainAboutText}>
                            About Us
                        </span>
                        <span className={classes.footerMainAboutText}>
                            Contact Us
                        </span>
                    </div> */}
                </div>
                <div className={classes.footerMetamaskWrapper}>
                    <span className={classes.footerMetamaskContainer} onClick={changeNetwork}>
                        <span className={classes.footerMetamaskIconWrapper}>
                            <img src={Metamask} alt="Metamask Logo" className={classes.footerMetamaskIcon} />
                        </span>
                        Add MUSA Testnet Network
                    </span>
                </div>
            </div>
            <hr className={classes.whiteColor} />
            <div className={classes.footerNameLogoContainer}>
                <div className={classes.footerNameContainer}>
                    <span className={classes.footerMainExplorerText} onClick={() => navigate('/')}>
                        <img src={Logo} alt="Logo" className={classes.footerImg} />
                    </span>                
                </div>
                <div className={classes.footerLogoContainer}>
                    <span className={classes.footerSocialMediaContainer}>
                        <a href="https://t.me/Pomeranian_portal" target="_blank" className={classes.footerAText}>
                            <FaTelegram className={classes.logoFooter} />
                        </a>
                        {/* <img src={Linkedin} alt="Linkedin" className={classes.logoFooter} /> */}
                    </span>
                    <span className={classes.footerSocialMediaContainer}>
                        <a href="https://twitter.com/MusaChain" target="_blank" className={classes.footerAText}>
                            <FaTwitter className={classes.logoFooter} />
                        </a>
                        {/* <img src={Instagram} alt="Instagram" className={classes.logoFooter} /> */}
                    </span>
                </div>
            </div>
            </div>
            <div className={classes.footerCopyrightTextContainer}>
                <span>
                    Musa Blockchain Copyright © 2023 All rights reserved.{" "}
                </span>
            </div>
            <ToastContainer />
        </div>
    )
};

export default Footer;