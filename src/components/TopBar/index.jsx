export default function TopBar() {
    return (
        <div className="items-center justify-center select-none w-full text-center mb-2 sm:mb-4 space-x-4">
            <a className="text-lg transition-colors duration-200 hover:text-blue-400" href="#/home">Home</a>
            <a className="text-lg transition-colors duration-200 hover:text-blue-400" href="#/aboutme">About me</a>
            <a className="text-lg transition-colors duration-200 hover:text-blue-400" href="#/projects">Projects</a>
            <a className="text-lg transition-colors duration-200 hover:text-blue-400" href="#/blog">Blog</a>
        </div>
    )
}