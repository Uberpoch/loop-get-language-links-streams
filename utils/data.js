exports.sortStreams = async(array) => {
  const result = await array.map(stream => {
    let obj = {
      id: stream.id,
      title: stream.title,
    };
    return obj;
  })
  return result;
};