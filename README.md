# API de catálogo de productos

Esta es una API con arquitectura REST que permite gestionar un catalago de productos.

## Tecnologías Principales

- Entorno: Node.js
- Framework: Express.js
- Base de datos: MySQL
- Documentación: Swagger (OpenAPI 3)

## Pasos para correr la aplicación en un entorno local

1. Clona el repositorio desde [GitHub](https://github.com/pgdiaz/api-furni-catalog).
2. Asegúrate de tener Node.js instalado en tu sistema.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura la conexión a tu base de datos en [/src/config/dbConfig.js](/src/config/dbConfig.js).
5. Ejecuta `npm start` para iniciar la aplicación.
6. La documentación de la API estará disponible en [http://localhost:3020/api-docs](http://localhost:3020/api-docs).

## Scripts de la base de datos

Cuando iniciar la aplicación `npm start`, el modulo [/src/config/dbConfig.js](/src/config/dbConfig.js) genera la base de datos y la tabla de productos. Si deseas cargar la tabla con datos de prueba, ejecuta el script [/scripts/insertProductos.sql](/scripts/insertProductos.sql).

## Clientes

Este proyecto incorpora Swagger[https://swagger.io/], facilitando la prueba de la aplicación ya que disponibiliza un cliente en [http://localhost:3020/api-docs](http://localhost:3020/api-docs).

Tambien puedes probar la API utilizando una herramienta como [Postman](https://www.postman.com/), importando el contrato de la aplicación desde [/contract/api-furni-catalog.yaml](/contract/api-furni-catalog.yaml)

## Licencia

Este proyecto se encuentra bajo la Licencia MIT.
