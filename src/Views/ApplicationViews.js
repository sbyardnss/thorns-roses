import { Outlet, Route, Routes } from "react-router-dom"
import { NurseryList } from "../nurseries/NurseryList"
import "../App.css"
import { DistributorList } from "../distributors/DistributorList"
import { RetailerList } from "../retailers/RetailerList"
import { ShoppingCart } from "../purchases/ShoppingCart"


export const ApplicationViews = () => {
	

	return (
		<Routes>
			<Route path="/" element={
				<>
					<div id="mainHeader">
						<h1>Thorns-N-Roses</h1>
						<div>Shannanaannaanana Trees Trees!</div>

					</div>
					<Outlet />
				</>
			}>


					<Route path="nurseries" element={< NurseryList />} />
					<Route path="distributors" element={<DistributorList />} />
					<Route path="retailers" element={<RetailerList />} />
					<Route path="shoppingCart" element={<ShoppingCart />} />

			</Route>
		</Routes>
	)
}