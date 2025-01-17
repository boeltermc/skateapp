import React from 'react';
import { Button, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text } from '@chakra-ui/react';
import voteOnContent from '../../api/voting';
import { useState } from 'react';
import HiveLogin from '../../api/HiveLoginModal';
import ErrorModal from './errorModal';
import * as Types from '../types'

const PostFooter: React.FC<Types.PostFooterProps> = ({ onClose, user, author, permlink, weight = 10000 }) => {
  const [sliderValue, setSliderValue] = useState(10000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error message
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Track modal visibility

  const getFeedbackText = (value: number) => {
    if (value === -10000) return "I hate it";
    if (value === -5000) return "I don't care for it";
    if (value === 0) return "Skaters can do better";
    if (value === 5000) return "That's kind of cool";
    if (value === 10000) return "That's fucking awesome";
    return "";
  };
  



  const handleVote = async () => {
    if (!user || !user.name) {
      console.error("User not logged in or missing username");
      return;
    }
  
    try {
      await voteOnContent(user.name, permlink, author, sliderValue);
      console.log("Voting successful!");
      // handle the vote result here
    } catch (error) {
      console.error("Voting failed:", error);
  
      // Use a type assertion to cast 'error' to the 'Error' type
      const errorMessage = (error as Error).message ;
  
      // Set the error message and open the modal
      setErrorMessage(`You already voted with the same voting power or ${errorMessage}`);
      setIsErrorModalOpen(true);
    }
  };
  
  
  
  
  return (
    <Flex borderRadius={"10px"}  padding="20px" justify="space-between" >
      <Button
        bg="black"
        color="#fff"
        borderRadius="4px"
        p={2}
        onClick={onClose}
        _hover={{ bg: 'black', color: 'red' }}
        border={"1px solid white"}
      >
        Close
      </Button>
      <Box width="40%">
        <Text textAlign="center"> Your opinion on this post</Text>
        <Slider 
          min={-10000} 
          max={10000} 
          step={5000} 
          value={sliderValue} 
          onChange={(value) => setSliderValue(value)}
        >
          <SliderTrack bg="white">
            <SliderFilledTrack bg="yellow" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
          </SliderThumb>
        </Slider>
        
        <Text color="yellow" mt={2} textAlign="center">
          {getFeedbackText(sliderValue)}
        </Text>
      </Box>
      <Button
        bg="black"
        color="white"
        borderRadius="4px"
        border="1px solid limegreen"
        p={2}
        onClick={handleVote}
        _hover={{ bg: 'black', color: 'orange' }}
      >
        Vote
      </Button>
      <ErrorModal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)} errorMessage={errorMessage || ''} />

    </Flex>
  );
  
}

export default PostFooter;
