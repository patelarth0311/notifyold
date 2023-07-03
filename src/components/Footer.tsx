import github from "../svgs/github.svg";
import linkedin from "../svgs/linkedin.svg";

export function Footer() {
  return (
    <div className="flex flex-col  bg-indigo-600 justify-center gap-y-3 items-center h-[140px]">
      <h1 className="text-xl font-ver text-center text-white">Notify</h1>
      <div className="flex  gap-x-4 ">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/patelarth0311"
        >
          <img width={25} src={github}></img>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/patelrarth/"
        >
          <img width={25} src={linkedin}></img>
        </a>
      </div>
    </div>
  );
}
