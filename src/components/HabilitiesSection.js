import React from 'react';
import RoundedProgress from './RoundedProgress';
import ProgressLess from '../animations/rounded-progress-43'
import ProgressHalf from '../animations/rounded-progress-71'
import ProgressFull from '../animations/rounded-progress-90'


function HabilitiesSection() {
    return (
        <div className="habilities-section">
            <div className="software-container">
                <h1 className="section-title">Softwares</h1>
                <div className="rounded-progresses">
                    <RoundedProgress progress={ProgressFull} software={'Ae'} />
                    <RoundedProgress progress={ProgressFull} software={'Ps'} />
                    <RoundedProgress progress={ProgressHalf} software={'Ai'} />
                    <RoundedProgress progress={ProgressHalf} software={'Html'} />
                    <RoundedProgress progress={ProgressHalf} software={'Css'} />
                    <RoundedProgress progress={ProgressLess} software={'Js'} />
                    <RoundedProgress progress={ProgressLess} software={'Dw'} />
                    <RoundedProgress progress={ProgressLess} software={'In'} />
                    <RoundedProgress progress={ProgressLess} software={'React'} />
                </div>
            </div>
            <div className="hability-container">
                <h1 className="section-title">Habilidades</h1>
            </div>
        </div>
    );
}

export default HabilitiesSection;