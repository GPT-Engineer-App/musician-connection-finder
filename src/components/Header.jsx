import React from "react";
import { Box, Flex, Spacer, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn }) => {
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.lg" mx="auto" align="center">
        <Link as={RouterLink} to="/" fontWeight="bold">
          Home
        </Link>
        <Spacer />
        {loggedIn && (
          <>
            <Link as={RouterLink} to="/profile" mr={4}>
              My Profile
            </Link>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
