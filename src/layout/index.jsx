import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="h-screen w-screen py-12 px-32">
            <Outlet />
        </div>
    )
}