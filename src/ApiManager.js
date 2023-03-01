

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

