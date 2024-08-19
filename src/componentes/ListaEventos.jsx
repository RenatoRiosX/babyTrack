import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchEliminarEvento } from "../servicios";
import { eliminarEvento } from "../redux/features/eventoSlice";
import { toast } from "react-toastify";

const ListaEventos = ({ listaEventos }) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.eventoSlice.categorias) || [];
  const imagenes = useSelector((state) => state.eventoSlice.imagenes) || [];

  const handleButton = async (id) => {
    try {
      if (id != null) {
        await fetchEliminarEvento(id);
        dispatch(eliminarEvento(id));
        toast.success("Evento eliminado correctamente", {autoClose: 2000} );
      } else {
        throw new Error("El id del evento es nulo");
      }
    } catch (error) {
      toast.error("Error al eliminar el evento: " + error);
    }
  };

  const obtenerImagenCategoria = (idCategoria) => {
    const categoria = categorias?.find(
      (categoria) => parseInt(categoria.id) === parseInt(idCategoria)
    );
    const idImagen = categoria?.imagen;
    const resultado = imagenes?.find((str) => {
      const regex = new RegExp(`/${idImagen}\\.png$`);
      return regex.test(str);
    });

    return resultado || null;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ícono</th>
          <th>Fecha</th>
          <th>Detalle</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(listaEventos) &&
          listaEventos?.map((evento) => (
            <tr key={evento.id}>
              <td>
                <img
                  src={obtenerImagenCategoria(evento.idCategoria)}
                  width="30"
                  height="30"
                  alt="Ícono de categoría"
                />
              </td>
              <td>{evento.fecha}</td>
              <td>{evento.detalle || "Sin detalle"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleButton(evento.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ListaEventos;
