import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignUp, SignIn, useAuth, SignOutButton } from "@clerk/nextjs";
import { useClickOutside } from '@mantine/hooks';
import useSWR from "swr";


export const Header = () => {

  const [openedSignIn, setOpenedSignIn] = useState<boolean>(false);
  const [openedSignUp, setOpenedSignUp] = useState<boolean>(false);
  const refSignIn = useClickOutside(() => setOpenedSignIn(false));
  const refSignUp = useClickOutside(() => setOpenedSignUp(false));

  const { isSignedIn } = useAuth();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR('/api/session', () => fetcher('/api/session'))

  useEffect(() => {
    if(isSignedIn){
      setOpenedSignUp(false)
      setOpenedSignIn(false)
    }

  }, [isSignedIn])

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
          {!isSignedIn && 
           <>
            <li>
            <p onClick={() => {setOpenedSignIn(!openedSignIn)}} className="cursor-pointer">SignIn</p>
          </li>
          <li>
            <p onClick={() => {setOpenedSignUp(!openedSignUp)}} className="cursor-pointer">SignUp</p>
          </li>
           </>
          }
          {isSignedIn && 
            <>
            <p>{data?.sessionClaims.username}</p>
            <SignOutButton />
            </>
          }
        </ul>
      </nav>
    </header>
    
    </>
  );
};
