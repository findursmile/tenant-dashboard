import { Link } from "../components/catalyst/link";
import DefaultLayout from "../layout/DefaultLayout";

export default () => {
    return (
        <DefaultLayout>
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                <p>Page Not Found</p> <br />
                <Link href="/" >Home</Link>
                </div>
            </div>
        </DefaultLayout>
    );
}
