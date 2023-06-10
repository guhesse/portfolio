import React from 'react';
import '../styles/logo-companies.scss'

import DinizLogo from '../assets/diniz-logo.svg'
import CharlieLogo from '../assets/charlie-logo.svg'
import DellLogo from '../assets/dell-logo.svg'
import VmlyrLogo from '../assets/vmlyr-logo.svg'
import TraceLogo from '../assets/trace-logo.svg'
import SultanLogo from '../assets/sultan-logo.svg'

import RevealUpAnimationSequential from 'components/RevealUpAnimationSequential';


function LogoCompanies() {

    return (
        <div className='logos-contain'>
            <div className='logos-layout'>
                <img src={DinizLogo} className='revealUpSequential' id='DinizLogo' alt="&#xd3;ticas Diniz Logo" />
                <img src={CharlieLogo} className='revealUpSequential' id='CharlieLogo' alt="Charlie Logo" />
                <img src={DellLogo} className='revealUpSequential' id='DellLogo' alt="Dell Logo" />
                <img src={VmlyrLogo} className='revealUpSequential' id='VmlyrLogo' alt="Vmlyr Logo" />
                <img src={TraceLogo} className='revealUpSequential' id='TraceLogo' alt="Trace Logo" />
                <img src={SultanLogo} className='revealUpSequential' id='SultanLogo' alt="Sultan Logo" />
                <RevealUpAnimationSequential />
            </div>
        </div>
    )

}



export default LogoCompanies