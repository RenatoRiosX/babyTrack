import React from "react";
import { useSelector } from "react-redux";

const TemporizadorBiberon = () => {
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

  if (eventosBiberonesDelDia.length > 0) {
    const eventoMasReciente = eventosBiberonesDelDia.reduce(
      (ultimoEvento, eventoActual) => {
        return new Date(eventoActual.fecha) > new Date(ultimoEvento.fecha)
          ? eventoActual
          : ultimoEvento;
      }
    );

    fechaEventoMasReciente = eventoMasReciente.fecha;
  }

  const calcularTiempoRestante = (ultimaIngesta) => {
    if (!ultimaIngesta) return null;

    const MILISEGUNDOS_POR_HORA = 3600000;
    const horasPermitidas = 4;
    const ahora = new Date();
    const diferencia = ahora - new Date(ultimaIngesta);
    const tiempoRestanteMilisegundos =
      horasPermitidas * MILISEGUNDOS_POR_HORA - diferencia;

    if (tiempoRestanteMilisegundos <= 0) return "0:00";

    const horasRestantes = Math.floor(
      tiempoRestanteMilisegundos / MILISEGUNDOS_POR_HORA
    );
    const minutosRestantes = Math.floor(
      (tiempoRestanteMilisegundos % MILISEGUNDOS_POR_HORA) / 60000
    );

    const minutosFormateados =
      minutosRestantes < 10 ? `0${minutosRestantes}` : minutosRestantes;

    return `${horasRestantes}:${minutosFormateados}`;
  };

  const tiempoRestante = calcularTiempoRestante(fechaEventoMasReciente);

  const colorTexto = tiempoRestante !== "0:00" ? "green" : "red";
  let texto = "";
  if (tiempoRestante != null) {
    texto =
      tiempoRestante !== "0:00"
        ? `Quedan ${tiempoRestante} horas para el próximo biberón.`
        : "¡Ya es hora del próximo biberón!";
  } else {
    texto = "No hay registros de biberones en el dia de hoy";
  }

  return (
    <div>
      <label htmlFor="Temporizador">Tiempo para el próximo biberón</label>
      <p style={{ color: colorTexto }}>{texto}</p>
    </div>
  );
};

export default TemporizadorBiberon;
