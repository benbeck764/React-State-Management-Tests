import { FC, useCallback, useEffect, useState } from "react";
import AppTextField from "@benbeck764/react-components/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchUrl } from "../../../../routing/common/url";
import { AppRoutes, RouteName } from "../../../../routing/common/routes";
import { useAppSelector, AppRootState } from "../../../../state/store";

const SearchInput: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchTermState = useAppSelector(
    (s: AppRootState) => s.search.searchTerm
  );

  const [searchTerm, setSearchTerm] = useState<string>(searchTermState);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) setSearchTerm(event.target.value);
  };

  const handleOnClear = () => {
    setSearchTerm("");
    navigate(AppRoutes[RouteName.Site].path);
  };

  const handleOnSubmit = useCallback(
    (term: string) => {
      if (searchTerm) navigate(getSearchUrl(encodeURI(term)));
    },
    [navigate, searchTerm]
  );

  useEffect(() => {
    // Navigating away from search page should clear search input
    const originalString = /^\/search\/([^/]+)$/;
    const isMatch = originalString.test(location.pathname);
    if (!isMatch) {
      setSearchTerm("");
    } else {
      setSearchTerm(searchTermState);
    }
  }, [location, searchTermState]);

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
