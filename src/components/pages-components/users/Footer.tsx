import React from 'react';
import logo from '../../../assets/images/Logo-trendding.png';
import { BsFacebook, BsInstagram, BsTwitterX, BsLinkedin, BsYoutube } from "react-icons/bs";

import '../../../styles/footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const style = {
    width: '20px',
    height: '20px',
    color: '#2A282E'
  };
  return (
    <>
        <div className="footer-container">
            {/* <img src={background} alt="Background footer" /> */}
            <div className="footer-1">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="options">
                <div className="options-div">
                  <h1>Product</h1>
                  <Link className='link-footer' to={'#'}>Features</Link>
                  <Link className='link-footer' to={'#'}>Pricing</Link>
                  <Link className='link-footer' to={'#'}>For agencies</Link>
                  <Link className='link-footer' to={'#'}>For business owners</Link>
                  <Link className='link-footer' to={'#'}>Changelog</Link>
                  <Link className='link-footer' to={'#'}>Feedback</Link>
                </div>
                <div className="options-div">
                  <h1>Company</h1>
                  <Link className='link-footer' to={'#'}>About</Link>
                  <Link className='link-footer' to={'#'}>Blog</Link>
                  <Link className='link-footer' to={'#'}>Contact</Link>
                  <Link className='link-footer' to={'#'}>Careers</Link>
                  <Link className='link-footer' to={'#'}>Case studies</Link>
                  <Link className='link-footer' to={'#'}>For partners</Link>
                </div>
                <div className="options-div">
                  <h1>Learn</h1>
                  <Link className='link-footer' to={'#'}>Tutorials</Link>
                  <Link className='link-footer' to={'#'}>Resources</Link>
                  <Link className='link-footer' to={'#'}>Documents</Link>
                  <Link className='link-footer' to={'#'}>FAQs</Link>
                </div>
              </div>
              <div className="subscribe">
                <h1>Suscríbete a nuestro boletín</h1>
                <p>
                  Manténgase actualizado sobre lanzamientos y consejos
                  <br />
                  de trading uniéndose a nuestro boletín.
                </p>
                <div className='compose-button'>
                  <input type="email" placeholder='Tu correo'/>
                  <button>Suscríbete</button>
                </div>
              </div>
            </div>
            <div className="footer-2">
              <div className="privacy">
                <h3>
                  &#169; 2023 Trendding
                </h3>
                <Link className='link-privacy' to={'#'}>Privacy Policy</Link>
                <Link className='link-privacy' to={'#'}>Terms of Service</Link>
                <Link className='link-privacy' to={'#'}>Cookie Settings</Link>
              </div>
              <div className="rrss">
                <BsFacebook style={style}/>
                <BsInstagram style={style}></BsInstagram>
                <BsTwitterX style={style}></BsTwitterX>
                <BsLinkedin style={style}></BsLinkedin>
                <BsYoutube style={style}></BsYoutube>
              </div>
            </div>
            {/* <div className="footer-3"></div> */}
        </div>
    </>
  )
}
