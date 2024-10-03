import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import logo from '../../assets/images/Logo-trendding.png';
import gradient from '../../assets/images/login-background-gradient.png';
import '../../styles/users-layout.css';
import { simpleWarningAlert } from '../../utils/common/alerts';

export const UsersLayout = () => {
    const route = useLocation();
    const [containerStyle, setContainerStyle] = useState<string>('users-container');
    useEffect(() => {
        if (route.pathname !== '/') {
            console.log('pasando', route);
            setContainerStyle('users-container-nobg');
        } else {
            setContainerStyle('users-container');
        }
    }, [route])
    return (
        <div className={containerStyle}>
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
                    <button 
                        className="login-button"
                        onClick={() => simpleWarningAlert(
                            'Aguarda...', 
                            'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                            'dark'
                        )}
                    >
                        Iniciar sesión
                    </button>
                    <button 
                        className="start-button"
                        onClick={() => simpleWarningAlert(
                            'Aguarda...', 
                            'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                            'dark'
                        )}
                    >
                        Comenzar
                    </button>
                    <BsCart2  
                        style={{
                            fontSize: '25px',
                            fontWeight: '200',
                            color: '#FAFAFA',
                            cursor: 'pointer'
                        }}
                        onClick={() => simpleWarningAlert(
                            'Aguarda...', 
                            'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                            'dark'
                        )}
                    />
                </div>
            </div>
            <div className='homepage-background-gradient'>
                <img 
                    src={gradient} 
                    alt="Trendding Gradient" 
                />
            </div>
            <div className='homepage-background-gradient2'>
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
