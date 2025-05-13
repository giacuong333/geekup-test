import paths from "./paths";
import routes from "./routes";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to={paths.albums} replace />} />

			{routes.map((item) => {
				const { id, route, layout: Layout, component: Component } = item;

				return (
					<Route
						key={id}
						path={route}
						element={
							<Layout>
								<Component />
							</Layout>
						}
					/>
				);
			})}
		</Routes>
	);
}

export default App;
