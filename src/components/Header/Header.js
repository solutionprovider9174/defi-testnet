import React, { useState } from "react";
import classes from './Header.module.css';
import Logo from '../../assets/images/Logo.svg'
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FaBars} from 'react-icons/fa';

const Header = () => {

    const navOptions = [
        {title: 'Home', url: '/home'},
        {title: 'Blockchain', url: '/blockchain'}
    ];

    const navigate = useNavigate();
    const [isNav, setIsNav] = useState(false);

    return(
        <div className={classes.headerAllWrapper}>
          {
            isNav ?
          <>
          <div className={classes.headerContainer}>
            <span className={classes.headerText} onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo" className={classes.headerImg} />
            </span>
            <span className={classes.headerHamContainer} onClick={() => setIsNav(isNav => !isNav)}>
              <FaBars />
            </span>
          </div>
          <div className={classes.headerNavDetailsContainer}>
            <div className={classes.headerNavText} onClick={() => navigate('/')}>
              Home
            </div>
            <div className={classes.headerNavText} onClick={() => navigate('/blocks')}>
              View All Blocks
            </div>
            <div className={classes.headerNavText} onClick={() => navigate('/transactions')}>
              View All Transactions
            </div>
            <div className={classes.headerNavText} onClick={() => navigate('/tokens')}>
              View All Tokens
            </div>
            <div className={classes.headerNavText}>
              <a href="https://testnet.musascan.io/" className={classes.headerDropDwnAText2} target="_blank">
                Testnet Explorer
              </a>
            </div>
            <div className={classes.headerNavText}>
              <a href="https://faucet.musachain.io/" className={classes.headerDropDwnAText2} target="_blank">
                Testnet Faucet
              </a>
            </div>
            <div className={classes.headerNavText}>
              <a href="https://testnet.launchpad.musachain.io/" className={classes.headerDropDwnAText2} target="_blank">
                Testnet Launchpad
              </a>
            </div>
          </div>
          </>
          :
          <div className={classes.headerContainer}>
            <span className={classes.headerText} onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo" className={classes.headerImg} />
            </span>
            <span className={classes.headerHamContainer} onClick={() => setIsNav(isNav => !isNav)}>
              <FaBars />
            </span>
            <span className={classes.headerNavOptionsContainer}>
            <span className={classes.headerNavOption} onClick={() => navigate('/')}>
              Home
            </span>
            <NavDropdown title="Blockchain" className={classes.headerNavOption}>
              <NavDropdown.Item onClick={() => navigate('/blocks')}>
                View Blocks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/transactions')}>
                View Transactions
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/tokens')}>
                View Tokens
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Resources" className={classes.headerNavOption}>
              <div className={classes.headerDropDwnAContainer}>
                <a href="https://testnet.musascan.io/" className={classes.headerDropDwnAText} target="_blank">Testnet Explorer</a>
              </div>
              <div className={classes.headerDropDwnAContainer}>
                <a href="https://faucet.musachain.io/" className={classes.headerDropDwnAText} target="_blank">Testnet Faucet</a>
              </div>
              <div className={classes.headerDropDwnAContainer}>
                <a href="https://testnet.launchpad.musachain.io/" className={classes.headerDropDwnAText} target="_blank">Testnet Launchpad</a>
              </div>
            </NavDropdown>
            </span>
          </div>
          }
        </div>
        
    )
};

export default Header;