import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Eye, EyeClosed } from "lucide-react"
import { FormEvent, useRef, useState } from "react"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"

export function LoginForm({
  className,action,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { action: "Login" | "Sign up" }) {

  const [visible, setVisible] = useState(false);
  const {setUsername,setUserId} = useAuthStore();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const username = data.get('username')?.toString().trim();
    const password = data.get('password')?.toString().trim();
    if((!username || username.length == 0) || (!password || password.length == 0)){
      toast.error("Please fill all fields.")
      return;
    }
    if(password.length<6){
      toast.error("password must have atleast 6 characters.");
      return;
    }
    let subURL = ""
    if(action == "Sign up"){
      subURL = "register";
    }else{
      subURL = "login"
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/${subURL}`,{
        method:"POST",
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({username,password})
      });
      const result = await response.json();
      if(response.ok){
        setUsername(username);
        setUserId(result.userId);
        localStorage.setItem('username',username);
        localStorage.setItem('userId',result.userId);
        localStorage.setItem('isLoggedIn',"true");
        toast.success(`${action} successful!`);
        if(action == "Login"){
          navigate("/");
        }else{
          navigate("/login");
        }
        console.log(result);
      }else{
        toast.error(result.message);
      }
      if(usernameRef.current && passwordRef.current){
        usernameRef.current.value = "";
        passwordRef.current.value = "";
      }
    } catch (error) {
      if(error instanceof Error){
        toast.error(error.message);
      }else{
        toast(`Unexpected Error: ${error}`);
      }
      return;
    }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{action}</CardTitle>
          <CardDescription>
            Enter your username below to {action} to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="px-1">Username</Label>
                <Input
                  ref={usernameRef}
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  name="username"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="flex items-center justify-between w-full px-1">Password {visible?<Eye width={25} onClick={()=>setVisible(false)}/> : <EyeClosed width={25} onClick={()=>setVisible(true)}/>}</Label>
                </div>
                <Input ref={passwordRef} id="password" type={visible?"text":"password"} name="password" />
              </div>
              <Button type="submit" className="w-full">
                {action}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {action == "Login" ? "Don't have an account? ":"Already have an account? "}
              <Link to={action == "Login" ? "/signup" : "/login"}>
                {action == "Login" ? "Sign up" : "Login"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
