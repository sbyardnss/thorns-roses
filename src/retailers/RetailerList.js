import { getAllDistributorNurseries, getAllDistributors, getAllFlowers, getAllNurseries, getAllNurseryFlowers, getAllRetailers } from "../ApiManager";
import { useEffect, useState } from "react"

export const RetailerList = () => {
    const [retailers, setRetailers] = useState([])
    const [nurseries, setNurseries] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [distributorNurseries, setDistributorNurseries] = useState([])
    const [distributors, setDistributors] = useState([])
    const [flowers, setFlowers] = useState([])

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
        <article key="retailers" className="retailers">
            <h2 id="retailerListHeader">List of retailers</h2>
            {
                retailers.map(retailer => {
                    const matchedDistributor = distributors.find(distro => distro.id === retailer.distributorId)
                    const matchedDistributorNurseries = distributorNurseries.filter(distributorNursery => distributorNursery.distributorId === matchedDistributor.id)
                    let matchedNurseries = []
                    {
                        nurseries.map(nursery => {
                            const matches = matchedDistributorNurseries.filter(match => nursery.id === match.nurseryId)
                            matches.map(match => matchedNurseries.push(match))
                        })
                    }

                    console.log(matchedNurseries)
        
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
                                <div className="retailer" key={retailer.id}>
                                    <div>Name: {retailer.name}</div>
                                    <div>Address: {retailer.address}</div>
                                    <ul className="matchedNurseries">
                                        <h3>Flowers:</h3>
        
        
                                        {uniqueFlowers.map(uniqueFlower => {
        
                                            return <>
                                                <li key={uniqueFlower.id} className="flowerListInDistributors">
                                                    <div key="flower">{uniqueFlower.flower.color} {uniqueFlower.flower.name}</div>
                                                    <div key="currency" className="flower_cost">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                                        .format(uniqueFlower.price + ((uniqueFlower.price + ((uniqueFlower.price) * (matchedDistributor.markUp / 100))) * (retailer.markUp / 100)), 1)}</div>
                                                </li>
        
                                            </>
        
                                        })}
        
        
                                    </ul>
                                        <div className="matchedDistributors">Distributor: {matchedDistributor.name}</div>
                                        <div className="matchedNurseries">Nurseries:</div>
                                    <ul>
                                        {
                                            matchedNurseries.map(match => {
        
                                                return <>
                                                <li key={match.id} className="distributorRetailers">
                                                    <div>{match.nursery.name}</div>
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