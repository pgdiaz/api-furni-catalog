const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const productosRouter = require('./routers/productosRouter');
const authRouter = require('./routers/authRouter');
const swaggerDocs = require('./config/swaggerConfig');
const config = require('./config/appConfig.json');

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', authRouter, productosRouter);

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
