import { useState } from "react";
import styles from "@/styles/AddPostForm.module.css";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Spacer,
  Container,
  Text,
  Grid,
} from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddChallengeForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [regTime, setRegTime]= useState();
  const [regDate, setRegDate]= useState();
  const [subTime, setSubTime]= useState();
  const [subDate, setSubDate]= useState();
  const [languages, setLanguages] = useState([]);
  const notify = (value)=>{toast(value)}
  const handleSubmit = async (event) => {
   // event.preventDefault();
    console.log(title,body,regTime,regDate,subTime,subDate,languages)
    // send a POST request to the server to add the post with title and body
    try{
    const res = await fetch(`http://localhost:5500/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg'
      },
      body: JSON.stringify({
        'title':title,
        "body":body,
        "regTime":regTime,
        "regDate":regDate,
        "subTime":subTime,
        "subDate":subDate,
        "tags": languages
      }),
    })
    
    notify("Challenge successfully added ")
  }catch (error) {
    console.error(`Download error: ${error.message}`);
    notify("Challenge not added ")
  }
  };
  
  const handleCheckboxChange = (event) => {
    const language = event.target.value;
    if (event.target.checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter((l) => l !== language));
    }
  };
  return (
  <>
     
      <Grid.Container display="flex" justify="center" direction="column" alignContent="center">
      <h4>Add Challenge</h4>
      <ToastContainer></ToastContainer>
      <Spacer y={2}/>
        <Grid xs={100}>
          <Input
            labelPlaceholder=" Challenge Title"
            id="post-title"
            name="title"
            size="lg"
            width="100%"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </Grid>

        <Spacer y={0.5} />
        <Grid xs={9} >
          <Input width="186px" label="Registration Deadline" type="time" onChange={(event) => setRegTime(event.target.value)} required/> 
          <Spacer x={0.5}/>
          <Input width="186px" label="Registration Deadline"type="date" onChange={(event) => setRegDate(event.target.value)} required/>
          <Spacer x={0.5}/>
          <Input width="186px" label="Submision Deadline" type="time" onChange={(event) => setSubTime(event.target.value)} required/>
          <Spacer x={0.5}/>
          <Input width="186px" label="Submision Deadline" type="date" onChange={(event) => setSubDate(event.target.value)} required />
        </Grid>
        <Spacer y={0.5} />
        <Grid xs={9}>
          <Textarea
            placeholder="Challenge Description"
            rows={20}
            width="1000px"
            required
            onChange={(event) => setBody(event.target.value)}
          />
        </Grid>
        <Grid xs={9}>
        <Container sm gap={4}>
          <Text> Select Tech Stack</Text>
          <Checkbox
            id="javascript"
            name="languages"
            value="javascript"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            JavaScript
          </Checkbox>

          <Checkbox
            id="html"
            name="languages"
            value="html"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            HTML
          </Checkbox>

          <Checkbox
            id="css"
            name="languages"
            value="css"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            CSS
          </Checkbox>

          <Checkbox
            id="java"
            name="languages"
            value="java"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            Java
          </Checkbox>

          <Checkbox
            id="python"
            name="languages"
            value="python"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            Python
          </Checkbox>
          <Checkbox
            id="React"
            name="languages"
            value="React"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            React
          </Checkbox>
          <Checkbox
            id="Next"
            name="languages"
            value="Next"
            onChange={() => {
              handleCheckboxChange(event);
            }}
          >
            Next
          </Checkbox>
        </Container>
        </Grid>
        <Grid xs={9}>
          <Button onClick={handleSubmit}type="" css={{marginLeft:"40%",marginTop:"2%"}}>Submit</Button>
        </Grid>
      </Grid.Container>
      </>
  );
}
