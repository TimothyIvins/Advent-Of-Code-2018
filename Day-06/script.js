const input = `268, 273
211, 325
320, 225
320, 207
109, 222
267, 283
119, 70
138, 277
202, 177
251, 233
305, 107
230, 279
243, 137
74, 109
56, 106
258, 97
248, 346
71, 199
332, 215
208, 292
154, 80
74, 256
325, 305
174, 133
148, 51
112, 71
243, 202
136, 237
227, 90
191, 145
345, 133
340, 299
322, 256
86, 323
341, 310
342, 221
50, 172
284, 160
267, 142
244, 153
131, 147
245, 323
42, 241
90, 207
245, 167
335, 106
299, 158
181, 186
349, 286
327, 108`;

const createVectorArray = (inputData) => {

  const arrResult = [];
  let id = 0;

  inputData.split("\n").forEach(vector => {
    id++;
    arrResult.push(createVectorObject(vector, id));
  });

  return arrResult;

};

const createVectorObject = (vector, id) => {
  
  const objResult = {};
  const arrSplit = vector.split(',');

  if (arrSplit.length === 2) {
    objResult['id'] = id;
    objResult['x'] = Number(arrSplit[0]);
    objResult['y'] = Number(arrSplit[1]);
    objResult['infinite'] = false;
  };

  return objResult;
};

const defineGrid = (vectors) => {

  const objResult = {};

  vectors.forEach(vector => {
    if (!objResult['xMin']) {
      objResult['xMin'] = vector['x'];
      objResult['xMax'] = vector['x'];
      objResult['yMin'] = vector['y'];
      objResult['yMax'] = vector['y'];
    } else {
      objResult['xMin'] = (vector['x'] < objResult['xMin']) ? vector['x'] : objResult['xMin'];
      objResult['xMax'] = (vector['x'] > objResult['xMax']) ? vector['x'] : objResult['xMax'];
      objResult['yMin'] = (vector['y'] < objResult['yMin']) ? vector['y'] : objResult['yMin'];
      objResult['yMax'] = (vector['y'] > objResult['yMax']) ? vector['y'] : objResult['xMax'];
    }
  });

  return objResult; 
}

const calculateDistance = (vector1, vector2) => {
  return Math.abs(vector1['x'] - vector2['x']) + Math.abs(vector1['y'] - vector2['y']);
};

const closestVector = (point, vectors) => {
  
  const objClosest = {};
  let distance = 0;
  
  for (let i = 0; i < vectors.length; i++) {
    
    distance = calculateDistance(point, vectors[i]);
 
    if (distance === 0) return vectors[i]['id'];

    if (!objClosest['id']) {
      objClosest['id'] = vectors[i]['id'];
      objClosest['distance'] = distance;
      objClosest['occurs'] = 1;
      continue;
    };

    if (distance === objClosest['distance']) {
      objClosest['occurs']++;
    } else if (distance < objClosest['distance']) {
      objClosest['id'] = vectors[i]['id'];
      objClosest['distance'] = distance;
      objClosest['occurs'] = 1;
    };
    
  };

  return (objClosest['occurs'] < 2) ? objClosest['id'] : 0;

};

const part1 = () => {

  const arrVectors = createVectorArray(input);
  const objGrid = defineGrid(arrVectors);

  let objBorder = {};
  let vectorResult;
  let xBorder;
  let yBorder;
  const objMap = {};
  for (let i = objGrid['xMin']; i < objGrid['xMax'] + 1; i++) {
    xBorder = (i === objGrid['xMin'] || i === objGrid['xMax']) ? true : false;
    for (let j = objGrid['yMin']; j < objGrid['yMax'] + 1; j++) {
      yBorder = (j === objGrid['yMin'] || j === objGrid['yMax']) ? true : false;
      vectorResult = closestVector({'x': i, 'y': j}, arrVectors);
      objMap[i + '-' + j] = vectorResult;
      if ((xBorder || yBorder) && vectorResult > 0) {
        objBorder[vectorResult] = true;
      }
    };
  };

  arrVectors.forEach(vector => {
    vector['infinite'] = (objBorder[vector['id']]) ? true : false;
  });

  return arrVectors.filter(vector => !vector['infinite'])
    .map(vector => Object.entries(objMap).filter(item => item[1] === vector['id']).length)
    .reduce((maxCount, count) => maxCount = (count > maxCount) ? count : maxCount, 0);

};

const part2 = (threshold) => {
  
  const arrVectors = createVectorArray(input);
  const objGrid = defineGrid(arrVectors);

  const objMap = {};
  
  for (let i = objGrid['xMin']; i < objGrid['xMax'] + 1; i++) {
    for (let j = objGrid['yMin']; j < objGrid['yMax'] + 1; j++) {
      objMap[i + '-' + j] = arrVectors.map(vector => calculateDistance({'x': i, 'y': j}, vector))
                .reduce((sum, count) => sum + count, 0);
    };
  };

  return Object.entries(objMap).filter(item => item[1] < threshold).length;
};

console.log("Part 1:", part1());
console.log("Part 2:", part2(10000));
