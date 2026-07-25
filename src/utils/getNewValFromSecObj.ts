const getNewValFromSecObj = (obj1: any, obj2: any) => {
	const newObj: any = {};
	for (const obj1keys of Object.keys(obj1)) {
		if (obj1[obj1keys] !== obj2[obj1keys]) {
			newObj[obj1keys] = obj2[obj1keys];
		}
	}
	return newObj;
};

export default getNewValFromSecObj;
