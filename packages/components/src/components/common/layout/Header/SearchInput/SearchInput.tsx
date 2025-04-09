import { FC } from 'react';
import AppTextField from '@benbeck764/react-components/TextField';
import SearchIcon from '@mui/icons-material/Search';

type SearchInputProps = {
  searchTerm: string;
  onChange?: (searchTerm: string) => void;
  onClear?: () => void;
};

const SearchInput: FC<SearchInputProps> = (props) => {
  const { searchTerm, onChange, onClear } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event) onChange?.(event.target.value);
  };

  const handleOnClear = (): void => onClear?.();

  return (
    <AppTextField
      placeholder="What do you want to listen to?"
      startIcon={<SearchIcon sx={{ ml: 1 }} />}
      sx={{ width: 300 }}
      size="large"
      showClearButton
      value={searchTerm}
      onChange={handleOnChange}
      onClear={handleOnClear}
    />
  );
};

export default SearchInput;
