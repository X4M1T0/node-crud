

const bcrypt = require('bcrypt');

function compareHash(password, hashed){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, (err, result) => {
            if(err){
                reject(err);

            } else {
                resolve(result);
            }
        })
    })
}


module.exports = compareHash;