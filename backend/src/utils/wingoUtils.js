export const generateWingoResult = () => {
  // Generate random number 0-9
  const number = Math.floor(Math.random() * 10);

  // Determine color based on number
  let color;
  if (number === 0 || number === 5) {
    color = "violet"; // Special numbers get violet
  } else if (number % 2 === 0) {
    color = "red"; // Even numbers get red
  } else {
    color = "green"; // Odd numbers get green
  }

  // Determine size
  const size = number >= 5 ? "big" : "small";

  return { number, color, size };
};