const User = require('../../../models/marker');

class MarkerRepository {
  findAll = async () => {
    return await User.find();
  };

  findById = async id => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  };

  findByUrl = async url => {
    return await User.findOne({ url: url });
  };

  create = async data => {
    return await User.create(data);
  };

  updateById = async (id, data) => {
    const marker = await User.findById(id);
    if (marker) {
      Object.keys(data).forEach(element => {
        if (!!data[element]) {
          marker[element] = data[element];
        }
      })
      return await marker.save();
    } else {
      throw "this marker doesn't exist";
    }
  };

  deleteById = async id => {
    return await User.deleteOne({ _id: id });
  };
}

module.exports = MarkerRepository;