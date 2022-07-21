import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/font/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ModalLoad from "./components/ModalLoad/index";

// Sentry.init({
//   dsn: "https://38eb6d00469546558bd815998210f77f@o1108259.ingest.sentry.io/6554425",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<ModalLoad title="Đang tải..." />}>
                <App />
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
