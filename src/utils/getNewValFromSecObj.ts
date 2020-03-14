export default (obj1: any, obj2: any) => {
  const newObj: any = {};
  Object.keys(obj1).filter(obj1keys => {
    if (obj1[obj1keys] !== obj2[obj1keys]) {
      newObj[obj1keys] = obj2[obj1keys];
    }
  });
  return newObj;
};
