# Purcel Overflow — note pentru Claude

Joc tower-defense în browser: porci roz invadează biroul unui programator. Proiectul lui Cosmin, făcut împreună cu Claude.
Live: https://cosminflrn.github.io/purcel-overflow/ (GitHub Pages, din `main`).

## Cum lucrăm
- Cosmin scrie în română; răspunde în română, scurt. Vrea „rapid și eficient” și sugestii proactive.
- E foarte atent la design: fără texte tăiate, suprapuneri, elemente care ies din chenar. Verifică totul cu capturi înainte de push.
- La fiecare versiune: crește `VERSION` în `index.html`, adaugă un rând în tabelul din `README.md`, refă capturile dacă s-a schimbat ceva vizibil (`node tools/capturi-readme.js`), commit, push pe `main` și pe ramura `versiune-vX.Y` (ramuri, nu tag-uri).
- Autor la commit: Cosmin Florian; commit-urile se termină cu linia de co-autor Claude.

## Structură
- Tot jocul e în `index.html`: HTML + JavaScript simplu, canvas 2D, sunete și muzică sintetizate cu Web Audio. Fără librării.
- `manifest.webmanifest`, `icon-180.png`, `icon-512.png`: PWA (pe iPhone: Adaugă pe ecranul principal).
- `screenshots/`: capturile din README.
- `tools/`: scripturi de test cu Playwright (rulează cu `node tools/<script>.js`):
  - `balans.js`: simulează fiecare nivel cu bot „deștept” și „naiv” (cine câștigă, cât bullshit rămâne).
  - `capcane.js`: puterea fiecărei capcane folosite singure + daune pe leu investit.
  - `parcurgere.js`: joacă toate cele 6 nivele cap-coadă în browser și prinde erori.
  - `fuzz.js`: mii de click-uri la întâmplare pe desktop, telefon și tabletă.
  - `capturi-readme.js`: refă capturile din `screenshots/`.

## Repere în cod (`index.html`)
- `LEVELS` (hărți, bani de start, trasee), `TOWERS` (capcane: cost, rază, daune, descrieri, upgrade-uri), `PIGS` (tipuri de porci).
- `GOOD` / `BAD`: comenzile lui Claude (aprobă / refuză). Se trag dintr-un sac amestecat salvat în `localStorage` (`po_bag6_*`), deci nu se repetă până nu le vezi pe toate.
- `newGame`, `updateGame`, `startWave`, `damage`, `spawnPig`: logica jocului. `simulate()` + `botBuild()` pentru teste.
- `drawWorld`, `drawPanel`, `drawHUD`, `drawPig`, `drawTower`, `drawProgrammer`: desenare. `button()` pentru toate butoanele.
- `window.__po`: API de depanare folosit de scripturile din `tools/`.
- Se salvează între sesiuni doar: hărțile deblocate, volumul și sacii de prompturi. Fiecare nivel reluat pornește ca la prima joacă.
