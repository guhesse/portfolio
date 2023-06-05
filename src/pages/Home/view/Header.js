import imgHeader from '../images/img-header.png';
import HeaderAnimation from './HeaderAnimation';


function Header() {
  return (
    <div className="Header">
      <HeaderAnimation/>  
      <header className="app-header"> 
        <div className="text-header-contain">
          <p className="hl-text">Motion Designer<br></br><span>&</span> Digital Producer<span>.</span></p>
          <p className="sh-text">Sou o Gustavo Hesse.</p>
          <p className="text-header">
            Bucando um especialista em composição de projetos visuais?<br></br> Você está no lugar certo.
          </p>
          <div className="text-mention-contain">
            <h3 className="text-mention">Qualificado e especializado <br></br>em criar produtos visuais dinâmicos<br></br> e inovadores.</h3>
            <h3 className="text-mention">Unindo a tecnologia ao design trazendo soluções criativas<br></br> e eficientes. </h3>
          </div>
        </div>
        <div className="img-header-contain">
          <img src={imgHeader} className="img-header" alt="gustavo-hesse-foto" />
        </div>
      </header>
    </div>
  );
}

export default Header