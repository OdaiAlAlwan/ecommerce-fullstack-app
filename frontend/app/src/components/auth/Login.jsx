import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { IoBagHandleSharp } from "react-icons/io5";
import { Auth_Login, messageClear } from "../../rtk/slices/AuthUser-slice";
import { OverrideStyle } from "../../utils/helpers";

export default function Login() {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, role, isLogin } = useSelector(
    (state) => state.auth,
  );
  const toPage = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(Auth_Login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    } else if (isLogin) {
      toast.success(successMessage);
      dispatch(messageClear());
      setTimeout(() => {
        toPage("/");
      }, 2000);
    }
  }, [dispatch, role, toPage, isLogin, errorMessage, successMessage]);

  return (


    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full flex items-center justify-center">

        <form
          onSubmit={submit}
          className="z-[1] flex h-auto py-8 w-[320px] text-sm flex-col items-center justify-center gap-3 rounded-lg bg-[rgb(238,238,238)] shadow-xl md:w-[320px]"
        >
          <h1 className="mb-2 flex items-center justify-center gap-2 font-serif text-lg font-extrabold">
            Welcome to ELECTRO{" "}
            <IoBagHandleSharp className="text-[#319cd2]" />{" "}
          </h1>
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Email</label>
            <input
              onChange={inputHandel}
              value={state.email}
              name="email"
              id="email"
              type="email"
              placeholder="email@example.com"
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Password</label>
            <input
              onChange={inputHandel}
              value={state.password}
              name="password"
              id="password"
              type="password"
              placeholder="Password. . . ."
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>
          <button
            disabled={loader ? true : false}
            className="text-sm mt-4 w-[100px] rounded-md bg-sky-500 p-1.5 text-white hover:bg-sky-700"
          >
            {loader ? <BarLoader cssOverride={OverrideStyle} /> : "Sign In"}
          </button>

          <div className="text-xs mt-2">
            <span>
              Create Account
              <Link to={"/SignUp"}>
                <button className="text-xs p-1 text-sky-700 ml-1">
                  Sign Up
                </button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>

  );
}
