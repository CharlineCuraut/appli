const express = require("express");
const Messages = require("./entities/messages.js");

function init(dbMessages) {
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

    router
        .route("/user/:user_id(\\d+)/message")
        //CREATE_MESSAGE
        .post((req, res) => {
            const { idMessage, message, date, idUser } = req.body;
            if (!message) {
                res.status(400).send("Missing fields");
            } else {
                messages.create(idMessage, message, date, idUser)
                    .then((idMessage) => res.status(201).send({ id: idMessage }))
                    .catch((err) => res.status(500).send(err));
            }
        })

        //SET_MESSAGE
        .put((req, res) => {
            const { idMessage, message, date, idUser } = req.body;
            if (!message) {
                res.status(400).send("Missing fields");
            } else {
                messages.modify(idMessage, message, date, idUser)
                    .then((idMessage) => res.status(201).send({ id: idMessage }))
                    .catch((err) => res.status(500).send(err));
            }
        })

    return router;
}
exports.default = init;
