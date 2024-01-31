


function getConnection(db){
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if(err){
                reject(err);
            } else {
                resolve(connection);
            }
        })
    })
}

module.exports = getConnection;