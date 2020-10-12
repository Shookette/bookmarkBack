const mongoose = require('mongoose');

class MongoConnector {
  constructor() {
    this.clientOptions = {
      useNewUrlParser: true,
      dbName: 'projectAPI'
    }
  }

  initClientDbConnection = async () => {
    try {
      await mongoose.connect(process.env.URL_MONGO, this.clientOptions)
      console.log('Connected');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = MongoConnector;
