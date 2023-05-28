import imgHeader from '../images/img-header.png';

function Header() {
    return (
      <div className="Header">
        <header className="app-header">
          <div className="text-header-contain">
            <p className="hl-text">Gustavo Hesse</p>
            <p className="sh-text">Motion Designer | Digital Producer</p>
            <div className="divider-hl"></div>
            <p className="text-header"> Sempre unindo a tecnologia ao design. <br></br>
              Sou especialista na criação de layouts online e off-line,
              estáticos ou animados, bem como em storytelling, tipografia
              e linguagens de programação como <strong>HTML, CSS e JavaScript.</strong></p>
          </div>
          <div className="img-header-contain">
            <img src={imgHeader} className="img-header" alt="gustavo-hesse-foto" />
          </div>
        </header>
      </div>
    );
  }

  export default Header