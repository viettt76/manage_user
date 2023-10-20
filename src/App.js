import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import "./App.scss";
import { UserContext } from "./userContext/UserProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { login } = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])
  
  return (
    <div className="app">
      <Header />

      <Container>
        <AppRoutes />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
