import { Navigate } from "react-router-dom";
import { GeneralContext } from "../App";
import { useContext } from "react";

type Props = {
    children: React.ReactNode,
}

export const PrivateRoute = (props: Props) =>{
    const loginState = useContext(GeneralContext).loginState;
    if(loginState.authenticated){
        return props.children;
    }else{
        return <Navigate to='/login'/>
    }

}