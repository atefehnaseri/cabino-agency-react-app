import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orange;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">hello</Heading>
        <Heading as="h2">h2</Heading>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Input placeholder="Number of guests" type="number" />
      </StyledApp>
    </>
  );
}

export default App;
