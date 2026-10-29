# Studytrip

The website for the STICKY study trip: a save-the-date page for the 2027 trip
(17–26 April 2027) with a destination reveal, plus a recap of the 2026 trip to
Tokyo.

It's a fully static site: plain HTML, CSS and JavaScript, with no build step
and no dependencies.

## Structure

```
index.html          All page content and sections
css/style.css       Styling (paper-collage theme, based on the save-the-date poster)
js/main.js          Departure board, countdown, destination reveal, confetti
data/trip.json      Trip dates and destination reveal settings
assets/             Logos and images
assets/recap/       Photos of the 2026 trip
Dockerfile          nginx container for deployment
nginx.conf          nginx config (port 3000, no caching for trip.json)
```

## Running locally

The page loads `data/trip.json` with `fetch`, so opening `index.html`
directly from disk won't work. Serve the folder instead:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Revealing the destinations

This trip has two destinations: we fly from Amsterdam to the first city,
travel overland to the second city, and fly home from there. The departure
board has a row for each leg and shows `?????` for both cities until the
reveal moment. The reveal is configured in `data/trip.json`:

```json
"reveal": {
  "at": "2026-11-20T20:00:00+01:00",
  "destinations": null
}
```

- `at`: when the countdown ends. Include the timezone offset (`+01:00` in
  winter, `+02:00` in summer).
- `destinations`: **leave this `null` until the reveal.** Everything in a
  static site is public, so anyone who opens `trip.json` would see the
  destinations. On reveal day, fill it in and deploy:

  ```json
  "destinations": {
    "first": { "city": "First city", "code": "AAA" },
    "second": { "city": "Second city", "code": "BBB" },
    "transfer": "train"
  }
  ```

  `code` is the airport or station code shown on the boarding pass, and
  `transfer` is how we travel between the two cities (for example `train` or
  `bus`). Visitors who have the page open when the countdown hits zero get the
  reveal automatically, because the page re-checks `trip.json` every 30
  seconds.

To test the reveal animation locally without touching `trip.json`:

```
http://localhost:8000/?preview=reveal&city1=First&code1=AAA&city2=Second&code2=BBB&transfer=train
```

## Editing content

- **Agenda** (Hypeborrel, Contractborrel, etc.): the `agenda` list in
  `index.html`.
- **Recap photos**: the `polaroids` block in `index.html`. Put new photos in
  `assets/recap/`.

> **Strip photo metadata before adding photos.** Photos straight from a
> phone usually contain GPS coordinates. For example, with Pillow:
>
> ```bash
> python3 -c "from PIL import Image, ImageOps; import sys; ImageOps.exif_transpose(Image.open(sys.argv[1])).convert('RGB').save(sys.argv[2], quality=85)" in.jpeg assets/recap/out.jpg
> ```

## Deployment

The Dockerfile serves the site with nginx on port 3000:

```bash
docker build -t studytrip .
docker run -p 3000:3000 studytrip
```

Since the site is just static files, it can also be hosted anywhere that
serves static files, such as GitHub Pages or any web server.
