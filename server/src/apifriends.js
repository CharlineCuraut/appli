const express = require("express");
const Friends = require("./entities/friends.js")

function init(dbFriends) {
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


    //CREATE_FRIEND
    /*router.put("/user/:user_id/friends", (req, res) => {
        if (req.session.userid === req.params.user_id) {
            res.status(401).send("On ne peut pas se suivre soi-même");
        }
        if(! await users.exists(req.params.user_id)) {
            res.status(401).json({
                status: 401,
                message: "Utilisateur inconnu"
            });
            return;
        }
        if(await friends.exists(req.session.userid, req.params.user_id)) {
            res.status(401).json({
                status: 401,
                message: "Vous êtes déja amis"
            });
            return;
        } else {
            users.create(req.session.userid, req.params.user_id)
                .then((user_id) => res.status(200).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });*/


    //GET_LIST_FRIENDS
    router.get("/user/:user_id/friends", (req, res) => {

    }

    //GET_FRIEND_RELATIONSHIP
    //
    )
    return router;
}
exports.default = init;