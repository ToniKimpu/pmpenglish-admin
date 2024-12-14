import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth";

const useLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    await login(data.email, data.password);
    navigate("/");
  };

  return { register, handleSubmit, handleLogin, isSubmitting };
};

export default useLogin;
