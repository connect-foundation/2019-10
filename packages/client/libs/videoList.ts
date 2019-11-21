export const chunkVideoList = (videos, itemsPerChunk) => {
  return videos.reduce((acc, next, index) => {
    const chunkIndex = Math.floor(index / itemsPerChunk);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(next);

    return acc;
  }, []);
};
