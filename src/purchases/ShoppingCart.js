import { useEffect, useState } from "react"
import "./ShoppingCart.css"


export const ShoppingCart = () => {
    const [purchases, setPurchases] = useState([])
    const [quantifiedPurchases, setQuantifiedPurchases] = useState([])

    const localThornUser = localStorage.getItem("thorn_user")
    const thornUserObj = JSON.parse(localThornUser)









    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?_expand=flower&customerId=${thornUserObj.id}`)
                .then(response => response.json())
                .then((purchasesArr) => {
                    setPurchases(purchasesArr)
                })
        },
        []
    )






    useEffect(
        () => {
            let purchasesbyProduct = []
            {
                purchases.map(purchase => {

                    const foundFlowerId = purchasesbyProduct.find(pbp => pbp.id === purchase.flowerId)
                    const foundIndex = purchasesbyProduct.findIndex(pbp => pbp.id === purchase.flowerId)
                    // console.log(foundProductId)
                    // console.log(foundIndex)
                    if (!foundFlowerId) {
                        const newObj = {
                            id: purchase.flowerId,
                            name: purchase?.flower?.name,
                            price: purchase.retailerPrice,
                            totalCost: purchase.retailerPrice,
                            quantity: 1
                        }
                        purchasesbyProduct.push(newObj)
                    } else {
                        foundFlowerId.quantity += 1
                        foundFlowerId.totalCost += purchase.retailerPrice
                        purchasesbyProduct[foundIndex] = foundFlowerId
                    }

                })

            }
            setQuantifiedPurchases(purchasesbyProduct)

        },
        [purchases]
    )






    return <>

        <h2>List of Purchases</h2>


        <table className="purchasesTable">
            <tbody>
                <tr id="tableHead">
                    <th className="flowerTableHead">Flower</th>
                    <th className="quantityTableHead">Quantity</th>
                    <th className="totalCostTableHead">Total Cost</th>
                </tr>

            </tbody>
            {
                quantifiedPurchases.map(
                    (purchase) => {
                        return (
                            <tbody key={purchase.id}>
                                <tr>
                                    <td className="purchasedFlower">{purchase.name}</td>
                                    <td>{purchase.quantity}</td>
                                    <td> {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                    .format(parseFloat(purchase.totalCost))}</td>

                                </tr>



                            </tbody>

                        )

                    }
                )
            }
        </table>


    </>

}