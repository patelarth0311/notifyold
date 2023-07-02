import axios from "axios";
import { Note } from "../types/types";
import { Entry } from "../types/types";


var deleteNote = async (noteId: string, userId: string ) => {
  try {
    return await axios({
      method: 'delete',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/deletenote?noteId=${noteId}&userId=${userId}`
    })
  } catch (err) {
   
  }
 
}

var deleteEntry = async (noteId: string, entryId: string, userId: string ) => {
  try {
    return await axios({
      method: 'delete',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/deleteentry?noteId=${noteId}&entryId=${entryId}&userId=${userId}`
    })
  } catch (err) {
    
  }
}


var addNote = async (note: string, userId: string) => {
  
  try {
    return await axios({
      method: 'post',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/addnote?name=${note}&userId=${userId}`
    })
  } catch (err) {
    
  }
 
  }
var postEntry = async(entry: Entry, noteId: string, userId: string) => {

  try {
    return await axios({
      method: 'post',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/postentry?noteId=${noteId}&content=${entry.content}&flag=${entry.flag}&priority=${entry.priority}&time=${entry.date}&userId=${userId}`
    })
  } catch (err) {
    
  }
 
  }

  var changeEntry = async(entry: Entry, noteId: string,  userId: string) => {
    try {
      return await axios({
        method: 'post',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/changeentry?noteId=${noteId}&content=${entry.content}&flag=${entry.flag}&priority=${entry.priority}&time=${entry.date}&entryId=${entry.entryId}&userId=${userId}`
      })
    } catch (err) {
      
    }
   
    }



  var readNote = async () => {

    try {
      return await axios({
        method: 'get',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/getnote`
      })
    } catch (err) {
      
    }

  }
  
  var confirmUser = async(email: string, confirmation: string  ) => {
    try {
      return await axios({
        method: 'get',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/confirmuser?username=${email}&confirmation=${confirmation}`
      })
    } catch (err) {
      
    }

  }
  
  var addUser = async (email: string, password: string) => {
    try {
      return await axios({
        method: 'post',
        url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/adduser?email=${email}&password=${password}`
      })
    } catch (err) {
      
    }

  }

var signinUser = async (email: string, password: string) =>  {
  try {
    return await axios({
      method: 'get',
      url: `https://gssn270rpj.execute-api.us-east-1.amazonaws.com/notify/signin?email=${email}&password=${password}`
    })
  } catch (err) {
   
  }
}

export {addNote, readNote, postEntry, deleteNote, deleteEntry, changeEntry, addUser, confirmUser, signinUser}