import React from 'react';
import marquee from '../../../assets/images/marquee.png';
import '../../../styles/marquee.css';

export const Marquee = () => {
    return (
        <div className="marquee">
            <img 
                src={marquee} 
                alt="Success content" 
            />
        </div>
    )
}
