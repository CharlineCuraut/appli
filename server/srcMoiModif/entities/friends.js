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
            resolve(newDoc._id)
          }
        })
    }); 
  }

  exists(userid1, userid2) {
    return new Promise((resolve, reject) => {
      this.db.find({userid1: userid1, userid2: userid2}, (err, docs) => {
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

  // hasFriends(userid) {
  //   return new Promise ((resolve, reject) => {
  //     this.db.find({userid1:userid}, (err, docs) => {
  //       if (err) reject(err);
  //       else {
  //         if (docs[0]) resolve(true)
  //         else resolve(false)
  //       }
  //     })
  //   })
  // }

  listeFriends(userid){
    return new Promise ((resolve, reject) => {
      this.db.find({userid1:userid}, {userid2:1, _id:0}, (err, docs) => {
        if(err){
          // console.log("l'erreur est ici")
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })
  }

  delete(userid1, userid2){
    return new Promise ((resolve, reject) => {
      this.db.remove ({userid1:userid1, userid2: userid2}, (err, removed) => {
        if (err){
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}

exports.default = Friends;