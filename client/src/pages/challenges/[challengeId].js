import RandomComponent from "@/components/challenge/MockItem";
import DetailLayout from "@/components/common/DetailLayout";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChallengeDetail({data }) {

  const router = useRouter()
  const challengeid = router.query.challengeId
  const [challengeId,setChallengeId] = useState(challengeid)
  
  let {user}=useContext(UserContext);
  console.log(JSON.stringify({ "username":user.username, "challengeId":challengeId}))
  const notify = (value) => toast(value);
const handleRegister= async()=>{
  try{
    const res = await fetch(`http://localhost:5500/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNmMGJhZjBhZGNlZTNjMzVmZDVlZTQiLCJpYXQiOjE2ODE5MTE0ODN9.q3qtFx7HbfLbZje1BLgn3q7RsIfVgW2rnVsMDIfnXbg"
      },
      body: JSON.stringify({ "username":user.username, "challengeId":challengeId}),
    });
    notify("Successfully registered")
  
  }catch (error) {
      console.error(`Download error: ${error.message}`);
      notify("Registration failed")
    }
  };

  
   
    console.log(data)
    return ( <>
    <DetailLayout data={data} colors={["#910838","#44041A","#F31260"]} ></DetailLayout>
     <Button onClick={handleRegister} css={{marginLeft:"40%"}}>Register</Button>
     <ToastContainer />
    </> );
}

ChallengeDetail.auth = true;
ChallengeDetail.skipLayout =false;



// This gets called on every request
export async function getServerSideProps(context) {
    // Fetch data from external API
   const {params} = context
 console.log(params)
    const res = await fetch(`http://localhost:5500/challenges/${params.challengeId}`,{
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNjNjU2NDdmN2Q4ZTM3MmY2Y2M0MTUiLCJpYXQiOjE2ODE4NTI3Mzd9.D3oAcrU5CEdHHmXMbls76PodV-Kv8pIGPktRZ8orFC0'

      }
    })
    const data = await res.json()
     console.log(data)    // Pass data to the page via props
    return { props: { data ,params } }
  }
  

  export default ChallengeDetail;
