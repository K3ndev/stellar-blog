import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Layout } from "../../components/index";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

const GET_SINGLE_BLOG = gql`
  query getSingleBlog($id: Int!) {
    getSingleBlog(id: $id) {
      id
      body
      createdAt
      updatedAt
      rating
      title
    }
  }
`;


const DELETE_SINGLE_BLOG = gql`
  mutation DeleteBlog($id: Int!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

const UPDATE_SINGLE_BLOG = gql`
  mutation updateBlog($input: BlogUpdateInput!, $updateBlogId: Int!) {
    updateBlog(input: $input, id: $updateBlogId) {
      body,
      rating,
      title
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
  const [ratingInputState, setRatingInputState] = useState<number>();


  // for a single blog
  const { data, loading, error, refetch } = useQuery(GET_SINGLE_BLOG, {
    variables: { id: +idFromPath() },
  });

  // for deleting a blog
  const [deleteBlog] = useMutation(DELETE_SINGLE_BLOG, {
    variables: { id: +idFromPath() },
    onError: (err) => {
      console.error(err);
    },
    onCompleted: () => {
      router.push("/");
    },
  });

  // for updating a blog
  const [updateBlog] = useMutation(UPDATE_SINGLE_BLOG, {
    variables: {
      input: {
        title: titleInputState,
        body: bodyInputState,
        rating: ratingInputState,
      },
      updateBlogId: +idFromPath(),
    },
    refetchQueries: [
      { query: GET_SINGLE_BLOG, variables: { id: +idFromPath() } },
    ],
    onError: (err) => {
      console.error(err);
    },
    onCompleted: () => {
      setIsEdit(false);
    },
  });

  useEffect(() => {
    if (data?.getSingleBlog) {
      setTitleInputState(data?.getSingleBlog.title);
      setBodyInputState(data?.getSingleBlog.body);
      setRatingInputState(data?.getSingleBlog.rating)
    }
  }, [data, isEdit]);

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
            <h1 className="">Post of sampleID</h1>

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
                  refetch()
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
                  <p>{data?.getSingleBlog.updatedAt}</p>
                </div>
              )}
              {isEdit ? (
                <div className="mb-3">
                  <label htmlFor="body" >
                    <input
                      id="body"
                      value={bodyInputState}
                      type="text"
                      onChange={(e) => setBodyInputState(e.currentTarget.value)}
                    />
                  </label>
                  
                </div>
              ) : (
                <div className="markdown">
                  <ReactMarkdown>{bodyInputState}</ReactMarkdown>
                </div>
              )}
              {isEdit && (
                <div>
                  <label htmlFor="rating">
                    <input
                      type="number"
                      className="block mb-1 text-black"
                      placeholder="rating"
                      id="rating"
                      max={10}
                      value={ratingInputState}
                      onChange={(e) => setRatingInputState(+e.currentTarget.value)}
                    />
                  </label>
                </div>
              ) }
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}


// todo 
// try to sign out in one of the blog page
// then it will show a bug