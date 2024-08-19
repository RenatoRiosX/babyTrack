import React from "react";
import GraficoCategorias from "./GraficoCategorias";
import GraficoComidas from "./GraficoComidas";
import TemporizadorBiberon from "./TemporizadorBiberon";
import { Row, Col } from "react-bootstrap";

const Analisis = () => {
  return (
    <>
      <h2>Analisis</h2>
      <TemporizadorBiberon></TemporizadorBiberon>
      <Row>
        <Col xs={12} md={12} lg={6}>
          <GraficoCategorias />
        </Col>
        <Col xs={12} md={12} lg={6}>
          <GraficoComidas />
        </Col>
      </Row>
    </>
  );
};

export default Analisis;
