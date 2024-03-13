import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, Link, useToast } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

const instruments = ["Guitare", "Basse", "Batterie", "Clavier", "Chant"];
const musicStyles = ["Rock", "Jazz", "Pop", "Metal", "Classique"];

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    instruments: [],
    musicStyles: [],
    socialLinks: [],
    location: "",
    availability: "",
    email: "",
    phone: "",
  });
  const [results, setResults] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    // TODO: Implement login logic
    setLoggedIn(true);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSocialLinkAdd = () => {
    setProfile({ ...profile, socialLinks: [...profile.socialLinks, ""] });
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...profile.socialLinks];
    updatedLinks[index] = value;
    setProfile({ ...profile, socialLinks: updatedLinks });
  };

  const handleSearch = () => {
    // TODO: Implement search logic
    // Simulating search results for demo purposes
    const demoResults = [
      {
        firstName: "John",
        lastName: "Doe",
        instruments: ["Guitare", "Chant"],
        musicStyles: ["Rock", "Pop"],
        location: "Paris",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        instruments: ["Basse", "Clavier"],
        musicStyles: ["Jazz", "Classique"],
        location: "Lyon",
      },
    ];
    setResults(demoResults);
  };

  const handleProfileSubmit = () => {
    // TODO: Implement profile submission logic
    toast({
      title: "Profil enregistré",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        Mise en relation de musiciens
      </Heading>

      {!loggedIn ? (
        <Flex justify="center">
          <Box width="300px">
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button colorScheme="blue" onClick={handleLogin}>
              Se connecter
            </Button>
          </Box>
        </Flex>
      ) : (
        <>
          <Heading as="h2" size="lg" mb={4}>
            Mon profil
          </Heading>
          <Stack spacing={4} mb={8}>
            <FormControl id="firstName">
              <FormLabel>Prénom</FormLabel>
              <Input name="firstName" value={profile.firstName} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Nom</FormLabel>
              <Input name="lastName" value={profile.lastName} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="instruments">
              <FormLabel>Instruments</FormLabel>
              <Select name="instruments" multiple value={profile.instruments} onChange={handleProfileChange}>
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="musicStyles">
              <FormLabel>Styles de musique</FormLabel>
              <Select name="musicStyles" multiple value={profile.musicStyles} onChange={handleProfileChange}>
                {musicStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="socialLinks">
              <FormLabel>Liens réseaux sociaux</FormLabel>
              {profile.socialLinks.map((link, index) => (
                <Flex key={index} mb={2}>
                  <Input value={link} onChange={(e) => handleSocialLinkChange(index, e.target.value)} />
                </Flex>
              ))}
              <Button leftIcon={<FaPlus />} onClick={handleSocialLinkAdd}>
                Ajouter un lien
              </Button>
            </FormControl>
            <FormControl id="location">
              <FormLabel>Localisation</FormLabel>
              <Input name="location" value={profile.location} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="availability">
              <FormLabel>Disponibilité</FormLabel>
              <Input name="availability" value={profile.availability} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input name="email" value={profile.email} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Téléphone</FormLabel>
              <Input name="phone" value={profile.phone} onChange={handleProfileChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleProfileSubmit}>
              Enregistrer le profil
            </Button>
          </Stack>

          <Heading as="h2" size="lg" mb={4}>
            Rechercher des musiciens
          </Heading>
          <Stack direction="row" spacing={4} mb={8}>
            <Select placeholder="Instrument">
              {instruments.map((instrument) => (
                <option key={instrument} value={instrument}>
                  {instrument}
                </option>
              ))}
            </Select>
            <Select placeholder="Style de musique">
              {musicStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </Select>
            <Input placeholder="Localisation" />
            <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={handleSearch}>
              Rechercher
            </Button>
          </Stack>

          {results.map((result, index) => (
            <Box key={index} p={4} mb={4} borderWidth={1} borderRadius="md">
              <Heading as="h3" size="md">
                {result.firstName} {result.lastName}
              </Heading>
              <Text>Instruments: {result.instruments.join(", ")}</Text>
              <Text>Styles de musique: {result.musicStyles.join(", ")}</Text>
              <Text>Localisation: {result.location}</Text>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Index;
