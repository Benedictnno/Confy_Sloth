import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/user_context";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useUserContext();

  const onSubmit = async (data) => {
    setUser(data);
  };

  const { User } = useUserContext();
  if (User) {
    return <Navigate to="/" />;
  }
  return (
    <div className="max-w-md mx-auto mt-10 mb-[30vh]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input {...register("email")} className="border w-full p-2 rounded" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className="border w-full p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>

          <Link to={"/forgot-password"}>forgotten password?</Link>
        </div>
        <p>Dont have an accout??</p>
        <Link to={"/sign-up"}>Sign Up</Link>
      </form>
    </div>
  );
}
