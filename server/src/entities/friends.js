class Friends {
  constructor(db) {
    this.db = db   
  }

  create(userid1, userid2) {
    return new Promise((resolve, reject) => {
      this.db.insert({
        userid1: userid1,
        userid2: userid2
        }, (err, newDoc) => {
          if (err){
            reject(err)
          } else {
            resolve(newDoc.userid1)
          }
        })
    });
  }

  async exists(userid) {
    return new Promise((resolve, reject) => {
      this.db.find({_id: userid}, (err, docs) => {
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
}

exports.default = Friends;