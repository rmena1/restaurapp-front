import "../styles/Navbar.css"

const Navbar = () => {
    return (
        <nav className="bg-sky-800 border-grey-200 px-2 sm:px-4 py-2.5">
            <div className="container flex flex-wrap justify-between items-center ">
                <a href="/">
                    <span className="text-xl font-semibold whitespace-nowrap text-white">RestaurAPP</span>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;

// Inspirado en
// https://blog.logrocket.com/create-responsive-navbar-react-css/