import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RastreadorEventos = ({
  cantEventosDelDia,
  fechaEventoMasReciente,
  esBiberon,
}) => {
  const eventos = useSelector((state) => state.eventoSlice.eventos) || [];
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      actualizarTiempo();
    }, 1000);
    return () => clearInterval(intervalo); // Limpiar el intervalo al desmontar el componente
  }, [eventos]);

  const actualizarTiempo = () => {
    if (fechaEventoMasReciente == "") {
      setTiempoTranscurrido("No hay registros para el día de hoy");
    } else {
      const fechaActual = new Date();
      const fechaEvento = new Date(fechaEventoMasReciente);

      if (fechaEvento > fechaActual) return;

      const diferenciaMilisegundos = fechaActual - fechaEvento;

      const segundos = Math.floor((diferenciaMilisegundos / 1000) % 60);
      const minutos = Math.floor((diferenciaMilisegundos / 1000 / 60) % 60);
      const horas = Math.floor(diferenciaMilisegundos / 1000 / 60 / 60);
      setTiempoTranscurrido(`${horas}h ${minutos}m ${segundos}s`);
    }
  };
  return (
    <div>
      <p className="cantidadDeEventos">
        Cantidad de {esBiberon ? "biberones ingeridos" : "pañales cambiados"} en
        el día: {cantEventosDelDia}
      </p>
      <p className="tiempoTranscurridoDesdeUltimoEvento">
        Último {esBiberon ? "biberon" : "pañal"}: {tiempoTranscurrido}
      </p>
    </div>
  );
};

export default RastreadorEventos;
