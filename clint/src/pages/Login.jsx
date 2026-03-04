import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/apis/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  // Input fields sa data get krna k lia state Variable( 1 signupInput  2 loginInput)
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    // Gender: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    { 
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const [signupErrors, setSignupErrors] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));

      // Validation checks
      if (name === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setSignupErrors((prev) => ({
          ...prev,
          email: isValidEmail ? "" : "Invalid email format",
        }));
      }

      if (name === "password") {
        const isValidPassword = value.length >= 6;
        setSignupErrors((prev) => ({
          ...prev,
          password: isValidPassword
            ? ""
            : "Password must be at least 6 characters",
        }));
      }
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleRegistration = async (type) => {
  try {
    if (type === "signup") {
      const signupRes = await registerUser(signupInput).unwrap();

      toast.success(signupRes.message || "Signup Successful");

      // Auto-login silently (no toast here)
      const loginRes = await loginUser({
        email: signupInput.email,
        password: signupInput.password,
      }).unwrap();

      // Navigate without extra login toast
      navigate("/", { state: { user: loginRes.user } });

    } else {
      const loginRes = await loginUser(loginInput).unwrap();
      toast.success(loginRes.message || "Login Successfully");
      navigate("/", { state: { user: loginRes.user } });
    }
  } catch (err) {
    toast.error(err?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Tabs
        defaultValue="login"
        className="w-[400px] backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl w-full max-w-md mt-0"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
  <Card>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegistration("signup");
      }}
    >
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-semibold tracking-tight text-gray-900">
          Create your account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={signupInput.name}
            onChange={(e) => changeInputHandler(e, "signup")}
            placeholder="Eg. Haroon"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="username">E-mail</Label>
          <Input
            type="email"
            name="email"
            value={signupInput.email}
            onChange={(e) => changeInputHandler(e, "signup")}
            placeholder="Eg. abc@gmail.com"
            required
          />
          {signupErrors.email && (
            <p style={{ color: "red" }}>{signupErrors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="username">Password</Label>
          <Input
            type="password"
            name="password"
            value={signupInput.password}
            onChange={(e) => changeInputHandler(e, "signup")}
            placeholder="At least 6 character long"
            required
          />
          {signupErrors.password && (
            <p style={{ color: "red" }}>{signupErrors.password}</p>
          )}
        </div>

        {/* <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={signupInput.confirmPassword}
            onChange={(e) => changeInputHandler(e, "signup")}
            placeholder="Re-enter your password"
            required
          />
          {signupErrors.confirmPassword && (
            <p style={{ color: 'red' }}>{signupErrors.confirmPassword}</p>
          )}
        </div> */}

        {/* <div className="space-y-1">
          <Label htmlFor="gender">Gender</Label>   
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => changeInputHandler(e, "signup")}
                required
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => changeInputHandler(e, "signup")}
                required
              />
              <span>Female</span>
            </label>
          </div>
        </div> */}
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className="w-full rounded-xl text-base mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white transition duration-300"
          disabled={registerIsLoading}
        >
          {registerIsLoading ? (
            <>
              <Loader2 className="mr-2 h-4  w-4 animate-spin" />
              Please Wait..
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </CardFooter>
    </form>
  </Card>
</TabsContent>

        <TabsContent value="login">
  <Card>
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default page reload
        handleRegistration("login"); // Trigger login
      }}
    >
      <CardHeader className="text-center space-y-2">
        <CardDescription className="text-lg font-semibold  text-gray-900">
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">E-mail</Label>
          <Input
            type="email"
            name="email"
            value={loginInput.email}
            onChange={(e) => changeInputHandler(e, "login")}
            placeholder="Eg. abc@gmail.com"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">Password</Label>
          <Input
            type="password"
            name="password"
            value={loginInput.password}
            onChange={(e) => changeInputHandler(e, "login")}
            placeholder="Eg. xyz"
            required
          />
        </div>
        <div className="text-right mt-1">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          className="w-full rounded-xl text-base mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white transition duration-300"
          disabled={loginIsLoading}
        >
          {loginIsLoading ? (
            <>
              <Loader2 className="mr-2 h-4  w-4 animate-spin" />
              Please Wait..
            </>
          ) : (
            "Login"
          )}
        </Button>
      </CardFooter>
    </form>
  </Card>
</TabsContent>

      </Tabs>
    </div>
  );
};

export default Login;
