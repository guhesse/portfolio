import React from 'react';
import './styles/services-section.scss'
import LogoCompanies from './components/LogoCompanies/view/LogoCompanies';
import DescriptionBoxes from './components/ServicesDescription/view/DescriptionBoxes';
import RevealUpAnimation from 'components/RevealUpAnimation';


function ServicesSection() {

    return (
        <div className="ServicesSection" >
              <RevealUpAnimation/>
            <div className="ServicesSectionContain">
                <LogoCompanies />
                <div className="content-contain ">
                    <div className="l-side-contain">
                        <h4 className='revealUp'>Serviços</h4>
                        <h1 className='revealUp'>
                            Motion, Design,<br></br>
                            UX e Programação.<br></br>
                            Tudo junto.
                        </h1>

                        <div className="text-mention-contain revealUp">
                            <h3 className="text-mention">Qualificado e especializado <br></br> em criar produtos visuais <br></br> dinâmicos e inovadores.</h3>
                            <h3 className="text-mention">Unindo a tecnologia ao design <br></br>trazendo soluções criativas <br></br>e eficientes.</h3>
                        </div>

                    </div>
                    <div className="r-side-contain">
                        <DescriptionBoxes />
                    </div>
                </div>
            </div>

        </div>
    )

}



export default ServicesSection