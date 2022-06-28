import React from "react";
import "./App.css";
import RouterConfig from "./route/index";
import AppProvider from "./context/AppProvider";
//import BlurModal from './components/BlurModal/index'
import "react-loading-skeleton/dist/skeleton.css";
import AssistantBtn from "./components/AssistantBtn";

function App() {
    return (
        <div>
            <AppProvider>
                <RouterConfig />
            </AppProvider>
        </div>
    );
}

export default App;
