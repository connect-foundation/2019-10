import { SEARCH_OPTION_LABELS, SEARCH_OPTION_VALUES } from '../../../constants';

export const makeOptionMap = () => {
  const optionMap = new Map();

  optionMap.set(SEARCH_OPTION_VALUES.all, SEARCH_OPTION_LABELS.all);
  optionMap.set(SEARCH_OPTION_VALUES.videos, SEARCH_OPTION_LABELS.videos);
  optionMap.set(SEARCH_OPTION_VALUES.users, SEARCH_OPTION_LABELS.users);
  optionMap.set(SEARCH_OPTION_VALUES.tags, SEARCH_OPTION_LABELS.tags);

  return optionMap;
};
