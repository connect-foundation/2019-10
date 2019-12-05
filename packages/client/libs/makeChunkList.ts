export const makeChunkList = (itemList, itemsPerChunks: number) => {
  return itemList.reduce((chunkList, item, index) => {
    const curItemPosition = Math.floor(index / itemsPerChunks);

    if (!chunkList[curItemPosition]) {
      chunkList[curItemPosition] = [];
    }

    chunkList[curItemPosition].push(item);

    return chunkList;
  }, []);
};
