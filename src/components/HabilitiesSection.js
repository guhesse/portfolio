import React from 'react';
import RoundedProgress from './RoundedProgress';
import LinearProgress from './LinearProgress';
import LinearSpecialProgress from './LinearSpecialProgress';
import ProgressRoundedLess from '../animations/rounded-progress-43';
import ProgressRoundedHalf from '../animations/rounded-progress-71';
import ProgressRoundedFull from '../animations/rounded-progress-90';
import ProgressLinear0 from '../animations/linear-progress-0';
import ProgressLinear60 from '../animations/linear-progress-60';
import ProgressLinear75 from '../animations/linear-progress-75';
import ProgressLinear90 from '../animations/linear-progress-90';
import ProgressLinear100 from '../animations/linear-progress-100';



function HabilitiesSection() {
    return (
        <div className="habilities-section">
            <div className="software-container">

                <h1 className="section-title">Softwares</h1>
                <div className="rounded-progresses">
                    <RoundedProgress progress={ProgressRoundedFull} software={'Ae'} />
                    <RoundedProgress progress={ProgressRoundedFull} software={'Ps'} />
                    <RoundedProgress progress={ProgressRoundedHalf} software={'Ai'} />
                    <RoundedProgress progress={ProgressRoundedHalf} software={'Html'} />
                    <RoundedProgress progress={ProgressRoundedHalf} software={'Css'} />
                    <RoundedProgress progress={ProgressRoundedLess} software={'Js'} />
                    <RoundedProgress progress={ProgressRoundedLess} software={'Dw'} />
                    <RoundedProgress progress={ProgressRoundedLess} software={'In'} />
                    <RoundedProgress progress={ProgressRoundedLess} software={'React'} />
                </div>
            </div>

            <div className="hability-container">
                <h1 className="section-title">Habilidades</h1>
                <div className="linear-progresses">
                    <LinearProgress progress={ProgressLinear90} software={'Animação'} />
                    <LinearProgress progress={ProgressLinear75} software={'Programação'} />
                    <LinearProgress progress={ProgressLinear60} software={'Direção de arte'} />
                    <LinearProgress progress={ProgressLinear75} software={'Edição de áudio e vídeo'} />
                    <LinearSpecialProgress progress={ProgressLinear0} software={'Habilidade especial'} />
                </div>
            </div>

        </div>
    );
}

export default HabilitiesSection;