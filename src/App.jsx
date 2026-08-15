import React, { useEffect, useState } from 'react';
import './index.css';

const ANIMES = [
  { id: 1210, name: 'NHK ni Youkoso!', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1210-2XotjcgqdcaX.jpg' },
  { id: 457, name: 'Mushishi', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx457-l6cTtNgI9Bi6.png' },
  { id: 205, name: 'Samurai Champloo', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx205-7tHVFu6dPBm9.png' },
  { id: 13125, name: 'Shinsekai yori', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx13125-2EDZb8ahshQc.png' },
  { id: 9253, name: 'Steins;Gate', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-tIUXF2gfU8Sg.jpg' },
  { id: 7724, name: 'Shiki', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx7724-NwNnRsI34eDa.jpg' },
  { id: 4081, name: 'Natsume Yuujinchou', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx4081-xi08naD69tjr.jpg' },
  { id: 30, name: 'Shin Seiki Evangelion', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx30-AI1zr74Dh4ye.jpg' },
  { id: 1535, name: 'DEATH NOTE', cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg' },
];

const GAMES = [
  { id: 1113560, name: 'NieR Replicant' },
  { id: 2124490, name: 'Silent Hill 2' },
  { id: 223710, name: 'Cry of Fear' },
  { id: 541570, name: 'Sally Face' },
  { id: 362680, name: 'Fran Bow' },
  { id: 412830, name: 'Steins;Gate' },
  { id: 524220, name: 'NieR Automata' },
  { id: 1002300, name: 'Fear & Hunger' },
  { id: 2475490, name: 'Mouthwashing' },
];

function App() {
  const [lastfm, setLastfm] = useState(null);

  useEffect(() => {
    const RELAY_ORIGIN = "https://kosero.github.io";

    const applyLastfm = (data) => {
      const track = data?.recenttracks?.track?.[0];
      if (!track) {
        setLastfm(null);
        return;
      }
      const cover =
        track.image?.find((img) => img.size === "extralarge")?.["#text"] ||
        track.image?.find((img) => img.size === "large")?.["#text"] ||
        null;
      setLastfm({
        song: track.name || "",
        artist: track.artist?.["#text"] || "",
        album: track.album?.["#text"] || "",
        cover: cover || null,
        url: track.url || null,
      });
    };

    const onMessage = (event) => {
      if (event.origin !== RELAY_ORIGIN) return;
      if (event.data?.relay !== "lastfm") return;
      if (event.data.ok) applyLastfm(event.data.data);
    };
    window.addEventListener("message", onMessage);

    let iframe = null;
    const mount = () => {
      iframe = document.createElement("iframe");
      iframe.src = `${RELAY_ORIGIN}/relay.html?api=lastfm`;
      iframe.style.cssText = "display:none;width:1px;height:1px;";
      iframe.setAttribute("aria-hidden", "true");
      document.body.appendChild(iframe);
    };
    mount();
    const interval = setInterval(() => {
      if (iframe) iframe.remove();
      mount();
    }, 45000);

    return () => {
      window.removeEventListener("message", onMessage);
      clearInterval(interval);
      if (iframe) iframe.remove();
    };
  }, []);

  const activeMusic = lastfm;

  return (
    <div className="layout-wrapper">
      <div className="main-grid">
        {/* LEFT COLUMN */}
        <div className="col-left">
          <div className="panel" style={{ padding: '5px', position: 'relative' }}>
            <img src="/images/avatar.jpg" alt="kosero avatar" className="avatar" />
          </div>

          <div className="panel">
            <div className="exe-title">kosero</div>
            <div className="greeting">hmm... how's it going?</div>
          </div>

          <div className="panel system-log">
            <div className="panel-title" style={{ color: '#fff' }}>system.log</div>
            <div className="log-row"><div className="log-key">os:</div><div className="log-value">fedora</div></div>
            <div className="log-row"><div className="log-key">wm:</div><div className="log-value">bspwm</div></div>
            <div className="log-row"><div className="log-key">shell:</div><div className="log-value">fish</div></div>
            <div className="log-row"><div className="log-key">editor:</div><div className="log-value">nvim</div></div>
            <div className="log-row"><div className="log-key">goal:</div><div className="log-value">build a soul<br />worthy engine.</div></div>
          </div>

          <div className="quote-box">
          </div>

          <div style={{ position: 'relative' }}>
            <img src="/images/bottom-left.jpg" alt="" style={{ width: '100%', height: 'auto', border: '1px solid var(--border-color)', objectFit: 'cover', display: 'block' }} />
            <div className="vertical-text" style={{ position: 'absolute', right: '10px', top: '10px' }}>
              夢に見たあの場所へ
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="col-middle">
          <div className="welcome-hero">
            <h1>ようこそ</h1>
            <p>welcome to <span className="highlight">my little home</span> on the web.</p>
            <p>i make games, break systems, and do whatever I feel like.</p>
            <p>this is my digital scrapbook, a place for the things that shape me.</p>
            <p>El Psy Congroo... █</p>
          </div>

          <div className="panel">
            <div className="panel-title">languages & tools</div>
            <div className="lang-tools-grid">
              {[
                { name: 'C', icon: 'https://cdn.simpleicons.org/c/993333' },
                { name: 'Rust', icon: 'https://cdn.simpleicons.org/rust/993333' },
                { name: 'Go', icon: 'https://cdn.simpleicons.org/go/993333' },
                { name: 'Python', icon: 'https://cdn.simpleicons.org/python/993333' },
                { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/993333' },
                { name: 'C#', icon: 'https://cdn.simpleicons.org/dotnet/993333' },
                { name: 'Lua', icon: 'https://cdn.simpleicons.org/lua/993333' },
                { name: 'raylib', icon: 'https://cdn.simpleicons.org/raylib/993333' },
                { name: 'SDL', icon: '/icons/sdl.svg' },
                { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/993333' },
                { name: 'Git', icon: 'https://cdn.simpleicons.org/git/993333' },
                { name: 'Godot', icon: 'https://cdn.simpleicons.org/godotengine/993333' },
                { name: 'Unity', icon: 'https://cdn.simpleicons.org/unity/993333' },
              ].map(tool => (
                <div className="tool" key={tool.name}>
                  <img src={tool.icon} alt={tool.name} className="icon" />
                  <div style={{ fontSize: '11px' }}>{tool.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="two-col-grid">
            <div className="panel">
              <div className="panel-title-icon star">anime</div>
              <div className="grid-9">
              {ANIMES.map((anime) => (
                <a
                  key={anime.id}
                  className="grid-item"
                  href={`https://anilist.co/anime/${anime.id}`}
                  target="_blank"
                  rel="noreferrer"
                  title={anime.name}
                >
                  <img
                    src={anime.cover}
                    alt={anime.name}
                    className="grid-image"
                    loading="lazy"
                  />
                </a>
              ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-title-icon links">games</div>
              <div className="grid-9">
                {GAMES.map((game) => (
                  <a
                    key={game.id}
                    className="grid-item"
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    rel="noreferrer"
                    title={game.name}
                  >
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
                      alt={game.name}
                      className="grid-image"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="banner-quote">
            <img src="https://i.pinimg.com/736x/70/76/a5/7076a53f4a2dd4c9e513044505be0a1c.jpg" alt="" className="img" />
            <div className="banner-quote-text">
              <div className="quote-name">sunako kirishiki</div>
              <div className="quote">
                <div className="quote-line l1">but if i have a life,</div>
                <div className="quote-line l2">shouldn't i treasure it?</div>
                <div className="quote-line l3">is that a sin?</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-right">
          <div className="panel music-shrine-large">
            <div className="panel-title-icon">last listened_</div>
            {activeMusic ? (
              <>
                {activeMusic.cover ? (
                  <img
                    src={activeMusic.cover}
                    alt={activeMusic.album || activeMusic.song}
                    className="cover"
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', marginBottom: '10px', border: '1px solid var(--border-color)', display: 'block' }}
                  />
                ) : (
                  <div className="img-placeholder cover" style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    🎵
                  </div>
                )}
                <div style={{ fontSize: '15px', color: '#fff', fontWeight: 'bold' }}>
                  {activeMusic.url ? (
                    <a href={activeMusic.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>
                      {activeMusic.song}
                    </a>
                  ) : (
                    activeMusic.song
                  )}
                </div>
                {activeMusic.artist && <div style={{ fontSize: '13px', color: 'var(--text-color)', marginTop: '2px' }}>{activeMusic.artist}</div>}
                {activeMusic.album && <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{activeMusic.album}</div>}
              </>
            ) : (
              <>
                <div className="img-placeholder cover" style={{ width: '100%', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '12px' }}>
                  <span>[ No Track Playing ]</span>
                  <span style={{ fontSize: '10px', marginTop: '4px', color: '#444' }}>last.fm is silent</span>
                </div>
                <div style={{ fontSize: '14px', color: '#888', marginTop: '8px' }}>Not listening right now</div>
              </>
            )}
          </div>

          <div className="panel">
            <div className="panel-title" style={{ color: '#fff' }}>favorite artists</div>
            <ul className="artist-list">
              <li>Plastic Tree</li>
              <li>BUCK-TICK</li>
              <li>deadman</li>
              <li>Malice Mizer</li>
              <li>my dead girlfriend</li>
              <li>exist trace</li>
              <li>MUCC</li>
              <li>glamsucre</li>
              <li>gulu gulu</li>
              <li>Aimer</li>
              <li>Akira Yamaoka</li>
              <li>Nujabes</li>
              <li>Massive Attack</li>
              <li>and more...</li>
            </ul>
          </div>

          <div className="panel">
            <div className="panel-title">inspiration</div>
            <div style={{ fontStyle: 'italic' }}>
              Rick Sanchez<br />
              Sal Fisher <br />
              Okabe Rintarou <br />
              Natsume Takashi
            </div>
          </div>

          <div style={{ width: '100%', marginBottom: '10px', border: '1px solid var(--border-color)' }}>
            <img src="/images/liminal.jpg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)' }}>
            <div className="vertical-text">どうしてここにいるの？</div>
          </div>
        </div>
      </div>

      <div className="footer-nav">
        <div className="left">
          © 2026 kosero
        </div>
        <div className="right">
          all memories are digital.
        </div>
      </div>
    </div>
  );
}

export default App;
