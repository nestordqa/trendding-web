import React from 'react';
import TraddingView from '../../../assets/images/TradingView.png';
import MetaTrader from '../../../assets/images/MetaTrader.png';
import Discord from '../../../assets/images/Discord.png';
import Forex from '../../../assets/images/Forex.png';
import MyFxBook from '../../../assets/images/MyFxbook.png';
import '../../../styles/trustsCompanies.css';

export const TrustCompanies = () => {
  return (
    <div className='trust-container'>
        <div className="chip-container">
            <span>NUESTROS COLABORADORES</span>
        </div>
        <div className="companies-container">
            <img src={TraddingView} alt="Tradding View" className="" />
            <img src={MetaTrader} alt="MetaTrader" className="" />
            <img src={Discord} alt="Discord" className="" />
            <img src={Forex} alt="Forex Factory" className="" />
            <img src={MyFxBook} alt="MyFxbook" className="" />
        </div>
    </div>
  )
}
