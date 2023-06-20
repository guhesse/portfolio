import React, { useState } from 'react';
import "../styles/testimonials-section.scss";
import TestimonialBoxes from '../components/TestiomonialBoxes/view/TestimonialBoxes';


import RevealUpAnimationSequential from 'components/RevealUpAnimationSequential';
import RevealUpAnimation from 'components/RevealUpAnimation';


    function TestimonialsSection() {
        const [selectedCategory, setSelectedCategory] = useState('design');

        const handleCategoryClick = (category) => {
            setSelectedCategory(category);
        };

        return (
            <div className="testimonials-section">
                <div className="layout-contain">
                    <h4 className="revealUp">Depoimentos</h4>
                    <h1 className="revealUp">O que meus clientes dizem</h1>
                    <TestimonialBoxes />
                    <RevealUpAnimation />
                    <RevealUpAnimationSequential />
                </div>
            </div>
        );
    }

export default TestimonialsSection;
