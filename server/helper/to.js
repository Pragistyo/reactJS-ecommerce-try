const to = (promise) => {
    return promise
    .then(data => ([undefined, data]) ) //resolve
    .catch( err => ([error, undefined]) ) //reject
}

module.exports = to