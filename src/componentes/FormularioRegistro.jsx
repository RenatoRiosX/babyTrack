import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  registrarUsuario,
  loginUsuario,
  obtenerDepartamentos,
  obtenerCiudades,
} from "../servicios";
import {
  agregarDepartamentos,
  agregarCiudades,
} from "../redux/features/usuarioSlice";
import { setSpinner } from "../redux/features/spinnerSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const FormularioRegistro = () => {
  const [valoresFormulario, setValoresFormulario] = useState({
    usuario: "",
    password: "",
    departamento: "",
    ciudad: "",
  });
  const departamentos =
    useSelector((state) => state.usuarioSlice.departamentos) || [];
  const ciudades = useSelector((state) => state.usuarioSlice.ciudades) || [];
  const spinner = useSelector((state) => state.spinnerSlice.cargando);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValoresFormulario((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await obtenerDepartamentos();
        if (response && Array.isArray(response.departamentos)) {
          dispatch(agregarDepartamentos(response.departamentos));
        } else {
          console.error(
            "Los departamentos recibidos no son un arreglo:",
            response
          );
        }
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchCiudades = async () => {
      if (valoresFormulario.departamento) {
        try {
          const response = await obtenerCiudades(
            valoresFormulario.departamento
          );
          if (response && Array.isArray(response.ciudades)) {
            dispatch(agregarCiudades(response.ciudades));
          } else {
            console.error(
              "Las ciudades recibidas no son un arreglo:",
              response
            );
          }
        } catch (error) {
          console.error("Error al obtener las ciudades:", error);
        }
      } else {
        dispatch(agregarCiudades([]));
      }
    };

    fetchCiudades();
  }, [valoresFormulario.departamento]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(setSpinner(true));
      const data = await registrarUsuario(valoresFormulario);

      let localStorage = window.localStorage;

      const loginData = await loginUsuario({
        usuario: valoresFormulario.usuario,
        password: valoresFormulario.password,
      });
      localStorage.setItem("apiKey", loginData.apiKey);
      localStorage.setItem("idUsuario", loginData.id);
      dispatch(setSpinner(false));
      let mensaje = "Ingreso correctamente :D";
      toast.success("Usuario registrado con éxito", mensaje);
      setTimeout(() => {
        navigate("/tablero");
      }, 1000);
    } catch (error) {
      dispatch(setSpinner(false));
      toast.error("Error al registrar el usuario: " + error.message, {
        autoClose: 2000,
      });
    }
  };
  if (spinner) {
    const spinnerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    };

    return (
      <div style={spinnerStyle}>
        <ClipLoader
          color={"red"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <Form className="formulario" onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formBasicUsuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un usuario"
            name="usuario"
            onChange={handleChange}
            value={valoresFormulario.usuario}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            name="password"
            onChange={handleChange}
            value={valoresFormulario.password}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicDepartamento">
          <Form.Label>Departamento</Form.Label>
          <Form.Control
            as="select"
            name="departamento"
            onChange={handleChange}
            value={valoresFormulario.departamento}
            required
          >
            <option value="">Seleccione un departamento</option>
            {Array.isArray(departamentos) &&
              departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicCiudad">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            as="select"
            name="ciudad"
            onChange={handleChange}
            value={valoresFormulario.ciudad}
            disabled={!valoresFormulario.departamento}
            required
          >
            <option value="">Seleccione una ciudad</option>
            {Array.isArray(ciudades) &&
              ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
};

export default FormularioRegistro;
