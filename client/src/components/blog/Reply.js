import { formatDistanceToNow } from "date-fns";
import { Avatar, Text } from "@nextui-org/react";
function Reply({ reply }) {
  const {username, reply_text, timestamp} = reply;
  const formattedDate = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
  return (
    <>
     <Avatar size="sm" alt={username} />
      <Text h5>{username}</Text>
      <Text size="small" color="secondary">
        {formattedDate}
      </Text>
      <Text>{reply_text}</Text>
    </>
  );
}

export default Reply;
