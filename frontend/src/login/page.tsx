import React from "react";
import { Input, Button } from "antd";
import { useNotification } from "../components/notificationContext";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function LoginPage() {
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [sending, setSending] = React.useState<boolean>(false);

  const validate = (email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || email == "" || !emailRegex.test(email)) {
      return false;
    }
    if (!password || password == "") {
      return false;
    }
    return true;
  };

  const loginClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate(email, password);
    if (validation) {
      // mutation
      setSending(true);
      try {
        const help_obj: {
          email: string;
          password: string;
        } = {
          email: email,
          password: password,
        };

        const response = await api.post("/api/login", help_obj);

        if (response.status === 200) {
          setSending(false);
          openNotification("Success", "Login successful");
          navigate("/home");
        } else {
          setSending(false);
          setPassword("");
          openNotification("Error", "Login failed ..");
        }
      } catch (error) {
        openNotification("Error", "Connection error..");
        setSending(false);
        setPassword("");
      }
    } else {
      console.log("not valid inputs");
      openNotification("Error", "You have to input email and password!");
    }
  };

  return (
    <div className="w-screen min-h-screen h-full flex items-center justify-center">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-500 shadow-lg overflow-hidden">
        <form onSubmit={loginClick}>
          <h1 className="font-semibold text-xl bg-blue-500 p-2">LOGIN</h1>
          <div className="flex flex-col p-4 gap-4">
            <div className="flex flex-row items-center justify-between gap-2">
              <span className="w-24">Email:</span>
              <Input
                className="w-48"
                disabled={sending}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <span className="w-24">Password</span>
              <Input.Password
                className="w-48"
                disabled={sending}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="primary" htmlType="submit" disabled={sending}>
              {sending ? "Sending..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
