import menu from "../svgs/menu.svg";
import pencil from "../svgs/pencil.svg";
import logout from "../svgs/signout.svg";
import { useState } from "react";
import { ListCreation } from "./ListCreation";
import close from "../svgs/close.svg";
import information from "../svgs/information.svg"
import { MyContext } from "./Context";
import { useContext } from "react";

export function FloatingActionButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed font-ver z-50">
      <button
        onClick={() => {
          setToggle((prev) => !prev);
        }}
        className="shadow-2xl rounded-full bg-indigo-500 w-12 h-12 flex justify-center items-center fixed top-6 right-6"
      >
        <img width={24} src={toggle ? close : menu}></img>
      </button>
      {toggle && (
        <>
          <Create fixed={true}></Create>
          <Info></Info>
          <Logout></Logout>
        </>
      )}
    </div>
  );
}
export function Create(props: {fixed: boolean}) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setToggle((prev) => !prev);
          document.body.style.overflow = "hidden";
        }}
        className={"shadow-2xl  rounded-full bg-indigo-500 w-10 h-10 flex justify-center items-center " + (props.fixed ? " fixed top-24 right-7 " : "relative")}
      >
        <img width={20} src={pencil}></img>
      </button>
      {toggle && (
        <ListCreation
          setToggle={() => {
            document.body.style.overflowY = "scroll";
            setToggle(false);
          }}
        ></ListCreation>
      )}
    </>
  );
}

function Logout() {

    const {appStatus, setAppStatus} = useContext(MyContext)

  return (
    <button
      onClick={() => {
        localStorage.clear();
        setAppStatus({userId: "", response: "", status: ""})

      }}
      className="shadow-2xl rounded-full bg-indigo-500 w-10 h-10 flex justify-center items-center fixed top-7 right-24"
    >
      <img width={20} src={logout}></img>
    </button>
  );
}

function Info() {
  return (
    <button className="shadow-2xl rounded-full bg-indigo-500 w-10 h-10 flex justify-center items-center fixed top-20 right-20">
      <img width={20} src={information}></img>
    </button>
  );
}
