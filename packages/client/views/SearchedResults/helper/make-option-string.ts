export const makeOptionString = optionArray => {
  const options = optionArray
    .map(option => {
      return option.value;
    })
    .join(',');

  return options;
};
