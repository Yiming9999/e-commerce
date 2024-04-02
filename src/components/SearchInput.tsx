import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  onSearch: (searchText: string) => void;
  searchText: string;
  onChange: (searchText: string) => void;
}

const SearchInput = ({ onSearch, onChange, searchText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleClearInput = () => {
    onChange("");
    onSearch("");
    if (ref.current) ref.current.focus();
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          value={searchText}
          onChange={handleInputChange}
          borderRadius={20}
          placeholder="Search products..."
          variant="filled"
        />
        {/* Add a search icon and a clear icon */}
        {searchText && (
          <IconButton
            aria-label="Search products"
            icon={<SearchIcon />}
            onClick={handleSearch}
            size="md"
          />
        )}
        {searchText && (
          <IconButton
            aria-label="Clear"
            icon={<BsX />}
            onClick={handleClearInput}
            size="md"
          />
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
