import { ExpressServer } from './ExpressServer'
import dotenv from 'dotenv';

dotenv.config();

const server: ExpressServer = new ExpressServer();
server.listen();