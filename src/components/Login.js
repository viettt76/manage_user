import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserProvider";

function Login() {
  const { login } = useContext(UserContext)
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePressEnter = (e) => {
      if(email && password && e.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keydown', handlePressEnter)

    return () => {
      window.removeEventListener('keydown', handlePressEnter)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }

    const res = await loginApi(email.trim(), password);
    if (res && res.token) {
      login(email.trim(), res.token)
      toast.success('Login Success')
      setLoading(false);
      navigate("/");
    } else {
      // Error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Log in</div>
      <div className="text">Email or Username ( eve.holt@reqres.in ) </div>
      <input
        value={email}
        placeholder="Email or username"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={email && password && !loading ? false : true}
        className={email && password && "active"}
        onClick={handleLogin}
      >
        {loading ? (
          <i className="loading-icon fa-solid fa-spinner"></i>
        ) : (
          "Log in"
        )}
      </button>
      <div className="back" onClick={handleBack}>
        <i className="fa-solid fa-chevron-left"></i> Go back
      </div>
    </div>
  );
}

export default Login;
