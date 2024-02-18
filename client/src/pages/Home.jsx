import React from 'react';
import {
  Container,
  Heading,
  Text,
  Box,
  extendTheme,
  ChakraProvider,
  Button,
} from '@chakra-ui/react';
import backgroundImage from '../assets/CC.png';
import { Link } from 'react-router-dom';

const theme = extendTheme({
  fonts: {
    heading: `Great Vibes, cursive`,
  },
});

export const Home = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW='100%' padding={0} margin={0}>
        <Box
          position='relative'
          width='100%'
          height='100vh'
          overflow='hidden'
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize='cover'
          backgroundPosition='center'
        >
          <Heading
            position='absolute'
            fontSize='8xl'
            top='36%'
            left='50%'
            transform='translate(-50%, -50%)'
            color='black'
            textAlign='center'
          >
            {' '}
            Culinary Chronicles{' '}
          </Heading>
          <Text
            position='absolute'
            fontSize='3xl'
            top='75%'
            left='50%'
            transform='translate(-50%, -50%)'
            color='black'
            textAlign='center'
          >
            Eat like a king, <i>literally</i>
          </Text>
          <Link to='/Search'>
            <Button
              colorScheme='gray'
              top='63%'
              left='50%'
              transform='translate(-50%, -50%)'
              width={250}
              fontFamily='monospace'
              size='lg'
            >
              Start
            </Button>
          </Link>
        </Box>
      </Container>
    </ChakraProvider>
  );
};
