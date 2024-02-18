import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Container,
  ChakraProvider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/CC.png';
import jsPDF from 'jspdf';

export const Search = () => {
  const [formData, setFormData] = useState({
    famousPerson: '',
    dietaryRestrictions: '',
    mealPlanDuration: '',
  });

  const [mealPlan, setMealPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/generateMealPlan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log('Response:', data); // Log the response data

      // Parse the meal plan data from the response
      const parsedMealPlan = JSON.parse(data.mealPlan);

      setMealPlan(parsedMealPlan);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();

    // Add content to the PDF document
    doc.setFont('helvetica', 'bold'); // Set font style to bold
    doc.setFontSize(16); // Set font size for the title
    doc.text('Meal Plan', 10, 10);

    // Loop through meal plan data and add it to the document
    let yOffset = 20;
    Object.entries(mealPlan.mealplan).forEach(([day, meals]) => {
      if (yOffset + 20 > doc.internal.pageSize.height) {
        // Check if remaining space is not enough for the next content
        doc.addPage(); // Add new page
        yOffset = 20; // Reset yOffset for the new page
      }
      doc.setFont('helvetica', 'bold'); // Set font style to bold for day headings
      doc.setFontSize(14); // Set font size for day headings
      doc.text(day, 10, yOffset);
      yOffset += 10;
      Object.entries(meals).forEach(([meal, recipe]) => {
        const textLines = doc.splitTextToSize(`${meal}: ${recipe}`, 180); // Adjust width as needed
        textLines.forEach((line) => {
          if (yOffset + 10 > doc.internal.pageSize.height) {
            // Check if remaining space is not enough for the next content
            doc.addPage(); // Add new page
            yOffset = 20; // Reset yOffset for the new page
          }
          doc.setFont('helvetica', 'normal'); // Set font style to normal for meal details
          doc.setFontSize(12); // Set font size for meal details
          doc.text(line, 15, yOffset);
          yOffset += 10;
        });
      });
      yOffset += 10; // Add some space between days
    });

    // Save the PDF
    doc.save('meal-plan.pdf');
  };

  return (
    <Container maxW='100%' padding={0} margin={0}>
      <Box
        position='relative'
        width='100%'
        minHeight='100vh'
        overflow='auto'
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize='cover'
        backgroundPosition='center'
      >
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
          <Box
            width='100%'
            maxW='lg'
            p={6}
            bg='white'
            borderRadius='md'
            boxShadow='md'
          >
            <Heading fontSize={'3xl'} textAlign={'center'} color='black'>
              Who are you dining with today?
            </Heading>
            <FormControl id='famousPerson' isRequired mt={6}>
              <FormLabel>Figure's Name</FormLabel>
              <Input type='text' id='famousPerson' onChange={handleChange} />
            </FormControl>
            <FormControl id='dietaryRestrictions' mt={4}>
              <FormLabel>Dietary Restrictions</FormLabel>
              <Input
                type='text'
                id='dietaryRestrictions'
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id='mealPlanDuration' mt={4} isRequired>
              <FormLabel>Duration</FormLabel>
              <Select
                placeholder='Select'
                backgroundColor='white'
                onChange={handleChange}
              >
                <option value='1 day'>1 Day Plan</option>
                <option value='3 days'>3 Day Plan</option>
                <option value='7 days'>7 Day Plan</option>
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              loadingText='Submitting'
              size='lg'
              mt={6}
              bg={'blue.400'}
              color={'white'}
              isLoading={isSubmitting}
              _hover={{
                bg: 'blue.500',
              }}
            >
              I am ready to be inspired
            </Button>
            {mealPlan && (
              <Box mt={8}>
                <Heading as='h2' size='lg'>
                  Meal Plan
                </Heading>
                {Object.entries(mealPlan.mealplan).map(([day, meals]) => (
                  <Box key={day} mt={4}>
                    <Heading as='h3' size='md'>
                      {day}
                    </Heading>
                    <Box>
                      {Object.entries(meals).map(([meal, recipe]) => (
                        <Box key={meal} mt={2}>
                          <Text fontWeight='bold'>{meal}:</Text>
                          <Text>{recipe}</Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Button
              onClick={generatePdf}
              size='lg'
              mt={6}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              style={{ display: mealPlan ? 'block' : 'none' }}
            >
              Export to PDF
            </Button>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};
