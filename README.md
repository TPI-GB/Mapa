# Instalación:

El proyecto está compuesto de tres partes principales, cada una con su propio directorio y proyecto npm. Luego de clonar el repositorio debería hacerse un `npm install` en cada directorio.

mapa-frontend-user: Contiene el front-end principal, es decir, el entorno gráfico que está destinado al usuario final. Es un proyecto create-react-app. Iniciarlo con `cd mapa-frontend-user` y `npm start`.

mapa-frontend-admin: Contiene el front-end destinado a administrador/es y/o moderador/es, desde aqui se va a editar la app. Es un proyecto create-react-app. Iniciarlo con `cd mapa-frontend-admin` y `npm start`.

mapa-backend: Contiene el back-end. Es un proyecto que usa express y la base de datos MongoDB a traves de mongoose. Iniciarlo con `cd mapa-backend` y `npm run dev`.

Si no existe la base de datos, se crea una automáticamente. (Es necesario tener instalado y corriendo en nuestra máquina mongoDB)

## Creacion de usuario Administrador inicial:

1. Dirigirse a mapa-backend\controllers\user_controller.js
2. Eliminar temporalmente "auth, " de la linea:
   > this.router.post("/", auth, (req, res) => this.registerUser(req, res));
3. Desde la aplicación `Postman` abrir un "**New Tab**", elegir el método **POST** y en "Enter request URL" escribir: http://localhost:8080/users
4. En "**Body**" seleccionar "**raw**" y hacer click en "**TEXT**", bajar y elegir "**JSON(application/json)**"
5. Abajo, escribir el siguiente documento JSON con estos campos:

```javascript
{
	"first_name": "tu nombre" ,
	"last_name": "tu apellido" ,
	"nick": "un nick" ,
	"rol": "Administrador" ,
	"password": "tu contraseña" ,
	"email": "tu email"
}
```

6. Luego hacer click en **SEND** para enviar la petición.
7. Con esto ya podremos ingresar a la aplicación desde el frontend del administrador, usando el email y la contraseña antes escrita en Postman.
8. Por último, no olvidar agregar el "auth, " para dejar como estaba originalmente la linea:
   > this.router.post("/", auth, (req, res) => this.registerUser(req, res));

# Mail de recupero de contraseña

Usuario: mapaturismogb@gmail.com

Contraseña: TurismoGB2311

# Integrantes:

- Franco Mostafa
- Enzo Fica
- Juan Salvucci
- Facundo Calle
