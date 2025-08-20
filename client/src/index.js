import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { ChatProvider } from "./context/ChatContext";

import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="63677105911-791q0ms43r7mfn8b8rsntau9c9pckhtp.apps.googleusercontent.com">
      
        <AppContextProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </AppContextProvider>
   
    </GoogleOAuthProvider>
  </BrowserRouter>
);
