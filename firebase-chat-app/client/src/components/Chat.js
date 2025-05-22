import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  VStack,
  HStack,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { auth, db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.email,
      });
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Container maxW="container.md" h="100vh" py={4}>
      <VStack h="full" spacing={4}>
        <HStack w="full" justify="space-between">
          <Text fontSize="2xl">Chat Room</Text>
          <Button onClick={handleSignOut} colorScheme="red">
            Sign Out
          </Button>
        </HStack>
        
        <Box
          flex={1}
          w="full"
          bg="gray.50"
          p={4}
          borderRadius="md"
          overflowY="auto"
        >
          <VStack spacing={4} align="stretch">
            {messages.map((msg) => (
              <HStack
                key={msg.id}
                alignSelf={
                  msg.uid === auth.currentUser?.uid ? 'flex-end' : 'flex-start'
                }
                bg={msg.uid === auth.currentUser?.uid ? 'blue.100' : 'gray.100'}
                p={2}
                borderRadius="lg"
                maxW="70%"
              >
                <Avatar size="sm" name={msg.displayName} />
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    {msg.displayName}
                  </Text>
                  <Text>{msg.text}</Text>
                </Box>
              </HStack>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        </Box>

        <form onSubmit={sendMessage} style={{ width: '100%' }}>
          <Flex>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              mr={2}
            />
            <Button type="submit" colorScheme="blue">
              Send
            </Button>
          </Flex>
        </form>
      </VStack>
    </Container>
  );
}

export default Chat; 