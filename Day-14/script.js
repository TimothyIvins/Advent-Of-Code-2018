const getNextElfIndex = (index, increment, total) => {

  let result = index + increment;

  while (true) {
    if (result < total) return result;
    result -= total;
  };

};

const part1 = (input) => {

  const recipes = [3, 7];
  const recipeLimit = input + 10;
  let recipeCount = 2;
  let elf1 = 0;
  let elf2 = 1;
  let sum;

  while (recipeCount < recipeLimit) {

    sum = recipes[elf1] + recipes[elf2];

    if (sum < 10) {
      recipes.push(sum);
      recipeCount++;
    } else {
      recipes.push(Math.floor(sum / 10));
      recipes.push(sum % 10);
      recipeCount += 2;
    };

    elf1 = getNextElfIndex(elf1, recipes[elf1] + 1, recipeCount);
    elf2 = getNextElfIndex(elf2, recipes[elf2] + 1, recipeCount);

  };

  return recipes.slice(input, input + 10).join('');

};

const part2 = (input) => {

  const recipes = [3, 7];
  let recipeCount = 2;
  let elf1 = 0;
  let elf2 = 1;
  let sum;
  let recipe;
  let compareString = '';
  let inputLength = input.length * -1;

  while (true) {

    sum = recipes[elf1] + recipes[elf2];

    if (sum < 10) {
      recipes.push(sum);
      compareString = (compareString + sum).slice(inputLength);
      recipeCount++;
      if (compareString === input) break;
    } else {
      recipe = Math.floor(sum / 10);
      recipes.push(recipe);
      compareString = (compareString + recipe).slice(inputLength);
      recipeCount++;
      if (compareString === input) break;
      recipe = sum % 10;
      recipes.push(recipe);
      compareString = (compareString + recipe).slice(inputLength);
      recipeCount++;
      if (compareString === input) break;
    };

    elf1 = getNextElfIndex(elf1, recipes[elf1] + 1, recipeCount);
    elf2 = getNextElfIndex(elf2, recipes[elf2] + 1, recipeCount);

  };

  return recipeCount - input.length;

};

console.log('Part 1:',part1(846021));
console.log('Part 2:',part2('846021'));
