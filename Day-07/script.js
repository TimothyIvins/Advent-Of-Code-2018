const input = `Step Y must be finished before step L can begin.
Step N must be finished before step D can begin.
Step Z must be finished before step A can begin.
Step F must be finished before step L can begin.
Step H must be finished before step G can begin.
Step I must be finished before step S can begin.
Step M must be finished before step U can begin.
Step R must be finished before step J can begin.
Step T must be finished before step D can begin.
Step U must be finished before step D can begin.
Step O must be finished before step X can begin.
Step B must be finished before step D can begin.
Step X must be finished before step V can begin.
Step J must be finished before step V can begin.
Step D must be finished before step A can begin.
Step K must be finished before step P can begin.
Step Q must be finished before step C can begin.
Step S must be finished before step E can begin.
Step A must be finished before step V can begin.
Step G must be finished before step L can begin.
Step C must be finished before step W can begin.
Step P must be finished before step W can begin.
Step V must be finished before step W can begin.
Step E must be finished before step W can begin.
Step W must be finished before step L can begin.
Step P must be finished before step E can begin.
Step T must be finished before step K can begin.
Step A must be finished before step G can begin.
Step G must be finished before step P can begin.
Step N must be finished before step S can begin.
Step R must be finished before step D can begin.
Step M must be finished before step G can begin.
Step Z must be finished before step L can begin.
Step M must be finished before step T can begin.
Step S must be finished before step L can begin.
Step S must be finished before step W can begin.
Step O must be finished before step J can begin.
Step Z must be finished before step D can begin.
Step A must be finished before step C can begin.
Step P must be finished before step V can begin.
Step A must be finished before step P can begin.
Step B must be finished before step C can begin.
Step R must be finished before step S can begin.
Step X must be finished before step S can begin.
Step T must be finished before step P can begin.
Step Y must be finished before step E can begin.
Step G must be finished before step E can begin.
Step Y must be finished before step K can begin.
Step J must be finished before step P can begin.
Step I must be finished before step Q can begin.
Step E must be finished before step L can begin.
Step X must be finished before step J can begin.
Step T must be finished before step X can begin.
Step M must be finished before step O can begin.
Step K must be finished before step A can begin.
Step D must be finished before step W can begin.
Step H must be finished before step C can begin.
Step F must be finished before step R can begin.
Step B must be finished before step Q can begin.
Step M must be finished before step Q can begin.
Step D must be finished before step S can begin.
Step Y must be finished before step I can begin.
Step M must be finished before step K can begin.
Step S must be finished before step G can begin.
Step X must be finished before step L can begin.
Step D must be finished before step V can begin.
Step B must be finished before step X can begin.
Step C must be finished before step L can begin.
Step V must be finished before step L can begin.
Step Z must be finished before step Q can begin.
Step Z must be finished before step H can begin.
Step M must be finished before step S can begin.
Step O must be finished before step C can begin.
Step B must be finished before step A can begin.
Step U must be finished before step V can begin.
Step U must be finished before step A can begin.
Step X must be finished before step G can begin.
Step K must be finished before step C can begin.
Step T must be finished before step S can begin.
Step K must be finished before step G can begin.
Step U must be finished before step B can begin.
Step A must be finished before step E can begin.
Step F must be finished before step V can begin.
Step Q must be finished before step A can begin.
Step F must be finished before step Q can begin.
Step J must be finished before step L can begin.
Step O must be finished before step E can begin.
Step O must be finished before step Q can begin.
Step I must be finished before step K can begin.
Step I must be finished before step P can begin.
Step J must be finished before step D can begin.
Step Q must be finished before step P can begin.
Step S must be finished before step C can begin.
Step U must be finished before step P can begin.
Step S must be finished before step P can begin.
Step O must be finished before step B can begin.
Step Z must be finished before step F can begin.
Step R must be finished before step V can begin.
Step D must be finished before step L can begin.
Step Y must be finished before step T can begin.
Step G must be finished before step C can begin.`;

const createMasterObject = (inputData) => {

  const objResult = {};
  
  inputData.split('\n').map(line => {
    let words = line.split(' ');
    return words[7] + words[1];})
    .sort()
    .forEach(item => {
      if (!(item.charAt(0) in objResult)) {
        objResult[item.charAt(0)] = [item.charAt(1)];
      } else {
        objResult[item.charAt(0)].push(item.charAt(1)) 
      };
      if (!(item.charAt(1) in objResult)) {
        objResult[item.charAt(1)] = [];
      };
    });

  return objResult;

};

const getNext = (master, processed) => {

  return Object.keys(master)
    .filter(key => {
      if (key in processed) {
        return false;
      };
      if (master[key].length === 0) {
        return true;
      } else {
        return false;
      };
    })
    .sort()[0];

};

const part1 = () => {

  let resultString = '';

  const objMaster = createMasterObject(input);
  const objProcessed = {};
  
  let done = false;
  while (!done) {
  
    let next = getNext(objMaster, objProcessed);
    if (next === undefined) {
      done = true;
      break;
    };

    resultString += next;
    objProcessed[next] = true;
    
    Object.keys(objMaster).forEach(key => {
      const index = objMaster[key].findIndex(item => item === next);
      if (index > -1) {
        objMaster[key].splice(index, 1);
      };
    });
  };
  
  return(resultString);

};

const createAplhabetObject = (padValue) => {

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const objResult = {};
  
  alphabet.split('').forEach((letter, index) => {
    objResult[letter] = padValue + index + 1;
  });

  return objResult;

};

const getGroup = (master, processed, inProgress, workers) => {
  
  if (inProgress.length >= workers) {
    return inProgress;
  };

  const arrNew = Object.keys(master)
    .filter(key => {
      if (key in processed) {
        return false;
      };
      const index = inProgress.findIndex(item => item === key);
      if (index > -1) {
        return false;
      };
      if (master[key].length === 0) {
        return true;
      } else {
        return false;
      };
    })
    .sort();

  return inProgress
    .concat(arrNew)
    .slice(0, workers);

};


const part2 = (taskTime, workers) => {

  let resultSeconds = 0;

  const objMaster = createMasterObject(input);
  const objProcessed = {};
  const objAlphaTimes = createAplhabetObject(taskTime);
  const objAlphaTracker = {};
  
  let safety = 0;
  let done = false;
  while (!done) {

    safety++;
    if (safety > 3000) {
      console.log('Safety break');
      break;
    };

    const arrInProgress = Object.keys(objAlphaTracker)
      .filter(key => objAlphaTracker[key] < objAlphaTimes[key]);

    let group = getGroup(objMaster, objProcessed, arrInProgress, workers);
    if (group.length === 0) {
      done = true;
      break;
    };

    resultSeconds++;

    group.forEach(task => {
      if (task in objAlphaTracker) {
        objAlphaTracker[task]++;
      } else {
        objAlphaTracker[task] = 1;
      };
      if (objAlphaTracker[task] === objAlphaTimes[task]) {
        objProcessed[task] = true;
        Object.keys(objMaster).forEach(key => {
          const index = objMaster[key].findIndex(item => item === task);
          if (index > -1) {
            objMaster[key].splice(index, 1);
          };
        });
      };
    });

  };
  
  return(resultSeconds);

};


console.log('Part 1:',part1());
console.log('Part 2:',part2(60, 5))