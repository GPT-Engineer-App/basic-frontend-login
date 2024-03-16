import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";

const API_URL = "https://backengine-hiqb.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const response = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        if (isLogin) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.accessToken);
          toast({
            title: "Login Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Signup Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLogin(true);
        }
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        {isLogin ? "Login" : "Signup"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {isLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </form>
      <Text mt={4} textAlign="center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Button variant="link" colorScheme="blue" ml={2} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Signup" : "Login"}
        </Button>
      </Text>
    </Box>
  );
};

export default Index;
