import { Layout } from "../components/index";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { DashBoard } from '../components/Dashboard/index'

export default function Admin() {

    return (
        <Layout>
            <section className="mx-auto max-w-[872px] w-full">
                <DashBoard />
            </section>
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