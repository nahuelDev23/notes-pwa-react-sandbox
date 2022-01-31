import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import 'moment/locale/es'
import React from 'react';
import Moment from 'react-moment';


export const CommentBox = ({ comment }) => {
  const { name, date, comment: theComment, photo } = comment.data()
  return (
    <Box display='flex' bgColor='twitter.800' mt='4' p='4' rounded='4'>

      <Avatar mr='4' src={photo} alt={`avatar del usuario ${name}`} />

      <Box w='full'>
        <Flex justifyContent='space-between' >
          <Text>{name} dijo : </Text>
          <Moment locale="es" fromNow>{date?.toDate()}</Moment>
        </Flex>
        <Text>{theComment}</Text>
      </Box>
    </Box>)
};
