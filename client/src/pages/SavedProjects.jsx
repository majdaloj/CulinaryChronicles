import React from 'react';
import { getSavedProjects } from '../api';
import { useQuery } from 'react-query';
import { Heading, Box, Button } from '@chakra-ui/react';
import ProjectCard from '../components/ProjectCard';
import ProjectContainer from '../components/ProjectContainer';
import { Text } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const SavedProjects = () => {
  const { isLoading, data } = useQuery('get_saved_projects', getSavedProjects);

  if (isLoading) return 'Loading...';

  return (
    <>
      <Box justifyContent='center' my={5} mx={10}>
        <Heading color='white'>Saved Projects</Heading>
        {!data?.length && (
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            minH='250px'
            width={'100vw'}
            mt={10}
            alignItems='center'
            gap={5}
          >
            <Text fontSize='xl' color='white'>
              <InfoOutlineIcon color='white' fontSize='xl' mr={2} />
              No saved projects yet!
            </Text>
            <Button variant='solid' colorScheme='blue'>
              <Link to={'/search'}>Search Projects</Link>
            </Button>
          </Box>
        )}
        {!!data?.length && (
          <Box py='20px'>
            <ProjectContainer>
              {data?.map((project) => (
                <ProjectCard key={project.project_id} project={project} />
              ))}
            </ProjectContainer>
          </Box>
        )}
      </Box>
    </>
  );
};
