

const bcrypt = require('bcrypt');


function generateHash(password){
    return new Promise((resolve, reject) => {
        const salt = 10;

        bcrypt.hash(password, salt, (err, result) => {
            if(err){
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = generateHash;