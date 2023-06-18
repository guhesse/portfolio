import React from 'react';
import './styles/habilities-section.scss'
import RoundedProgress from './components/RoundedProgress';
import LinearProgress from './components/LinearProgress';
import LinearSpecialProgress from './components/LinearSpecialProgress';
import ProgressRoundedLess from './animations/rounded-progress-43';
import ProgressRoundedHalf from './animations/rounded-progress-71';
import ProgressRoundedFull from './animations/rounded-progress-90';
import ProgressLinear60 from './animations/linear-progress-60';
import ProgressLinear75 from './animations/linear-progress-75';
import ProgressLinear90 from './animations/linear-progress-90';
import RevealUpAnimation from 'components/RevealUpAnimation';




function HabilitiesSection() {
    return (
        <div className="habilities-section">
            <div className="layout-contain">
                <div className="software-container">
                    <RevealUpAnimation />
                    <h4 className='revealUp'>Softwares</h4>
                    <h1 className="section-title revealUp">Mago dos Softwares</h1>
                    <div className="rounded-progresses">
                        <RoundedProgress progress={ProgressRoundedFull} software={'Ae'} />
                        <RoundedProgress progress={ProgressRoundedFull} software={'Ps'} />
                        <RoundedProgress progress={ProgressRoundedHalf} software={'Ai'} />
                        <RoundedProgress progress={ProgressRoundedFull} software={'Pr'} />
                        <RoundedProgress progress={ProgressRoundedHalf} software={'Html'} />
                        <RoundedProgress progress={ProgressRoundedHalf} software={'Css'} />
                        <RoundedProgress progress={ProgressRoundedLess} software={'Js'} />
                        <RoundedProgress progress={ProgressRoundedLess} software={'Dw'} />
                        <RoundedProgress progress={ProgressRoundedLess} software={'In'} />
                        <RoundedProgress progress={ProgressRoundedLess} software={'React'} />
                    </div>
                </div>

                <div className="hability-container">
                    <h4 className='revealUp'>Hard Skills</h4>
                    <h1 className="section-title revealUp">Habilidades de destaque </h1>
                    <div className="linear-progresses">
                        <LinearProgress progress={ProgressLinear90} software={'Animação'} />
                        <LinearProgress progress={ProgressLinear60} software={'Programação'} />
                        <LinearProgress progress={ProgressLinear60} software={'Direção de arte'} />
                        <LinearProgress progress={ProgressLinear75} software={'Edição de áudio e vídeo'} />
                        <LinearProgress progress={ProgressLinear75} software={'Design de interfaces'} />
                        <LinearSpecialProgress />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HabilitiesSection;