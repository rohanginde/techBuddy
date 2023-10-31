import styles from "@/styles/MyChallenges.module.scss";
import {
  Button,
  Grid,
  Card,
  Text,
  Progress,
  Tooltip,
  Input,
  Container,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faThumbsUp,
  faComment,
  faUsers,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "@/contexts/UserContext";
function MyChallenge({ data }) {
  // const formattedDate = formatDistanceToNow(new Date('2023-04-14T12:12:00Z'), {
  //   addSuffix: true,
  // });
  console.log(data)
  const [link, setLink] = useState('')
  const [fileupload,setfileupload]= useState(false)
  let {user }=useContext(UserContext);
  const notify = (value)=>{ toast(value)}
  const onFileChange = () => {

   
  };
  const onFileUpload = () => {
    setfileupload(true);
  };
  const handleSubmit = async ()=>{
    if(link!=''||fileupload){
    console.log(JSON.stringify({"challengeId":data._id,"fileMetaData":"asdasd",
    "submittedBy":user.username}))
      try{
        const res = await fetch(`http://localhost:5500/${data._id}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQwMTY3NzE2NTQ4OTI1ODY3Njg1NTciLCJpYXQiOjE2ODE5MjE3MjV9.2iptYRh4oHJiysJcZiHl8emcn4kAVCiSYB0QCiUpCRc"
          },
          body: JSON.stringify({"challengeId":data._id,"fileMetaData":"asdasd",
          "submittedBy":user.username}),
        }
       
        ) ;console.log(res)
      notify("submission successful")
      }catch (error) {
          console.error(`Download error: ${error.message}`);
        }


    }else{
     notify("please add link or upload zip file")
    }
  }
  return (
    <Card className={styles.card} css={{ mw: "50" }}>
      <Card.Body>
      <ToastContainer></ToastContainer>
        <Text className={styles.cardTitle}>{data.title}</Text>
        <Container
          style={{height:"200px"}}
          display="flex"
          direction="column"
          justify="space-between"
          wrap="wrap"
          gap={2}
        >
          <Container  display="flex" justify="space-between" >
            <Input
              bordered
             label="Add Project Link"
            placeholder="https://github.com/project"
              helperText="***Add github repo link only"
              width="300px"
              onChange={(event)=>{setLink(event.target.value)}}
            />
            <span>
            OR
            </span>
            <div>
            <Input
              helperText="Only .Zip files allowed"
              type="file"
              onChange={onFileChange}
              width="250px"
            />
                <Button style={{display:"inline-block", marginLeft:"0px"}}  size="xs" onClick={onFileUpload} color="success" auto>
              Upload file
            </Button>
            </div>
          </Container>
          <Container display="flex" justify="flex-start" gap={2} >
        

            <Button css={{m:20}} onClick={handleSubmit} size="md" color="warning" auto>
             Submit
            </Button>

            {/* <Button css={{m:20}} size="md" color="error" auto>
              <Link href={`/challenges/${data.id}`}>Unregister</Link>
            </Button> */}
          </Container>
        </Container>

        <span className={styles.view}>
          <Tooltip content={"registrations"}>
            <FontAwesomeIcon icon={faUsers} />
            &nbsp;{data.registrations}
          </Tooltip>
          <Tooltip content={"submissions"}>
            <FontAwesomeIcon icon={faFile} />
            &nbsp;{data.registrations}
          </Tooltip>
        </span>
      </Card.Body>
    </Card>
  );
}

export default MyChallenge;
