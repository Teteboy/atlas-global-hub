import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Set the API base URL - uses relative /api in production (proxied by Nginx), localhost in dev
setBaseUrl(import.meta.env.VITE_API_URL ?? "http://localhost:5000");

createRoot(document.getElementById("root")!).render(<App />);
