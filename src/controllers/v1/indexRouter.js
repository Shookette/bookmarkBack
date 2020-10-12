const MarkerController = require('./marker/marker');
const express = require('express');

class IndexRouter {
  constructor(router) {
    this.router = router ;
  };

  getMainRoute = () => {
    const markerRouter = new MarkerController(this.router);
    this.router.get('/v1', async (req, res) => {
      res.status(200).json({
        name: 'API',
        version: '1.0',
        status: 200,
        message: 'V1 API'
      })
    })

    this.router.use('/v1/marker', markerRouter.getRoutes());
    return this.router
  }
}

module.exports = IndexRouter;