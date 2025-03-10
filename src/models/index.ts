// src/models/index.ts
import { Sequelize } from 'sequelize-typescript';
import UrlMapping from './UrlMapping';
import dotenv from 'dotenv';
import * as pg from 'pg';
dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'url_shortener',
  dialectModule: pg,
  models: [
    UrlMapping
  ],
});

export {
  UrlMapping
}