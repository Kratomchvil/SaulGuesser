# SaulGuesser

SaulGuesser je jednoduchá webová hra pro fanoušky Saula. Hráč poslouchá krátkou ukázku skladby a snaží se uhodnout její název. Hra je navržená jako rychlá a zábavná výzva pro poznávání skladeb z různých alb.

## Co hra nabízí

- krátké audio ukázky skladeb
- jednoduché ovládání s tlačítkem pro přehrání a tipováním
- časový limit na každé kolo
- skóre a počet kol
- návrat do nové hry po dokončení všech kol

## Jak hrát

1. Spusť aplikaci v prohlížeči.
2. Klikni na tlačítko „Přehrát ukázku“.
3. Zkus uhádnout název skladby do vstupu.
4. Odešli tip a získej bod, pokud je správný.
5. Pokračuj dál až do konce hry.

## Technologie

- React
- Vite
- Tailwind CSS
- Supabase

## Nastavení Supabase leaderboardu

1. Vytvoř projekt v [Supabase](https://supabase.com/).
2. V Supabase otevři **SQL Editor**, vlož obsah souboru [`supabase/leaderboard.sql`](./supabase/leaderboard.sql) a spusť ho. Vytvoří tabulku `leaderboard_entries` a veřejné RLS politiky pro čtení a odesílání výsledků.
3. Zkopíruj `.env.example` do `.env.local` a doplň hodnoty **Project URL** a **anon/public key** z nastavení projektu:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Restartuj vývojový server (`npm run dev`). Bez těchto proměnných aplikace zůstává použitelná, ale výsledky ukládá jen do místního prohlížeče.

Při nasazení nastav stejné `VITE_` proměnné v prostředí, ve kterém se vytváří produkční build, a build znovu spusť. Veřejný anon klíč je určený pro klientskou aplikaci; nikdy sem nevkládej Supabase `service_role` klíč. RLS omezuje rozsah zapisovaných dat a zakazuje klientské úpravy i mazání výsledků.
