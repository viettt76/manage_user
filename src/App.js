import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
