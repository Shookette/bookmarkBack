const axios = require("axios");

class MarkerService {
  getTypeByUrl = url => {
    const pathElements = url.split('/');
    const domain = pathElements[2];

    console.log(pathElements);
    console.log(domain);

    switch (domain) {
      case 'vimeo.com':
      case 'www.vimeo.com':
        return 'video';
      case 'live.staticflickr.com':
      case 'www.live.staticflickr.com':
      case 'flickr.com':
      case 'www.flickr.com':
        return 'photo';
      default:
        return '';
    }
  }

  getMoreDetailByUrl = async (url, type) => {
    switch (type) {
      case 'video':
        return axios.get(`https://vimeo.com/api/oembed.json?url=${url}`)
      case 'photo':
        return axios.get(`http://flickr.com/services/oembed?format=json&url=${url}`)
      default:
        return [];
    }
  }

  formatDataByType = (type, data) => {
    switch (type) {
      case 'video':
        return {
          url: data.base_url,
          title: data.title,
          type: data.type,
          author: data.author_name,
          date: data.upload_date,
          lenght: data.duration,
          height: data.height,
          width: data.width
        }
      case 'photo':
        return {
          url: data.url,
          title: data.title,
          type: data.type,
          author: data.author_name,
          date: data.upload_date,
          height: data.height,
          width: data.width
        }
      default:
        return {};
    }
  }
}

module.exports = MarkerService;