const Users = require('../models/users');

class DeleteUser{

  static async execute(id){
    try{
      const user = await Users.deleteOne({_id: id});
      console.debug('User deleted: ', user);
    }catch(err){
      throw err;
    }
  }
}

module.exports = DeleteUser;