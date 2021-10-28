## Instalación

El proyecto está compuesto de dos partes principales, cada una con su propio directorio y proyecto npm. Luego de clonar el repositorio debería hacerse un `npm install` en cada directorio.

mapa-frontend: contiene el front-end. Es un proyecto create-react-app. Iniciarlo con `cd mapa-frontend` y `npm start`.

mapa-backend: contiene el back-end. Es un proyecto que usa express y la base de datos MongoDB a traves de mongoose. Iniciarlo con `cd mapa-backend` y `npm run server`.

Si no existe el archivo .env crearlo dentro de la carpeta backend.
APP_PORT=8080
APP_HOST=http://localhost

APP_DIR_STORAGE=

DB_NAME=mapadb
DB_PORT=27017
DB_HOST=localhost
TOKEN_KEY=4c159624-6b4d-4d8c-aa0b-09de1027fe55

Si no existe una base de datos, se crea una automáticamente.

## Integrantes

- Franco Mostafa
- Enzo Fica
- Juan Salvucci
- Facundo Calle
