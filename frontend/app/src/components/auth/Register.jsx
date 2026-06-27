import React from 'react';
import { Link } from 'react-router-dom';
import { IoBagHandleSharp } from "react-icons/io5";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full flex items-center justify-center">
        <form
          className="z-[1] flex h-auto py-8 w-[320px] text-sm flex-col items-center justify-center gap-3 rounded-lg bg-[rgb(238,238,238)] shadow-xl md:w-[320px]"
        >
          <h1 className="mb-2 flex items-center justify-center gap-2 font-serif text-lg font-extrabold">
            Welcome to ELECTRO <IoBagHandleSharp className="text-[#319cd2]" />
          </h1>
          
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password . . ."
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>
          <div className="flex w-[240px] flex-col gap-1">
            <label className="text-xs">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password . . ."
              className="rounded-md border-black p-1.5 outline-none text-xs"
            />
          </div>

          <button
            disabled
            className="text-sm mt-4 w-[100px] disabled:cursor-not-allowed rounded-md bg-sky-500 p-1.5 text-white hover:bg-sky-700"
          >
            Sign Up
          </button>
          <div className="text-xs mt-2">
            <span>
              You Have Account? 
              <Link to={'/SignIn'}>
                <button className="text-xs p-1 text-sky-700 ml-1">
                  Sign In
                </button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
