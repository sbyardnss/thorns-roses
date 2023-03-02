import { Link, Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Navbar.css"

export const NavBar = () => {
    const [purchases, setPurchases] = useState([])

    const localThornUser = localStorage.getItem("thorn_user")
    const thornUserObj = JSON.parse(localThornUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=flower&userId=${thornUserObj.id}`)
                .then(response => response.json())
                .then((purchasesArr) => {
                    setPurchases(purchasesArr)
                })
        },
        []
    )

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
                <Link className="navbar__link" to="/shoppingCart">My Cart ({purchases.length})</Link>
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