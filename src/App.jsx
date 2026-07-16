import { useEffect, useMemo, useRef, useState } from 'react';

const songs = [
  { id: 1, title: 'Bliss', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Bliss.mp3' },
  { id: 2, title: 'Exit', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Exit.mp3' },
  { id: 3, title: 'Mayday', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Mayday.mp3' },
  { id: 4, title: 'Moment', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Moment.mp3' },
  { id: 5, title: 'Niekde v oblakoch', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Niekde-v-oblakoch.mp3' },
  { id: 6, title: 'Nový svet', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Novy-svet.mp3' },
  { id: 7, title: 'Premena', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Premena.mp3' },
  { id: 8, title: 'Satén', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Saten.mp3' },
  { id: 9, title: 'Spoločnosť', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Spolocnost.mp3' },
  { id: 10, title: 'Temné miesta', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Temne-miesta.mp3' },
  { id: 11, title: 'Vertigo', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Vertigo.mp3' },
  { id: 12, title: 'Za obzory', album: 'Niekde v oblakoch', previewUrl: '/songs/Album/Niekde-v-oblakoch/Za-obzory.mp3' },
  { id: 13, title: 'Do nebe', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Do-nebe.mp3' },
  { id: 14, title: 'Kde boli', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Kde-boli.mp3' },
  { id: 15, title: 'Kým sa zobudí', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Kym-sa-zobudi.mp3' },
  { id: 16, title: 'Málo', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Malo.mp3' },
  { id: 17, title: 'Mezi prsty', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Mezi-prsty.mp3' },
  { id: 18, title: 'Nejsem sám', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Nejsem-sam.mp3' },
  { id: 19, title: 'Neuvidia', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Neuvidia.mp3' },
  { id: 20, title: 'Od nekonečna do dávna', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Od-nekonecna-do-davna.mp3' },
  { id: 21, title: 'Vrav menej, hýb sa viac', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Vrav-menej-hyb-sa-viac.mp3' },
  { id: 22, title: 'Zrkadla', album: 'Od Nekonečna Do Dávna', previewUrl: '/songs/Album/ONDD/Zrkadla.mp3' },
  { id: 23, title: 'Chaoz teraz', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Chaoz-teraz.mp3' },
  { id: 24, title: 'Chaoz vtedy (interlude)', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Chaoz-vtedy-interlude.mp3' },
  { id: 25, title: 'Dosť hodín', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Dost-hodin.mp3' },
  { id: 26, title: 'Echo', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Echo.mp3' },
  { id: 27, title: 'Eufória', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Euforia.mp3' },
  { id: 28, title: 'Krv', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Krv.mp3' },
  { id: 29, title: 'Nostalgia', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Nostalgia.mp3' },
  { id: 30, title: 'Panoptikon', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Panoptikon.mp3' },
  { id: 31, title: 'Plán', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Plan.mp3' },
  { id: 32, title: 'Prišli a zmizli', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Prisli-a-zmizli.mp3' },
  { id: 33, title: 'Raz budem chápať', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Raz-budem-chapat.mp3' },
  { id: 34, title: 'Ringere', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Ringere.mp3' },
  { id: 35, title: 'Salme', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Salme.mp3' },
  { id: 36, title: 'Slnovrat', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Slnovrat.mp3' },
  { id: 37, title: 'Spln a nov', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Spln-a-nov.mp3' },
  { id: 38, title: 'Správny čas', album: 'Chaos, Vtedy a Teraz', previewUrl: '/songs/Album/Chaos/Spravny-cas.mp3' },
  { id: 39, title: '471', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/471.mp3' },
  { id: 40, title: 'Cestou časom', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Cestou-casom.mp3' },
  { id: 41, title: 'Hotel', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Hotel.mp3' },
  { id: 42, title: 'Ok', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Ok.mp3' },
  { id: 43, title: 'Byť tu navždy', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Byt-tu-navzdy.mp3' },
  { id: 44, title: 'Carmen', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Carmen.mp3' },
  { id: 45, title: 'Dažď', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Dazd.mp3' },
  { id: 46, title: 'Diabol je preodetý', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Diabol-je-preodety.mp3' },
  { id: 47, title: 'Král nad ránom', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Kral-nad-ranom.mp3' },
  { id: 48, title: 'Mali', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Mali.mp3' },
  { id: 49, title: 'Na očiach vyryté', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Na-ociach-vyryte.mp3' },
  { id: 50, title: 'Prázdnym rukám', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Prazdnym-rukam.mp3' },
  { id: 51, title: 'Pre dni', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Pre-dni.mp3' },
  { id: 52, title: 'S tým, čo mám', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/S-tym-co-mam.mp3' },
  { id: 53, title: 'Stále ale môžeme ožiť', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Stale-ale-mozeme-ozit.mp3' },
  { id: 54, title: 'Tiché vody', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Tiche-vody.mp3' },
  { id: 55, title: 'Trpezlivosť', album: 'S.A.M.O', previewUrl: '/songs/Album/SAMO/Trpenzlivost.mp3' },
  { id: 56, title: 'Včera mi zhorel dom', album: 'Agónia & Extáza', previewUrl: '/songs/Album/Agonia-Extaza/Vcera-mi-zhorel-dom.mp3' },
  { id: 57, title: 'Motýľ', album: 'Agónia & Extáza', previewUrl: '/songs/Album/Agonia-Extaza/Motyl.mp3' },
];

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getAssetUrl = (path) => {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;

  const basePath = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${normalizedPath}`;
};

const getSongPreviewUrl = (song) => {
  if (song.previewUrl) return getAssetUrl(song.previewUrl);
  const folder = song.albumFolder ? song.albumFolder : slugify(song.album);
  return getAssetUrl(`/songs/Album/${folder}/${slugify(song.title)}.mp3`);
};

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const audioRef = useRef(null);
  const previewTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const maxRounds = 10;
  const isFinished = score.total >= maxRounds;
  const round = score.total < maxRounds ? score.total + 1 : maxRounds;

  const pickRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
  };

  const resetGame = () => {
    stopPreview();
    stopCountdown();
    setScore({ correct: 0, total: 0 });
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    setIsPlayingPreview(false);
    setCurrentSong(pickRandomSong());
    setTimeLeft(10);
  };

  const startNewRound = () => {
    if (isFinished) {
      resetGame();
      return;
    }

    stopPreview();
    stopCountdown();
    setCurrentSong(pickRandomSong());
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    setIsPlayingPreview(false);
    setTimeLeft(10);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    return () => {
      stopPreview();
      stopCountdown();
    };
  }, []);

  const suggestions = useMemo(() => {
    if (!guess.trim()) {
      return [];
    }

    return songs
      .filter((song) => song.title.toLowerCase().includes(guess.trim().toLowerCase()))
      .slice(0, 4);
  }, [guess]);

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    setIsPlayingPreview(false);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTimeout = () => {
    setFeedback({
      type: 'error',
      message: `Čas vypršel! Správná odpověď byla “${currentSong.title}”.`,
    });
    setScore((prev) => ({
      correct: prev.correct,
      total: prev.total + 1,
    }));
  };

  const startCountdown = () => {
    stopCountdown();
    setTimeLeft(10);
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopCountdown();
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const playPreview = () => {
    if (!currentSong || isFinished) return;

    const previewUrl = getSongPreviewUrl(currentSong);
    if (!previewUrl) {
      setFeedback({
        type: 'error',
        message: 'Nenašiel sa žiadny audio súbor pre túto skladbu. Pridaj ho do /songs/.',
      });
      return;
    }

    stopPreview();
    stopCountdown();
    setTimeLeft(10);

    const audioEl = audioRef.current;
    if (!audioEl) {
      setFeedback({
        type: 'error',
        message: 'Audio element nie je pripravený. Obnov stránku a skúste znovu.',
      });
      return;
    }

    audioEl.src = previewUrl;
    audioEl.currentTime = 0;
    audioEl.load();

    audioEl.play().then(() => {
      setIsPlayingPreview(true);
      previewTimerRef.current = setTimeout(() => {
        stopPreview();
      }, 10000);
      startCountdown();
    }).catch((error) => {
      console.error('Audio play failed', error, previewUrl);
      setFeedback({
        type: 'error',
        message: `Ukážku sa nepodarilo prehrať (${previewUrl}). Skontroluj súbor a skúšaj znovu.`,
      });
    });
  };

  const handleGuess = () => {
    if (!currentSong || isFinished) return;

    stopCountdown();

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedTitle = currentSong.title.toLowerCase();
    const isCorrect = normalizedGuess === normalizedTitle;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect
        ? `Správná odpověď! Song: ${currentSong.title} | Album: ${currentSong.album}.`
        : `Špatná odpověď. Správná odpověď byla “${currentSong.title}”.`,
    });
  };

  const handleSuggestionClick = (title) => {
    setGuess(title);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <audio ref={audioRef} preload="auto" />

      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
          Jsi pravý fanoušek Saula? Ověř si to přes:
        </div>
        <h1 className="mt-1 bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-8xl">
          SaulGuesser
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Spusť hru tak, že zmáčkneš tlačítko „Přehrát ukázku“. Máš přesně 10 sekund na uhodnutí skladby! Když uhodneš nebo neuhodneš, pokračuj dále tlačítkem „Nové kolo“.
        </p>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(168,85,247,0.22)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-6 grid w-full gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 px-4 py-4 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-[1.25rem] border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/15 to-transparent px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.25)]">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-fuchsia-300">Skóre</p>
            <p className="mt-2 text-2xl font-semibold text-white">{score.correct} / {maxRounds}</p>
          </div>
          <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-600 via-violet-500 to-cyan-500 text-white shadow-[0_0_35px_rgba(34,211,238,0.25)]">
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/80">Čas</span>
            <span className="mt-1 text-2xl font-semibold">{timeLeft}s</span>
          </div>
          <div className="rounded-[1.25rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-transparent px-4 py-4 text-right shadow-[0_12px_30px_rgba(15,23,42,0.25)]">
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-cyan-300">Kolo</p>
            <p className="mt-2 text-2xl font-semibold text-white">{round} / {maxRounds}</p>
          </div>
        </div>

        {isFinished && (
          <div className="mb-6 rounded-[1.5rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-950/90 px-6 py-6 text-center text-sm text-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.18)]">
            <p className="text-base uppercase tracking-[0.35em] text-emerald-300">Konec hry!</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Tvoje výsledky</h2>
            <p className="mt-3 text-slate-300">Správné odpovědi: <span className="font-semibold text-white">{score.correct} / {maxRounds}</span></p>
            <p className="mt-1 text-slate-400">Zmáčkni „Restart hry“ pro novou hru.</p>
          </div>
        )}

        <button
          onClick={playPreview}
          disabled={isFinished}
          className={`mb-6 flex items-center justify-center rounded-full px-6 py-3 text-lg font-semibold text-white shadow-[0_0_35px_rgba(217,70,239,0.3)] transition ${isFinished ? 'cursor-not-allowed bg-slate-700/70' : 'bg-gradient-to-r from-fuchsia-600 via-violet-500 to-cyan-500 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(34,211,238,0.28)]'}`}
        >
          <span className="mr-2 text-xl">▶</span>
          {isPlayingPreview ? 'Přehrávám...' : 'Přehrát ukázku'}
        </button>

        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="guess">
            Tvůj tip
          </label>
          <div className="relative">
            <input
              id="guess"
              value={guess}
              onChange={(event) => {
                setGuess(event.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Tab' && suggestions.length === 1) {
                  event.preventDefault();
                  setGuess(suggestions[0].title);
                  setShowSuggestions(false);
                }
                if (event.key === 'Enter' && guess.trim()) {
                  event.preventDefault();
                  handleGuess();
                }
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              placeholder="Napr. Niekde v oblakoch"
              disabled={isFinished}
              className={`w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-base outline-none ring-0 transition placeholder:text-slate-500 focus:border-fuchsia-500 focus:bg-slate-900 ${isFinished ? 'cursor-not-allowed opacity-70' : ''}`}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
                {suggestions.map((song) => (
                  <li key={song.id}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleSuggestionClick(song.title)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                    >
                      <span>{song.title}</span>
                      <span className="text-xs text-slate-400">{song.album}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={handleGuess}
            disabled={isFinished || !guess.trim()}
            className={`flex-1 rounded-2xl px-4 py-3 font-semibold transition ${isFinished || !guess.trim() ? 'cursor-not-allowed bg-white/10 text-slate-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <span className="text-xl">✓</span>
          </button>
          <button
            onClick={startNewRound}
            disabled={isFinished}
            className={`rounded-2xl px-4 py-3 font-semibold transition ${isFinished ? 'cursor-not-allowed border border-slate-600 bg-slate-700/80 text-slate-400' : 'border border-fuchsia-500/40 text-fuchsia-200 hover:bg-fuchsia-500/10'}`}
          >
            Nové kolo
          </button>
          <button
            onClick={resetGame}
            className="rounded-2xl border border-cyan-400/50 bg-cyan-500/10 px-4 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-500/15"
          >
            Restart hry
          </button>
        </div>

        {feedback && (
          <div
            className={`mt-6 w-full rounded-2xl border px-4 py-4 text-sm ${feedback.type === 'success' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300'}`}
          >
            <p className="font-semibold">{feedback.message}</p>
            {feedback.type !== 'success' && (
              <div className="mt-2 text-slate-300">
                <p><span className="text-slate-400">Album:</span> {currentSong?.album}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mx-auto mt-8 max-w-3xl text-center text-sm text-slate-400">
        <p>Developed by <a href='https://github.com/Kratomchvil' className="text-cyan-400 hover:text-cyan-300" target="_blank" rel="noopener noreferrer">Daniel Kratochvíl</a> • SaulGuesser © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
