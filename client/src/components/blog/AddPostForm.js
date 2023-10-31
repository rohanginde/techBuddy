import { useContext, useState } from 'react';
import  styles from '@/styles/AddPostForm.module.css'
import { Button, Checkbox, Input, Textarea, Spacer, Container, Text, Grid} from "@nextui-org/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '@/contexts/UserContext';
export default function AddPostForm() {


  const {user} = useContext(UserContext)
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [languages, setLanguages] = useState([]);
 const notify = (value)=>{toast(value)}
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    // send a POST request to the server to add the post with title and body
    try{
    const res = await fetch(`http://localhost:5500/createpost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg"
      },
      body: JSON.stringify({ title, body, "username":user.username,"tags":languages}),
    });
    notify("Post added successfully")
  
  }catch (error) {
      console.error(`Download error: ${error.message}`);
      notify("Post not added ")
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
    <form style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}onSubmit={handleSubmit}>
    <h4>Add Post</h4> 
    <ToastContainer></ToastContainer>
    <Input
      labelPlaceholder="Title"
      id="post-title"
      name="title"
      size='lg'
      width='70%'
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      required
    />
  <Spacer y={0.5}/>
   
  <Grid.Container  style={{width:"75%"}}gap={3}>
      <Grid>
      <Textarea
          placeholder="Min rows (2), write something large.."
          rows={20}
          width="1000px"
          onChange={(event)=>setBody(event.target.value)}
          required
        />
        </Grid>
        </Grid.Container>
    <Container sm gap={4}>
      <Text> Select tags</Text>
    <Checkbox
      id="javascript"
      name="languages"
      value="Javascript"
      onChange={()=>{handleCheckboxChange(event)}}
    >
      JavaScript
    </Checkbox>

    <Checkbox
      id="html"
      name="languages"
      value="HTML"
      onChange={()=>{handleCheckboxChange(event)}}
    >
      HTML
    </Checkbox>

    <Checkbox
      id="css"
      name="languages"
      value="CSS"
      onChange={()=>{handleCheckboxChange(event)}}
    >
      CSS
    </Checkbox>

    <Checkbox
      id="java"
      name="languages"
      value="Java"
      onChange={()=>{handleCheckboxChange(event)}}
    >
      Java
    </Checkbox>

    <Checkbox
      id="python"
      name="languages"
      value="Python"
      onChange={()=>{handleCheckboxChange(event)}}
    >
      Python
    </Checkbox>
    </Container>
    <Button type="submit">Submit</Button>
  </form>
  
  );
}
