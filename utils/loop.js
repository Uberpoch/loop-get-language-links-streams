const { streamsCall, langLinks } = require('./call');

exports.getStreamLoop = async(token, hubId) => {
  let url = `https://v2.api.uberflip.com/hubs/${hubId}/streams?limit=100`;
  let array = [];
  let page = 0;
  let totalPages = 0;

do{
    let res = await streamsCall(token, url);
    totalPages = res.meta.total_pages;
    page++;
    url = res.meta.next_page;
    console.log(`called: page ${page} of ${totalPages}`);
    array = array.concat(res.data);
    console.log(`array length: ${array.length}`);

  } while (page < totalPages)
  
  return array;
};

exports.langLoop = async(token, array) => {
  let result = [];

  for(let i = 0; i < array.length; i++) {
    let res = await langLinks(token, array[i]);
    let metaCount = res.meta.count;
    let obj = array[i];
    // console.log(res.data.data[0]);
    if(metaCount > 0){
      for(let i = 0; i < metaCount; i++) {
        obj[res.data[i].item.locale.code] = res.data[i].item.id;
        obj[res.data[i].item.locale.code + "_name"] = res.data[i].item.title;
      }
    }

    result.push(obj)
  }
  
  return result;
};