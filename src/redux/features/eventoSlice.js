import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  eventos: [],
  imagenes: [],
};
const urlBaseImagenes = "https://babytracker.develotion.com/imgs/";
const eventoSlice = createSlice({
  name: "eventoSlice",
  initialState,
  reducers: {
    agregarCategorias: (state, action) => {
      state.categorias = action.payload;
      state.imagenes = action.payload.map(
        (categoria) => urlBaseImagenes + categoria.imagen + ".png"
      );
    },

    agregarEventos: (state, action) => {
      state.eventos = action.payload;
    },

    agregarEvento: (state, action) => {
      const nuevoEvento = {
        id: action.payload.idEvento,
        idCategoria: action.payload.idCategoria,
        idUsuario: localStorage.getItem("idUsuario"),
        detalle: action.payload.detalle,
        fecha: action.payload.fecha,
      };
      state.eventos = [...state.eventos, nuevoEvento];
    },

    eliminarEvento: (state, action) => {
      const idEventoAborrar = action.payload;
      state.eventos = state.eventos.filter((e) => e.id !== idEventoAborrar);
    },
  },
});

export const {
  agregarCategorias,
  agregarEventos,
  agregarEvento,
  eliminarEvento,
  agregarImagenes,
} = eventoSlice.actions;
export default eventoSlice.reducer;
