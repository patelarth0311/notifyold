export type Note = {
    name: string,
    content: Entry[],
    noteId: string,
}



export type FilterOption = {
    img: string,
    action: () => void
}


export type Model = {
    open: boolean
    setOpen: (e: boolean) => void
}

export type Entry = {
    entryId?: string,
    content: string,
    flag: boolean,
    priority: number,
    time: string
}

export type  AppStatus = {
    status: string
    response: string
    userId: string | null
  
}

export type UserFormFields = {
    email: string,
    password: string,
    hasConfirmPassword: boolean
    confirmPassword?: string
    buttonText: string
    messageText: string
    optionText: string
    setShow: () => void
    buttonAction: () => void
    setForm: (e: any) => void
}

export type User = {
    userId: string
    username: string
    status: boolean
}