const calculatePowerLevel = (x, y, serialNo) => {

  // Find the fuel cell's rack ID, which is its X coordinate plus 10.
  const rackID = x + 10;

  // Begin with a power level of the rack ID times the Y coordinate.
  let powerLevel = rackID * y;

  // Increase the power level by the value of the grid serial number.
  powerLevel += serialNo;

  // Set the power level to itself multiplied by the rack ID.
  powerLevel *= rackID;

  // Keep only the hundreds digit of the power level.
  powerLevel = getHundredsDigit(powerLevel);

  // Subtract 5 from the power level.
  powerLevel -= 5;
 
  return powerLevel;

};

const getHundredsDigit = (number) => {
  
  return (number < 100) ? 0 : Math.floor(number / 100) % 10;

};

const FillGrid = (gridSize, serialNo) => {

  const powerGrid = [0];

  for (let x = 1; x <= gridSize; x++) {
    powerGrid[x] = [0];
    for (let y = 1; y <= gridSize; y++) {
      powerGrid[x][y] = calculatePowerLevel(x, y, serialNo);
    };
  };

  return powerGrid;

};

const getMaxPower = (powerGrid, gridSize, squareSize) => {

  const bound = gridSize - squareSize + 1;
  let maxPower = 0;
  let xMax;
  let yMax;
  let currentPower;
  
  for (let x = 1; x <= bound; x++) {
    for (let y = 1; y <= bound; y++) {
      currentPower = calculatePower(powerGrid, squareSize, x, y);
      if (currentPower > maxPower) {
        maxPower = currentPower;
        xMax = x;
        yMax = y;
      };  
    };
  };

  return {
    'x': xMax,
    'y': yMax,
    'power': maxPower
  };

};

const calculatePower = (powerGrid, squareSize, xStart, yStart) => {

  let power = 0;
  for (let x = xStart; x < xStart + squareSize; x++) {
    for (let y = yStart; y < yStart + squareSize; y++) {
      power += powerGrid[x][y];
    };
  };

  return power;

}; 

const getMaxPowerUltimate = (powerGrid, gridSize) => {

  let bound;
  let maxPower = 0;
  let xMax;
  let yMax;
  let squareSizeMax;
  let currentPower;
  let maxSquareSize;
  
  for (let squareSize = gridSize; squareSize >= 1; squareSize--) {
    /*
    Based on the calculation the maximum value for a point is 4.
    So that times area of the square is the maximum value for the square.
    Since we are iterating backwards if the max size is less that the value that we have we can quit.
    */
    maxSquareSize = 4 * (squareSize ** 2);
    if (maxSquareSize < maxPower) {
      break;
    };
    bound = gridSize - squareSize + 1;
    for (let x = 1; x <= bound; x++) {
      for (let y = 1; y <= bound; y++) {
        currentPower = calculatePower(powerGrid, squareSize, x, y);
        if (currentPower > maxPower) {
          maxPower = currentPower;
          squareSizeMax = squareSize;
          xMax = x;
          yMax = y;
        };  
      };
    };
  };

  return {
    'x': xMax,
    'y': yMax,
    'size': squareSizeMax,
    'power': maxPower
  };

};

const part1 = (gridSize, serialNo) => {
  
  const powerGrid = FillGrid(gridSize, serialNo);

  return getMaxPower(powerGrid, gridSize, 3);
 
};

const part2 = (gridSize, serialNo) => {
  
  const powerGrid = FillGrid(gridSize, serialNo);

  return getMaxPowerUltimate(powerGrid, gridSize);
 
};


// Gotta be a more efficient way but this gets it done.
//console.log('Part 1:', part1(300, 1308));
console.log('Part 2:', part2(300, 18));

