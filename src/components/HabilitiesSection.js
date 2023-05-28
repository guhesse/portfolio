import React from 'react';
import RoundProgress43 from '../animations/rounded-progress-43'
import Lottie from 'lottie-react';

function HabilitiesSection() {
    return (
        <div className='HabilitiesSection'>
            <div className="habilities-section">
                <div className="software-container">
                    <h1 className="section-title">Softwares</h1>
                    <div className="rounded-progresses">
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    <Lottie className="progress-rounded" loop='false' animationData={RoundProgress43} />
                    </div>
                </div>
                <div className="hability-container">
                    <h1 className="section-title">Habilidades</h1>
                </div>
            </div>
        </div>
    );
}

export default HabilitiesSection;