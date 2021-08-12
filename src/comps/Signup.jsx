import { pathnames } from "../constants/location";
import SignInLayout from "./SignInLayout";

const Signup = () => {
  

  return (
    <SignInLayout currentPathSignUp={pathnames.signup}/>
  );
};

export default Signup;