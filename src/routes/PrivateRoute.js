import { useContext } from "react";
import { UserContext } from "../userContext/UserProvider";
import Alert from "react-bootstrap/Alert";

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.auth ? (
        <>{children}</>
      ) : (
        <>
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>You must login to use this functionality</p>
          </Alert>
        </>
      )}
    </>
  );
}

export default PrivateRoute;
