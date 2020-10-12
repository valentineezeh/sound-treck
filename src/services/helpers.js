export const convertElapsedTime = inputSeconds => {
  let seconds = Math.floor(inputSeconds % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  const minutes = Math.floor(inputSeconds / 60);
  return `${minutes}:${seconds}`;
};
