import '../styles/description-box.scss'
import RevealUpAnimationSequential from 'components/RevealUpAnimationSequential';

const DescriptionBox = ({ title, description }) => {
    return (
        <div className="DescriptionBox revealUpSequential">
            <RevealUpAnimationSequential />
            <div className="description-contain">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};


export default DescriptionBox