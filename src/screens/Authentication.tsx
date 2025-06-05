import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Input, Tab, Tabs } from "@heroui/react";
import PasswordInput from "../components/PasswordInput";
import { AppDispatch, IRootState } from "../store.ts";
import { performLogin, performRegister } from "../slices/thunks.ts";

const Authentication = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: IRootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleLogin = () => {
    dispatch(performLogin(email, password));
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    setRegisterError(null);
    dispatch(performRegister(email, password));
  };

  return (
    <div className="flex flex-col p-3 pt-1.5 gap-3 justify-center">
      <Card className="min-h-[150px] overflow-hidden meal-section" shadow="none">
        <CardHeader className="text-textPrimaryColor  text-xl font-[600]">Authentication</CardHeader>
        <CardBody>
          <Tabs aria-label="Options">
            <Tab key="login" title="Log In">
              <div className="flex flex-col gap-5">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <PasswordInput value={password} onChange={setPassword} />
                {auth.error && <p className="text-red-500 text-sm">{auth.error}</p>}
                <Button color="primary" className="text-lg font-bold text-white" onPress={handleLogin} disabled={auth.loading}>
                  {auth.loading ? "Logging in..." : "Log In"}
                </Button>
              </div>
            </Tab>
            <Tab key="register" title="Register">
              <div className="flex flex-col gap-5">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={setPassword}
                />
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
                {(auth.registrationError || registerError) && (
                  <p className="text-red-500 text-sm">{auth.registrationError || registerError}</p>
                )}
                {auth.registrationSuccess && (
                  <p className="text-green-600 text-sm">Registration successful! You can now log in.</p>
                )}
                <Button
                  color="primary"
                  className="text-lg font-bold text-white"
                  onPress={handleRegister}
                  disabled={auth.loading}
                >
                  {auth.loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Authentication;
