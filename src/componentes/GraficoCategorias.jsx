import React from "react";
import { useState, useEffect } from "react";
import Grafico from "./Grafico";
import { useSelector } from "react-redux";

const GraficoCategorias = () => {
  const eventos = useSelector((state) => state.eventoSlice.eventos) || [];
  const categorias = useSelector((state) => state.eventoSlice.categorias) || [];
  const [datosEjeX, setdatosEjeX] = useState([]);
  const [datosEjeY, setdatosEjeY] = useState([]);

  useEffect(() => {
    if (categorias.length) {
      const nuevosDatosEjeX = categorias
        .filter((categoria) => {
          const eventosCategoria = eventos.filter(
            (evento) => parseInt(evento.idCategoria) === parseInt(categoria.id)
          );
          return eventosCategoria.length > 0;
        })
        .map((categoria) => categoria.tipo);

      const nuevosDatosEjeY = categorias
        .filter((categoria) => {
          const eventosCategoria = eventos.filter(
            (evento) => parseInt(evento.idCategoria) === parseInt(categoria.id)
          );
          return eventosCategoria.length > 0;
        })
        .map((categoria) => {
          const eventosCategoria = eventos.filter(
            (evento) => parseInt(evento.idCategoria) === parseInt(categoria.id)
          );
          return eventosCategoria.length;
        });
      setdatosEjeX(nuevosDatosEjeX);
      setdatosEjeY(nuevosDatosEjeY);
    }
  }, [eventos, categorias]);

  return (
    <>
      <Grafico datosEjeX={datosEjeX} datosEjeY={datosEjeY} />
    </>
  );
};
export default GraficoCategorias;
