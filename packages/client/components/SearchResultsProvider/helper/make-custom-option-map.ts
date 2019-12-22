import { SEARCH_OPTION_LABELS, SEARCH_OPTION_VALUES } from '../../../constants';

export const makeCustomOptionMap = () => {
  const optionMap = new Map();
  optionMap.set(SEARCH_OPTION_VALUES.all, {
    label: SEARCH_OPTION_LABELS.all,
  });
  optionMap.set(SEARCH_OPTION_VALUES.videos, {
    label: SEARCH_OPTION_LABELS.videos,
  });
  optionMap.set(SEARCH_OPTION_VALUES.users, {
    label: SEARCH_OPTION_LABELS.users,
  });
  optionMap.set(SEARCH_OPTION_VALUES.tags, {
    label: SEARCH_OPTION_LABELS.tags,
  });

  return optionMap;
};
