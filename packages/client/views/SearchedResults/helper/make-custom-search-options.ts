import { SEARCH_OPTION_LABELS, SEARCH_OPTION_VALUES } from '../../../constants';
import { useSearchedResults } from '../../../components/SearchResultsProvider/hook/use-searched-results';

export const makeCustomSearchOptions = () => {
  const customSearchOptions = [];
  const { optionMap } = useSearchedResults();

  optionMap.forEach((optionValue, optionTab) => {
    if (optionValue.isVisible) {
      customSearchOptions.push({ label: optionValue.label, value: optionTab });
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
