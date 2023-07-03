import { ToolBar } from "./ToolBar";
import { Create, FloatingActionButton } from "./FloatingActionButton";
import search from "../svgs/search.svg";
import { Entry, FilterOption, Note } from "../types/types";
import { useEffect, useState } from "react";
import { CardModel } from "./CardModel";
import { OptionsBar } from "./OptionsBar";
import { Lists } from "./Lists";
import "../App.css";
import { readNote } from "../API/Requests";
import { useContext } from "react";
import { MyContext } from "./Context";
import error from "../svgs/error.svg";
import {
  CognitoUser,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { makeToast } from "./Toast";

import { useToast } from "@chakra-ui/react";

var checkSession = () => {
  const idToken = localStorage.getItem("IdToken");
  const accessToken = localStorage.getItem("AccessToken");
  const refreshToken = localStorage.getItem("RefreshToken");
  if (idToken && accessToken && refreshToken) {
    const AccessToken = new CognitoAccessToken({
      AccessToken: accessToken,
    });
    const IdToken = new CognitoIdToken({
      IdToken: idToken,
    });

    const RefreshToken = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });

    const sessionData = {
      IdToken: IdToken,
      AccessToken: AccessToken,
      RefreshToken: RefreshToken,
    };

    const cachedSession = new CognitoUserSession(sessionData);
    console.log(cachedSession)
    if (cachedSession.isValid()) {
      return true;
    }

    if (!RefreshToken.getToken()) {
      return false;
    }
  }
  return false;
};

export function Home() {
  const toast = useToast();
  const { appStatus, setAppStatus } = useContext(MyContext);

  return (
    <div className="flex min-h-screen width-full justify-end text-center 0  relative flex-col  bg-neutral-50">
      <div className="min-h-[180px] flex flex-col justify-center">
        <p className="font-ver text-4xl  text-center ">Notify</p>
      </div>

      <NoteLibrary></NoteLibrary>
      <FloatingActionButton></FloatingActionButton>
    </div>
  );
}

export function NoteLibrary() {
  const [notes, setNote] = useState<Note[]>([]);
  const toast = useToast()
  const { appStatus, setAppStatus } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [optionFilter, setOptionFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const [noteSelect, setNoteSelected] = useState({
    name: "",
    content: [] as Entry[],
    noteId: "",
  });

  useEffect(() => {
    if (!checkSession()) {
      {makeToast(   <img className="absolute left-10" width={20} src={error}></img>,"You have been signed out","border-[#dc2626]",toast)}
      localStorage.clear()
      setAppStatus({userId: "", response: "", status: ""})
    }
  },[])


  useEffect(() => {

    if (appStatus.userId) {
      readNote(appStatus.userId).then((res) => {
     
        if (res) {
          if (res.data.Items) {
            setNote(
              res.data.Items.map((item: Note, index: number) => {
                if (noteSelect.noteId === item.noteId) {
                  setNoteSelected({
                    name: item.name,
                    content: Object.values(item.content),
                    noteId: item.noteId,
                  });
                }
               
                return {
                  name: item.name,
                  content: Object.values(item.content),
                  noteId: item.noteId,
                };
              })
            );
          }
        }
      });
    }




  }, [appStatus]);





  return (
    <div className="flex  grow   font-ver   flex-col items-center gap-y-20">
      <SearchBar
        searchText={searchText}
        setSearchText={(e: any) => {
          if (e.currentTarget) {
            setSearchText(e.currentTarget.value);
          }
        }}
      ></SearchBar>
      <OptionsBar
        optionFilter={optionFilter}
        setOptionFilter={(e: string) => {
          setOptionFilter(e);
        }}
      ></OptionsBar>
      <div className="flex   justify-end  grow flex-col items-center   gap-y-20  ">
        {notes.length > 0 ? (
          <>
            {open ? (
              <div className="flex flex-col justify-center  items-center h-full w-full   ">
                <CardModel
                  note={noteSelect}
                  open={open}
                  setOpen={(e: boolean) => setOpen(e)}
                ></CardModel>

                <div id="duo-container" className=" relative">
                  <div className="   flex flex-row  pl-10  gap-5 pr-10 pb-10 justify-start  overflow-y-auto   w-screen    ">
                    {notes
                      .filter((item) => {
                        const metConditionList = item.content.map((item) => {
                          switch (optionFilter) {
                            case "priority":
                                return item.priority !== 0;
                              case "flagged":
                                return item.flag === true;
                              case "date":
                                return item.time !== undefined;
                            default:
                              return true;
                          }
                        });
                        return metConditionList.includes(true);
                      })
                      .filter((item) => {
                        return item.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase());
                      })
                      .map((item, index) => (
                        <Card
                          note={item}
                          action={() => {
                            setNoteSelected(item);
                          }}
                          key={index}
                        ></Card>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grow grid-cols-2 mobile2:grid-cols-1 gap-5 pb-10   gap-y-12 place-content-start">
                {notes
                  .filter((item) => {
                    const metConditionList = item.content.map((item) => {
                     
                      switch (optionFilter) {
                        case "priority":
                          return item.priority !== 0;
                        case "flagged":
                          return item.flag === true;
                        case "date":
                          
                          return item.time !== undefined;
                        default:
                          return true;
                      }
                    });
         
                    return (item.content.length === 0 && optionFilter === "") || metConditionList.includes(true);
                  })
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  })
                  .map((item, index) => (
                    <Card
                      note={item}
                      action={() => {
                        setOpen(true);
                        setNoteSelected(item);
                      }}
                      key={index}
                    ></Card>
                  ))}
              </div>
            )}
          </>
        ) : (
        
          <div className=" grow flex flex-col items-center gap-y-10 ">
          <p className="text-3xl font-ver ">No notes 🫨</p>
          <Create fixed={false}></Create>
          </div>

        )}
      </div>
    </div>
  );
}

export function Card(props: { action: () => void; note: Note }) {
  return (
    <div
      onClick={() => {
        props.action();
      }}
      className={
        "min-w-[338px] w-[338px] min-h-[155px] max-h-[157px] h-[157px] shadow-custom rounded-[21.67px] bg-white "
      }
    >
      <div className="flex justify-start p-[16px] gap-x-5 h-full">
        <div className=" justify-start items-start flex flex-col">
          <p className="text-[17px] font-bold ">{props.note.name}</p>
          <p className="text-[24px] font-bold ">{props.note.content.length}</p>
        </div>
        <div className="flex overflow-y-auto relative h-full flex-col w-full gap-y-1 text-gray-500">
          {props.note.content.map((item, index) => (
            <p className="text-[15px] text-left" key={index}>
              {item.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SearchBar(props: {
  searchText: string;
  setSearchText: (e: any) => void;
}) {
  return (
    <div className="flex relative justify-start gap-x-3  h-[44px] w-[350px] shadow-xl bg-white rounded-lg p-2">
      <img width={15} src={search}></img>

      <input
        value={props.searchText}
        onChange={(e) => {
          props.setSearchText(e);
        }}
        className="bg-white focus:outline-none  rounded-md w-full"
        placeholder="Search"
        type="text"
      ></input>
    </div>
  );
}
