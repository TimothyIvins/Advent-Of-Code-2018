/*
** For testing **
9 players; last marble is worth 25 points: high score is 32
10 players; last marble is worth 1618 points: high score is 8317
13 players; last marble is worth 7999 points: high score is 146373
17 players; last marble is worth 1104 points: high score is 2764
21 players; last marble is worth 6111 points: high score is 54718
30 players; last marble is worth 5807 points: high score is 37305
*/

let input = `423 players; last marble is worth 71944 points`;

const getInputObject = (inputData, multiplier) => {

  const arrString = inputData.split(' ');
  const objResult = {
    'players': Number(arrString[0]),
    'marbles': Number(arrString[6]) * multiplier
  };

  return objResult;

};

const insertNodeAfter = (node, value) => {

    let nextNode = {'marble': value, 'prev': node, 'next': node.next};
    node.next.prev = nextNode;
    node.next = nextNode;
    
    return nextNode;

};

const removeNode = (node) => {
    
    node.prev.next = node.next;
    node.next.prev = node.prev;
    
    return node.next;

};

const goBack = (node, n) => {
    for (let i = 0; i < n; i++){
        node = node.prev;
    };
    
    return node;

};

const goForward = (node, n) => {
    
    for (let i = 0; i < n; i++){
        node = node.next;
    };
    
    return node;

};

const part1 = (input, multiplier) => {

  const objGame = getInputObject(input, multiplier);
  const objScoreBoard = {};

  let currentNode = {'marble': 0, 'prev': null, 'next': null};
  currentNode['prev'] = currentNode;
  currentNode['next'] = currentNode;

  let player = 1;

  for (let marble = 1; marble <= objGame['marbles']; marble++) {

    if (marble % 23 === 0) {
      if (player in objScoreBoard) {
        objScoreBoard[player] += marble;
      } else {
        objScoreBoard[player] = marble;
      };
      currentNode = goBack(currentNode, 7);
      objScoreBoard[player] += currentNode['marble'];
      currentNode = removeNode(currentNode);
    } else {
      currentNode = goForward(currentNode, 1);
      currentNode = insertNodeAfter(currentNode, marble);
    };
    
    player++;
    player = (player <= objGame['players']) ? player : 1;
  
  };

  return Object.keys(objScoreBoard)
    .map(key => objScoreBoard[key])
    .reduce((max, value) => (value > max) ? value : max);

};

console.log('Part 1', part1(input, 1));
console.log('Part 2', part1(input, 100));
