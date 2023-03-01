import { useAuth } from "./hooks/useAuth";
import { SignIn } from "./pages/SignIn";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { DashboardPage } from "./pages/Dashboard";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Box />;
  }

  const TopPage = () => (
    <Flex justify={"center"}>
      <VStack h={500} justify="center" spacing={8}>
        <Text fontSize="5xl">Cognito Test</Text>

        {auth.isAuthenticated ? (
          <>
            <Text fontSize={"3xl"}>STATUS: AUTHENTICATED</Text>
            <Link to="/dashboard">
              <Text fontSize={"2xl"}>
                Go to Private Dashboard <ExternalLinkIcon mx="4px" />
              </Text>
            </Link>
          </>
        ) : (
          <>
            <Text fontSize={"3xl"}>STATUS: NOT AUTHENTICATED</Text>
            <Link to="/signin">
              <Text fontSize={"2xl"}>
                Go to Sign In <ExternalLinkIcon mx="4px" />
              </Text>
            </Link>
          </>
        )}
      </VStack>
    </Flex>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
