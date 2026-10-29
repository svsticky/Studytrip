FROM nginx:alpine

# Port 3000, same as the previous (React Router) container.
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html favicon.ico /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY data /usr/share/nginx/html/data
COPY assets /usr/share/nginx/html/assets

EXPOSE 3000
