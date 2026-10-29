import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase, supabaseConfigError, supabaseConfigured } from './lib/supabase.js';

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
  { id: 42, title: 'O.K.', album: 'Hotel 471', previewUrl: '/songs/Album/Hotel471/Ok.mp3' },
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

const LEADERBOARD_STORAGE_KEY = 'saulguesser_leaderboard';
const LEADERBOARD_RETENTION_MS = 24 * 60 * 60 * 1000;
const LEADERBOARD_TABLE = 'leaderboard_entries';
const LEADERBOARD_LIMIT = 100;

const purgeOldEntries = (entries) => {
  const now = Date.now();
  return entries.filter((entry) => {
    const entryTime = new Date(entry.timestamp).getTime();
    return Number.isFinite(entryTime) && now - entryTime <= LEADERBOARD_RETENTION_MS;
  });
};

const loadLocalLeaderboard = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    const entries = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(entries)) throw new Error('Lokální leaderboard má neplatný formát.');
    const filtered = purgeOldEntries(entries);
    if (filtered.length !== entries.length) {
      window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (error) {
    throw new Error('Nepodařilo se načíst leaderboard z tohoto prohlížeče.', { cause: error });
  }
};

const mapLeaderboardRow = ({ id, name, score, avg_seconds, created_at }) => ({
  id,
  name,
  score,
  avgSeconds: Number(avg_seconds),
  timestamp: created_at,
});

const loadLeaderboard = async () => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) return loadLocalLeaderboard();

  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .select('id, name, score, avg_seconds, created_at')
    .gte('created_at', new Date(Date.now() - LEADERBOARD_RETENTION_MS).toISOString())
    .order('score', { ascending: false })
    .order('avg_seconds', { ascending: true })
    .limit(LEADERBOARD_LIMIT);

  if (error) throw error;
  return data.map(mapLeaderboardRow);
};

const saveLeaderboardEntry = async ({ name, score, avgSeconds }) => {
  if (supabaseConfigError) throw new Error(supabaseConfigError);
  if (!supabase) {
    const timestamp = new Date().toISOString();
    const entry = {
      id: `${Date.now()}-${name}`,
      name,
      score,
      avgSeconds,
      timestamp,
    };
    const entries = purgeOldEntries([...loadLocalLeaderboard(), entry]);
    window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
    return entry;
  }

  const { data, error } = await supabase
    .from(LEADERBOARD_TABLE)
    .insert({ name, score, avg_seconds: avgSeconds })
    .select('id, name, score, avg_seconds, created_at')
    .single();

  if (error) throw error;
  return mapLeaderboardRow(data);
};

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
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentView, setCurrentView] = useState('game');
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gameTimes, setGameTimes] = useState([]);
  const [submitMessage, setSubmitMessage] = useState('');
  const [countdownValue, setCountdownValue] = useState(3);
  const [roundStatus, setRoundStatus] = useState('ready');

  const audioRef = useRef(null);
  const previewTimerRef = useRef(null);
  const countdownRef = useRef(null);
  const roundCountdownRef = useRef(null);
  const nextRoundTimeoutRef = useRef(null);
  const currentSongRef = useRef(null);
  const maxRounds = 10;
  const isFinished = score.total >= maxRounds;
  const round = score.total < maxRounds ? score.total + 1 : maxRounds;
  const isRoundActive = ['countdown', 'playing'].includes(roundStatus);
  const shouldShowUtilityChrome = currentView === 'game' && !isRoundActive && !isFinished && score.total === 0;
  const shouldShowTutorial = shouldShowUtilityChrome;
  const shouldShowNav = shouldShowUtilityChrome;
  const showHeroStartButton = roundStatus === 'ready' && score.total === 0;
  const hasStartedGame = score.total > 0 || isRoundActive;
  const shouldShowRoundPanel = hasStartedGame;

  const pickRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
  };

  const clearRoundTimers = () => {
    if (roundCountdownRef.current) {
      clearInterval(roundCountdownRef.current);
      roundCountdownRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    if (nextRoundTimeoutRef.current) {
      clearTimeout(nextRoundTimeoutRef.current);
      nextRoundTimeoutRef.current = null;
    }
  };

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
  };

  const resetGame = () => {
    clearRoundTimers();
    stopPreview();
    setScore({ correct: 0, total: 0 });
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    const nextSong = pickRandomSong();
    currentSongRef.current = nextSong;
    setCurrentSong(nextSong);
    setTimeLeft(10);
    setGameTimes([]);
    setPlayerName('');
    setIsRegistered(false);
    setSubmitMessage('');
    setCountdownValue(3);
    setRoundStatus('ready');
  };

  const enterGame = () => {
    setIsEntering(true);
    const transitionDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 520;
    window.setTimeout(() => setHasEntered(true), transitionDuration);
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

  const playPreview = (song = currentSong) => {
    if (!song || isFinished) return;

    const previewUrl = getSongPreviewUrl(song);
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
    setRoundStatus('playing');

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

  const startRoundSequence = () => {
    if (isFinished) return;

    clearRoundTimers();
    stopPreview();
    setGuess('');
    setFeedback(null);
    setShowSuggestions(false);
    const nextSong = pickRandomSong();
    currentSongRef.current = nextSong;
    setCurrentSong(nextSong);
    setTimeLeft(10);
    setRoundStatus('countdown');
    setCountdownValue(3);

    const runCountdownStep = (value) => {
      if (value < 0) {
        setRoundStatus('playing');
        playPreview(nextSong);
        return;
      }

      setCountdownValue(value);
      roundCountdownRef.current = window.setTimeout(() => {
        runCountdownStep(value - 1);
      }, 900);
    };

    runCountdownStep(3);
  };

  const finalizeRound = (isCorrect) => {
    if (isFinished) return;

    const resolvedSong = currentSongRef.current || currentSong;
    if (!resolvedSong) return;

    stopPreview();
    stopCountdown();
    const currentTime = Math.max(0, 10 - timeLeft);
    const nextCorrect = score.correct + (isCorrect ? 1 : 0);
    const nextTotal = score.total + 1;

    if (isCorrect) {
      setGameTimes((prev) => [...prev, currentTime]);
    }

    setScore({
      correct: nextCorrect,
      total: nextTotal,
    });

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect
        ? `Správná odpověď! Song: ${resolvedSong.title} | Album: ${resolvedSong.album}.`
        : `Špatná odpověď. Správná odpověď byla “${resolvedSong.title}”.`,
    });

    if (nextTotal >= maxRounds) {
      setRoundStatus('finished');
      return;
    }

    setRoundStatus('ready');
    setCountdownValue(3);
    setTimeLeft(10);
    setGuess('');
    setShowSuggestions(false);

    if (nextRoundTimeoutRef.current) {
      clearTimeout(nextRoundTimeoutRef.current);
      nextRoundTimeoutRef.current = null;
    }
  };

  const handleTimeout = () => {
    if (isFinished) return;
    finalizeRound(false);
  };

  const handleGuess = () => {
    if (!currentSong || isFinished || !guess.trim()) return;

    const normalizeAnswer = (value) => value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
    const normalizedGuess = normalizeAnswer(guess);
    const normalizedTitle = normalizeAnswer(currentSong.title);
    const isCorrect = normalizedGuess === normalizedTitle;

    setGuess('');
    setShowSuggestions(false);
    finalizeRound(isCorrect);
  };

  const handleSuggestionClick = (title) => {
    setGuess(title);
    setShowSuggestions(false);
  };

  const handleLeaderboardSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setSubmitMessage('Zadej prosím jméno.');
      return;
    }
    if (trimmedName.length > 40) {
      setSubmitMessage('Jméno může mít nejvýše 40 znaků.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const entry = await saveLeaderboardEntry({
        name: trimmedName,
        score: score.correct,
        avgSeconds: averageTime ?? 0,
      });
      setLeaderboard((entries) => [...entries, entry]);
      setIsRegistered(true);
      setSubmitMessage(supabaseConfigured
        ? 'Výsledek byl uložen do Supabase.'
        : 'Výsledek je uložen pouze v tomto prohlížeči. Pro sdílený leaderboard nastav Supabase.');
    } catch (error) {
      console.error('Failed to save leaderboard entry', error);
      setSubmitMessage(`Výsledek se nepodařilo uložit: ${error.message || 'neznámá chyba'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestions = useMemo(() => {
    if (!guess.trim()) {
      return [];
    }

    return songs
      .filter((song) => song.title.toLowerCase().includes(guess.trim().toLowerCase()))
      .slice(0, 4);
  }, [guess]);

  const averageTime = useMemo(() => {
    if (!gameTimes.length) return null;
    return gameTimes.reduce((sum, value) => sum + value, 0) / gameTimes.length;
  }, [gameTimes]);

  const sortedLeaderboard = useMemo(() => {
    return [...leaderboard].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.avgSeconds - b.avgSeconds;
    });
  }, [leaderboard]);

  const refreshLeaderboard = async () => {
    setIsLeaderboardLoading(true);
    setLeaderboardError('');
    try {
      setLeaderboard(await loadLeaderboard());
    } catch (error) {
      console.error('Failed to load leaderboard', error);
      setLeaderboardError(error.message || 'Nepodařilo se načíst leaderboard.');
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;
    setIsLeaderboardLoading(true);
    loadLeaderboard()
      .then((entries) => {
        if (isActive) setLeaderboard(entries);
      })
      .catch((error) => {
        console.error('Failed to load leaderboard', error);
        if (isActive) {
          setLeaderboardError(error.message || 'Nepodařilo se načíst leaderboard.');
        }
      })
      .finally(() => {
        if (isActive) setIsLeaderboardLoading(false);
      });

    const initialSong = pickRandomSong();
    currentSongRef.current = initialSong;
    setCurrentSong(initialSong);
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      clearRoundTimers();
      stopPreview();
    };
  }, []);

  if (!hasEntered) {
    return (
      <main className={`sg-app sg-splash ${isEntering ? 'is-exiting' : ''}`}>
        <div className="sg-splash-atmosphere" aria-hidden="true">
          <span className="sg-splash-image sg-splash-image-one" />
          <span className="sg-splash-image sg-splash-image-two" />
          <span className="sg-splash-image sg-splash-image-three" />
        </div>
        <div className="sg-splash-content">
          <h1 className="sg-title">SaulGuesser</h1>
          <button
            type="button"
            className="sg-start-button"
            onClick={enterGame}
            disabled={isEntering}
          >
            Začít hrát
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="sg-app sg-main">
      <audio ref={audioRef} preload="auto" />

      {roundStatus === 'countdown' && (
        <div className="sg-fullscreen-countdown" aria-live="polite" aria-atomic="true">
          <div key={countdownValue} className="sg-fullscreen-countdown-value">{countdownValue}</div>
        </div>
      )}

      <div className={`sg-header ${isRoundActive || score.total > 0 ? 'sg-header-compact' : ''}`}>
        {shouldShowUtilityChrome && (
          <div className="sg-kicker">
            Jsi pravý fanoušek Saula? Ověř si to přes:
          </div>
        )}
        <h1 className="sg-title">SaulGuesser</h1>
        {shouldShowNav && (
          <div className="sg-tabs">
            <button
              type="button"
              onClick={() => setCurrentView('game')}
              className={`sg-tab ${currentView === 'game' ? 'is-active' : ''}`}
            >
              Hra
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('leaderboard')}
              className={`sg-tab ${currentView === 'leaderboard' ? 'is-active' : ''}`}
            >
              Leaderboard
            </button>
          </div>
        )}
        {shouldShowTutorial && (
          <p className="sg-intro">
            Spusť hru tak, že zmáčkneš tlačítko „Přehrát ukázku“. Máš přesně 10 sekund na uhodnutí skladby! Když uhodneš nebo neuhodneš, pokračuj dále tlačítkem „Nové kolo".
          </p>
        )}
      </div>

      {currentView === 'leaderboard' ? (
        <div className="sg-panel sg-leaderboard">
          <div className="sg-section-heading">
            <div>
              
              <h2>Leaderboard</h2>
            </div>
            <div className="sg-section-actions">
              <button
                type="button"
                onClick={() => setCurrentView('game')}
                className="sg-button sg-button-secondary"
              >
                Zpět do hry
              </button>
              <span className="sg-entry-count">{sortedLeaderboard.length} výsledků</span>
            </div>
          </div>
          {!supabaseConfigured && (
            <p className="sg-notice">
              {supabaseConfigError
                ? `${supabaseConfigError} Výsledky se ukládají jen v tomto prohlížeči.`
                : 'Supabase není nastavený. Výsledky se ukládají jen v tomto prohlížeči.'}
            </p>
          )}
          {leaderboardError && (
            <div role="alert" className="sg-error">
              <p>Nepodařilo se načíst leaderboard: {leaderboardError}</p>
              <button
                type="button"
                onClick={refreshLeaderboard}
                disabled={isLeaderboardLoading}
                className="sg-button sg-button-secondary"
              >
                Zkusit znovu
              </button>
            </div>
          )}
          {isLeaderboardLoading ? (
            <div className="sg-empty">
              Načítám leaderboard…
            </div>
          ) : sortedLeaderboard.length === 0 && !leaderboardError ? (
            <div className="sg-empty">
              Zatím není žádný výsledek. Zahraj hru a přidej se na leaderboard!
            </div>
          ) : sortedLeaderboard.length > 0 ? (
            <div className="sg-table">
              <div className="sg-table-row sg-table-head">
                <span>#</span>
                <span>Hráč</span>
                <span>Skóre</span>
                <span>Průměr</span>
                <span>Datum</span>
              </div>
              {sortedLeaderboard.map((entry, index) => (
                <div key={entry.id} className={`sg-table-row ${index < 3 ? `sg-rank-${index + 1}` : ''}`}>
                  <span className="sg-rank">{String(index + 1).padStart(2, '0')}</span>
                  <span className="sg-player-name">{entry.name}</span>
                  <span className="sg-score">{entry.score}</span>
                  <span>{entry.avgSeconds.toFixed(2)}s</span>
                  <span className="sg-date">{new Date(entry.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`sg-panel sg-game ${showHeroStartButton ? 'sg-game-intro' : ''}`}>
          {!isFinished ? (
            <>
              {showHeroStartButton && (
                <div className="sg-start-panel">
                  <button
                    type="button"
                    className={`sg-hero-button ${isPlayingPreview ? 'is-playing' : ''}`}
                    onClick={startRoundSequence}
                  >
                    <span className="sg-hero-ring" aria-hidden="true" />
                    <span className="sg-hero-content">
                      <span className="sg-play-icon" aria-hidden="true">▶</span>
                      <span className="sg-play-text">Přehrát ukázku</span>
                    </span>
                  </button>
                </div>
              )}

              {!showHeroStartButton && (
                <div className="sg-stage">
                  {hasStartedGame && (
                    <div className="sg-hero-scoreboard">
                      <div className="sg-score-pill">
                        <span className="sg-label">Skóre</span>
                        <strong>{score.correct} / {maxRounds}</strong>
                      </div>

                      <div className="sg-stage-status">
                        <div className="sg-timer sg-round-timer">
                          <span className="sg-label">Čas</span>
                          <span className="sg-timer-value">{timeLeft}<small>s</small></span>
                        </div>
                      </div>

                      <div className="sg-score-pill">
                        <span className="sg-label">Kolo</span>
                        <strong>{round}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="sg-result-panel">
              <div className="sg-result">
                <p className="sg-eyebrow">Konec hry!</p>
                <h2>Tvoje výsledky</h2>
                <p>Správné odpovědi: <strong>{score.correct} / {maxRounds}</strong></p>
                <p>Průměrná doba uhodnutí správných tipů: <strong>{averageTime ? `${averageTime.toFixed(2)} s` : 'N/A'}</strong></p>
              </div>

              <div className="sg-register">
                <h3>Zapsat se do leaderboardu</h3>
                <form onSubmit={handleLeaderboardSubmit} className="sg-register-form">
                  <label className="sr-only" htmlFor="playerName">Jméno</label>
                  <input
                    id="playerName"
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                    maxLength={40}
                    placeholder="Zadej své jméno"
                    className="sg-input"
                  />
                  <button
                    type="submit"
                    disabled={isRegistered || isSubmitting}
                    className="sg-button sg-button-primary"
                  >
                    {isSubmitting ? 'Ukládám…' : isRegistered ? 'Uloženo' : 'Uložit výsledky'}
                  </button>
                </form>
                {submitMessage && (
                  <p className="sg-submit-message">{submitMessage}</p>
                )}
                <div className="sg-register-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentView('leaderboard')}
                    className="sg-button sg-button-secondary sg-register-link"
                  >
                    Zobrazit leaderboard
                  </button>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="sg-button sg-button-secondary"
                  >
                    Restart hry
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isFinished && shouldShowRoundPanel && (
            <>
              <div className="sg-guess">
                <label htmlFor="guess">
                  Tvůj tip
                </label>
                <div className="sg-input-wrap">
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
                    className="sg-input"
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <ul className="sg-suggestions">
                      {suggestions.map((song) => (
                        <li key={song.id}>
                          <button
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => handleSuggestionClick(song.title)}
                            className="sg-suggestion"
                          >
                            <span>{song.title}</span>
                            <span>{song.album}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="sg-actions">
                <button
                  onClick={handleGuess}
                  disabled={!guess.trim()}
                  className="sg-button sg-button-secondary sg-submit-guess sg-submit-guess-animate"
                >
                  <span aria-hidden="true">✓</span>
                </button>
                <button
                  onClick={startRoundSequence}
                  className="sg-button sg-button-secondary sg-button-highlight"
                >
                  Nové kolo
                </button>
                <button
                  onClick={resetGame}
                  className="sg-button sg-button-secondary"
                >
                  Restart hry
                </button>
              </div>
            </>
          )}

          {feedback && (
            <div
              className={`sg-feedback ${feedback.type === 'success' ? 'is-success' : 'is-error'}`}
            >
              <p className="font-semibold">{feedback.message}</p>
              {feedback.type !== 'success' && (
                <div>
                  <p><span>Album:</span> {currentSong?.album}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <footer className="sg-footer">
        <p>Developed by <a href='https://github.com/Kratomchvil' target="_blank" rel="noopener noreferrer">Daniel Kratochvíl</a> <span aria-hidden="true">·</span> SaulGuesser © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
