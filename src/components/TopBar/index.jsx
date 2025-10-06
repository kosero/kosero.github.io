export default function TopBar() {
    return (
        <div className="items-center justify-center select-none w-full text-center mb-4 space-x-4">
            <a className="transition-colors duration-200 hover:text-blue-400" href="#/home">Home</a>
            <a className="transition-colors duration-200 hover:text-blue-400" href="#/aboutme">About me</a>
            <a className="transition-colors duration-200 hover:text-blue-400" href="#/projects">Projects</a>
            <a className="transition-colors duration-200 hover:text-blue-400" href="#/blog">Blog</a>
        </div>
    )
}