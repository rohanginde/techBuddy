import Comment from "./Comment";
import { Avatar, Input, Button, Spacer } from "@nextui-org/react";
import AddComment from "./AddComment";
import styles from "../../styles/Comments.module.scss"
import RandomComponent from "../challenge/MockItem";
function Comments({ comments, post_id }) {
  console.log(comments)
  return (
    <div className={styles.comments}>
      <h4>Comments</h4>
      
      {/* {comments.map((com) => { return <Comment comment={com} />})} */}
      {comments.map((com) => { return <RandomComponent post_id={post_id}  comment={com} />})}
   <h4>Add comment</h4>
  <AddComment post_id={post_id} ></AddComment>
    </div>
  );
}

export default Comments;
