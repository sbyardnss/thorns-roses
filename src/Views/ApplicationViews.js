import { Outlet, Route, Routes } from "react-router-dom"



export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Thorns-N-Roses</h1>
					<div>Shannanaannaanana Trees Trees!</div>
					<Outlet />
				</>
			}>
				<Route path="nurseries" element={ <LocationList /> } />
                <Route path="distributors" element={ <LocationList /> } />
                <Route path="retailers" element={ <LocationList /> } />


				
			</Route>
		</Routes>
	)
}