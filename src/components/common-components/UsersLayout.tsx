import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import logo from '../../assets/images/Logo-trendding.png';
import gradient from '../../assets/images/login-background-gradient.png';
import '../../styles/users-layout.css';

export const UsersLayout = () => {
    return (
        <div className='users-container'>
            <div className='navbar-users'>
                <div className="logo-trendding-users">
                    <Link to={'/'}>
                        <img src={logo} alt="Trendding" />
                    </Link>
                </div>
                <div className="links-container-users">
                    <Link className='link-navbar' to={'#'}>Inicio</Link>
                    <Link className='link-navbar' to={'#'}>Membresía</Link>
                    <Link className='link-navbar' to={'#'}>Recursos</Link>
                    <Link className='link-navbar' to={'#'}>Ayuda</Link>
                </div>
                <div className="buttons-navbar-container">
                    <button className="login-button">Iniciar sesión</button>
                    <button className="start-button">Comenzar</button>
                    <BsCart2  style={{
                        fontSize: '25px',
                        fontWeight: '200',
                        color: '#FAFAFA',
                        cursor: 'pointer'
                    }}/>
                </div>
            </div>
            <div className='login-background-gradient'>
                <img 
                    src={gradient} 
                    alt="Trendding Gradient" 
                />
            </div>
            <div className='login-background-gradient2'>
                <img 
                    src={gradient} 
                    alt="Trendding Gradient" 
                />
            </div>
            <div className={`outlet-container-users`}>
                <Outlet />
            </div>
        </div>
    )
}
