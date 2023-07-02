
import { addNote } from "../API/Requests";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "./Context";
import { useToast } from "@chakra-ui/react";
import check from "../svgs/check.svg";
import { makeToast } from "./Toast";

export function ListCreation(props: { setToggle: () => void }) {
  const toast = useToast();

  const [note, setNote] = useState("");
  const { appStatus, setAppStatus } = useContext(MyContext);

  return (
    <div className="fixed overflow-scroll w-full p-3 h-full top-0 right-0 flex justify-center items-center z-10 backdrop-blur">
      <div className="flex  w-[500px]   flex-col gap-4 h-auto bg-white p-[20px] rounded-xl shadow-2xl">
        <h1 className={"text-[20px]"}>Create a Note</h1>
        <div className="flex justify-start flex-col gap-10 ">
          <input
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            className=" relative  rounded-md  p-1 border "
            placeholder="Name"
          ></input>
          <div className="flex w-full h-full justify-end flex-row items-end gap-3">
            <button
              onClick={props.setToggle}
              className={
                "bg-indigo-500 w-[100px] h-[30px] rounded-md text-white"
              }
            >
              Cancel
            </button>
            <button
              disabled={note.length === 0}
              onClick={() => {
                addNote(note, appStatus.userId ? appStatus.userId : "").then(
                  (res) => {
                    if (res?.status === 200) {
                      setAppStatus({
                        ...appStatus,
                        status: res.data.status,
                        response: res.data,
                      });
                      props.setToggle();
                      {makeToast(  <img className="absolute left-10" src={check}></img>,note,"border-[#6FCF97]",toast, "created!")}
            
                    }
                  }
                );
              }}
              className={
                "w-[100px] h-[30px] rounded-md text-white " +
                (note.length !== 0 ? " bg-indigo-500" : "bg-gray-200")
              }
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
