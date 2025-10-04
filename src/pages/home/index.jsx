export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative">
        <img
          className="rounded-full border-2 border-black pointer-events-none object-cover min-w-64 min-h-64 max-w-64 max-h-64"
          src="https://cdn.discordapp.com/avatars/1418736782492700672/44ca9690ab632c469b37607ad466713a.webp?size=1024"
          draggable="false"
        />
        <div className="absolute top-0 right-0 bg-white -rotate-10 text-black font-extrabold px-3 py-3 rounded-full shadow-lg border-4 border-black bubble pointer-events-none">
          SKILL<br />ISSUE
          <div className="absolute bottom-0 left-0 w-4.5 h-4.5 bg-white border-black border-b-5 border-l-5 rounded-all"></div>
        </div>
      </div>

      <div className="text-center max-w-md mx-auto mt-5">
        <h1 className="font-extrabold">Hey! I'm kosero</h1>
        <p className="text-gray-300">
          I don't play games much, but I enjoy developing them. I like writing applications in Rust and C, and I love to rant about Windows and web development every day. I've been using Linux for 5 years, but my software development journey began 2 years ago.
        </p>
      </div>
    </div>
  )
}
