import { SEARCH_OPTION_LABELS, SEARCH_OPTION_VALUES } from '../../../constants';
import { makeCustomOptionMap } from '../helper/make-custom-option-map';

export const makeCustomSearchOptions = () => {
  const customSearchOptions = [];

  const optionMap = makeCustomOptionMap();

  optionMap.forEach((key, value) => {
    if (key.count) {
      customSearchOptions.push({ label: key.label, value });
    }
  });

  if (customSearchOptions.length >= 2 || !customSearchOptions.length) {
    customSearchOptions.unshift({
      label: SEARCH_OPTION_LABELS.all,
      value: SEARCH_OPTION_VALUES.all,
    });
  }

  return customSearchOptions;
};
