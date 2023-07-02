import { User, UserFormFields } from "../types/types";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { confirmUser } from "../API/Requests";

export function UserForm(
  props: UserFormFields & { showErrorMessage: boolean }
) {
  const [interacted, setInteracted] = useState(false);

  return (
    <div>
      <div className="flex font-ver justify-center items-center flex-col gap-y-20 w-full ">
        <div className="flex justify-center items-center flex-col gap-y-16 ">
          <div className="relative">
            <p className="absolute top-[-30px] text-[14px] ">Email</p>

            <input
              name="email"
              value={props.email}
              onChange={props.setForm}
              title="Email"
              type="email"
              className="w-[353px] pl-[10px] pr-[10px] rounded-[10px] h-[56px] border"
            ></input>
          </div>

          <div className="relative">
            <p
              className={
                "absolute top-[-30px] text-[14px] " +
                (props.showErrorMessage ? "text-red-600" : "")
              }
            >
              Password
            </p>
            <input
              name="password"
              value={props.password}
              onFocus={(e) => {
                setInteracted(true);
              }}
              onChange={props.setForm}
              title="Password"
              type="password"
              className="w-[353px] pl-[10px] pr-[10px] rounded-[10px] h-[56px] border"
            ></input>
          </div>
          {props.hasConfirmPassword && (
            <div className="relative flex flex-col gap-y-3">
              <p
                className={
                  "absolute top-[-30px] text-[14px] " +
                  (props.showErrorMessage ? "text-red-600" : "")
                }
              >
                Confirm Password
              </p>
              <input
                disabled={props.password.length === 0}
                name="confirmPassword"
                value={props.confirmPassword}
                onChange={props.setForm}
                title="Password"
                type="password"
                className={
                  "w-[353px] pl-[10px] pr-[10px] rounded-[10px] h-[56px] border " +
                  (props.password.length === 0 ? "bg-slate-100" : "")
                }
              ></input>
              {(props.showErrorMessage || interacted) && (
                <div className="text-[12px]  w-full justify-start  flex flex-col items-start h-full">
                  <p className="text-[13px]">Password must contain:</p>

                  <p>At least one lowercase and uppercase letter</p>
                  <p>At least one special character</p>
                  <p>At least one number</p>
                  <p>Be at least 8 characters</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-y-5">
          <button
            onClick={props.buttonAction}
            className="w-[353px] h-[56px] pl-[10px] pr-[10px] rounded-[10px] font-ver bg-indigo-500 text-white text-base"
          >
            {props.buttonText}
          </button>

          <div className="flex w-[353px]  items-center justify-end gap-x-3 ">
            <p>{props.messageText}</p>
            <button
              onClick={props.setShow}
              className="text-base text-indigo-500 font-ver"
            >
              {props.optionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConfirmationPin(props: { user: User; register: () => void }) {
  return (
    <div className="font-ver relative">
      <p className="absolute top-[-30px] text-[14px]">Enter code</p>
      <HStack>
        <PinInput
          onComplete={(e) => {
            confirmUser(props.user.username, e).then((res) => {
              console.log(res);
              if (res && res.status === 200) {
                props.register();
              }
            });
          }}
          type="number"
          placeholder=""
        >
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px] " />
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px]" />
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px]" />
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px]" />
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px]" />
          <PinInputField className="w-[50px] border h-[50px] rounded-[10px] pl-[19px]" />
        </PinInput>
      </HStack>
    </div>
  );
}
