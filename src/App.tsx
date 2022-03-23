import { ChakraProvider, theme } from "@chakra-ui/react"
import ContactList from "./Components/ContactList"
import Layout from "./Components/Layout"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Layout>
      <ContactList />
    </Layout>
  </ChakraProvider>
)
