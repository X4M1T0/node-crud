

function makeQuery(db, query, data){
    return new Promise((resolve, reject) => {
        db.query(query, data, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = makeQuery;