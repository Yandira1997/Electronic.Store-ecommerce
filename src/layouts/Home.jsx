import Footer from "../components/Footer"
import Main from "../components/Main";
import Carrusel from "../components/Carrusel";

function Home() {
    return(
        <div className="home-contenido">
            <Carrusel />
            <Main/>
        </div>
    );
}

export default Home;