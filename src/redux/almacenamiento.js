import { configureStore } from "@reduxjs/toolkit";
import usuarioSlice from "./features/usuarioSlice";
import eventoSlice from "./features/eventoSlice";
import spinnerSlice from "./features/spinnerSlice";
import ingestaSlice from "./features/ingestaSlice";

export const almacenamiento = configureStore({
  reducer: {
    usuarioSlice,
    eventoSlice,
    spinnerSlice,
    ingestaSlice,
  },
});
