const Users = require('../models/users');
const DeleteUserJob = require('../jobs/delete_user');

class UsersController {
  static async index(req, res) {
    console.debug("PARAMS", req.query);
    const { limit, userIds } = req.query;

    if(userIds){
      await DeleteUserJob.add({ userIds: userIds.split(',') });
    }
    
    const result = await Users.find().limit(Number(limit) || 10);
    return res.json(result);
  }

  static async show(req, res) {
    console.debug("PARAMS", req.params);
    const result = await Users.findOne({ _id: req.params.id });
    return res.json(result || {});
  }

  static async create(req, res) {
    console.debug("PARAMS", req.body);
    try{
      const result = await Users.create(req.body);
      return res.json(result);
    }catch(err){
      console.debug(err);
      return res.status(400).json({ errors: err.errors });
    }
  }

  static async update(req, res) {
    console.debug("PARAMS", req.params);
    try {
      const { id } = req.params;
      const result = await Users.updateOne({ _id: id }, { $set: req.body}, { upsert: true })
      return res.json(result);
    } catch (error) {
      console.debug(error);
      return res.status(400).json({ errors: error.errors }); 
    }
  }

  static async delete(req, res) {
    console.debug("PARAMS", req.params);

    try {
      const result = await Users.deleteOne({ _id: req.params.id });
      return res.json(result);
    } catch (error) {
      console.debug(error);
      return res.status(400).json({ errors: error.message });
    }
  }
}

module.exports = UsersController;