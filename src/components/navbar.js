import $ from "jquery";

$('.nav-link').on('click', function() {
	$('.active-link').removeClass('active-link');
	$(this).addClass('active-link');
});

function Navbar() {
    return (
        <nav className="navbar-container">
            <ul>
                <li className="nav-link ">
                    <a href="#home">Início
                    </a>
                    <div class="underline"></div>
                </li>

                <li className="nav-link active-link">
                    <a href="#work">Trabalhos
                    </a>
                    <div class="underline"></div>
                </li>

                <li className="nav-link">
                    <a href="#">Contato
                    </a>
                    <div class="underline"></div>
                </li >
            </ul >
        </nav >
    );

}

export default Navbar;
