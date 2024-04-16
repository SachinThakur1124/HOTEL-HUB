import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { SearchContextProvider } from './context/Context.js';
import { AuthContextProvider } from './context/AuthContext.js';
import { RegAuthProvider } from './context/RegAuth.js';


ReactDOM.render(
  <React.StrictMode>
    <RegAuthProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </RegAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


