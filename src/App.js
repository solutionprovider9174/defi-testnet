import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landing';
import Block from './components/Blocks/Block/Block';
import Blocks from './components/Blocks/Blocks';
import Transactions from './components/Transactions/Transactions1';
import Transaction from './components/Transactions/Transaction/Transaction';
import Address from './components/Address/Address';
// import BlockTransactions from './components/Blocks/BlockTransactions/BlockTransactions';
import './App.css';
import Footer from './components/Footer/Footer';
import ContractDetails from './components/ContractDetails/ContractDetails';
import ERC20 from './components/Tokens/ERC20/ERC20';
import { isMobile } from 'react-device-detect';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/blocks' exact element={<Blocks />} />
        {/* <Route path='/blocks/address/:blockNo' exact element={<BlockTransactions />} /> */}
        <Route path='/blocks/:id' exact element={<Block />} />
        <Route path='/transactions' exact element={<Transactions />} />
        <Route path='/tx/:tId' element={<Transaction />} />
        <Route path='/address/:addressId' element={<Address />} />
        <Route path='/tokens' exact element={<ERC20 />} />
        <Route path='/token/:id' element={<ContractDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
