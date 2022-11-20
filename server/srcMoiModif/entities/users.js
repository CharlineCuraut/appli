class Users {
  constructor(db) {
    this.db = db
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      this.db.insert({
        login: login,
        password: password,
        lastname: lastname,
        firstname: firstname
        }, (err, newDoc) => {
          if (err){
            reject(err)
          } else {
            resolve(newDoc._id)
          }
        })
    });
  }


  get(userid) {
    return new Promise((resolve, reject) => {
        this.db.find({_id: userid}, (err, docs) => {
          if (err) {
            reject(err)
          } else {
            resolve(docs[0])
          }
      });
    });
  }

  getIdWithLogin(userLogin) {
    return new Promise((resolve, reject) => {
      this.db.find({login: userLogin}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs[0]['_id'])
        }
    });
  });
  }

  // getUserId(login, password) {
  //   return new Promise((resolve, reject) => {
  //     this.db.find({login: login, password: password}, (err, docs) => {
  //       if (err) reject(err);
  //       else resolve(docs[0]._id);
  //     })
  //   })
  // }


  async exists(login) {
    return new Promise((resolve, reject) => {
      this.db.find({login: login}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          if (docs[0]){
            resolve(true)
          } else {
            resolve(false)
          }
        }
      });
    });
  }

  async existsWithId(idUser) {
    return new Promise((resolve, reject) => {
      this.db.find({_id: idUser}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          if (docs[0]) resolve(true)
          else resolve(false) 
        }
      });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.find({login: login}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          if (docs[0]["password"]===password){
            resolve(docs[0]["_id"])
          } else {
            resolve(false)
          }
        }
      })
    });
  }

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

  delete(userid){
    return new Promise ((resolve, reject) => {
      this.db.remove ({_id: userid}, {}, (err, removed) => {
        if (err){
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

}

exports.default = Users;

