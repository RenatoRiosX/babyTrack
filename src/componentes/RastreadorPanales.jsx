import React from "react";
import { useSelector } from "react-redux";
import RastreadorEventos from "./RastreadorEventos";

const RastreadorPanales = () => {
  const eventos = useSelector((state) => state.eventoSlice.eventos);
  const diaActual = new Date();

  const obtenerDiaEvento = (stringFecha) => {
    const nuevaFecha = new Date(stringFecha);
    return nuevaFecha.getDay();
  };
  const panalesDelDia = eventos.filter(
    (evento) =>
      parseInt(evento.idCategoria) === 33 &&
      obtenerDiaEvento(evento.fecha) === diaActual.getDay()
  );

  let fechaEventoMasReciente = "";
  let cantPanalesDia = 0;

  if (panalesDelDia.length > 0) {
    const eventoMasReciente = panalesDelDia.reduce(
      (ultimoEvento, eventoActual) => {
        return new Date(eventoActual.fecha) > new Date(ultimoEvento.fecha)
          ? eventoActual
          : ultimoEvento;
      }
    );
    cantPanalesDia = panalesDelDia.length;
    fechaEventoMasReciente = eventoMasReciente.fecha;
  }
  const esBiberon = false;

  return (
    <div>
      <RastreadorEventos
        cantEventosDelDia={cantPanalesDia}
        fechaEventoMasReciente={fechaEventoMasReciente}
        esBiberon={esBiberon}
      ></RastreadorEventos>
    </div>
  );
};

export default RastreadorPanales;
