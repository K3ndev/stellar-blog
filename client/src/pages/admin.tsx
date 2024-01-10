import { Layout } from "../components/index";
import { withServerSideAuth } from "@clerk/nextjs/ssr";


export default function Admin() {

    return (
        <Layout>
            <section className="mx-auto max-w-[872px] w-full">this is an admin page</section>
        </Layout>
    )
}


export const getServerSideProps = withServerSideAuth(({ req }) => {
    const { userId } = req.auth;
    const adminID = process.env.AdminID

    if (userId !== adminID) {
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // don't fetch data in ssr, its sucks
    return { props: {} };
});