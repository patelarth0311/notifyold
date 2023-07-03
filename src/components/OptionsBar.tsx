import flag from "../svgs/flag.svg";
import inbox from "../svgs/inbox.svg";
import priority from "../svgs/priority.svg";
import cal from "../svgs/calendar.svg";

export function OptionsBar(props: {
  setOptionFilter: (e: string) => void;
  optionFilter: string;
}) {
  return (
    <div className="flex mobile:justify-center   items-start ml-[10px] justify-start  gap-[11px] flex-wrap flex-row   p-1 ">
      <Option
        setOptionFilter={props.setOptionFilter}
        optionFilter={props.optionFilter}
        value={"flagged"}
        img={flag}
        name={"Flagged"}
        bg={"bg-[#84cc16]"}
      ></Option>
      <Option
        setOptionFilter={props.setOptionFilter}
        value={"all"}
        optionFilter={props.optionFilter}
        img={inbox}
        name={"All"}
        bg={"bg-[#3b82f6]"}
      ></Option>
      <Option
        setOptionFilter={props.setOptionFilter}
        value={"priority"}
        optionFilter={props.optionFilter}
        img={priority}
        name={"Priority"}
        bg={"bg-[#f59e0b]"}
      ></Option>
      <Option
        setOptionFilter={props.setOptionFilter}
        value={"date"}
        optionFilter={props.optionFilter}
        img={cal}
        name={"Date"}
        bg={"bg-[#ef4444]"}
      ></Option>
    </div>
  );
}

export function Option(props: {
  img: string;
  name: string;
  value: string;
  setOptionFilter: (e: string) => void;
  optionFilter: string;
  bg: string;
}) {
  return (
    <button
      value={props.value}
      onClick={(e) => {
        props.setOptionFilter(
          props.optionFilter === props.value ? "" : e.currentTarget.value
        );
      }}
      className={
        (props.value === props.optionFilter ? props.bg : " bg-white ") +
        " flex pl-[12px] pb-[10px] pt-[10px] flex-col w-[164px] h-[82px] shadow-sm items-start rounded-[12px]  "
      }
    >
      <div className="flex gap-x-10 flex-col h-full justify-between">
        <img
          width={30}
          className={"bg-white rounded-full p-1 "}
          src={props.img}
        ></img>
        <p
          className={
            "text-[17px] " +
            (props.value === props.optionFilter
              ? "text-white"
              : "  text-slate-950 ")
          }
        >
          {props.name}
        </p>
      </div>
    </button>
  );
}
