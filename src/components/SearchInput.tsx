import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleClearInput = () => {
    setSearchText("");
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
          placeholder="Search games..."
          variant="filled"
        />
        {searchText && (
          <IconButton
            aria-label="Search database"
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
