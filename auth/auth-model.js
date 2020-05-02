const db = require("../database/dbConfig.js")

async function add(creds){
    const [id]  = await db("users").insert(creds)

    return findBy({id})
}

function findBy(filter){
    return db("users").where(filter).first()
}

function find(){
    return db("users")
}


module.exports = {
    add,
    findBy,
    find,

}