# Baby Tracker - Aplicación de Seguimiento de Bebé con React y Redux

Una aplicación de página única (SPA) desarrollada como proyecto final para el **Taller de Desarrollo Frontend**. La aplicación permite a los padres hacer un seguimiento fácil e intuitivo de las rutinas diarias de su bebé, interactuando con una API REST para la persistencia de datos.

---

### 🎬 Demostración en Vivo

A continuación, se muestra un breve video recorriendo las funcionalidades principales de la aplicación, desde el inicio de sesión hasta el registro de eventos y la visualización de estadísticas en el dashboard.

https://github.com/user-attachments/assets/89cf0340-eacb-4be8-8700-019879680c06

---

### ✨ Características Principales

* **Autenticación de Usuarios:**
    * Sistema completo de **Registro y Login** que consume endpoints de una API REST.
    * Manejo de **tokens de autenticación (JWT)** para securizar las peticiones a la API.
    * **Sesión persistente** mediante el uso de `localStorage`, permitiendo al usuario mantenerse logueado incluso después de cerrar el navegador.

* **Dashboard Interactivo en Tiempo Real:**
    * Una interfaz de una sola página donde se centralizan todas las funcionalidades principales, evitando recargas de página para una experiencia de usuario fluida.
    * **Registro de eventos** (biberones, pañales, etc.) con categoría, fecha, hora y detalles opcionales.
    * **Actualización instantánea** de todos los componentes del dashboard (listados, estadísticas y gráficos) tras agregar un nuevo evento, gracias a la gestión centralizada del estado con Redux.

* **Visualización de Datos y Estadísticas:**
    * **Listado de eventos** organizado por "Hoy" y "Días anteriores" para una fácil consulta.
    * **Componentes de informe** que muestran métricas clave en tiempo real, como el total de biberones del día y el tiempo transcurrido desde el último cambio de pañal.
    * **Gráficos dinámicos** para analizar tendencias, incluyendo la cantidad de eventos por categoría y un resumen de comidas de la última semana.

* **Lógica de Negocio en el Frontend:**
    * Componentes que calculan y muestran información útil, como el tiempo restante estimado para la próxima toma de biberón, cambiando de color según la urgencia.

---

### 🛠️ Stack Tecnológico

| Área | Tecnología / Práctica |
| :--- | :--- |
| **Librería Frontend** | `React` |
| **Gestión de Estado** | `Redux` |
| **Enrutamiento** | `React Router` |
| **Lenguaje** | `JavaScript (ES6+)` |
| **Estilos** | `CSS` |
| **Comunicación API** | `Fetch API / Axios` para consumir una API REST |
| **Entorno de Desarrollo**| Create React App, VS Code |

---

### Aprendizajes Clave

Este proyecto fue una inmersión práctica en el ecosistema moderno de desarrollo frontend, consolidando habilidades en:

* **Desarrollo de SPAs (Single-Page Applications):** Construir una aplicación web completa y reactiva sin recargas de navegador.
* **Gestión de Estado Centralizado:** Utilizar **Redux** para manejar el estado global de la aplicación, asegurando un flujo de datos predecible y facilitando la sincronización entre componentes.
* **Componentización:** Diseñar y desarrollar una interfaz de usuario modular y reutilizable siguiendo la filosofía de componentes de React.
* **Consumo de APIs REST:** Realizar peticiones HTTP asíncronas para obtener, crear y eliminar datos de un servidor externo, manejando la autenticación basada en tokens.
* **Enrutamiento del Lado del Cliente:** Implementar navegación entre diferentes vistas de la aplicación (Login, Registro, Dashboard) utilizando **React Router**.
