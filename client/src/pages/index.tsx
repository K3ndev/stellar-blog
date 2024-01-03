import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout, InputForm } from "../components/index";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from 'lucide-react';
import { BLOGS_QUERY } from "../schema/index"

export default function Home() {
  const { loading, data } = useQuery(BLOGS_QUERY);

  const { isSignedIn } = useAuth();
  const [delayLoading, setDelayLoading] = useState(true);


  // useEffect for delaying the loading state
  useEffect(() => {
    const timer = setTimeout(() => setDelayLoading(false), 500);

    return () => {
      clearTimeout(timer);
    };

  }, [loading]);

  return (
    <Layout>
      <section className="mx-auto max-w-[872px] w-full">
        <h1 className="my-10">Post</h1>

        {/* loading state */}
        {delayLoading &&
          <div className="flex justify-center py-9 border-t border-b border-neutral-700">
            <Loader2 className="animate-spin" />
          </div>
        }

        {/* data ui */}
        <div className="text-neutral-400">
          {!delayLoading && data?.blogs?.length > 0 &&
            data.blogs.map((item: any, index: number) => {
              return (
                <div key={index} className="border-t border-neutral-700 py-4">
                  <div className="flex gap-5 items-start justify-between mb-3">
                    <div>
                      <h3>{item.title}</h3>
                    </div>
                    <div className="flex gap-2 ">
                      <p>{item.createdAt}</p>
                      <div>
                        <Link
                          className="hover:cursor-pointer w-min"
                          href={`./blog/${item.id}`}
                        >
                          goto
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="markdown">
                    <ReactMarkdown>{item.body}</ReactMarkdown>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* form */}
      {isSignedIn && data &&
        <section className="mx-auto max-w-[872px] w-full">
          <hr />
          <InputForm />
        </section>
      }

    </Layout>
  );
}
