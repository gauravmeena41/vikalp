let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const generateUniqueId =async () => {
  return `${
    letters[Math.floor(Math.random() * letters.length)]
  }${new Date().getTime()}${
    letters[Math.floor(Math.random() * letters.length)]
  }`;
};
