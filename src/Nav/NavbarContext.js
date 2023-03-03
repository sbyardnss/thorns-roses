import React, { useState, createContext, useEffect } from "react";
import { getAllPurchases } from "../ApiManager";

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = (props) => {
    const [purchasesFromSpecificUser, setPurchasesFromSpecificUser] = useState([])
    const [purchaseSwitch, changePurchaseSwitch] = useState(false)

    const localThornUser = localStorage.getItem("thorn_user")
    const thornUserObj = JSON.parse(localThornUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=flower&customerId=${thornUserObj.id}`)
            .then(res => res.json())
            .then(purchaseArray => {
                setPurchasesFromSpecificUser(purchaseArray)
            })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=flower&customerId=${thornUserObj.id}`)
            .then(res => res.json())
            .then(purchaseArray => {
                setPurchasesFromSpecificUser(purchaseArray)
            })
        },
        [purchaseSwitch]
    )
    

    const postPurchase = (purchaseObj) => {
        return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseObj)
        })
            .then(res => res.json())
            .then(changePurchaseSwitch(!purchaseSwitch))
    }

    return (
        <ShoppingCartContext.Provider value={{
            purchasesFromSpecificUser, postPurchase
        }}>
            {props.children}
        </ShoppingCartContext.Provider>
    )
}