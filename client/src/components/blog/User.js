import Link from "next/link";

function User({name}) {
    console.log(name)
   return ( <><Link href={'./blog'}> {name}</Link></> );
}

export default User;