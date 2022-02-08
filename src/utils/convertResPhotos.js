import { v4 as uuidv4 } from 'uuid';

export const convertResPhotos = (arrPostPhotos) => {
  const newData = [];
  arrPostPhotos.forEach((d) => {
    d.image.forEach((img, index) => {
      newData.push({
        postId: d.id,
        id: uuidv4(),
        url: img,
        indexImg: index,
      });
    });
  });
  return newData;
};
