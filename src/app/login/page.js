"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication method
import { auth } from "@/lib/firebase.config"; // Firebase configuration
import {
  Box,
  Button,
  Input,
  Text,
  Link,
  VStack,
  HStack,
  Heading,
  useToast,
  Spinner,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react"; // Chakra UI for styling components
import NextLink from "next/link"; // For client-side navigation

const LoginPage = () => {
  // State hooks for managing email, password, loading state, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter(); // Router instance for navigation
  const toast = useToast(); // Chakra UI toast for feedback messages

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading spinner
    setError(""); // Reset any previous errors

    try {
      // Sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // On success, redirect to the home page
      router.push("/");

      // Show success message using toast
      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Display error message and stop loading
      setError("Login failed. Please check your credentials and try again.");
      setLoading(false);
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
        {/* Login heading */}
        <Heading as="h2" mb={6} textAlign="center" color="teal.500">
          Login
        </Heading>

        {/* Login form */}
        <form onSubmit={handleLogin}>
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

            {/* Login button */}
            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              rounded="md"
              isLoading={loading}
              loadingText="Logging in"
              shadow="md"
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </VStack>
        </form>

        {/* New user signup link */}
        <HStack justify="center" mt={4}>
          <Text>New here?</Text>
          <NextLink href="/signup" passHref>
            <Link color="teal.500" fontWeight="bold">
              Sign up
            </Link>
          </NextLink>
        </HStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
