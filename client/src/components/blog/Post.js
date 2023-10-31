import styles from "@/styles/Post.module.scss";
import { Button, Grid, Card, Text, Tooltip, Popover } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faThumbsUp,
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import UserList from "./UserList";
import User from "./User";
import { UserContext } from "@/contexts/UserContext";

function Post({ data }) {
  const [likes, setLikes] = useState(data.likes.length);
  const [likesList, setList] = useState(data.likes);
  const [like, toggleLike] = useState();

  let {user }=useContext(UserContext);
  function getTotalComments(data) {
    const comments = data.comments.length;
    let sum = 0;
    const replies = data.comments.map((i) => {
      sum = +i.replies.length;
    });
    return comments + sum;
  }
console.log(data)
  const handleLike = async (val) => {
    console.log(JSON.stringify({"_id":data._id,"user":user.username}))
   let activity;
    if (val) {
      activity="like"
      likesList.push("rohan");
      console.log("here");
      setList(likesList);
      setLikes(likes + 1);
    } else {
      activity="unlike"
      setList(likesList.filter((item) => item != "rohan"));
      setLikes(likes - 1);
    }
    try{
      const res = await fetch(`http://localhost:5500/${activity}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
         'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg"
        },
        body: JSON.stringify({"_id":data._id,"user":user.username}),
      }
     
      ) ;console.log(res)}catch (error) {
        console.error(`Download error: ${error.message}`);
      }
    toggleLike(val);
  };

  useEffect(() => {}, [like, likes, likesList]);
  return (
    <Card className={styles.card} css={{ mw: "100" }}>
      <Card.Body>
        <Text className={styles.cardTitle}>{data.title}</Text>
        <Grid.Container gap={0.5}>
          <Grid>
            {!likesList.includes("rohan") ? (
              <Button
                bordered
                size="xs"
                color="error"
                onPress={() => {
                  handleLike(true);
                }}
                auto
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
            ) : (
              <Button
                shadow
                size="xs"
                color="error"
                onPress={() => {
                  handleLike(false);
                }}
                auto
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
            )}
          </Grid>
          <Grid>
            <Link href={`/blog/${data._id}`}>
              <Button shadow size="xs" color="grey" auto>
                <FontAwesomeIcon icon={faComment} />
                &nbsp;<b>{getTotalComments(data)}</b>
              </Button>
            </Link>
          </Grid>

          <Grid>
            <Button size="xs" bordered css={{ color: "$myDarkColor" }} auto>
              <Link href={`/blog/${data._id}`}> Read More</Link>
            </Button>
          </Grid>
          <Grid>
            <Button size="xs" color="warning"css={{ color: "$myDarkColor" }} auto>
              <Link href={``}> Save</Link>
            </Button>
          </Grid>
          <Grid>
            <Popover>
              {likesList.length !== 0 && (
                <Popover.Trigger>
                  <Button size="xs" rounded color="gradient">
                    Liked by&nbsp;
                    <b>
                      {likesList[0] +
                        (likesList.length > 1
                          ? ` & ${likesList.length - 1} others`
                          : "")}
                    </b>
                  </Button>
                </Popover.Trigger>
              )}
              <Popover.Content>
                <UserList data={likesList}></UserList>
              </Popover.Content>
            </Popover>
          </Grid>
        </Grid.Container>
        <p className={styles.view}>
          <FontAwesomeIcon icon={faEye} />
          &nbsp;{data.views}
        </p>
        <span>
          {data.tags.map((item) => {
            return (
              <Text
                size="xs"
                style={{ display: "inline-block", color: "#06B7DB" }}
              >
                {`#${item} `}&nbsp;
              </Text>
            );
          })}
        </span>
      </Card.Body>
    </Card>
  );
}

export default Post;
