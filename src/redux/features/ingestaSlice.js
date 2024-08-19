import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ultimaIngesta: null,
};

const ingestaSlice = createSlice({
  name: "ingestaSlice",
  initialState,
  reducers: {
    actualizarIngesta: (state, action) => {
      state.ultimaIngesta = action.payload;
    },
  },
});

export const { actualizarIngesta } = ingestaSlice.actions;
export default ingestaSlice.reducer;
