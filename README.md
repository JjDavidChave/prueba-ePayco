```markdown
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Proyecto NestJS - ePayco Virtual Wallet

Este proyecto es una simulación de una billetera virtual para ePayco, que incluye servicios REST y SOAP. La aplicación permite el registro de usuarios, recargas de billetera, pagos con código de confirmación y consulta de saldo.

## Requisitos

- Node.js (versión 14 o superior)
- Docker
- Docker Compose

## Instalación

1. Clona el repositorio:

```bash
Instala las dependencias:
npm install
Levanta los servicios con Docker Compose:
bash
Copiar código
docker-compose up -d
Configuración de la Base de Datos
Accede a pgAdmin (por defecto en http://localhost:5050) y usa las siguientes credenciales de ejemplo:

Correo electrónico: admin@admin.com
Contraseña: admin
Conéctate al servidor PostgreSQL usando las siguientes credenciales (definidas en docker-compose.yml):

Host: db
Port: 5432
Username: postgres
Password: postgres
Crea la base de datos proof_epayco desde pgAdmin.

Migraciones
Para crear y ejecutar migraciones:

Crea una nueva migración:
bash
Copiar código
npm run migration:create src/database/migrations/nombre_tabla
Sube las migraciones a la base de datos:
bash
Copiar código
npm run migration:run
Ejecutar el Proyecto
Para iniciar el proyecto:

bash
Copiar código
npm run start:dev
Pruebas de la API REST y SOAP
Pruebas REST
Puedes utilizar Postman o cualquier otra herramienta similar para probar los endpoints REST. Aquí tienes algunos ejemplos de solicitudes:

ENDPOINTS REST

localhost:3000/api/users_control
localhost:3000/api/wallet
localhost:3000/api/transaction

Registro de usuario:
bash
Copiar código
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "document": "104222222",
  "email": "admin@admin.com",
  "name": "prueba tres",
  "phoneNumber": 321115560
}
Recarga de billetera:
bash
Copiar código
POST http://localhost:3000/api/wallet/recharge
Content-Type: application/json

{
  "id": "someUserId",
  "amount": 1000
}
Pruebas SOAP
Para probar los servicios SOAP, puedes usar SoapUI o Postman. Aquí tienes un ejemplo de solicitud SOAP:

xml
Copiar código
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://localhost:3000/wsdl/UserService">
   <soapenv:Header/>
   <soapenv:Body>
      <web:registerUser>
         <document>104222222</document>
         <email>admin@admin.com</email>
         <name>prueba tres</name>
         <phoneNumber>321115560</phoneNumber>
      </web:registerUser>
   </soapenv:Body>
</soapenv:Envelope>
Para enviar esta solicitud, configura una petición POST en Postman a la URL http://localhost:3000/api/soap/registerUser con el cuerpo en formato XML.