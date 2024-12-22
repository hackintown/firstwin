export const generateWingoResult = () => {
  const number = Math.floor(Math.random() * 10);
  let color;
  let size;

  // Determine color
  if (number === 0) {
    color = "violet";
  } else if (number === 5) {
    color = "violet";
  } else if (number % 2 === 0) {
    color = "red";
  } else {
    color = "green";
  }

  // Determine size
  size = number >= 5 ? "big" : "small";

  return { number, color, size };
};
