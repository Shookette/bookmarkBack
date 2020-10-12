const MarkerRepository = require('../../../repositories/v1/marker/markerRepository');
const MarkerService = require('../../../services/marker');

class MarkerController {
  constructor(router) {
    this.router = router;
    this.markerService = new MarkerService();
    this.markerRepository = new MarkerRepository();
  }

  getAllMarkers = () => {
    this.router.get('/', async (req, res) => {
      try {
        const markers = await this.markerRepository.findAll();
        res.status(200).json(markers);
      } catch (error) {
        res.status(501).json(error);
      }
    });
  }

  getOneMarkerById = () => {
    this.router.get('/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const marker = await this.markerRepository.findById(id);
        res.status(200).json(marker);
      } catch (error) {
        res.status(501).json(error);
      }
    });
  }

  putMarker = () => {
    this.router.put('/', async (req, res) => {
      const data = req.body;
      try {
        const exist = await this.markerRepository.findByUrl(data.url);
        if (exist) {
          const marker = await this.markerRepository.updateById(id, data);
          res.status(204).json(marker.toJSON());
        } else {
          const data = req.body;

          if (!data.url) {
            res.status(501).json();
          } 
    
          const type = this.markerService.getTypeByUrl(data.url);
          let oembedData = await this.markerService.getMoreDetailByUrl(data.url, type);
          oembedData = { 
            ...oembedData.data,
            type: type, 
            base_url: data.url 
          };

          const newMarker = this.markerService.formatDataByType(type, oembedData);
          const marker = await this.markerRepository.create(newMarker);
          res.status(200).json(marker.toJSON());
        }
      } catch (error) {
        res.status(501).json(error);
      }
    });
  }

  postMarker = () => {
    this.router.post('/', async (req, res) => {
      try {
        const data = req.body;

        if (!data.url) {
          res.status(501).json();
        } 
  
        const type = this.markerService.getTypeByUrl(data.url);
        let oembedData = await this.markerService.getMoreDetailByUrl(data.url, type);
        oembedData = { 
          ...oembedData.data,
          type: type, 
          base_url: data.url 
        };

        const newMarker = this.markerService.formatDataByType(type, oembedData);
        const marker = await this.markerRepository.create(newMarker);
        res.status(200).json(marker.toJSON());
      } catch (error) {
        res.status(501).json(error);
      }
    });
  }

  patchMarker = () => {
    this.router.patch('/:id', async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      try {
        const marker = await this.markerRepository.updateById(id, data);
        res.status(200).json(marker.toJSON());
      } catch (error) {
        res.status(501).error(error);
      }
    });
  }

  deleteMarker = () => {
    this.router.delete('/:id', async (req, res) => {
      const { id } = req.params;
      try {
        await this.markerRepository.deleteById(id);
        res.status(204).json({});
      } catch (error) {
        res.status(501).json(error);
      }
    });
  }

  getRoutes = () => {
    this.getAllMarkers();    
    this.getOneMarkerById();
    this.putMarker();
    this.postMarker();
    this.patchMarker();
    this.deleteMarker();

    return this.router;
  }
}

module.exports = MarkerController;