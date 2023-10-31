import { UserContext } from "@/contexts/UserContext";
import { Avatar, Input, Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddComment({post_id}) {

//context to set user data
let {user, setUser, notify, setToast }=useContext(UserContext);
 const [comment_text, setCommentText]=useState('')
 const router = useRouter();
const handlerSubmit=async()=>{


  try{
    const res = await fetch(`http://localhost:5500/comment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
       'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg"
      },
      body: JSON.stringify({"comment_text":comment_text,"username":user.username,"_id":post_id}),
    }
   
    ) ;console.log(res)}catch (error) {
      console.error(`Download error: ${error.message}`);
    }
    router.push(`/blog/${post_id}`)
}
const clickhandler = (event)=>{
setCommentText(event.target.value)
}
    return ( <>
    <ToastContainer></ToastContainer>
     <Input
          clearable
          underlined
          size="xl"
          placeholder="Add comment"
          onChange={() => {
            clickhandler(event);
          }}
        />
        <Spacer y={0.5}/>
        <Button onPress={handlerSubmit}color="gradient" size="md">Add Comment</Button>
      <Spacer y={0.5} />
    </> );
}

export default AddComment;