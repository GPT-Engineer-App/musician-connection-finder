import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Switch, Text, Link, useToast } from "@chakra-ui/react";
import { FaPlus, FaSearch } from "react-icons/fa";

const instruments = ["Guitare", "Basse", "Batterie", "Clavier", "Chant"];
const musicStyles = ["Rock", "Jazz", "Pop", "Metal", "Classique"];

const Index = ({ profiles, addProfile }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [newProfile, setNewProfile] = useState({
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
  const [searchInstrument, setSearchInstrument] = useState("");
  const [searchMusicStyle, setSearchMusicStyle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [results, setResults] = useState([]);

  const toast = useToast();

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };

  const handleProfileChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const handleSocialLinkAdd = () => {
    setNewProfile({ ...newProfile, socialLinks: [...newProfile.socialLinks, ""] });
  };

  const handleSocialLinkChange = (index, value) => {
    const updatedLinks = [...newProfile.socialLinks];
    updatedLinks[index] = value;
    setNewProfile({ ...newProfile, socialLinks: updatedLinks });
  };

  const handleSearch = (instrument, musicStyle, location) => {
    const formattedProfiles = profiles.map((profile) => ({
      ...profile,
      instruments: typeof profile.instruments === "string" ? profile.instruments.split(", ") : profile.instruments,
      musicStyles: typeof profile.musicStyles === "string" ? profile.musicStyles.split(", ") : profile.musicStyles,
    }));
    const filteredProfiles = formattedProfiles.filter((profile) => {
      const instrumentMatch = instrument ? profile.instruments.includes(instrument) : true;
      const styleMatch = musicStyle ? profile.musicStyles.includes(musicStyle) : true;
      const locationMatch = location ? profile.location === location : true;
      return instrumentMatch && styleMatch && locationMatch;
    });
    setResults(filteredProfiles);
  };

  const handleProfileSubmit = () => {
    const formattedProfile = {
      ...newProfile,
      instruments: newProfile.instruments ? newProfile.instruments.split(", ") : [],
      musicStyles: newProfile.musicStyles ? newProfile.musicStyles.split(", ") : [],
    };
    addProfile(newProfile);
    setNewProfile({
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
          <Box as="form" width="300px" onSubmit={handleLogin}>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Mot de passe</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button type="submit" colorScheme="blue">
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
              <Input name="firstName" value={newProfile.firstName} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Nom</FormLabel>
              <Input name="lastName" value={newProfile.lastName} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="instruments">
              <FormLabel>Instruments</FormLabel>
              <Select name="instruments" isMulti value={newProfile.instruments} onChange={handleProfileChange}>
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="musicStyles">
              <FormLabel>Styles de musique</FormLabel>
              <Select name="musicStyles" isMulti value={newProfile.musicStyles} onChange={handleProfileChange}>
                {musicStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="socialLinks">
              <FormLabel>Liens réseaux sociaux</FormLabel>
              {newProfile.socialLinks.map((link, index) => (
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
              <Input name="location" value={newProfile.location} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="availability" display="flex" alignItems="center">
              <FormLabel mb={0}>Je suis disponible</FormLabel>
              <Switch name="availability" isChecked={newProfile.availability} onChange={(e) => setNewProfile({ ...newProfile, availability: e.target.checked })} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input name="email" value={newProfile.email} onChange={handleProfileChange} />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Téléphone</FormLabel>
              <Input name="phone" value={newProfile.phone} onChange={handleProfileChange} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleProfileSubmit}>
              Enregistrer le profil
            </Button>
          </Stack>

          <Heading as="h2" size="lg" mb={4}>
            Rechercher des musiciens
          </Heading>
          <Stack direction="row" spacing={4} mb={8}>
            <Select placeholder="Instrument" onChange={(e) => setSearchInstrument(e.target.value)}>
              {instruments.map((instrument) => (
                <option key={instrument} value={instrument}>
                  {instrument}
                </option>
              ))}
            </Select>
            <Select placeholder="Style de musique" onChange={(e) => setSearchMusicStyle(e.target.value)}>
              {musicStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </Select>
            <Input placeholder="Localisation" onChange={(e) => setSearchLocation(e.target.value)} />
            <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={() => handleSearch(searchInstrument, searchMusicStyle, searchLocation)}>
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
