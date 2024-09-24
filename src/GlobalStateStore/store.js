import { configureStore } from "@reduxjs/toolkit";
import stateSliceReducers from "./StateDefiner";
const GlobalState = configureStore({
    reducer : stateSliceReducers
});

export default GlobalState