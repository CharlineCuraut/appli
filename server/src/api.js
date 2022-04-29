const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
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

    const users = new Users.default(db);

    //CREATE_USER
    router.put("/user", async (req, res) => {
        const { login, password, confirmpassword, lastname, firstname } = req.body;
        if (!login || !password || !confirmpassword || !lastname || !firstname) {
            res.status(400).send({ message: "Missing fields" })
            return;
        }
        if (await users.exists(login)) {
            res.status(401).json({
                status: 401,
                message: "Login déjà utilisé"
            });
            return;
        }
        if (password!==confirmpassword) {
            res.status(402).json({
                status: 402,
                message: "Mots de passe non identiques"
            });
            return;
        }
        users.create(login, password, lastname, firstname)
            .then((user_id) => res.status(201).send({ id: user_id }))
            .catch((err) => res.status(500).send(err));
        return;
    });

    // LOGIN
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).send({ message: "Requête invalide : login et password nécessaires" })
                return res;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    //LOGOUT
    router.delete("/user/:user_id/logout", (req, res) => {
        if (!req.session.userid === req.params.user_id) {
            res.status(404).json({
                status: 404,
                message: "Identifiant incorrect"
            });
        } else {
            req.session.userid = null
            res.status(200).json({
                status: 200,
                message: "Session fermée"
            });
        }
    });

    //GET_USER_INFO

    router.get("/user/infos", async (req, res) => {
        try {
            const nb_user = await users.count();
            res.send({count : nb_user});
        }
        catch (e) {
            res.status(500).send(e);
        }
    })


    router
        .route("/user/:user_id")
        //GET_USER
        .get(async (req, res) => {
            try {
                const user = await users.get(req.params.user_id);
                if (!user){
                    res.status(404).json({
                        status: 404,
                        message: "Utilisateur inconnu"
                    });
                } else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })
        //DELETE_USER
        .delete(async (req, res, next) => {
            try {
                if (!req.session.userid === req.params.user_id) {
                    res.status(404).json({
                        status: 404,
                        message: "Utilisateur inconnu"
                    });
                } else {
                    await users.delete(req.params.user_id);
                    res.send(`delete user ${req.params.user_id}`)                }
            }
            catch (e) {
                res.status(500).send(e);
            }
        });

    return router;
}
exports.default = init;

