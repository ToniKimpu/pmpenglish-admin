import { useForm } from "react-hook-form";
import { signUp } from "../../../services/auth";
import { createUser } from "../../../services/user";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    const { data: signUpData, error: signUpError } = await signUp(
      data.email,
      data.password
    );
    if (signUpError) {
      console.error("Error signing up:", signUpError.message);
      return;
    }
    await createUser(data.name, data.email);
    navigate("/");
    console.log("successfully Created users!");
  };

  return { register, handleSubmit, handleLogin, isSubmitting };
};

export default useRegister;
