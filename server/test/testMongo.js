console.log("Hello world")

//Q3
var Datastore = require('nedb');

db = {}
db.messages = new Datastore()
db.users = new Datastore()
db.amis = new Datastore()

db.messages.loadDatabase()

// mettre un filename en option (voir la doc)


// Q4, Q5
mes = {
    id_auteur : 155,
    message: 'Mon message',
    date: new Date(),
    likes : [
        { id_liker : 28 },
        { id_liker : 103 }
    ]
}

db.messages.insert(mes);
db.messages.insert({
    id_auteur : 103,
    message: 'Mon 2e message',
    date: new Date(Date.now() - 2000*60*60),
    likes : []
});
db.messages.insert({
    id_auteur : 198,
    message: 'Mon 3e message',
    date: new Date(),
    likes : []
});

//Q6

db.messages.find({}, (err, docs) => {
    if (err) {
        console.log(err)
    } else {
        console.log(docs)
    }
})

//find fonctionne comme une barre de recherche par matching

//Q7

db.messages.find({}, {message : 1, _id : 0}, (err, docs) => {
    console.log('\n***Q7***')
    if (err) {
        console.log(err)
    } else {
        console.log(docs)
    }
})

// _id s'affiche tjrs, pour ne pas l'afficher on doit mettre "_id : 0"

//Q8
db.messages.find({id_auteur : 155}, 
                { message: 1, _id : 0},
                (err, docs) => {
                    console.log("\n***Q8***")
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(docs)
                    }
                })

// Q9

const getDocumentID = function (id_auteur, texte) {
    return new Promise((resolve, reject) => {
        db.messages.find({id_auteur : id_auteur, message : texte},
        {_id : 1},
        (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs[0]._id)
            }
        }
    )})
}

getDocumentID(155, "Mon message").then((res)=>{
    console.log("\n***Q9***")
    console.log(res)
})

//Q10

getDocumentID(155, "Mon message").then((res)=>{
    db.messages.find({_id : res}, {message : 1, _id : 0},
        (err, docs)=>{
            console.log("\n***Q10***")
            console.log(docs)
        })

})

console.log(new Date())

//Q11

db.messages.find({ date : {$gt : new Date(Date.now() - 1000*60*60)}}, 
                (err, docs)=>{
                    console.log("\n***Q11***")
                    console.log(docs)
                })

//Q12
db.messages.find( {id_auteur : {$in : [155, 198]}}, 
    (err, docs) => {
        console.log("\n***Q12***")
        console.log(docs)
    })
