import Swal from "sweetalert2";
import styled from "styled-components";
import hotelIcon from "../icons/5-estrellas.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";
import { GeneralContext } from "../App";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogin, resetStatus } from "../features/login/loginSlice";
import { getLoginStatus } from "../features/login/loginSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100vh;
`;
const Image = styled.img`
  margin-bottom: 10px;
  height: 120px;
  width: 120px;
`;

const Form = styled.form`
  box-shadow: 0px 16px 30px #00000014;
  text-align: center;
  background-color: white;
  padding: 25px 35px;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 5px;
`;
const Input = styled.input`
  font-size: 18px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${colors.bottomBorderGray};
`;
const Button = styled.button`
  display: block;
  border: none;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 40px;
  color: ${colors.hardGreen};
  background: ${colors.lightGreen} 0% 0% no-repeat padding-box;
  margin: 0 auto 30px;
  &:hover {
    color: ${colors.lightGreen};
    background-color: ${colors.hardGreen};
  }
`;

type Props = {
  bold?: boolean;
};

const P = styled.p<Props>`
  margin: 1px;
  font-size: 12px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const H1 = styled.h1`
  color: black;
  margin: 5px 0px 25px;
  max-height: 35px;
  font-size: 36px;
  & span {
    color: ${colors.red};
    line-height: 30px;
  }
`;
export const Login = () => {
  const loginStatus = useAppSelector(getLoginStatus);
  const Gcontext = useContext(GeneralContext);
  const loginState = Gcontext.loginState;
  const dispatchLogin = Gcontext.dispatchLogin;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("Miguel");  // Cambié de email a username
  const [password, setPassword] = useState("admin");  // Mantienes el valor por defecto como "admin"

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userLogin({ username: username, password: password }));  // Cambié de email a username
  };

  useEffect(() => {
    if (loginState.authenticated === true) {
      navigate("/"); // Redirige a la página principal si ya está autenticado
    } else {
      navigate("/login");
    }

    if (loginStatus === "fulfilled") {
      dispatchLogin({
        type: "LOGIN",
        payload: {
          username: JSON.parse(localStorage.getItem("logged") || "").username || "Default Username",
          email: JSON.parse(localStorage.getItem("logged") || "").email || username,  // Asegúrate de usar el username correcto
          photo: "",
        },
      });
      navigate("/");  // Redirige después de iniciar sesión
      dispatch(resetStatus());  // Resetea el estado
    } else if (loginStatus === "rejected") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid login: Check Username or Password",
      });
    }
  }, [loginState, loginStatus]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Image src={hotelIcon} />

        <H1>
          travl <span>Login</span>
        </H1>

        <Label htmlFor="username">Username:</Label> 
        <Input
          value={username}  
          onChange={handleUsernameChange}
          type="text"  
          name="username"
          id="username"  
          required
          autoComplete="on"
          data-cy="username"
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          value={password} 
          onChange={handlePasswordChange}
          type="password"
          name="password"
          id="password"
          required
          autoComplete="current-password"
          data-cy="password"
        />
        <Button type="submit" data-cy="submit">
          Login
        </Button>
        <P bold>To see the demo:</P>
        <P>Username: Miguel</P>  
        <P>Password: admin</P>
      </Form>
    </Container>
  );
};
