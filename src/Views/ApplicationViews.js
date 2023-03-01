import { Outlet, Route, Routes } from "react-router-dom"
import { NurseryList } from "../nurseries/NurseryList"


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
				<Route path="nurseries" element={ < NurseryList />  } />
                <Route path="distributors" element={ <></>  } />
                <Route path="retailers" element={ <></>  } />


				
			</Route>
		</Routes>
	)
}