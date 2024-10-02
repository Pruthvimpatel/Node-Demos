import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import db from './sequelize-client';
const PORT = process.env.PORT

const startServer = async () => {
try {
    await db.sequelize.sync();
    console.log('Database Connection Succeed');

    app.listen(PORT, () => {
        console.log(`Server Listening on port ${PORT}`);
    });
} catch(error) {
    console.log("Unable to start the server:",error)
}
};

startServer();