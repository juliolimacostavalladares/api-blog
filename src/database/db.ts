import { createConnection } from "typeorm";

createConnection().then(() => console.log('Db connected'))