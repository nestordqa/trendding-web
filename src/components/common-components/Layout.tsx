import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useGlobalData } from '../../ThemeContext';
import logo from '../../assets/images/logo-navbar-dark.png';
import '../../styles/layout.css';
import { linksArray } from '../../utils/common/linksArray';
import { Navlinks } from './Navlinks';

export const Layout = () => {
    const globalData = useGlobalData();
    const [selectedItem, setSelectedItem] = useState(0);
    const [style, setStyle] = useState('');
    const navigate = useNavigate();

    const handleItemClick = (index: number) => {
        setSelectedItem(index); // Update the selected item index
    };

    useEffect(() => {
        if (globalData.jwt === '') {
            navigate('/admin');
        }
        if (globalData !== undefined) {
            setStyle(globalData.theme);
        }
    // eslint-disable-next-line
    }, [globalData]);

    const navlinks = linksArray.map((item, idx) => (
        <div
            key={idx}
            className='list-item'
            onClick={() => handleItemClick(idx)}
            style={{
                background: selectedItem === idx ? 'linear-gradient(270deg, rgba(201,71,255,1) 0%, rgba(128,49,252,1) 95%)' : 'transparent',
                cursor: 'pointer',
                borderRadius: '6px'
            }}
        >
            <Navlinks 
                url={item.url}
                image={item.image}
                name={item.name}
                secondImage={item.secondImage}
            />
        </div>
    ));

  return (
    <div className={`layout-container-${style}`}>
        <div className={`nav-container-${style}`}>
            <div className="links-container">
                <img 
                    src={logo}
                    alt='Trendding logo' 
                />
                <div className='nav-links'>
                    <p>General</p>
                    <div className='links-list'>
                        {navlinks}
                    </div>
                </div>
                <div className="settings-container">Holiiiiiiiis</div>
            </div>
        </div>
        <div className={`outlet-container-${style}`}>
            <Outlet />
        </div>
    </div>
  )
}
