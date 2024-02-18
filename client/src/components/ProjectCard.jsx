import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { saveProject, unSaveProject } from '../api';
import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const ProjectCard = ({ project }) => {
  const { currentUser, isCurrentUserLoading } = useContext(GlobalContext);
  const isSaved = currentUser?.favorite_projects?.includes(project?.project_id);
  const queryClient = useQueryClient();

  const saveProjectMutation = useMutation({
    mutationFn: saveProject,
    onSettled: async () => {
      await queryClient.invalidateQueries(['get_current_user']);
    },
  });

  const unSaveProjectMutation = useMutation({
    mutationFn: unSaveProject,
    onSettled: async () => {
      await queryClient.invalidateQueries(['get_current_user']);
    },
  });

  const isLoading =
    isCurrentUserLoading ||
    saveProjectMutation.isLoading ||
    unSaveProjectMutation.isLoading;

  const handleSave = isSaved
    ? unSaveProjectMutation.mutate
    : saveProjectMutation.mutate;

  const saveButtonText = isSaved ? 'Unsave' : 'Save for later';

  return (
    <Card maxW='sm' height='100%' minWidth='250px'>
      <CardBody>
        <Image
          src={
            project.image_url ||
            'https://www.nasa.gov/wp-content/uploads/2021/05/nasa-logo-web-rgb.png'
          }
          alt='Project Picture'
          borderRadius='lg'
        />
        <Stack mt='4' spacing='2'>
          <Heading size='md'>{project.name}</Heading>
          <Text fontSize='sm'>{project.description}</Text>
        </Stack>
        <Divider mt='4' />
        <Text fontSize='sm' fontWeight='bold'>
          Open Roles Available: {project.roles.join(', ')}
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing='2' justifyContent='space-between'>
          <a
            href={project.external_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Button variant='solid' colorScheme='blue'>
              Apply now
            </Button>
          </a>
          {isLoading ? (
            <Button
              variant='ghost'
              colorScheme='blue'
              disabled={true}
              width='8em'
            >
              <Spinner size='xs' />
            </Button>
          ) : (
            <Button
              variant='ghost'
              colorScheme='blue'
              onClick={() => {
                handleSave({
                  projectId: project.project_id,
                  userId: currentUser.user_id,
                });
              }}
            >
              {saveButtonText}
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
