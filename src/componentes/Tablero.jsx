import React, { useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import AgregarEvento from "./AgregarEvento";
import Analisis from "./Analisis";
import InformeEventos from "./InformeEventos";
import ListadoDelDia from "./ListadoDelDia";
import ListadoDiasAnteriores from "./ListadoDiasAnteriores";
import { obtenerCategorias, obtenerEventos } from "../servicios";
import { agregarCategorias,agregarEventos } from "../redux/features/eventoSlice";
import { useDispatch } from "react-redux";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tablero = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("apiKey") !== null){

      const fetchCategorias = async () => {
        try {
          const response = await obtenerCategorias();
          if (response && Array.isArray(response.categorias)) {
            dispatch(agregarCategorias(response.categorias));
          } else {
            console.error("Las categorias recibidas no son un arreglo:", response);
          }
        } catch (error) {
          toast.error("Error al obtener las categorias: "+ error, { autoClose: 3000 });
        }
      };

      fetchCategorias();
      
      const fetchEventos = async () => {
        try {
          const response = await obtenerEventos();
          if (response && Array.isArray(response.eventos)) {
            dispatch(agregarEventos(response.eventos));  
          } else {
            console.error("Los eventos recibidos no son un arreglo:", response);
          }
        } catch (error) {
          toast.error("Error al obtener los eventos: " + error.message, { autoClose: 3000 });
        }
      };

      fetchEventos();
    }
  }, []);
  
  if (localStorage.getItem("apiKey") === null) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Alert variant="warning">
              Debes iniciar sesión para poder ver esta pantalla.
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="mb-3">
        <Col xs={12} md={6} lg={3}>
          <AgregarEvento></AgregarEvento>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <InformeEventos></InformeEventos>
        </Col>
        <Col xs={12} md={12} lg={6}>
          <ListadoDelDia></ListadoDelDia>
          <ListadoDiasAnteriores></ListadoDiasAnteriores>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Analisis></Analisis>
        </Col>
      </Row>
    </Container>
  );
};

export default Tablero;
