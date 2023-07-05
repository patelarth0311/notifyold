
import { CreateToastFnReturn } from "@chakra-ui/react";


export function makeToast(children: React.JSX.Element, message: string, border: string, toast: CreateToastFnReturn, additionalInfo?: string) {
   

    return toast({                      
                          
                          position: 'top',
                          isClosable: true,
                          render: () => (
                              <div  className={"relative bg-opacity-50 backdrop-blur top-4 w-[370px] bg-white gap-x-1 pl-[10x] pr-[10px] pt-[20px] pb-[20px] h-[80px]  border flex justify-center items-center rounded-[20px] " +  `${border}`}>
                                 {children}
                                <p className="text-left  font-semibold">{message}</p>
                                {additionalInfo && (
                                    <p>{additionalInfo}</p>
                                )
                                }
                              </div>
                            )
                          })
    
}