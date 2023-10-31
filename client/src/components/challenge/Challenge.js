import styles from "@/styles/Post.module.scss";
import { Button, Grid, Card, Text, Progress, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faThumbsUp,
  faComment,
  faUsers,faFile
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
function Challenge({ data }) {

  // const formattedDate = formatDistanceToNow(new Date('2023-04-14T12:12:00Z'), {
  //   addSuffix: true,
  // });
  return (
    <Card className={styles.card} css={{ mw: "100" }}>
      <Card.Body>
        <Text className={styles.cardTitle}>{data.title}</Text>
        <Grid.Container gap={0.5}>
          <Grid>
            <Button size="xs" color="success" auto>
              Register
            </Button>
          </Grid>
          <Grid>
            <Button size="xs" color="warning" auto>
              <Link href={`/challenges/${data._id}`}>View</Link>
            </Button>
          </Grid>
        </Grid.Container>
        
          <div className={styles.view}>
          <Tooltip content={"registrations"}>
            <FontAwesomeIcon icon={faUsers} />
               &nbsp;{data.registeredUsers.length}
            </Tooltip>
            <Tooltip content={"submissions"}>
            <FontAwesomeIcon icon={faFile} />
               &nbsp;{data.submissions}
            </Tooltip>
          </div>
        
      </Card.Body>
    </Card>
  );
}

export default Challenge;
