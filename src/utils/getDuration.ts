const getDuration = (seconds: number) => {
  if (seconds <= 59) {
    return `${seconds} seconds`;
  } else if (seconds <= seconds * 60 - 1)
    return `${Math.round(seconds / 60)} minutes`;
  else {
    return `${Math.round(seconds / 60 / 60)} hour`;
  }
};

export default getDuration;
