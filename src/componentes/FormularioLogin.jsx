import React, { useState, useEffect } from "react";
import { loginUsuario } from "../servicios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FormularioLogin = () => {
  const [usuarioPaswordLogin, setUsuarioPaswordLogin] = useState({
    usuario: "",
    password: "",
  });
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { usuario, password } = usuarioPaswordLogin;
    setBotonHabilitado(usuario.trim() !== "" && password.trim() !== "");
  }, [usuarioPaswordLogin]);

  const handleChange = (e) => {
    setUsuarioPaswordLogin((usuarioPaswordLogin) => {
      return {
        ...usuarioPaswordLogin,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resultado = await loginUsuario(usuarioPaswordLogin);
      if (resultado.apiKey) {
        let localStorage = window.localStorage;
        localStorage.setItem("apiKey", resultado.apiKey);
        localStorage.setItem("idUsuario", resultado.id);
        let mensaje = "Ingreso correctamente :D";
        toast.success("Logueado correctamente", mensaje);
        setTimeout(() => {
          navigate("/tablero");
        }, 1000);
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      toast.error("Ha ocurrido un error: " + error.message);
    }
  };

  return (
    <Form className="formulario" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese su usuario"
          name="usuario"
          onChange={handleChange}
          value={usuarioPaswordLogin.usuario}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          name="password"
          onChange={handleChange}
          value={usuarioPaswordLogin.password}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!botonHabilitado}>
        Ingresar
      </Button>
    </Form>
  );
};

export default FormularioLogin;
