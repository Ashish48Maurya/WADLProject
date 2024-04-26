import React from "react";

export default function Home() {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div class="relative mx-auto flex max-w-2xl flex-col items-cente z-10 items-center justify-center h-full">
          <h2 className="text-center text-3xl font-medium text-gray-900 sm:text-6xl">
            Blah Blah,{" "}
            <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent ">
              Manage Events
            </span>
          </h2>
          <p className="mt-6 text-center text-lg leading-6 text-gray-600 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perferendis ratione doloremque ad officia fugiat sapiente porro eos
            ea. Facere corporis harum ducimus soluta error? Accusamus ex
            molestiae illum in reprehenderit.{" "}
            <span className="cursor-wait opacity-70">Vanilla CSS</span> for easy
            integration.
          </p>
        </div>
      </div>
    </>
  );
}
