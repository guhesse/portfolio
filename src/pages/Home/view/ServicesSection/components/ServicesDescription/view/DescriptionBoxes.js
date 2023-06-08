import DescriptionBox from "../components/DescriptionBox/view/DescriptionBox"
import '../styles/description-boxes.scss'

function DescriptionBoxes() {

    const descriptionList = [
        { title: 'Motion & Design', description: `Combinando movimento e design, apaixonado por contar histórias através de animações impactantes e designs inovadores. A tipografia, as cores e o layout são meus maiores aliados ao criar designs únicos.` },
        { title: 'UI & UX', description: `Do layout ao código, minha abordagem de UI/UX integra design e experiência do usuário para criar produtos digitais impactantes e altamente funcionais.` },
        { title: 'Programação', description: `Criação de landing pages e banners esteticamente agradáveis e altamente funcionais, aplicando meu conhecimento em HTML, CSS, JavaScript e animações para cativar o público.` }
    ];

    return (
        <div className="DescriptionBoxes">
            {descriptionList.map((item, index) => (
                <DescriptionBox key={index} title={item.title} description={item.description} />
            ))}
        </div>
    );
};

export default DescriptionBoxes