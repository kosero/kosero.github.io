import { Outlet } from "react-router-dom";
import TopBar from "~/components/TopBar";

export default function Layout() {
    return (
        <div className="h-screen w-screen py-8">
            <TopBar />
            <div className="py-12 px-12 sm:px-32">
                <Outlet />
            </div>
        </div>
    )
}