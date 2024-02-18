/* eslint-disable react/prop-types */
import React from 'react';
import { Grid } from '@chakra-ui/react';

const ProjectContainer = ({ children }) => {
  return (
    <Grid
      marginBottom='5em'
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)', // On small screens (sm), display 2 columns
        md: 'repeat(3, 1fr)', // On medium screens (md), display 3 columns
      }}
      gap={4}
      px='25%'
      height='100%'
    >
      {children}
    </Grid>
  );
};

export default ProjectContainer;
