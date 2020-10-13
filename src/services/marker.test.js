const marker = require("../models/marker");
const MarkerService = require("./marker");

describe('Marker Service test' , () => {

  let markerService;

  beforeEach(() => {
    markerService = new MarkerService();
  })
  
  test('GetTypeByUrl', () => {
    const params = "http://www.vimeo.com";
    const result = markerService.getTypeByUrl(params);
    expect(result).toBe('video');
  })

  test('GetTypeByUrl with bad param', () => {
    const params = "http://www.google.com";
    const result = markerService.getTypeByUrl(params);
    expect(result).toBe('');
  })

  test('GetTypeByUrl without params', () => {
    const result = markerService.getTypeByUrl();
    expect(result).toBe('');
  })

  test('getMoreDetailByUrl with bad param', async () => {
    const result = await markerService.getMoreDetailByUrl('', '');
    expect(result).toStrictEqual([]);
  })

  test('getMoreDetailByUrl without param', async () => {
    const result = await markerService.getMoreDetailByUrl(null, null);
    expect(result).toStrictEqual([]);
  })

  test('formatDateToIso with specific date', () => {
    const date = "2020/10/10 00:00:00+00";
    const result = markerService.formatDateToIso(date);
    expect(result).toBe("2020-10-10");
  })

  test('formatDataByType with video', () => {
    const expected = {
      author: "",
      date: markerService.formatDateToIso(),
      height: "",
      duration: "",
      title: "",
      type: "",
      url: "",
      width: "",
    }

    const result = markerService.formatDataByType('video', null);
    expect(result).toStrictEqual(expected) 
  })

  test('formatDataByType with photo', () => {
    const expected = {
      author: "",
      date: markerService.formatDateToIso(),
      height: "",
      title: "",
      type: "",
      url: "",
      width: "",
    }

    const result = markerService.formatDataByType('photo', null);
    expect(result).toStrictEqual(expected) 
  })

  test('formatDataByType without param', () => {
    const result = markerService.formatDataByType('', null);
    expect(result).toStrictEqual({}) 
  })
})