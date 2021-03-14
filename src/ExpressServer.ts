import { Server } from 'http';
import { Application } from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';

export class ExpressServer {
  private app: Application;
  private server: Server;
  private PORT: string = process.env.PORT;
  static sequelize: Sequelize;

  constructor() {
    const express = require('express');
    this.app = express();
    this.server = new Server(this.app);

    ExpressServer.sqlInstance();
    
    // Use helmet middleware
    const helmet = require('helmet');
    this.app.use(helmet());

    // Use body parser middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.get('/', (req, res) => {
      res.status(200);
      res.json({hi: "hi"});
      res.end();
    });
  }

  static async sqlInstance(): Promise<Sequelize> {
    if (this.sequelize == null) {
      // Set the sequelize string
      this.sequelize = new Sequelize(process.env.DATABASE_URL);
     
      // Test connection
      this.sequelize.authenticate().then(() => {
        console.log('Connection established successfully.');
      }).catch(err => {
        console.error('Unable to connect to database: ', err);
      }).finally(() => {
        this.sequelize.close();
      });
    }

    return this.sequelize;
  }

  listen(): void {
    this.server.listen(this.PORT, () => {
      console.log(`Express server running on port ${this.PORT}`);
    });
  }
}
