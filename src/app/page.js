"use client";

import { useAuth } from "../context/AuthContext"; // Custom hook for authentication context
import { useRouter } from "next/navigation"; // For programmatic navigation in Next.js
import {
  Box,
  Button,
  Text,
  Heading,
  VStack,
  Flex,
  Avatar,
  useToast,
} from "@chakra-ui/react"; // Chakra UI components

export default function Home() {
  const { user, logout } = useAuth(); // Access user and logout function from authentication context
  const router = useRouter(); // Router instance for navigation
  const toast = useToast(); // Chakra UI toast for showing notifications

  // Handle user logout
  const handleLogout = async () => {
    await logout(); // Call logout function from auth context

    // Display success toast notification after logout
    toast({
      title: "Logged out successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Redirect user to the login page after logout
    router.push("/login");
  };

  // Redirect to login page if no user is authenticated
  if (!user) {
    router.push("/login");
    return null; // Return null to prevent rendering the rest of the component
  }

  return (
    <Flex
      minH="100vh" // Full viewport height
      align="center" // Vertically center the content
      justify="center" // Horizontally center the content
      bg="gray.50" // Light background color
      px={4}
      py={6}
    >
      <Box
        maxW="lg" // Maximum width of the container
        bg="white" // White background for the box
        p={8} // Padding inside the box
        rounded="lg" // Rounded corners
        shadow="lg" // Large shadow for depth effect
        textAlign="center" // Center text inside the box
      >
        <VStack spacing={4}>
          {/* Display user avatar, using email as fallback name */}
          <Avatar size="xl" name={user?.email} bg="teal.500" color="white" />

          {/* Heading with a welcome message, displaying the user's email */}
          <Heading as="h2" fontSize="2xl" color="teal.500">
            Welcome, {user?.email}
          </Heading>

          {/* Subtext showing successful login message */}
          <Text fontSize="md" color="gray.600">
            You are successfully logged in.
          </Text>

          {/* Logout button to handle user logout */}
          <Button
            colorScheme="teal"
            size="lg"
            mt={4}
            onClick={handleLogout}
            shadow="md"
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
