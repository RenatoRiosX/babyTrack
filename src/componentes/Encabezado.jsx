import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";

const Encabezado = () => {
  const navigate = useNavigate();
  const estaAutenticado = !!localStorage.getItem("apiKey");

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Brand href="#home">Baby Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!estaAutenticado && (
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
            )}
            {!estaAutenticado && (
              <Nav.Link as={Link} to="/registro">
                Registro
              </Nav.Link>
            )}
          </Nav>
          {estaAutenticado && (
            <Button variant="outline-danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
