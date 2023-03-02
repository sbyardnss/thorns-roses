// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/login"
import { Register } from "./auth/register"
import { NavBar } from "./Nav/Navbar"
import { ApplicationViews } from "./Views/ApplicationViews"
import { Authorized } from "./Views/Authorized"



export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<>
				<Authorized >
					<NavBar />
					<ApplicationViews />
				</Authorized>
			</>

		} />
	</Routes>
}
export default App
