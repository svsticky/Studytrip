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

## Revealing the destination

The departure board has a row for the outbound flight and one for the flight
home, and shows `?????` for the destination until the reveal moment. The
reveal is configured in `data/trip.json`:

```json
"reveal": {
  "at": "2026-11-20T20:00:00+01:00",
  "destination": null
}
```

- `at`: when the countdown ends. Include the timezone offset (`+01:00` in
  winter, `+02:00` in summer).
- `destination`: **leave this `null` until the reveal.** Everything in a
  static site is public, so anyone who opens `trip.json` would see the
  destination. On reveal day, fill it in and deploy:

  ```json
  "destination": { "city": "City", "code": "AAA" }
  ```

  `code` is the airport code shown on the boarding pass. Visitors who have the
  page open when the countdown hits zero get the reveal automatically, because
  the page re-checks `trip.json` every 30 seconds.

To test the reveal animation locally without touching `trip.json`:

```
http://localhost:8000/?preview=reveal&city=Somewhere&code=AAA
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

### Deploy pre-build image
The `Dockerfile` located at the root of this repository will be build upon push to the main branch.

the build will result in 3 tags:
```
- :latest
- :year-month-day
- :year-month-day-hash
```

The image can be run with the following basic compose file:
```docker-compose
services:
  studytrip:
      container_name:studytrip
      image: ghcr.io/svsticky/studytrip:latest
      ports:
        - 3000:3000 #The container exposes on 3000
```

### Build on-premise

After cloning the the repository. The container can be build by running

```bash
docker build -t studytrip .
```

To run the container you can use:
```bash
docker run -p 3000:3000 studytrip
```

Since the site is just static files, it can also be hosted anywhere that 
serves static files, such as GitHub Pages or any web server.
