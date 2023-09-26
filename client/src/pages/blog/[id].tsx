import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Layout } from "../../components/index";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

const GET_SINGLE_BLOG = gql`
  query GetSingleBlog($id: ID!) {
    blog(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
          publishedAt
        }
      }
    }
  }
`;

const DELETE_SINGLE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

const UPDATE_SINGLE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $data: BlogInput!) {
    updateBlog(id: $id, data: $data) {
      data {
        id
        attributes {
          title
          rating
          body
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

export default function Page() {
  const router = useRouter();
  const match = router.asPath.match(/\/(\d+)$/);

  const idFromPath = () => {
    if (!match) return "invalid";
    return match[1].toString();
  };

  // states
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [titleInputState, setTitleInputState] = useState<string>("");
  const [bodyInputState, setBodyInputState] = useState<string>("");

  // for a single blog
  const { data, loading, error } = useQuery(GET_SINGLE_BLOG, {
    variables: { id: idFromPath() },
  });

  // for deleting a blog
  const [deleteBlog] = useMutation(DELETE_SINGLE_BLOG, {
    variables: { id: idFromPath() },
    // onError: (err) => {
    //   console.error(err);
    // },
    onCompleted: () => {
      router.push("/");
    },
  });

  // for updating a blog
  const [updateBlog] = useMutation(UPDATE_SINGLE_BLOG, {
    variables: {
      id: idFromPath(),
      data: {
        title: titleInputState,
        body: bodyInputState,
      },
    },
    refetchQueries: [
      { query: GET_SINGLE_BLOG, variables: { id: idFromPath() } },
    ],
    onCompleted: () => {
      setIsEdit(false);
    },
  });

  useEffect(() => {
    console.log("effect parent run");
    if (data?.blog?.data?.attributes?.title) {
      setTitleInputState(data.blog.data.attributes.title);
      setBodyInputState(data.blog.data.attributes.body);
      console.log("effect children run");
    }
  }, [data]);

  // UI
  if (data?.blog?.data === null || error) {
    return (
      <Layout>
        <section className="mx-auto max-w-[872px] w-full">
          <p>The blog doesn&apos;t exist</p>
        </section>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <section className="mx-auto max-w-[872px] w-full">
          <p>loading</p>
        </section>
      </Layout>
    );
  }

  if (!loading && data) {
    return (
      <Layout>
        <section className="mx-auto max-w-[872px] w-full">
          <div className="flex justify-between my-10">
            <h1 className="">Post</h1>

            <div>
              <button
                className="bg-red-500 px-2 py-1 text-white"
                onClick={() => {
                  deleteBlog();
                }}
              >
                Delete
              </button>
              <button
                className="bg-green-500 px-2 py-1 text-white"
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                Toggle Edit
              </button>
              <button
                disabled={!isEdit}
                className="bg-blue-500 px-2 py-1 text-white"
                onClick={() => {
                  updateBlog();
                }}
              >
                Save
              </button>
            </div>
          </div>
          <div className="text-neutral-400">
            <div className="border-t border-neutral-700 py-4">
              {data && (
                <div className="flex gap-5 items-start justify-between mb-3">
                  <div>
                    {isEdit ? (
                      <input
                        value={titleInputState}
                        type="text"
                        onChange={(e) =>
                          setTitleInputState(e.currentTarget.value)
                        }
                      />
                    ) : (
                      <h3>{titleInputState}</h3>
                    )}
                  </div>
                  <p>{data?.blog?.data?.attributes?.publishedAt}</p>
                </div>
              )}
              {isEdit ? (
                <div>
                  <input
                    value={bodyInputState}
                    type="text"
                    onChange={(e) => setBodyInputState(e.currentTarget.value)}
                  />
                </div>
              ) : (
                <div className="markdown">
                  <ReactMarkdown>{bodyInputState}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
