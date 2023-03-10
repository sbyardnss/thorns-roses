import { useEffect, useState } from "react"
import { getAllNurseryFlowers, getAllDistributorNurseries, getAllNurseries } from "../ApiManager"
import "./Nursery.css"

export const NurseryList = () => {
    const [nurseries, setNurseries] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [distributorNurseries, setDistributorNurseries] = useState([])

    useEffect(
        () => {
            getAllNurseries()
                .then((nurseryArray) => {
                    setNurseries(nurseryArray)
                })
        },
        []
    )


    useEffect(
        () => {
            getAllNurseryFlowers()
                .then((nurseryFlowerArray) => {
                    setNurseryFlowers(nurseryFlowerArray)
                })
        },
        []
    )


    useEffect(
        () => {
            getAllDistributorNurseries()
                .then((distributorNurseriesArray) => {
                    setDistributorNurseries(distributorNurseriesArray)
                })
        },
        []
    )

    return <article className="nurseries">
        <h2 id="nurseryListHeader">List of Nurseries</h2>
        {
            nurseries.map(nursery => {
                const matchedFlowers = nurseryFlowers.filter(nurseryFlower => nurseryFlower.nurseryId === nursery.id)
                const matchedDistributorNurseries = distributorNurseries.filter(distributorNursery => distributorNursery.nurseryId === nursery.id)
                return (
                    <div className="nursery" key={nursery.id}>
                        Name: {nursery.name}
                        <ul className="flowerList">
                            <h3>Flowers:</h3>
                            {matchedFlowers.map(matchedFlower => {
                                return (
                                    <li key={matchedFlower?.flower?.id} className="flower">
                                        <div>{matchedFlower?.flower?.color} {matchedFlower?.flower?.name}</div>
                                        <div>Price: ${parseFloat(matchedFlower.price, 2)}</div>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul className="distributorList">
                            <h3>Distributors:</h3>
                            {matchedDistributorNurseries.map(distributorNursery => {
                                return (
                                    <li key={distributorNursery?.distributor?.id} className="distributor">{distributorNursery?.distributor?.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })
        }
    </article>
}