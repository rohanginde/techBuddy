import { useContext, useEffect, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import MyChallenge from "@/components/challenge/MyChallenge";
import AddPostForm from "@/components/blog/AddPostForm";
import Link from "next/link";
import { Badge, Button, Grid, Input, Text } from "@nextui-org/react";
import TechGrid from "@/components/common/TechGrid";
import styles from "../../styles/Blog.module.scss";
import { UserContext } from "@/contexts/UserContext";
function MyChallenges({data }) {
 
  let {user}=useContext(UserContext);
    const [challenges,setChallenges] = useState(data)
    const [filters, setFilters] = useState([]);
    const [submission,setSubmissions]=useState([])
    useEffect(() => {
      





      setChallenges(
        data.filter((item) => {
         return item.registeredUsers.includes(user.username);
        })
      );
    }, []);
const clickhandler = (e)=>{
 const searchVal = e.target.value;

 const searchResults= data.filter((item)=>{
    return item.title.includes(searchVal)
 })
setChallenges(searchResults)
}
const changeFilters = (value, event) => {

  if(value=="Remove Filter"){
    return  setChallenges(data);
   
  }
  filters.includes(value)
    ? setFilters(filters.filter((item) => item != value))
    : filters.push(value);
  console.log(value);
  const searchResults = data.filter((it) => {
    return it.tags.includes(value);
  });
  console.log(searchResults);
  setChallenges(searchResults);
};

  return (
    <div className={styles.main}>
      <Text size="x-large"> My Challenges </Text>
      
  
       
     {console.log(challenges)}
      
       {challenges.map((item)=>{
        return <MyChallenge data={item}></MyChallenge>
      })} 
      
      
    </div>
  );
}
// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:5500/getall`,{
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg'

      }
    })
    const data = await res.json()
   
    // Pass data to the page via props
    return { props: { data  } }
  }
  

export default MyChallenges;
MyChallenges.auth =false;