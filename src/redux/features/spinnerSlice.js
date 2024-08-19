import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cargando: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setSpinner: (state, action) => {
      state.cargando = action.payload;
    },
  },
});

export const { setSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
