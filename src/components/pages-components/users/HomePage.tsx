import React from 'react';
import '../../../styles/homepage.css';
import { HomePageHeader } from './HomePageHeader';
import { Marquee } from './Marquee';

export const HomePage = () => {
  return (
    <div className='homepage-header-container'>
        <HomePageHeader />
        <Marquee />
    </div>
  )
}
