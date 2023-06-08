import SocialBar from '../components/SocialBar/SocialBar';
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
          <SocialBar />
        </div>
        <div className="img-header-contain">
          <img src={imgHeader} className="img-header" alt="gustavo-hesse-foto" />
        </div>
      </header>
    </div>
  );
}

export default Header