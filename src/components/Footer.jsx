import React from "react";
// Importa el componente Link de tu librería de enrutamiento (ej: react-router-dom)
import { Link } from "react-router-dom"; 
import { Github, Linkedin, Mail } from "lucide-react"; 
// Eliminé Facebook y Instagram de las importaciones ya que no se usaban en el body

const Footer = () => {
  // Datos de ejemplo para las secciones
  const links = [
    { title: "Cursos", href: "/productos" },
    { title: "Sobre Nosotros", href: "/" },
    { title: "Carrito", href: "/cart" },
    { title: "FAQ", href: "/" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-blue-700 shadow-xl">
      <div className="container mx-auto px-6 py-12">
        {/* Sección Principal (Dividida en 3 columnas en escritorio) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700/50 pb-8 mb-8">
          
          {/* 1. Información de Marca y Descripción */}
          <div className="md:col-span-1">
            {/* El título principal también puede ser un Link a la página de inicio */}
            <Link to="/" className="inline-block">
                <h3 className="text-2xl font-extrabold text-blue-400 mb-3 tracking-wider hover:text-blue-300 transition duration-200">
                  CURSOSTECH 
                </h3>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plataforma líder para el aprendizaje y desarrollo de habilidades
              tecnológicas de vanguardia. Impulsando tu carrera con el mejor talento.
            </p>
          </div>

          {/* 2. Enlaces de Navegación Rápida */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-500/50 inline-block">
              Explorar
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.title}>
                  {/* Etiqueta <a> reemplazada por el componente Link */}
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contacto y Redes Sociales */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-500/50 inline-block">
              Conéctate
            </h4>
            
            {/* Contacto */}
            <div className="flex items-center space-x-2 mb-4">
                <Mail size={18} className="text-blue-400" />
                <span className="text-sm text-gray-400">damianlopez@talentotech.com</span>
            </div>

            {/* Redes Sociales */}
            <div className="flex space-x-4">
              {/* Estos siguen siendo <a> ya que enlazan a sitios externos */}
              <a 
                href="https://www.linkedin.com/in/damian-lopez-dev/" 
                className="text-gray-400 hover:text-blue-500 transition duration-200"
                target="_blank" // Opcional: abrir también en nueva pestaña
                rel="noopener noreferrer"
              >
                <Linkedin size={22} />
              </a>
              
              {/* GitHub: Se utiliza <a>, se agrega target="_blank" para nueva pestaña */}
              <a 
                href="https://github.com/DammiLopez" 
                className="text-gray-400 hover:text-blue-500 transition duration-200"
                target="_blank" // <-- ¡Abre en nueva pestaña!
                rel="noopener noreferrer" // <-- Buena práctica de seguridad
              >
                <Github size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Copyright y Desarrollador (Parte Inferior) */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center mt-4">
          
          <p className="text-xs text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} CursosTech. Todos los derechos reservados.
          </p>

          <p className="text-xs text-gray-500">
            Desarrollado por <span className="font-semibold text-blue-500 hover:text-blue-400 transition">Damián López</span>,
            en el contexto de <span className="italic">TalentTech</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;