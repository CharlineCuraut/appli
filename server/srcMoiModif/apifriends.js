const express = require("express");
const session = require("express-session")
const Friends = require("./entities/friends.js")
const Users = require("./entities/users.js");

function init(db, dbFriends) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    

    const friends = new Friends.default(dbFriends)
    const users = new Users.default(db);

    router
        .route("/user/:user_id/friends")

    //GET_LIST_FRIENDS
        .get((req, res) => {
            users.get(req.params.user_id)
                .then(user => {
                    if(!user){
                        res.status(401).json({
                            status: 401,
                            message: "Cet utilisateur n'existe pas"
                        });
                        return;
                    }
                    friends.listeFriends(req.params.user_id)
                        .then(async(friends) => {
                            let liste = []
                            for (let i = 0; i<friends.length; i++){
                                liste.push((await users.get(friends[i].userid2)).login)
                            }
                            res.status(200).send(liste)})
                        .catch(() => res.status(500).send("erreur"))
                    
                })
                .catch(e=>res.status(500).send(e))
        })

    // //GET_LIST_FRIENDS
    //     .get(async (req,res) => {
    //         let idUser = req.params.user_id;

    //         if(!await users.get(idUser)) {
    //             res.status(401).json({
    //                 status: 401,
    //                 message: "utilisateur inconnu"
    //             });
    //             return;
    //         }

    //         if(!await friends.hasFriends(idUser)){
    //             res.status(401).json({
    //                 status: 401,
    //                 message: "cet utilisateur n'a pas d'amis !"
    //             });
    //             return;
    //         }




    //     })

    //GET_FRIEND_RELATIONSHIP
    router
        .route("/user/:user_id1/friend/:user_id2")
        .get(async (req, res) => {
            try{    
                if(!await users.get(req.params.user_id1)) {
                    res.status(401).json({
                        status: 401,
                        message: "user id1 inconnu"
                    });
                    return;
                }
                if(!await users.get(req.params.user_id2)) {
                    res.status(401).json({
                        status: 401,
                        message: "user id2 inconnu"
                    });
                    return;
                }
                friends.exists(req.params.user_id1, req.params.user_id2)
                    .then(e => {
                        res.status(200).json({
                            status: 200,
                            message: e
                        });
                    }
                )
            }
            catch (e) {
                res.status(500).send(e);
            }
        })

    //CREATE_FRIEND
        .post(async(req, res) => {
            try{
                if(!await users.get (req.params.user_id1)||!await users.get(req.params.user_id2)) {
                    res.status(401).json({
                        status: 401,
                        message: "Utilisateur inconnu"
                    });
                    return;
                }
                if (req.params.user_id2 === req.params.user_id1) {
                    res.status(402).send("On ne peut pas se suivre soi-même");
                    return;
                }
                if (await friends.exists(req.params.user_id1, req.params.user_id2)) {
                    res.status(403).send("Vous êtes déja amis");
                    return;
                }
                friends.create(req.params.user_id1, req.params.user_id2)
                    .then((user_id) => res.status(200).send({ id: user_id }))
                    .catch((err) => res.status(500).send(err));
            
            }
            catch (e) {
                res.status(500).send(e);
            }
        })

    //DELETE_FRIEND 
        .delete(async (req, res) => {
            try {
                if(!await users.get (req.params.user_id1)||!await users.get(req.params.user_id2)) {
                    res.status(401).json({
                        status: 401,
                        message: "Utilisateur inconnu"
                    });
                    return;
                }
                if (!await friends.exists(req.params.user_id1, req.params.user_id2)) {
                    res.status(402).json({
                        status: 404,
                        message: "Vous n'êtes pas amis"
                    });
                } else {
                    await friends.delete(req.params.user_id1, req.params.user_id2);
                    res.send(`user ${req.params.user_id1} unfollowed user ${req.params.user_id2}`)                
                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;