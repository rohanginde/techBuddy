import { UserContext } from "@/contexts/UserContext";
import { Avatar, Input, Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddReply({ commentId, post_id }) {

  let { user, setUser, notify, setToast } = useContext(UserContext);
  const [reply_text, setReplyText] = useState("");
  const router = useRouter();
  //handle submit 
  const handlerSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5500/commentreply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg",
        },
        body: JSON.stringify({
          reply_text: reply_text,
          username: user.username,
          commentId: commentId,
          _id: post_id,
        }),
      });
      console.log(res);
    } catch (error) {
      console.error(`Download error: ${error.message}`);
    }
    router.push(`/blog/${post_id}`);
  };
  // 
  const clickhandler = (event) => {
    setReplyText(event.target.value);
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <Input
        clearable
        underlined
        size="xl"
        placeholder="Add Reply"
        onChange={() => {
          clickhandler(event);
        }}
      />
      <Spacer y={0.5} />
      <Button onPress={handlerSubmit} color="gradient" size="md">
        Add Reply
      </Button>
      <Spacer y={0.5} />
    </>
  );
}

export default AddReply;
