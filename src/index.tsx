import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/font/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://847a92f5f1924cd2a67b303d23a132d0@o1115240.ingest.sentry.io/6147072",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={(<div>Loading</div>)}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
