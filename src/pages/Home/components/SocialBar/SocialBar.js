
import React from 'react';

import './styles/SocialBar.scss'

import LinkedinIcon from './assets/linkedin-icon.svg'
import GithubIcon from './assets/github-icon.svg'
import BehanceIcon from './assets/behance-icon.svg'

function SocialBar() {


    return (
        <div className='SocialBar'>
            <a href='https://www.linkedin.com/in/guhesse/' target='_blank' rel='noreferrer' ><img src={LinkedinIcon} id='LinkedinLogo' alt="Linkedin Logo" /></a>
            <a href='https://github.com/guhesse' target='_blank' rel='noreferrer'><img src={GithubIcon} id='GithubLogo' alt="Github Logo" /></a>
            <a href='https://www.behance.net/gushesse' target='_blank' rel='noreferrer'><img src={BehanceIcon} id='BehanceLogo' alt="Behance Logo" /></a>
        </div>
    )
}



export default SocialBar