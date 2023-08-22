# Login + Register + Change Password en NextJs 13
Link al video [Aca!](https://www.youtube.com/watch?v=-vZIzDHkR-g&feature=youtu.be&ab_channel=Mauro)

## Preparando el proyecto

Para instalar todas las dependencias hacemos:

`npm install`

Y para levantar el proyecto hacer `npm run dev` y en [http://localhost:3000](http://localhost:3000) tendrias que ver tu proyecto correctamente.

## Endpoints disponibles
Endpoint para iniciar sesión con tu cuenta
`/api/auth/login`

#### Body:
```
{
  email: 'mauro123@gmail.com,
  password: '123'
}
```
<hr />

Endpoint para crear una nueva cuenta
`/api/auth/register`
#### Body:
```
{
  email: 'mauro1234@gmail.com,
  password: '1234',
  confirmPassword: '1234'
}
```

<hr />

Endpoint para enviar el correo para cambiar la password
`/api/auth/forget-password`
#### Body:
```
{
  email: 'mauro1234@gmail.com,
}
```
<hr />

Endpoint para cambiar la contraseña
`/api/auth/change-password?token=12345`
#### Body:
```
{
  newPassword: '1234',
  confirmPassword: '1234',
}
```


