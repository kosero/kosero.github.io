import { Github, Instagram, Mail, Youtube } from "lucide-react";
import Discord from "~/pages/aboutme/discord.svg";
import MAL from "~/pages/aboutme/myanimelist.svg";

export default function AboutMe() {
  const socials = [
    { icon: <Instagram />, url: "https://www.instagram.com/kosero.san/", label: "Instagram" },
    { icon: <Github />, url: "https://github.com/kosero", label: "GitHub" },
    { icon: <img src={Discord} />, url: "http://discord.com/users/1418736782492700672", label: "Discord" },
    { icon: <Mail />, url: "mailto:kosero@tuta.io", label: "Email" },
    { icon: <img src={MAL}/>, url: "https://myanimelist.net/profile/Kosero", label: "MyAnimeList" },
    { icon: <Youtube />, url: "https://www.youtube.com/@RickSanchezinBeyni", label: "YouTube" },
  ];

  return (
    <div className="flex items-center justify-center select-none text-center h-full w-full">
      <div>
        <div className="aboutmeBox w-80 sm:w-110">
            <p className="mt-2">Hey, I’m Kosero. I don’t really have friends in real life, so I mostly hang out online. I’m a bit gloomy and weird, and pretty lazy too, but I just can’t stop making stuff. I’m always learning new things (most of the time useless stuff, honestly). I’ve got a <a className="text-blue-400" href="https://discord.gg/J24pSszkc9">Discord</a> server where I spend most of my day. I absolutely love <a className="text-blue-400" href="https://myanimelist.net/anime/9253">Steins;Gate</a> and <a className="text-blue-400" href="https://store.steampowered.com/app/524220">Nier: Automata</a> — they’re amazing. My favorite anime is <a className="text-blue-400" href="https://myanimelist.net/anime/9253">Steins;Gate</a>, but <a className="text-blue-400" href="https://myanimelist.net/anime/1210">NHK ni Youkoso</a> has a special place in my heart. I’ve loved tinkering with computers since I was a kid, and I really enjoy writing and telling stories, so making games feels like the best way for me to tell them. I also try my hand at pixel art — for my games and just for fun. My days can be kinda monotonous, but I actually like it, because I get to do things I love. That’s about it, thanks for reading!</p>
        </div>
      </div>
      <div className="aboutmeBox absolute bottom-3">
        <h1>Social Media</h1>
        <div className="flex items-center justify-center text-center space-x-4 mt-2">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                {social.icon}
                <span className="absolute -left-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black rounded-md border-1 border-white px-2 py-1">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
    </div>
  );
} 
