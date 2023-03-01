import { useState } from "react";

import { appConfig } from "../config";
import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "../components/PrivateRoute";

import { Box, Button, Text, VStack } from "@chakra-ui/react";

export function DashboardPage() {
  const [resultData, setResultData] = useState("");
  const auth = useAuth();

  const handleClick = async () => {
    try {
      const res = await fetch(`${appConfig.backendServer}/dashboard`, {
        headers: {
          Authorization: `Bearer ${auth.jwtToken}`,
        },
      });
      const data = await res.json();

      setResultData(JSON.stringify(data));
    } catch (error) {
      setResultData(JSON.stringify(error));
    }
  };

  if (auth.isLoading) {
    return <Box />;
  }

  return (
    <PrivateRoute>
      <VStack h={500} justify="center" spacing={8}>
        <Text fontSize="5xl">Welcome {auth.username}!!</Text>
        <Text fontSize="4xl">Login Succeed🎉</Text>
        <Button colorScheme="teal" size="lg" onClick={handleClick}>
          Fetch Message
        </Button>
        <pre>{resultData}</pre>
        <Button colorScheme="teal" size="lg" onClick={() => auth.signOut()}>
          Log out
        </Button>
      </VStack>
    </PrivateRoute>
  );
}
