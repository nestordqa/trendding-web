import React from 'react';
import '../../../styles/homepage.css';
import { HomePageHeader } from './HomePageHeader';
import { Marquee } from './Marquee';
import { TrustCompanies } from './TrustCompanies';
import { LearnTrading } from './LearnTrading';
import { Unlock } from './Unlock';
import { Memberships } from './Memberships';
import { Goodbye } from './Goodbye';
import { Footer } from './Footer';
import { Testimonios } from './Testimonios';
import { Decides } from './Decides';

export const HomePage = () => {
  return (
    <div className='homepage-header-container'>
        <HomePageHeader />
        <Marquee />
        <TrustCompanies />
        <LearnTrading />
        <Unlock />
        <Memberships />
        <Goodbye />
        <Testimonios />
        <Decides />
        <Footer />
    </div>
  )
}
