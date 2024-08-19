import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamentos: [],
  ciudades: [],
};

const usuarioSlice = createSlice({
  name: "usuarioSlice",
  initialState,
  reducers: {
    agregarDepartamentos: (state, action) => {
      state.departamentos = action.payload;
    },
    agregarCiudades: (state, action) => {
      state.ciudades = action.payload;
    },
  },
});

export const { agregarDepartamentos, agregarCiudades } = usuarioSlice.actions;
export default usuarioSlice.reducer;
