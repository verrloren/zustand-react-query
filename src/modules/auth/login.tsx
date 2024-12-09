import { useAppDispatch, useAppSelector } from "@/app/hooks/react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginThunk, useLoginLoading } from "./login-thunk";
import { authSlice } from "./auth.slice";

export function Login() {
  const dispatch = useAppDispatch();

	const userIsLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? ""
      )
    );
  };

  return (
    <div className="p-5 border border-slate-500 rounded-lg container ms-auto mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl text-white">Login</h1>
        <Input
          type="text"
          placeholder="Username"
          className="text-white placeholder:text-white p-5 rounded border border-slate-500"
          name="login"
        />
        <Input
          type="text"
          placeholder="Password"
          className="text-white placeholder:text-white p-5 rounded border border-slate-500"
          name="password"
        />
        {loginError && <div className="text-red-500">{loginError}</div>}
        <Button disabled={userIsLoading} className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300">Sign in</Button>
      </form>
    </div>
  );
}
