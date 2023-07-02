import { Note } from "../types/types";
import { Card } from "./Home";

export function Lists(props: { arr: Note[]; action: () => void }) {
  return (
    <div id="duo-container" className="w-full h-[300px]">
      <div className="flex flex-row gap-5 justify-start items-center overflow-x-auto  h-full w-full pl-10 ">
        {props.arr.map((item, index) => (
          <Card note={item} action={props.action} key={index}></Card>
        ))}
      </div>
    </div>
  );
}
