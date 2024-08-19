import React from "react";
import { useSelector } from "react-redux";
import ListaEventos from "./ListaEventos";

const ListadoDiasAnteriores = () => {
  const eventos = useSelector((state) => state.eventoSlice.eventos) || [];
  const diaActual = new Date();
  const esFechaAnterior = (stringFecha) => {
    const fechaEvento = new Date(stringFecha);

    return (
      fechaEvento.getFullYear() < diaActual.getFullYear() ||
      (fechaEvento.getFullYear() === diaActual.getFullYear() &&
        fechaEvento.getMonth() < diaActual.getMonth()) ||
      (fechaEvento.getFullYear() === diaActual.getFullYear() &&
        fechaEvento.getMonth() === diaActual.getMonth() &&
        fechaEvento.getDate() < diaActual.getDate())
    );
  };

  const listaEventos = eventos.filter(
    (evento) => evento !== undefined && esFechaAnterior(evento.fecha)
  );

  return <ListaEventos listaEventos={listaEventos}></ListaEventos>;
};

export default ListadoDiasAnteriores;
