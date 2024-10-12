"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase signup method
import { auth } from "@/lib/firebase.config"; // Firebase config import
import { useRouter } from "next/navigation"; // For programmatic navigation
import {
  Box,
  Button,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react"; // Chakra UI for UI styling
import NextLink from "next/link"; // For client-side navigation

export default function SignupPage() {
  // State hooks to manage user input, loading state, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter(); // Router instance for navigation
  const toast = useToast(); // Chakra UI toast for feedback messages

  // Function to handle the signup process
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true); // Show loading spinner
    setError(""); // Reset any existing error

    try {
      // Create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // On success, navigate to the homepage
      router.push("/");

      // Display success toast notification
      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Show error message if signup fails
      setError("Failed to create an account. Please try again.");
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="sm"
        w="full"
        mx="auto"
      >
        {/* Signup heading */}
        <Heading as="h2" mb={6} textAlign="center" color="teal.500">
          Sign Up
        </Heading>

        {/* Signup form */}
        <form onSubmit={handleSignup}>
          <VStack spacing={4} align="stretch">
            {/* Email input field */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                focusBorderColor="teal.500"
                rounded="md"
                shadow="sm"
                required
              />
            </FormControl>

            {/* Password input field */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                focusBorderColor="teal.500"
                rounded="md"
                shadow="sm"
                required
              />
            </FormControl>

            {/* Error message display */}
            {error && (
              <Text color="red.500" textAlign="center" fontSize="sm">
                {error}
              </Text>
            )}

            {/* Signup button */}
            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              rounded="md"
              isLoading={loading}
              loadingText="Signing up"
              shadow="md"
            >
              {loading ? <Spinner /> : "Sign Up"}
            </Button>
          </VStack>
        </form>

        {/* Already have an account link */}
        <HStack justify="center" mt={4}>
          <Text>Already have an account?</Text>
          <NextLink href="/login" passHref>
            <Link color="teal.500" fontWeight="bold">
              Login
            </Link>
          </NextLink>
        </HStack>
      </Box>
    </Flex>
  );
}
