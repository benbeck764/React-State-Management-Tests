import { FC, useCallback, useEffect, useState } from "react";
import AppTextField from "@benbeck764/react-components/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchUrl } from "../../../../routing/common/url";

const SearchInput: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) setSearchTerm(event.target.value);
  };

  const handleOnClear = () => {
    setSearchTerm("");
  };

  const handleOnSubmit = useCallback(
    (term: string) => {
      if (searchTerm) navigate(getSearchUrl(term));
    },
    [navigate, searchTerm]
  );

  useEffect(() => {
    // Navigating away from search page should clear search input
    const originalString = /^\/search\/([^/]+)$/;
    const isMatch = originalString.test(location.pathname);
    if (!isMatch) handleOnClear();
  }, [location]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleOnSubmit(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

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
