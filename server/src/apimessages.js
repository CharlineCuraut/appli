const express = require("express");
const Messages = require("./entities/messages.js");
const Users = require("./entities/users.js");

function init(dbMessages, dbUsers) {
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
    
    const messages = new Messages.default(dbMessages);
    const users = new Users.default(dbUsers);

    router.route("/user/:user_id/messages")
        //CREATE_MESSAGE
        .post(async (req,res) => {
            const {message} = req.body;
            const idUser = req.params.user_id;
            
            if (! await users.existsWithId(idUser)) {
                res.status(401).json({
                    status: 401,
                    message: "Unknown User(s)"
                });
                return;
            }
            if (!message) {
                res.status(400).json({
                    status: 400,
                    message: "Missing fields"
                });
                return;
            }

            let user = await users.get(idUser);
            const loginUser = user['login'];
            messages.create(message, new Date().toLocaleDateString(), idUser,loginUser)
                .then((id_message) => {res.status(201).json({
                    id : id_message
                })})
                .catch((err) => res.status(500).send(err));
            return;
        })

        //SET_MESSAGE
        .put( async (req,res) => {
            try {
                const {new_message, old_message} = req.body;
                const idUser = req.params.user_id;

                if (!new_message || !old_message) {
                    res.status(400).json({
                        status: 400,
                        message: "Missing fields"
                    });
                    return;
                }

                const userExists = await users.existsWithId(idUser)
                if (!userExists) {
                    res.status(401).json({
                        status: 401,
                        message: "Unknown User(s)"
                    });
                    return;
                }

                const messageExists = await messages.existsForUser(old_message, idUser)
                if (!messageExists) {
                    res.status(401).json({
                        status: 401,
                        message: "message does not exist"
                    });
                    return;
                }

                await messages.modify(old_message, idUser, new_message)
                    .then((num) => {
                        if (num === 1) {
                            res.status(200).json({message: new_message});
                        } else {
                            res.status(401).json({
                            status : 401,
                            message : "A mysterious pb occured"
                            })
                        }
                    })
                    .catch((err) => res.status(500).send(err));
                return;

            } catch (e) {
                // Toute autre erreur
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (e || "Erreur inconnue").toString()
                });
            }
        })

    //DELETE_MESSAGE
    router.delete("/user/:user_id/messages/:message_id", async (req,res) => {
        try {
            const {message} = req.body;
            const idUser = req.params.user_id;

            if (!message) {
                res.status(400).json({
                    status: 400,
                    message: "Missing fields"
                });
                return;
            }

            const userExists = await users.existsWithId(idUser);
            if (!userExists) {
                res.status(401).json({
                    status: 401,
                    message: "Unknown User(s)"
                });
                return;
            }

            const messageExists = await messages.existsForUser(message, idUser);
            if (!messageExists) {
                res.status(401).json({
                    status: 401,
                    message: "message does not exist"
                });
                return;
            }

            const idMessage = req.params.message_id;
            await messages.delete(idUser, idMessage)
            .then((num) => {
                if (num === 1) res.status(200).json({
                    status : 200,
                    message: "message " + idMessage + " deleted"
                });
                else res.status(401).json({
                    status : 401,
                    message : "A mysterious pb occured"
                })
            })
            .catch((err) => res.status(500).send(err));

            return;
        } catch (e) {
            res.status(500).send(e);
        }
    })

    //GET_LIST_MESSAGE
    .get("/messages/getNMessages/:nbAffichage", async (req,res) => {
        try {
            const nbAffichage = req.params.nbAffichage;
            await messages.getAffichage(nbAffichage)
                .then((liste) => {
                    res.status(200).send(liste)
                })
                .catch((err) => {
                    res.status(500).send(err)}
                );
        } catch (e) {
            res.status(500).send(e);
        }
    })

    router.put("messages/fromUser/:user_login", async (req,res) => {
        const idUser = req.params.user_login;
        const {msg} = req.body;

        if (! await messages.existsForUser(msg, idUser)) {
            res.status(401).json({
                status: 401,
                message: "Unknown Message"
            });
            return;
        }

        const cpt = await messages.getCpt(msg, idUser);

        await messages.modifyCpt(msg, idUser, cpt)
            .then((num) => {
                if (num === 1) res.status(200).json({
                    status : 200,
                    message: "cptFakeNews incrémenté !"
                });
                else res.status(401).json({
                    status : 401,
                    message : "A mysterious pb occured"
                })
            })
            .catch((err) => {
                res.status(500).send(err)}
            )
    })

    //GET_LIST_MESSAGE_FROM_A_USER
    router.get("/messages/getNmessages/:nbAffichage/fromUser/:user_login", async (req,res) => {
        const nbAffichage = req.params.nbAffichage;
        const loginUser = req.params.user_login;
        
        const userExists = await users.exists(loginUser)
        if (!userExists) {
            res.status(401).json({
                status: 401,
                message: "Unknown User"
            });
            return;
        }

        const idQqn = await users.getIdWithLogin(loginUser)
        const messageExists = await messages.messagesOfUser(idQqn);
        if (!messageExists) {
            res.status(401).json({
                status: 401,
                message: "User has no messages"
            });
            return;
        }

        await messages.getAffichageQqn(idQqn, nbAffichage)
            .then((liste) => {
                res.status(200).send(liste)
            })
            .catch((err) => {
                res.status(500).send(err)}
            );
    })


    // //GET_LIST_MESSAGE_FROM_FRIEND
    // router.get("/user/:user_id/messages/:friend_id", async (req,res) => {
    //     const {nbAffichage} = req.body;
    //     const idUser = req.params.user_id;
    //     const idFriend = req.params.friend_id;

    //     const userExists = await users.existsWithId(idUser);
    //     if (!userExists) {
    //         res.status(401).json({
    //             status: 401,
    //             message: "Unknown User(s)"
    //         });
    //         return;
    //     }

    //     // const friendExists = await friends.existsWithId(idFriend, idUser);
    //     // if (!friendExists) {
    //     //     res.status(401).json({
    //     //         status: 401,
    //     //         message: "Friend unknown to User"
    //     //     });
    //     //     return;
    //     // }

    //     await messages.getAffichageQqn(idFriend, nbAffichage)
    //         .then((liste) => {
    //             res.status(200).send(liste)
    //         })
    //         .catch((err) => {
    //             res.status(500).send(err)}
    //         );
    // })


    // //GET_LIST_MESSAGE_FROM_ALL_FRIEND
    // router.get("/user/:user_id/messages/friends", (req,res) => {
    //     const idUser = req.params.user_id;

    //     const userExists = await users.existsWithId(idUser);
    //     if (!userExists) {
    //         res.status(401).json({
    //             status: 401,
    //             message: "Unknown User(s)"
    //         });
    //         return;
    //     }

    //     // const userHasFriends = await friends.hasFriends(idUser);
    //     // if (!userHasFriends) {
    //     //     res.status(401).json({
    //     //         status: 401,
    //     //         message: "User has no friends"
    //     //     });
    //     //     return;
    //     // }

    //     const messageExists = await messages.messagesOfUser(idFriend);
    //     if (!messageExists) {
    //         res.status(401).json({
    //             status: 401,
    //             message: "Friend has no messages"
    //         });
    //         return;
    //     }

    //     //pas fini : faire une boucle sur la liste des amis de User pour afficher les messages de chaque ami
    // })


    //GET_INFO_MESSAGE_USER
    router.get("/user/:user_id/infos", async (req,res) => {
        const idUser = req.params.user_id;

        const userExists = await users.existsWithId(idUser);
        if (!userExists) {
            res.status(401).json({
                status: 401,
                message: "Unknown User"
            });
            return;
        }

        await messages.countForUser(idUser)
            .then((nb_mess) => {
                res.status(200).json({
                    count : nb_mess
                })
            })
            .catch((err) => res.status(500).send(err));
    })


    //GET_INFO_ALL_MESSAGES
    router.get("/infos", async (req, res) => {
        try {
            await messages.count()
                .then((nb_mess) => {
                    res.status(200).json({
                        count : nb_mess
                    })
                })
                .catch((err) => res.status(500).send(err));
        }
        catch (e) {
            res.status(500).send(e);
        }
    })


    return router;
}
exports.default = init;

