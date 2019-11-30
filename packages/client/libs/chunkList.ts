export const chunkList = (list, itemsPerChunk: number) => {
  return list.reduce((acc, next, index) => {
    const chunkIndex = Math.floor(index / itemsPerChunk);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(next);

    return acc;
  }, []);
};
