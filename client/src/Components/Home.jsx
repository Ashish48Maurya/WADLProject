import React from "react";

export default function Home() {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div class="absolute inset-0 bg-white bg-opacity-50"></div>
        <div class="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl font-bold text-black">Welcome to AppName</h1>
          <p
            class="text-black  
            text-center
            text-2xl
            font-semibold
            mt-4
            max-w-2xl
            px-4
          "
          >
            This is a simple app to demonstrate the use of React, Tailwind CSS,
            and other technologies.
          </p>
        </div>
      </div>
    </>
  );
}
