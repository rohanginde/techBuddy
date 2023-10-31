import { Avatar, Text, Button, Popover, Grid, Card } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import AddComment from "../blog/AddComment";
import AddReply from "../blog/AddReply";

export default function RandomComponent({ comment ,post_id}) {
   console.log(comment);
  const { comment_text, username, timestamp, replies,_id } = comment;
  const formattedDate = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });



  const MockItem = ({ text, height,color ,username,type}) => {
    console.log(height)
    return (
      <Card css={{ h: height, $$cardColor: color , overflow:'hidden'}}>
        <Card.Body>
        <Avatar size="sm" alt={"rohan"} />
          {/* <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text> */}
          <Text >{username}</Text>
          <Text size={20} css={{ h: height}}  >
            {text}
          </Text> 
          {type=="comment"&&<Popover>
            <Popover.Trigger>
              <Button color="gradient" size="xs">
                Reply
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <AddReply commentId={_id} post_id={post_id}></AddReply>
            </Popover.Content>
          </Popover>}
          
        </Card.Body>
      </Card>
    );
  };
  return (
    <Grid.Container gap={2} justify="center">
      
      <Grid lg={9} xs={9}>
        <MockItem  text={comment_text} username={username} color="#0D3868" type="comment"/>
      </Grid>
      
      {replies.map((i) => {
          return <Grid lg={7}  xs={7}> <MockItem  text={i.reply_text} username={i.username} color="#037086"/></Grid>
        })}
       
      
     
 
    </Grid.Container>
  );
}
