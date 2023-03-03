import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import "./Navbar.css"
import { ShoppingCartContext } from "./NavbarContext"

export const NavBar = () => {
    const { purchasesFromSpecificUser } = useContext(ShoppingCartContext)

    const localThornUser = localStorage.getItem("thorn_user")
    const thornUserObj = JSON.parse(localThornUser)
    
    
    console.log(purchasesFromSpecificUser)
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/nurseries">Nurseries</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/distributors">Distributors</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/retailers">Retailers</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/shoppingCart">My Cart ({purchasesFromSpecificUser.length})</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("thorn_user")
                    Navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}