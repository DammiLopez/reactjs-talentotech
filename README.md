# CursosTech - Plataforma de Cursos Tecnológicos

![CursosTech Logo](https://talentotech.bue.edu.ar/assets/images/LOGO_LOGO_TT_AZUL.png)

**Proyecto de Pre-Entrega para el Curso de ReactJS - Talento Tech**

---

## **Descripción del Proyecto**
**CursosTech** es una plataforma de e-commerce especializada en cursos tecnológicos, desarrollada como proyecto de pre-entrega para el curso de **ReactJS** en **Talento Tech**. La aplicación permite a los usuarios loguearse, explorar, seleccionar y comprar cursos de tecnología.

Este proyecto demuestra el uso de **React**, **React Router**, **Context API**, y **Tailwind CSS** para crear una experiencia de usuario fluida y moderna, aplicando los conceptos aprendidos durante el curso.

---

## **Características Principales**
```
✅ **Catálogo de Cursos**: Visualización de cursos disponibles con imágenes, descripciones y precios.
✅ **Carrito de Compras**: Funcionalidad para agregar, eliminar y gestionar productos en el carrito.
✅ **Detalle de Productos**: Página dedicada para ver los detalles completos de cada curso.
✅ **Autenticación Simulada**: Sistema de login y registro para gestionar usuarios.
✅ **Diseño Responsivo**: Adaptado para móviles, tablets y desktop.
✅ **Animaciones y Efectos Visuales**: Uso de transiciones y efectos (como `react-confetti`) para mejorar la experiencia de usuario.
```

---

## **Tecnologías Utilizadas**
- **Frontend**:
  - [ReactJS](https://reactjs.org/) (Hooks, Context API, Router).
  - [Tailwind CSS](https://tailwindcss.com/) para estilos.
  - [Lucide React](https://lucide.dev/) para iconos.
  - [React Confetti](https://www.npmjs.com/package/react-confetti) para efectos visuales.

- **Backend Simulado**:
  - [MockAPI](https://mockapi.io/) para simular una API de productos.

- **Herramientas**:
  - Vite para el entorno de desarrollo.
  - Git y GitHub para control de versiones.

---

## **Estructura del Proyecto**
``` 
src/
├── components/       # Componentes reutilizables (Navbar, CursoCard, Spinner, etc.)
├── context/           # Context API para estado global (autenticación, carrito, productos, funcionalidades)
├── App.jsx            # Configuración de rutas y estructura principal
└── main.jsx           # Punto de entrada de la aplicación
```

---

## **Funcionalidades Implementadas**
### **1. Gestión de Estado con Context API**
- **Autenticación**: Simulación de login/logout.
- **Carrito de Compras**: Agregar, eliminar y vaciar productos.
- **Usuario**: Almacenamiento de datos del usuario (nombre, email).

### **2. Navegación con React Router**
- Rutas para:
  - `/`: Página de inicio.
  - `/productos`: Lista de cursos disponibles.
  - `/productos/:id`: Detalle de un curso específico.
  - `/cart`: Carrito de compras.
  - `/iniciar-sesion`: Inicio de sesión.
  - `/registrar`: Registrar usuario.
  - `/admin/productos`: Control de inventario

### **3. Interacción con API Externa**
- Consumo de datos desde [MockAPI](https://mockapi.io/) para simular un backend.

### **4. Diseño y Experiencia de Usuario**
- **UI/UX**: Interfaz intuitiva con feedback visual (loaders, mensajes de éxito, efectos).
- **Responsive**: Adaptable a diferentes dispositivos.
- **Estilo**: Paleta de colores oscura con toques azules.

---

## **Cómo Ejecutar el Proyecto**
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/DammiLopez/reactjs-talentotech.git
   cd cursos-tech

2. **Instalar dependencias:**:
    ```bash
    npm install
    # o
    npm i

3. **Ejecutar la aplicación:**:
   ```bash
   npm run dev

