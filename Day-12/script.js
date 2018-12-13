const initialState = `###..#...####.#..###.....####.######.....##.#####.##.##..###....#....##...##...##.#..###..#.#...#..#`;

const notes = `.###. => .
..#.. => .
.#### => .
.##.. => #
#.#.# => .
..#.# => #
#.##. => #
#...# => #
..... => .
##..# => #
.#.#. => .
..##. => #
##.#. => .
###.. => .
.#... => #
..### => .
#..## => .
...#. => .
###.# => #
.##.# => .
.#.## => .
....# => .
##### => .
#.#.. => #
...## => #
#.... => .
#.### => #
##... => #
.#..# => .
####. => .
#..#. => #
##.## => #`;

const createPlanArray = (inputData) => {

  const objResult = {};

  inputData.split("\n").forEach(line => {
    let parts = line.split(' => ');
    objResult[parts[0]] = parts[1];
  });

  return objResult;

};

const nextGeneration = (firstPlant, state, objNotes) => {

  let workState = '.....' + state + '....';
  let result = '..';

  for (i = 2; i < workState.length - 2; i++) {
    result += objNotes[workState.substring(i - 2, i + 3)];     
  };

  const offset = findFirstPlant(result) - 5;

  return [firstPlant + offset, removeOuterEmptyPots(result)];

};

const findFirstPlant = (state) => {

  return state.indexOf('#');

};

const removeOuterEmptyPots = (state) => {

  return state.replace(/^\.+|\.+$/g, '');

};

const getPlantCount = (state) => {

  return state.split('').filter(char => char === '#').length;

};

const getPlantTotal = (firstPlant, state) => {

  let result = 0;
  
  for (i = 0; i < state.length; i++) {
    
    if (state.charAt(i) === '#') {

      result += i + firstPlant;

    };

  };

  return result;

};

const part1 = (notes, initialState, generations) => {

  const objNotes = createPlanArray(notes);
  let firstPlant = findFirstPlant(initialState);
  let state = removeOuterEmptyPots(initialState);
  let firstPlantNew;
  let stateNew;
  let adjustment = 0;
  
  for (let i = 1; i <= generations; i++) {
    
    [ firstPlantNew, stateNew ] = nextGeneration(firstPlant, state, objNotes);
    
    if (state === stateNew) {
      let adjustmentFactor = (firstPlantNew - firstPlant) * getPlantCount(state);
      let remainingGenerations = generations - i + 1;
      adjustment = remainingGenerations * adjustmentFactor;
      break;
    };
    
    firstPlant = firstPlantNew;
    state = stateNew;

  };

  return getPlantTotal(firstPlant, state) + adjustment;

};

console.log('Part 1:', part1(notes, initialState, 20));
console.log('Part 2:', part1(notes, initialState, 50000000000));
