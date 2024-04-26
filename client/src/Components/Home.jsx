import React from "react";

export default function Home() {
  return (
    <>
      <div className="relative grid sm:grid-flow-col min-h-[90svh] w-full bg-white ">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className=" self-center ">
          <img
            src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg?w=1380&t=st=1714138159~exp=1714138759~hmac=ae2cc5b3f3514117ddec67ba195104e882318f5912bb71edf65006cdab3b8faf"
            alt="home"
          />
        </div>
        <div
          className=" relative mx-auto flex max-w-2xl flex-col z-10 items-center px-10 sm:justify-center"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <h1 className="mb-2 text-6xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-8xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Blah Blah{" "}
            </span>{" "}
          </h1>

          <h2 className="mb-2 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-5xl">
            <span
              className="underline underline-offset-3 decoration-8 decoration-gray-900 italic text-transparent"
              style={{ WebkitTextStroke: "1px black" }}
            >
              Manage
            </span>{" "}
            <div className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">
              Events
            </div>
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
