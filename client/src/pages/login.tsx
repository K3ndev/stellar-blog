import React, { useState } from "react";
import { Layout } from "../components/index";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // router.push("/");

    try {
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User profile', data.user);
      console.log('User token', data.jwt);
      
      // Redirect or perform other actions upon successful login
      router.push("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.log('An error occurred:', error);
    }

  };

  return (
    <Layout>
      <section className="mx-auto max-w-[872px] w-full">
        <h1>login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email" className="block text-black">
            <input type="text" placeholder="Your Email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password" className="block text-black">
            <input type="password" placeholder="Yuor Password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">login</button>
        </form>
      </section>
    </Layout>
  );
}


// todo https://docs.strapi.io/dev-docs/plugins/users-permissions
// todo https://strapi.io/blog/a-beginners-guide-to-authentication-and-authorization-in-strapi
// todo https://strapi.io/blog/strapi-authentication-with-react