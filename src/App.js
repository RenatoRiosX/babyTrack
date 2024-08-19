import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos/estilo.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import FormularioLogin from './componentes/FormularioLogin';
import Tablero from './componentes/Tablero';
import FormularioRegistro from './componentes/FormularioRegistro';
import Encabezado from './componentes/Encabezado';
import {ToastContainer} from 'react-toastify';
import PieDePagina from './componentes/PieDePagina';



const App = () => {
  
  return (
    <div className='contenedor-app'>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    
      <BrowserRouter>
        <Encabezado/>
        <div className="contenido-principal">
          <Routes>
            <Route path="/" element={<FormularioLogin/>}   />
            <Route path="/registro" element={<FormularioRegistro />} />
            <Route path="/tablero" element={<Tablero />}>            
              
            </Route>
            <Route path="*" element={<p>NO SE HALLÓ</p>} />
          </Routes>
        </div>
        <PieDePagina/>
      </BrowserRouter>
    </div>
  );
}

export default App;
