import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import AlbumProvider from "./contexts/Album/index.jsx";
import UserProvider from "./contexts/User/index.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter basename='/geekup-test/admin/'>
			<AlbumProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</AlbumProvider>
		</BrowserRouter>
	</StrictMode>
);
