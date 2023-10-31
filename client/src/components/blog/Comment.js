import { Avatar, Text, Button, Popover } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import Reply from "./Reply";
import styles from "../../styles/Comment.module.scss";
import AddComment from "./AddComment";

const Comment = ({ comment }) => {
  console.log(comment);
  const { comment_text, username, timestamp, replies } = comment;
  const formattedDate = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });

  return (
    <>
      <div className={styles.comment}>
        <Avatar size="sm" alt={username} />
        <div >
          <div className="flex items-center justify-between">
            <Text h5>{username}</Text>
            <Text size="small" color="secondary">
              {formattedDate}
            </Text>
          </div>
          <Text>{comment_text}</Text>
          <Popover>
            <Popover.Trigger>
              <Button color="gradient" size="xs">
                Reply
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <AddComment></AddComment>
            </Popover.Content>
          </Popover>
        </div>
      </div>
      <div>
        {replies.map((i) => {
          return <Reply reply={i}></Reply>;
        })}
      </div>
    </>
  );
};

export default Comment;
