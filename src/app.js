const express = require('express');
const { mongo } = require('mongoose');
const cors = require('cors');  
const IndexRouter = require('./controllers/v1/indexRouter');
const MongoConnector = require('./db/mongo');

class Server {
  constructor(port, app) {
    this.port = port;
    this.app = app;
  }

  core = () => {
    const connector = new MongoConnector();
    connector.initClientDbConnection();
    
    const router = express.Router();
    const mainRouter = new IndexRouter(router);

    this.app.use(cors({
        exposedHeaders: ['Authorization'],
        origin: '*'
    }));

    this.app.use(express.json())
    this.app.use(mainRouter.getMainRoute())
    this.app.listen(this.port, () => {
      console.log("server's ready");
    });
  }
}


module.exports = Server;

const server = new Server(4000, express());
server.core();
