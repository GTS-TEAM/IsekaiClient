import { v4 as uuidv4 } from 'uuid';

export const convertResPhotos = (arrPostPhotos: any[]) => {
  const newData: any = [];
  arrPostPhotos.forEach((d: any) => {
    d.image.forEach((img: any, index: any) => {
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
