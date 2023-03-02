

export const getAllNurseries = () => {
    return fetch(`http://localhost:8088/nurseries`)
        .then(res => res.json())
}

export const getAllNurseryFlowers = () => {
    return fetch(`http://localhost:8088/nurseryFlowers?_expand=flower&_expand=nursery`)
        .then(res => res.json())
}

export const getAllDistributorNurseries = () => {
    return fetch(`http://localhost:8088/distributorNurseries?_expand=distributor&_expand=nursery`)
        .then(res => res.json())
}

export const getAllDistributors = () => {
    return fetch(`http://localhost:8088/distributors`)
        .then(res => res.json())
}

export const getAllFlowers = () => {
    return fetch(`http://localhost:8088/flowers`)
        .then(res => res.json())
}

export const getAllRetailers = () => {
    return fetch(`http://localhost:8088/retailers`)
        .then(res => res.json())
}

export const getAllPurchases = () => {
    return fetch(`http://localhost:8088/purchases`)
        .then(res => res.json())
}

export const postPurchase = (purchaseObj) => {
    return fetch(`http://localhost:8088/purchases`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(purchaseObj)
    })
        .then(res => res.json())
        .then(getAllPurchases)
}