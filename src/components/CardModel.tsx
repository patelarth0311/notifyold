import { Entry, Model, Note, AppStatus } from "../types/types";
import { useEffect, useState } from "react";
import { useRef } from "react";
import close from "../svgs/close.svg";
import edit from "../svgs/edit.svg";
import plus from "../svgs/plus.svg";
import {
  deleteNote,
  postEntry,
  deleteEntry,
  changeEntry,
} from "../API/Requests";
import cal from "../svgs/calendar.svg";
import priority from "../svgs/priority.svg";
import { useContext } from "react";
import { MyContext } from "./Context";
import "../App.css";
import trash from "../svgs/trash.svg";
import { useToast } from "@chakra-ui/react";
import check from "../svgs/check.svg";
import minus from "../svgs/minus.svg";
import { makeToast } from "./Toast";
import flag from "../svgs/flag.svg"

export function CardModel(props: Model & { note: Note }) {
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();
  const { appStatus, setAppStatus } = useContext(MyContext);
  const [createEntry, setCreateEntry] = useState(false);

  const [editEntry, setEditEntry] = useState({
    content: "",
    flag: false,
    time: "",
    priority: 0,
  });

  const [entry, setEntry] = useState({
    content: "",
    flag: false,
    time: "",
    priority: 0,
  });

  const handleChange = (e: any) => {
    if (e.target) {
      const { name, value, type, checked } = e.target;
    
      setEntry((prev) => {
        return {
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  };

  return (
    <div className="flex gap-y-4 flex-col p-10 ">
      <div className="flex gap-x-3 justify-end ">
        <button
          onClick={() => {
            deleteNote(
              props.note.noteId,
              appStatus.userId ? appStatus.userId : ""
            ).then((res) => {
              if (res?.status === 200) {
                setAppStatus({
                  ...appStatus,
                  status: res.data.status,
                  response: res.data,
                });
                props.setOpen(false);
                makeToast(  <img className="absolute left-10" src={check}></img>,props.note.name,"border-[#6FCF97]",toast, "deleted!")
              }
            });
          }}
          className="shadow-2xl rounded-full bg-indigo-500 w-8 h-8  flex justify-center items-center "
        >
          <img width={15} src={trash}></img>
        </button>

        {props.note.content.length > 0 && (
          <button
            onClick={() => {
              setEditMode((prev) => !prev);
              setCreateEntry(false);
            }}
            className={
              "shadow-2xl rounded-full bg-indigo-500 w-8 h-8 flex justify-center items-center " +
              (editMode ? " animate-bounce " : "")
            }
          >
            <img width={15} src={edit}></img>
          </button>
        )}

        <button
          onClick={() => props.setOpen(false)}
          className="shadow-2xl rounded-full bg-indigo-500 w-8 h-8  flex justify-center items-center "
        >
          <img width={15} src={close}></img>
        </button>
      </div>

      <div
        className={
          "mobile:w-[355px]  relative shadow-custom mobile:h-[410px]   w-[493.5px] h-[517.5px]   aspect-square rounded-[21.67px] bg-white "
        }
      >
        <div className="flex justify-start p-[15px] flex-col h-full b">
          <div className="justify-start flex  h-full gap-y-2 flex-col ">
            <p className="text-[17px] text-left font-bold text-black sticky">
              {props.note.name}
            </p>
            <div className="overflow-y-auto h-full relative ">
              <div className="flex justify-start items-start flex-col overflow-hidden w-full gap-y-3 overflow-y-auto p-1">
                {props.note.content.map((item, index) => (
                  <EditEntryField
                    appStatus={appStatus}
                    setAppStatus={setAppStatus}
                    noteId={props.note.noteId}
                    key={item.entryId}
                    item={item}
                    editMode={editMode}
                    editEntry={editEntry}
                    setEditEntry={(e: Entry) => {
                      setEditEntry(e);
                    }}
                  ></EditEntryField>
                ))}
                {createEntry && (
                  <CreateEntryField
                    entry={entry}
                    handleChange={handleChange}
                  ></CreateEntryField>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center w-full">
        <button
          onClick={() => {
            setEditMode(false);
            setCreateEntry((prev) => !prev);
          }}
          className={
            "  shadow-2xl rounded-full bg-indigo-500 w-8 h-8 flex justify-center items-center "
          }
        >
          <img width={15} src={plus}></img>
        </button>

        {(createEntry || editMode) && (
          <div className=" flex gap-x-1">
            {(props.note.content.length > 0 || createEntry) && (
              <button
                onClick={() => {
                  setEditMode(false);
                  setCreateEntry(false);
                  setEntry({ content: "", time: "", priority: 0, flag: false });
                }}
                className={
                  "bg-indigo-500 w-[90px] h-[30px] rounded-md text-white "
                }
              >
                Cancel
              </button>
            )}

            {createEntry && (
              <button
                onClick={() => {
                  try {
                    postEntry(
                      entry,
                      props.note.noteId,
                      appStatus.userId ? appStatus.userId : ""
                    ).then((res) => {
                      if (res?.status === 200) {
                        setAppStatus({
                          ...appStatus,
                          status: res.data.status,
                          response: res.data,
                        });
                        setEditMode(false);
                        setCreateEntry(false);
                        setEntry({
                          content: "",
                          time: "",
                          priority: 0,
                          flag: false,
                        });
                      }
                    });
                  } catch (err) {}
                }}
                className={
                  "bg-indigo-500 w-[90px] h-[30px]  rounded-md text-white "
                }
              >
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function CreateEntryField(props: {
  entry: Entry;
  handleChange: (e: any) => void;
}) {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <input
        type="text"
        name="content"
        value={props.entry.content}
        onChange={props.handleChange}
        className="text-[15px] border p-1   relative rounded-md  "
        placeholder="Add info"
      ></input>
      <div className="relative flex w-full gap-x-10 ">
        <div className="flex gap-x-2  w-full">
          <img src={cal} width={20}></img>
          <input
            name="time"
            value={props.entry.time}
            onChange={props.handleChange}
            type="date"
            className=" border  w-full rounded-lg focus:outline-indigo-500 pl-1 p-1"
            placeholder="Select date"
          />
        </div>
        <div className="flex gap-x-2">
          <img width={20} src={priority}></img>

          <select
          defaultValue={props.entry.priority}
          
            onChange={props.handleChange}

            name="priority"
            placeholder="Select Priority"
          >
            <option value="0">None</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <label className="flex gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={props.entry.flag ? "#84cc16" : "#d1d5db"}
            className="w-14"
          >
            <path
              fillRule="evenodd"
              d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
              clipRule="evenodd"
            />
          </svg>

          <input
            value={props.entry.flag.toString()}
            type="checkbox"
            name="flag"
            onClick={props.handleChange}
            className="w-full h-full peer appearance-none rounded-md"
          />
        </label>
      </div>
    </div>
  );
}

function EditEntryField(props: {
  item: Entry;
  editMode: boolean;
  editEntry: Entry;
  setEditEntry: (e: Entry) => void;
  noteId: string;
  setAppStatus: (e: AppStatus) => void;
  appStatus: AppStatus;
}) {
  const [selectedField, setSelectedField] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editEntry, setEditEntry] = useState({
    content: props.item.content,
    flag: props.item.flag,
    time: props.item.time,
    priority: props.item.priority,
  });

  useEffect(() => {

    const handleInput  = (e: Event) => {
      if (inputRef.current) {
        if (!inputRef.current.contains(e.target as Node)) {
          setSelectedField(false);
          if (!inputRef.current.contains(e.target as Node)) {
            setSelectedField(false);
          }
        }
      }
    }

    document.addEventListener("click", (e) => {
        handleInput(e)
    });

    return () => document.removeEventListener("click", (e) => {
        handleInput(e)
    });
  }, []);

  useEffect(() => {
    if (selectedField === false) {
      setEditEntry(props.item);
    }
  }, [selectedField]);

  return (
    <div className="flex flex-row gap-x-2 justify-between w-full ">
      <div className="w-full">
      <input
        ref={inputRef}
        value={editEntry.content}
        onClick={() => {
          setSelectedField((prev) => !prev);
        }}
        onKeyDown={(e) => {
          if (props.item.entryId && e.key === "Enter") {
            changeEntry(
              editEntry,
              props.noteId,
              props.appStatus.userId ? props.appStatus.userId : ""
            ).then((res) => {
              if (res?.status === 200) {
                props.setAppStatus({
                  ...props.appStatus,
                  status: res.data.status,
                  response: res.data,
                });
              }
            });
          }
        }}
        onChange={(e) => {
          setEditEntry((prev) => {
            return { ...prev, content: e.target.value };
          });
        }}
        className={
          "text-[15px] h-auto bg-white focus:outline-none relative rounded-md  w-full p-1 " +
          (props.editMode ? "  border" : "")
        }
        disabled={!props.editMode}
      ></input>
         <div className="flex  gap-x-1 p-1 items-center justify-start ">
            <p className="text-[11px] font-medium text-black text-left">{props.item.time}</p>
            <p className="text-[11px] font-medium  text-left text-[#f59e0b]">{"!".repeat(props.item.priority)}</p>
            {props.item.flag && (
              <img width={12} src={flag}></img>
            )
            }
              </div>
      </div>


      {props.editEntry && selectedField && (
        <button
          onClick={() => {
            if (props.item.entryId) {
              deleteEntry(
                props.noteId,
                props.item.entryId,
                props.appStatus.userId ? props.appStatus.userId : ""
              ).then((res) => {
                if (res?.status === 200) {
                  props.setAppStatus({
                    ...props.appStatus,
                    status: res.data.status,
                    response: res.data,
                  });
                }
              });
            }
          }}
          className="w-7 h-7 justify-center items-center"
        >
          <img height={2} src={minus}></img>
        </button>
      )}
    </div>
  );
}
