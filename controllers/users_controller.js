const logger = require('../config/logger');
const Users = require('../models/users');
const DeleteUserJob = require('../jobs/delete_user');

class UsersController {
  static async index(req, res) {
    logger.info("UsersController.index.params", req.query);
    const { limit } = req.query;

    try{
      const result = await Users.find().limit(Number(limit) || 10);
      return res.json(result);
    }catch(err){
      console.debug(err);
      return res.status(400).json({ errors: err });
    }
  }

  static async show(req, res) {
    logger.info("UsersController.show.params", req.params);

    try{
      const result = await Users.findOne({ _id: req.params.id });
      return res.json(result || {});
    }catch(err){
      console.debug(err);
      return res.status(400).json({ errors: err });
    }
  }

  static async create(req, res) {
    logger.info("UsersController.create.params", req.body);

    try{
      const result = await Users.create(req.body);
      return res.status(201).json(result);
    }catch(err){
      console.debug(err);
      return res.status(400).json({ errors: err.errors });
    }
  }

  static async update(req, res) {
    logger.info("UsersController.update.params", req.body);

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
    logger.info("UsersController.delete.params", req.params);

    try {
      const result = await Users.deleteOne({ _id: req.params.id });
      return res.json(result);
    } catch (error) {
      console.debug(error);
      return res.status(400).json({ errors: error.message });
    }
  }

  static async destroy(req, res) {
    logger.info("UsersController.destroy.params", req.body);

    try {
      DeleteUserJob.add({ userIds: req.body.userIds });
      return res.json({ message: "Job created" });
    } catch (error) {
      console.debug(error);
      return res.status(400).json({ errors: error });
    }
  }
}

module.exports = UsersController;