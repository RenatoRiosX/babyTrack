import React from "react";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import { useSelector } from "react-redux";

const GraficoComidas = () => {
  const eventos = useSelector((state) => state.eventoSlice.eventos) || [];
  const idCategoriaComida = 31;

  const [datosEjeX, setdatosEjeX] = useState([]);
  const [datosEjeY, setdatosEjeY] = useState([]);

  useEffect(() => {
    const obtenerUltimosDias = () => {
      const dias = [];
      for (let i = 6; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        const dia = fecha.toLocaleDateString("es-ES", { weekday: "long" });
        dias.push(dia.charAt(0).toUpperCase() + dia.slice(1));
      }
      return dias;
    };

    const dias = obtenerUltimosDias();

    const contarComidasPorDia = () => {
      return dias.map((dia, index) => {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - (6 - index));
        const fechaFormateada = fecha.toISOString().split("T")[0];

        return eventos.filter(
          (evento) =>
            parseInt(evento.idCategoria) === idCategoriaComida &&
            evento.fecha.startsWith(fechaFormateada)
        ).length;
      });
    };
    const comidasPorDia = contarComidasPorDia();
    setdatosEjeX(dias);
    setdatosEjeY(comidasPorDia);
  }, [eventos]);

  return <Grafico datosEjeX={datosEjeX} datosEjeY={datosEjeY}></Grafico>;
};

export default GraficoComidas;
