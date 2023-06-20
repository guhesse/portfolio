import TestimonialBox from "../TestimonialBox/view/TestimonialBox";
import '../styles/testimonials-boxes.scss'
import CharlieLogo from '../../../../ServicesSection/components/LogoCompanies/assets/charlie-logo.svg'
import TraceLogo from '../../../../ServicesSection/components/LogoCompanies/assets/trace-logo.svg'
import DinizLogo from '../../../../ServicesSection/components/LogoCompanies/assets/diniz-logo.svg'
import SultanLogo from '../../../../ServicesSection/components/LogoCompanies/assets/sultan-logo.svg'



function TestimonialBoxes() {

    const descriptionList = [
      { logo: TraceLogo, title: 'Certamente gostaria que ele fosse um colaborador dentro da minha empresa.', description: 'É um rapaz muito talentoso, competente, comprometido e responsável. Sempre cumpriu com as entregas de trabalhos que solicitamos, mesmo as vezes com prazos bem indigestos.', people:'Rafael Veloso - Co-founder' },
      { logo: CharlieLogo, title: 'Gustavo é um profissional focado e dedicado', description: 'Sempre muito atencioso, prestativo e sempre quer aprender mais. Tivemos um ótimo aprendizado e evolução juntos. Desejo que seu caminho seja de muito sucesso!', people:'Patricia Velez - Sr. Designer'},
      { logo: DinizLogo, title: 'Super criativo, motivado e com uma garra para buscar conhecimento invejável.', description: 'Profissional super focado. Tem objetivos profissionais definidos e com certeza um futuro      brilhante pela frente, foi um prazer trabalhar ao seu lado.', people:'Henrique Vale - Sr. Developer' },
      { logo: SultanLogo, title: 'Um profissional focado em sempre aprender mais, sua evolução foi significativa.', description: 'Tenho certeza que sempre será um profissional atualizado no mercado, e também em contribuir para com todos em sua volta. Agradecida pelo período de trabalho juntos.', people:'Kamilla Limas - Supervisora de Criação e Desenvolvimento' }
    ];

    return (
        <div className="TestimonialsBoxes">
            {descriptionList.map((item, index) => (
                <TestimonialBox key={index} logo={item.logo} title={item.title} description={item.description}  people={item.people}/>
            ))}
        </div>
    );
};

export default TestimonialBoxes