import { useRef, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Layout } from "../components/index";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const BLOGS_QUERY = gql`
  query blogs{
    blogs {
      id,
      body,
      createdAt,
      updatedAt,
      rating,
      title
    }
  }
`;

const CREATE_BLOG = gql`
  mutation CreateBlog(
    $title: String!,
    $body: String!,
    $rating: Int!,
    $createdAt: DateTime!,
    $updatedAt: DateTime!,
  ) {
    createBlog(
      input: {
        title: $title,
        body: $body,
        rating: $rating,
        createdAt: $createdAt,
        updatedAt: $updatedAt
      }
    ) {
      body,
      createdAt,
      updatedAt,
      rating,
      title
    }
  }
`;

export default function Home() {
  const { loading, data } = useQuery(BLOGS_QUERY);

  // create
  const titleRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const [
    createBlog,
    { loading: createLoading , data: createData },
  ] = useMutation(CREATE_BLOG);

  const handleCreateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!titleRef.current || !messageRef.current || !ratingRef.current) {
      console.error("invalid");
      return;
    }

    const title = titleRef.current.value;
    const message = messageRef.current.value;
    const rating = +ratingRef.current.value;

    // this code will refetch blogsQuery
    // refetchQueries: [{ query: blogsQuery }]

    try {
      const response = await createBlog({
        variables: {
          title,
          body: message,
          rating,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        refetchQueries: [{ query: BLOGS_QUERY }],
      });

      // Clear input fields
      titleRef.current.value = "";
      messageRef.current.value = "";
      ratingRef.current.value = "";
    } catch (_) {
      console.error("Error creating blog");
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-[872px] w-full">
        <h1 className="my-10">Post</h1>
        <div className="text-neutral-400">
          {data &&
            !loading &&
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
      <section className="mx-auto max-w-[872px] w-full">
        <hr />
        <div>create</div>
        <form onSubmit={handleCreateSubmit}>
          <label htmlFor="title">
            <input
              type="text"
              className="block mb-1 text-black"
              placeholder="title"
              ref={titleRef}
              id="title"
            />
          </label>
          <label htmlFor="message">
            <input
              type="text"
              className="block mb-1 text-black"
              placeholder="message"
              ref={messageRef}
              id="message"
            />
          </label>
          <label htmlFor="rating">
            <input
              type="number"
              className="block mb-1 text-black"
              placeholder="rating"
              ref={ratingRef}
              id="rating"
              max={10}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </section>
    </Layout>
  );
}
