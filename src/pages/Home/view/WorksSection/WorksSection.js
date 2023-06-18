import React, { useState } from 'react';
import "./styles/work-section.scss";
import JobOneDesign from "./assets/images/design/Job1.jpg";
import JobTwoDesign from "./assets/images/design/Job2.jpg";
import JobThreeDesign from "./assets/images/design/Job3.jpg";
import JobFourDesign from "./assets/images/design/Job4.jpg";
import RevealUpWorksSequential from './components/RevealUpWorksSequential';
import RevealUpAnimation from 'components/RevealUpAnimation';

function WorksSection() {
    const [selectedCategory, setSelectedCategory] = useState('design');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="work-section">
            <div className="layout-contain">
                <h4 className="revealUp">PROJETOS</h4>
                <h1 className="revealUp">Meus Projetos</h1>

                <div className="works-contain">
                    <ul className="works-categories">
                        <button className={`work-category revealUpWorks ${selectedCategory === 'design' ? 'active' : ''}`} onClick={() => handleCategoryClick('design')}>Design</button>
                        <button   className={`work-category revealUpWorks ${selectedCategory === 'motion' ? 'active' : ''}`} onClick={() => handleCategoryClick('motion')}>Motion</button>
                        <button   className={`work-category revealUpWorks ${selectedCategory === 'web' ? 'active' : ''}`} onClick={() => handleCategoryClick('web')}>Web</button>
                    </ul>

                    <div className="works-images">
                        <div className={`design-work-images ${selectedCategory === 'design' ? 'active' : ''}`} id="design">
                            <img src={JobOneDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobTwoDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobThreeDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobFourDesign} alt="" className="work-image revealUpWorks" />
                        </div>
                        <div className={`motion-work-images ${selectedCategory === 'motion' ? 'active' : ''}`} id="motion">
                            <img src={JobFourDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobTwoDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobThreeDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobOneDesign} alt="" className="work-image revealUpWorks" />
                        </div>
                        <div className={`web-work-images ${selectedCategory === 'web' ? 'active' : ''}`} id="web">
                            <img src={JobOneDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobTwoDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobThreeDesign} alt="" className="work-image revealUpWorks" />
                            <img src={JobFourDesign} alt="" className="work-image revealUpWorks" />
                        </div>
                    </div>
                    <RevealUpAnimation />
                    <RevealUpWorksSequential />
                </div>
            </div>
        </div>
    );
}

export default WorksSection;
