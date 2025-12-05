import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home | CursosTech</title>
      <meta name="description" content="Bienvenido a CursosTech, tu plataforma para aprender tecnología con los mejores profesores." />

    </Helmet>
      <div className="bg-gradient-to-r from-gray-800 to-blue-900 pt-6 h-lvh ">
        <section className=" py-20 px-4 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-blue-400 max-w-4xl">
            Aprende tecnología con los mejores profesores
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
            El programa ofrece una formación integral a través de una
            metodología innovadora y práctica, con el objetivo de potenciar la
            oferta IT, trabajando para que los conocimientos y competencias
            adquiridos respondan a las demandas del sector productivo.
          </p>
          <Link
            to="/productos"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out mb-8 mt-10"
          >
            Explorar cursos
          </Link>
          <img
            src="https://talentotech.bue.edu.ar/assets/images/LOGO_LOGO_TT_AZUL.png"
            alt="Logo Talentotech"
            className="w-150 h-auto brightness-200 saturate-200 drop-shadow-lg pt-10"
          />
        </section>
      </div>
    </>
  );
};

export default Home;
