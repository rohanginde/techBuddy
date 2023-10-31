import Link from "next/link";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
function Header() {
  const router = useRouter();

  const { status } = useSession();
  const handleClick = (page) => {
    router.push(`/${page}`);
  };
  return (
    <>
      <nav className={styles.horizontal}>
        <h1 className="logo">TechBuddy.</h1>
       
        <Link href={"/challenges"}>
          <p>Challenges</p>
        </Link>
        
          <span style={{cursor:"pointer"}}onClick={()=>{handleClick("/blog")}}>Blog</span>
        
        <Link href={"/profile"}>
          <p>My Profile</p>
        </Link>

        {status == "unauthenticated" && (
          <>
            {" "}
            <Link href={"/api/auth/signin"}>
              <Button
                size="sm"
                onClick={() => {
                  signIn();
                }}
              >
                Login
              </Button>
            </Link>
            <a href="/signup">
              <Button
                size="sm"
                // onClick={() => {
                //   signIn();
                // }}
                color='warning'
              >
                Sign Up
                </Button>
              </a>
            
          </>
        )}
        {status == "authenticated" && (
          <Link href={"/api/auth/signout"}>
            <Button
              size="sm"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          </Link>
        )}
      </nav>
    </>
  );
}

export default Header;
