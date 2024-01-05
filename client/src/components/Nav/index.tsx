import React, {useState, useEffect} from "react";
import Link from "next/link";
import { SignUp, SignIn, useAuth, SignOutButton } from "@clerk/nextjs";
import { useClickOutside } from '@mantine/hooks';

export const Header = () => {

  const [openedSignIn, setOpenedSignIn] = useState<boolean>(false);
  const [openedSignUp, setOpenedSignUp] = useState<boolean>(false);
  const refSignIn = useClickOutside(() => setOpenedSignIn(false));
  const refSignUp = useClickOutside(() => setOpenedSignUp(false));

  const { userId } = useAuth();


  useEffect(() => {
    if(userId){
      setOpenedSignUp(false)
      setOpenedSignIn(false)
    }

  }, [userId])

  return (
    <>
    { openedSignIn && 
      <div className="absolute inset-0 flex justify-center items-center bg-black/90">
        <div ref={refSignIn}>
          <SignIn/>
        </div>
      </div>
    }
    { openedSignUp && 
      <div className="absolute inset-0 flex justify-center items-center bg-black/90">
        <div ref={refSignUp}>
          <SignUp/>
        </div>
      </div>
    }
    
    <header className="mx-auto max-w-[872px] w-full">
      <nav className="flex justify-between my-3">
        <Link href="/">Stellar Blogs</Link>
        <ul className="flex gap-4">
          {!userId && 
           <>
            <li>
            <p onClick={() => {setOpenedSignIn(!openedSignIn)}} className="cursor-pointer">SignIn</p>
          </li>
          <li>
            <p onClick={() => {setOpenedSignUp(!openedSignUp)}} className="cursor-pointer">SignUp</p>
          </li>
           </>
          }
          {userId && 
            <>
            <p>{userId}</p>
            <SignOutButton />
            </>
          }
        </ul>
      </nav>
    </header>
    
    </>
  );
};
