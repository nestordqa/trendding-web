import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useGlobalData } from '../../ThemeContext';
import logo from '../../assets/images/logo-navbar-dark.png';
import logoutLogo from '../../assets/images/logout-logo.png';
import sun from '../../assets/images/sun-logo.png';
import moon from '../../assets/images/moon-logo.png';
import '../../styles/layout.css';
import { linksArray, linksSettings } from '../../utils/common/linksArray';
import { Navlinks } from './Navlinks';
import { avatarUrl, cleanDataLocalStorage, getLocalStorageData } from '../../utils/common/common';

export const Layout = () => {
    const globalData = useGlobalData();
    const [selectedItem, setSelectedItem] = useState<number | null>(0);
    const [toggleLogo, setToggleLogo] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [username, setUsername] = useState('');
    const [on, setOnState] = useState<boolean>(false);
    const toggle = () => {
        setOnState(o => !o);
        globalData.toggleTheme();
        if (globalData.theme === 'dark') {
            setToggleLogo(sun);
            setStyle('light');
        } else {
            setToggleLogo(moon);
            setStyle('dark');
        }
    };
    const [selectedItemSettings, setSelectedItemSettings] = useState(null);
    const [style, setStyle] = useState('');
    const navigate = useNavigate();

    const logout = (): void => {
        cleanDataLocalStorage();
        navigate('/admin');
    };

    const handleItemClick = (index: any) => {
        setSelectedItem(index);
        setSelectedItemSettings(null);
    };

    const handleItemSettingsClick = (index: any) => {
        setSelectedItemSettings(index);
        setSelectedItem(null);
    };

    useEffect(() => {
        const data = getLocalStorageData();
        if (globalData.jwt === '' && !data) {
            navigate('/admin');
        }
        if (data) {
            globalData.setToken(data.jwt);
            globalData.setUsuario(data.user);
            if (data.theme !== globalData.theme) {
                globalData.toggleTheme();
            }
        }
        if (globalData !== undefined) {
            setStyle(globalData.theme);
            if (style === 'dark') {
                setToggleLogo(sun);
            } else {
                setToggleLogo(moon);
            }
            if (globalData.user && Object.entries((globalData.user)).length) {
                const user: any = Object.entries((globalData.user));
                const name = user[1][1];
                const lastname = user[2][1];
                setPhotoUrl(avatarUrl(`${name}+${lastname}`));
                setUsername(user[3][1]);
            }
        }
    // eslint-disable-next-line
    }, []);

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

    const settingsLinks = linksSettings.map((item, idx) => (
        <div
            key={idx}
            className='list-item'
            onClick={() => handleItemSettingsClick(idx)}
            style={{
                background: selectedItemSettings === idx ? 'linear-gradient(270deg, rgba(201,71,255,1) 0%, rgba(128,49,252,1) 95%)' : 'transparent',
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
                <div className="settings-container">
                    <p>Soporte</p>
                    <div className='links-list'>
                        {settingsLinks}
                    </div>
                </div>
                <div className="toggle-container">
                    <button 
                        className={on ? 'on' : 'off'} 
                        onClick={toggle}
                    >
                        <span className="pin">
                            <img 
                                src={toggleLogo} 
                                alt="Toggle" 
                            />
                        </span>
                    </button>
                </div>
                <div className="user-panel">
                    <img 
                        className='avatar'
                        src={photoUrl} 
                        alt="User avatar" 
                    />
                    <p>
                        {username}
                    </p>
                    <img 
                        onClick={logout}
                        src={logoutLogo} 
                        alt="Logout logo"
                        className='logout' 
                    />
                </div>
            </div>
        </div>
        <div className={`outlet-container-${style}`}>
            <Outlet />
        </div>
    </div>
  )
}
