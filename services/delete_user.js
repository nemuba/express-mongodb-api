const Users = require('../models/users');

class DeleteUser{

  static async execute(id){
    try{
      const user = await Users.deleteOne({_id: id});
      return user;
    }catch(err){
      throw err;
    }
  }
}

module.exports = DeleteUser;