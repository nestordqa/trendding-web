import React from 'react';
import '../../../styles/homepage.css';
import { HomePageHeader } from './HomePageHeader';
import { Marquee } from './Marquee';
import { TrustCompanies } from './TrustCompanies';

export const HomePage = () => {
  return (
    <div className='homepage-header-container'>
        <HomePageHeader />
        <Marquee />
        <TrustCompanies />
    </div>
  )
}
