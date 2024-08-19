import React from "react";
import { useSelector } from "react-redux";
import RastreadorEventos from "./RastreadorEventos";

const RastreadorBiberones = () => {
  const eventos = useSelector((state) => state.eventoSlice.eventos);
  const diaActual = new Date();

  const obtenerDiaEvento = (stringFecha) => {
    const nuevaFecha = new Date(stringFecha);
    return nuevaFecha.getDay();
  };
  const eventosBiberonesDelDia = eventos?.filter(
    (evento) =>
      parseInt(evento.idCategoria) === 35 &&
      parseInt(obtenerDiaEvento(evento.fecha)) === parseInt(diaActual.getDay())
  );

  let fechaEventoMasReciente = "";
  let cantBiberonesDia = 0;
  if (eventosBiberonesDelDia.length > 0) {
    const eventoMasReciente = eventosBiberonesDelDia.reduce(
      (ultimoEvento, eventoActual) => {
        return new Date(eventoActual.fecha) > new Date(ultimoEvento.fecha)
          ? eventoActual
          : ultimoEvento;
      }
    );

    cantBiberonesDia = eventosBiberonesDelDia.length;
    fechaEventoMasReciente = eventoMasReciente.fecha;
  }

  const esBiberon = true;

  return (
    <div>
      <RastreadorEventos
        cantEventosDelDia={cantBiberonesDia}
        fechaEventoMasReciente={fechaEventoMasReciente}
        esBiberon={esBiberon}
      ></RastreadorEventos>
    </div>
  );
};

export default RastreadorBiberones;
