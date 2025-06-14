import {createRoot} from 'react-dom/client'
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "./states/store.ts";

createRoot(document.getElementById('root')!).render(
    <StyleProvider layer>
        <Provider store={store}>
            <App/>
        </Provider>
    </StyleProvider>
)
