import '../styles/description-box.scss'

const DescriptionBox = ({ title, description }) => {
    return (
        <div className="DescriptionBox">
            <div className="description-contain">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};


export default DescriptionBox