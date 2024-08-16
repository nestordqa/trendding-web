import React from 'react'
import { Link } from 'react-router-dom'
import { NavlinksProps } from '../../utils/types/commonTypes';
import '../../styles/navlinks.css';

export const Navlinks = ({url, image, name, secondImage}: NavlinksProps) => {
  return (
    // <div className='navlink-container'>
    <Link
        style={{
            textDecoration: 'none'
        }}
        to={`${url}`}
    >
        <div className='navlink-container'>
            <div className="image-container">
                <img 
                    src={image as string}
                    alt={`${url} logo`}
                />
            </div>
            <p>{name}</p>
            <div className="image-container">
                {
                    secondImage &&
                    <img 
                        src={secondImage}
                        alt={`Plus logo`}
                    />
                }
            </div>
        </div>
    </Link>
    // </div>
  )
}
