import {configureStore} from "@reduxjs/toolkit";
import reducers from './reducers.ts';

const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>

export default store;
