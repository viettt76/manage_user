import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import "./App.scss";

function App() {



  return (
    <div className="App">
      <Header />
      <TableUsers />

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
