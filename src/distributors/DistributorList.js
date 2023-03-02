import { getAllDistributorNurseries, getAllDistributors, getAllFlowers, getAllNurseries, getAllNurseryFlowers, getAllRetailers } from "../ApiManager";
import { useEffect, useState } from "react"
import "./Distributors.css"

export const DistributorList = () => {
    const [nurseries, setNurseries] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [distributorNurseries, setDistributorNurseries] = useState([])
    const [distributors, setDistributors] = useState([])
    const [flowers, setFlowers] = useState([])
    const [retailers, setRetailers] = useState([])

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
            getAllFlowers()
                .then((flowerArray) => {
                    setFlowers(flowerArray)
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

    useEffect(
        () => {
            getAllDistributors()
                .then((distributorArray) => {
                    setDistributors(distributorArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getAllRetailers()
                .then((retailerArray) => {
                    setRetailers(retailerArray)
                })
        },
        []
    )

    return (
        <article key="distributors" className="distributors">
            <h2 id="distributorListHeader">List of Distributors</h2>
            {
                distributors.map(distributor => {
                    const matchedDistributorNurseries = distributorNurseries.filter(distributorNursery => distributorNursery.distributorId === distributor.id)
                    const matchedRetailers = retailers.filter(retailer => distributor.id === retailer.distributorId)

                    let matchedFlowers = []


                    {
                        matchedDistributorNurseries.map(match => {
                            let addedFlowers = nurseryFlowers.filter((nurseryFlower) => nurseryFlower.nurseryId === match.nurseryId)
                            {
                                addedFlowers.map(flower => matchedFlowers.push(flower))
                            }
                        })
                    }



                    // console.log(matchedFlowers)
                    const uniqueFlowers = matchedFlowers.reduce((accumulator, current) => {
                        if (!accumulator.find((match) => match.flowerId === current.flowerId)) {
                            accumulator.push(current)
                        }
                        return accumulator;
                    }, [])

                    // console.log(uniqueFlowers)


                    return (
                        <div className="distributor" key={distributor.id}>
                            Name: {distributor.name}
                            <ul className="matchedNurseries">
                                <h3>Flowers:</h3>


                                {uniqueFlowers.map(uniqueFlower => {

                                    return <>
                                        <li key={uniqueFlower.id} className="flowerListInDistributors">
                                            <div key="flower">{uniqueFlower.flower.color} {uniqueFlower.flower.name}</div>
                                            <div key="currency" className="flower_cost">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                                .format(uniqueFlower.price + ((uniqueFlower.price) * (distributor.markUp / 100)), 1)}</div>
                                        </li>

                                    </>

                                })}


                            </ul>
                            <ul className="matchedRetailers">
                                <h3>Retailers:</h3>

                                {
                                    matchedRetailers.map(match => {

                                        return <>
                                        <li key={match.id} className="distributorRetailers">
                                            <div key="retailer">{match.name}</div>
                                        </li>

                                    </>
                                    })
                                }

                            </ul>

                        </div>
                    )
                })
            }
        </article>
    )
}