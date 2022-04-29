class Messages {
  constructor(db) {
    this.db = db
  }

  create(idMessage, message, date, idUser) {
    return new Promise((resolve, reject) => {
      let idMessage = 30; // À remplacer par une requête bd
      if(false) {
        //erreur
        reject();
      } else {
        resolve(idMessage);
      }
    });
  }
}

exports.default = Messages;