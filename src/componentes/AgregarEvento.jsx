import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { fetchAgregarEvento } from "../servicios";
import { agregarEvento } from "../redux/features/eventoSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgregarEvento = () => {
  const [valoresFormulario, setValoresFormulario] = useState({
    categoria: "",
    fecha: "",
    detalles: "",
  });

  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.eventoSlice.categorias) || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValoresFormulario((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const obtenerFechaGMT3 = () => {
    const fechaActual = new Date();
    const offsetGMT3 = -3 * 60;
    const fechaGMT3 = new Date(fechaActual.getTime() + offsetGMT3 * 60000);
    return fechaGMT3.toISOString().slice(0, 16);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fechaEvento = valoresFormulario.fecha || obtenerFechaGMT3();
      const categoriaEvento = parseInt(valoresFormulario.categoria, 10);

      const fechaActual = new Date();
      
      if (categoriaEvento > 0 && new Date(fechaEvento) <= fechaActual) {
        const data = await fetchAgregarEvento(valoresFormulario);
        toast.success("Evento registrado con éxito!", { autoClose: 2000 });
        
        const payload = {
          idEvento: data.idEvento,
          idCategoria: valoresFormulario.categoria,
          fecha: fechaEvento,
          detalle: valoresFormulario.detalles,
        };
        dispatch(agregarEvento(payload));
      } else {
        let mensajeError = "Error: ";
        if (categoriaEvento <= 0){
          mensajeError += "La categoría debe ser mayor a 0. ";
        }else{
          mensajeError += "La fecha del evento no puede ser mayor a la fecha actual.";
        }
        
        console.log(mensajeError);
        toast.error(mensajeError, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Error al registrar el evento: " + error, {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Registrar Evento</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="categoria"
                required
                onChange={handleChange}
                value={valoresFormulario.categoria}
                style={{ width: "100%" }}
              >
                <option value="">Seleccione Categoria</option>
                {Array.isArray(categorias) &&
                  categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.tipo}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fechaHora">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="fecha"
                onChange={handleChange}
                value={valoresFormulario.fecha}
                style={{ width: "100%" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="detalles">
              <Form.Label>Detalles</Form.Label>
              <Form.Control
                as="textarea"
                name="detalles"
                rows={3}
                onChange={handleChange}
                value={valoresFormulario.detalles}
                style={{ width: "100%" }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Registrar Evento
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AgregarEvento;
