import { SEARCH_OPTION_VALUES } from '../../../constants';
import { makeCustomOptionMap } from '../helper/make-custom-option-map';

export const setOptionMap = (type, count) => {
  const optionMap = makeCustomOptionMap();
  optionMap.get(SEARCH_OPTION_VALUES[type]).count = count;
};
