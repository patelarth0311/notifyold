import user from "../svgs/user.svg";

export function ToolBar() {
  return (
    <div className="flex justify-center rounded-full w-40 h-9 bg-indigo-500">
      <img width={27} src={user}></img>
    </div>
  );
}
