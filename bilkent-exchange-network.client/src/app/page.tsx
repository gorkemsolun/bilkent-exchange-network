"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700"
      style={{
        // Original Image: https://i.hbrcdn.com/haber/2023/08/18/fasulyesine-oynamam-ha-hangi-dizi-fasulyesine-16240029_1708_amp.jpg
        backgroundImage: `url("https://www.technopat.net/sosyal/eklenti/mountains_peaks_snow_192502_1920x1080-jpg.1367847/")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* (potential) BUG_1: FIX THIS PART. EVEN THOUGH OTHER RESOURCES ADJUSTS THEIR SIZE ACCORDING TO CLIENT BILKENT LOGO DOES NOT DO THAT! */}
        <img src="bilkent.png" width={"250"} height={"250"} />{" "}
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to BEN!
        </h1>
      </div>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 opacity-90"
        action=""
      >
        <label className="font-semibold text-xs">Username or Email</label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
        />
        <label className="font-semibold text-xs mt-3">Password</label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
        />
        <Link
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
          href={"/home"}
        >
          Login
        </Link>
        <div className="flex mt-6 justify-center text-xs">
          <a className="text-blue-400 hover:text-blue-500" href="#">
            Forgot Password
          </a>
          <span className="mx-2 text-gray-300">/</span>
          <a className="text-blue-400 hover:text-blue-500" href="#">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
