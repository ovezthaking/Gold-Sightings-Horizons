# Gold Sightings Horizons

Monorepo with three small Node.js projects:
- Gold Digger (live gold price demo + purchase log)
- From The Other Side (ghost sightings board + live news)
- Wild Horizons API (travel destinations dataset API)

Each app is standalone and runs its own HTTP server.

## Prerequisites
- Node.js 18+ (ESM is used)
- npm

## Project structure
- Gold Digger/
- From The Other Side/
- Wild Horizons API/

## How to run
Each app uses port 8000 by default. Run only one at a time, or change `PORT` in its `server.js`.

### Gold Digger
```bash
cd "Gold Digger"
npm install
npm run dev
```
Open http://localhost:8000 in your browser.

### From The Other Side
```bash
cd "From The Other Side"
npm install
npm run dev
```
Open http://localhost:8000 in your browser.

### Wild Horizons API
```bash
cd "Wild Horizons API"
npm install
npm start
```
API available at http://localhost:8000.

## Gold Digger details
A simple gold purchase simulator with a live price stream.

### Features
- Server-Sent Events price feed
- Purchase form that logs orders to a text file
- GET endpoint to list previous purchases

### API
- `GET /api` returns parsed purchases from `data/purchases.txt`
- `POST /api` creates a new purchase (expects JSON with `amount` and `currentPrice`)
- `GET /api/price` SSE stream of live price updates

Example request:
```bash
curl -X POST http://localhost:8000/api \
  -H "Content-Type: application/json" \
  -d '{"amount":"100","currentPrice":"3694"}'
```

## From The Other Side details
A ghost sightings board with a live news stream.

### Features
- REST endpoints for sightings
- SSE news ticker
- Input sanitization on POST

### API
- `GET /api` returns all sightings from `data/data.json`
- `POST /api` creates a new sighting (JSON)
- `GET /api/news` SSE stream of random stories

Example request:
```bash
curl -X POST http://localhost:8000/api \
  -H "Content-Type: application/json" \
  -d '{"title":"Shadows in the hall","location":"Old Manor","description":"Whispers at midnight"}'
```

## Wild Horizons API details
A read-only API for unusual destinations.

### Features
- Filter by query parameters
- Filter by path parameters (continent or country)

### API
- `GET /api` list all destinations, supports query params (e.g. `continent=Europe`)
- `GET /api/continent/:name` list by continent
- `GET /api/country/:name` list by country

Example requests:
```bash
curl "http://localhost:8000/api?continent=Europe"

curl "http://localhost:8000/api/continent/Asia"

curl "http://localhost:8000/api/country/USA"
```

## Notes
- All servers listen on port 8000 by default.
- Data files are stored inside each project folder under `data/`.
