const existingIDs = [];

const getRandomLetters = (length = 1) => Array(length).fill().map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
const getRandomDigits = (length = 1) => Array(length).fill().map(e => Math.floor(Math.random() * 10)).join('');

export const generateUniqueID = () => {
  let id = getRandomLetters(3) + getRandomDigits(3);
  while (existingIDs.includes(id)) id = getRandomLetters(3) + getRandomDigits(3);
  return id;
};

const newID = generateUniqueID();