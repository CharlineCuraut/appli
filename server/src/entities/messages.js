class Messages {
  constructor(db) {
    this.db = db
  }

  create(msg, d, user_id, user_login) {
    return new Promise((resolve, reject) => {
      this.db.insert({
        message : msg,
        date : d,
        idUser : user_id,
        loginUser : user_login,
        cptFakeNews : 0
      }, (err, newDoc) => {
        if (err) reject(err)
        else resolve(newDoc._id)
      })
    });
  }

  existsForUser(msg, user_id) {
    console.log("msg reçu par existsForUser : " + msg);
    console.log("idUser reçu par existsForUser : " + user_id);
    return new Promise((resolve, reject) => {
      this.db.find({message: msg, idUser: user_id}, (err,docs) => {
        if (err) reject(err);
        else {
          if (docs[0]) {
            console.log("j'ai docs[0] : " + docs[0]);
            resolve(true)
          } else { 
            console.log("je n'ai rien récupéré mais je n'ai pas eu d'erreurs non plus");
            resolve(false) 
          }
        }
      })
    })
  }

  getCpt(msg, user_id) {
    return new Promise((resolve,reject) => {
      this.find({message: msg, idUser: user_id}, (err, docs) => {
        if (err) reject(err);
        else {
          resolve(docs[0]['cptFakeNews'])
        }
      })
    })
  }

  modifyCpt(msg, user_id, cpt) {
    return new Promise((resolve,reject) => {
      this.db.update({message: msg, idUser: user_id}, {$set: {message : msg, idUser: user_id, cptFakeNews: cpt+1} }, {}, (err,numReplaced) => {
        if (err) reject(err);
        else resolve(numRemplaced);
      })
    })
  }

  modify(old_message, user_id, new_message) {
    return new Promise((resolve,reject) => {
      this.db.update({message: old_message, idUser: user_id}, { $set: {message: new_message, idUser: user_id} }, {}, (err, numRemplaced) => {
        if (err) reject(err);
        else resolve(numRemplaced);
      })
    })
  }

  deleteWithMsg(user_id, msg) {
    return new Promise((resolve,reject) => {
      this.db.remove({message: msg, idUser: user_id}, {}, (err, numRemoved) => {
        if (err) reject(err);
        else resolve(numRemoved);
      })
    })
  }

  delete(user_id, message_id) {
    return new Promise((resolve,reject) => {
      this.db.remove({_id: message_id, idUser: user_id}, {}, (err, numRemoved) => {
        if (err) reject(err);
        else resolve(numRemoved);
      })
    })
  }

  getAffichage(nbAffichage) {
    return new Promise((resolve, reject) => {
      this.db.find({})
        .sort({date : -1, cptFakeNews : {$gte: 10}})
        .limit(nbAffichage)
        .exec((err, docs) => {
          if (err) reject(err)
          else resolve(docs);
        })
    })
  }

  countForUser(user_id) {
    return new Promise((resolve,reject) => {
      this.db.count({idUser: user_id}, (err, count) => {
        if (err){
          reject (err)
        } else {
          resolve (count)
        }
      })
    })
  }

  getAffichageQqn(qqn_id, nbAffichage) {
    return new Promise ((resolve,reject) => {
      this.db.find({idUser: qqn_id})
        .sort({date: -1})
        .limit(nbAffichage)
        .exec((err, docs) => {
          if (err) reject(err)
          else resolve(docs);
        })
    })
  }

  messagesOfUser(user_id) {
    return new Promise((resolve, reject) => {
      this.db.find({idUser: user_id}, (err,docs) => {
        if (err) reject(err);
        else {
          if (docs[0]) {
            // console.log("j'ai docs[0] : " + docs[0]);
            resolve(true)
          } else { 
            // console.log("je n'ai rien récupéré mais je n'ai pas eu d'erreurs non plus");
            resolve(false) 
          }
        }
      })
    })
  }

  // get(messageId) {
  //   return new Promise((resolve, reject) => {
  //       this.db.find({_id: messageId}, (err, docs) => {
  //         if (err) {
  //           reject(err)
  //         } else {
  //           resolve(docs[0])
  //         }
  //     });
  //   });
  // }

  count(){
    return new Promise ((resolve, reject) => {
      this.db.count({}, (err, count) => {
        if (err){
          reject (err)
        } else {
          resolve (count)
        }
      })
    })
  }

}

exports.default = Messages;