/*!
* Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function generateMenuBar()
{
    var html = "<div class='container'>\
    <a class='navbar-brand' href='./index.html#page-top'>Darryn Campbell</a>\
    <button class='navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded' type='button'\
        data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent'\
        aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>\
        <b>Menu</b>\
        <i class='fas fa-bars'></i>\
    </button>\
    <div class='collapse navbar-collapse' id='navbarSupportedContent'>\
        <ul class='navbar-nav ms-auto'>\
            <li class='nav-item dropdown mx-0 mx-lg-1'>\
                <a class='nav-link py-3 px-0 px-lg-3 rounded dropdown-toggle' href='#' id='navbarDropdownAbout'\
                    role='button' data-bs-toggle='dropdown' aria-expanded='false'>\
                    About\
                </a>\
                <ul class='dropdown-menu' aria-labelledby='navbarDropdownAbout'>\
                    <li><a class='dropdown-item' href='index.html#about'>Bio</a></li>\
                    <li><a class='dropdown-item' href='index.html#contact'>Contact</a></li>\
                </ul>\
            </li>\
            <li class='nav-item dropdown'>\
                <a class='nav-link py-3 px-0 px-lg-3 rounded dropdown-toggle' href='#' id='navbarDropdownBlogs'\
                    role='button' data-bs-toggle='dropdown' aria-expanded='false'>\
                    Technical Content\
                </a>\
                <div class='dropdown-menu' aria-labelledby='navbarDropdownBlogs'>\
                    <a class='dropdown-item' href='technical-writing.html'>Technical Writing / Blogs</a>\
                    <a class='dropdown-item' href='demos.html'>Demos & Samples</a>\
                </div>\
            </li>\
            <li class='nav-item dropdown'>\
                <a class='nav-link py-3 px-0 px-lg-3 rounded dropdown-toggle' href='#'\
                    id='navbarDropdownSpeaking' role='button' data-bs-toggle='dropdown' aria-expanded='false'>\
                    Speaking\
                </a>\
                <div class='dropdown-menu' aria-labelledby='navbarDropdownSpeaking'>\
                    <a class='dropdown-item' href='speaking.html'>Upcoming</a>\
                    <a class='dropdown-item' href='speaking.html#past'>Past</a>\
                </div>\
            </li>\
            <li class='nav-item dropdown'>\
                <a class='nav-link py-3 px-0 px-lg-3 rounded dropdown-toggle' href='#'\
                    id='navbarDropdownPersonal' role='button' data-bs-toggle='dropdown' aria-expanded='false'>\
                    Personal\
                </a>\
                <div class='dropdown-menu' aria-labelledby='navbarDropdownPersonal'>\
                    <a class='dropdown-item' href='athletics.html'>Athletics Times</a>\
                    <!--a class='dropdown-item' href='web_design.html'>Web Design</a-->\
                </div>\
            </li>\
        </ul>\
    </div>\
</div>";

    document.getElementById('mainNav').innerHTML = html;
}

function generateFooter()
{
    var html = "<div class='container'>\
    <div class='row'>\
    <!-- Footer About Text-->\
    <div class='col-lg-3 mb-5'>\
        <h4 class='text-uppercase mb-4'>Darryn Campbell</h4>\
        <p class='lead mb-0'>\
        Enterprise Mobile development <br> Software Architecture <br> Speaking\
        </p>\
    </div>\
    <!-- Footer Social Icons-->\
    <div class='col-lg-6 mb-5 mb-lg-0'>\
        <h4 class='text-uppercase mb-4'>Social / Contact</h4>\
        <a class='btn btn-light btn-social mx-1'\
        href='mailto:darryncampbell@hotmail.com'><i\
            class='fa fa-fw fa-envelope'></i></a>\
        <a class='btn btn-light btn-social mx-1'\
        href='https://twitter.com/darryncampbell' target='_blank'><i\
            class='fab fa-fw fa-twitter'></i></a>\
        <a class='btn btn-light btn-social mx-1'\
        href='https://www.linkedin.com/in/darryn-campbell-1b0127ab/' target='_blank'><i\
            class='fab fa-fw fa-linkedin'></i></a>\
        <a class='btn btn-light btn-social mx-1'\
        href='https://github.com/darryncampbell' target='_blank'><i\
            class='fab fa-fw fa-github'></i></a>\
        <a class='btn btn-light btn-social mx-1'\
        href='https://stackoverflow.com/users/4564002/darryn-campbell' target='_blank'><i\
            class='fab fa-fw fa-stack-overflow'></i></a>\
    </div>\
    <!-- Footer Location-->\
    <div class='col-lg-3 mb-5 mb-lg-0'>\
        <h4 class='text-uppercase mb-1'>Location</h4>\
        <p class='lead mb-0'>\
        Hampshire<br />\
        United Kingdom\
        </p>\
    </div>\
  </div>"

document.getElementById('page-footer').innerHTML = html;

}
