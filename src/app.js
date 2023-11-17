const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const productosRouter = require('./routers/productosRouter');
const swaggerDocs = require('./config/swaggerConfig');

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1', productosRouter);

const port = process.env.PORT || 3020;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
