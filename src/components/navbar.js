import $ from "jquery";

$('.nav-link').on('click', function() {
	$('.active-link').removeClass('active-link');
	$(this).addClass('active-link');
});

function Navbar() {
    return (
        <nav className="navbar-container">
            <ul>
                <li className="nav-link">
                    <a href="gustavo.com.br">Início
                    </a>
                    <div class="underline"></div>
                </li>

                <li className="nav-link">
                    <a href="gustavo.com.br">Trabalhos
                    </a>
                    <div class="underline"></div>
                </li>

                <li className="nav-link">
                    <a href="gustavo.com.br">Contato
                    </a>
                    <div class="underline"></div>
                </li >
            </ul >
        </nav >
    );

}

export default Navbar;
