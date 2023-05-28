import React from 'react';
import Lottie from 'lottie-react';

const RoundedProgress = (props) => {
    const progress = props.progress;
    const software = props.software;

    return (
        <div className="progress-rounded-contain">
            <Lottie className="rounded-progress-animation" loop='false' animationData={progress} />
            <p className="software-text">{software}</p>    
        </div>
    );
}

export default RoundedProgress