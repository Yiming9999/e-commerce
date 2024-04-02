import { Box, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  onLogoClick: () => void;
  onChange: (searchText: string) => void;
  searchText: string;
}

const NavBar = ({ onSearch, onLogoClick, onChange, searchText }: Props) => {
  return (
    <HStack padding="10px">
      <Box as="button" onClick={onLogoClick}>
        {/* Add onclick for the logo to navigate to the home page */}
        <Image
          src={logo}
          alt="Logo"
          width="auto"
          height="70px"
          objectFit="contain"
        />
      </Box>
      <ColorModeSwitch />
      <SearchInput
        onSearch={onSearch}
        onChange={onChange}
        searchText={searchText}
      />
    </HStack>
  );
};

export default NavBar;
