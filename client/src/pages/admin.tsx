import { Layout } from "../components/index";
import { withServerSideAuth } from "@clerk/nextjs/ssr";


export default function Document() {

    return (
        <Layout>
            <section className="mx-auto max-w-[872px] w-full">this is an admin page</section>
        </Layout>
    )
}


export const getServerSideProps = withServerSideAuth(({ req }) => {
    const { userId } = req.auth;

    console.log(userId)

    if (userId !== "user_2VOHqByWqaPG61qTEDKWWE8rK0w") {
        console.log('hi admin')
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // dont fetch data in ssr, its sucks
    return { props: {} };
});