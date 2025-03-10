import { sequelize } from '../models';
import { Umzug, SequelizeStorage } from 'umzug';

export class CustomSequelizeStorage extends SequelizeStorage {

  async logMigration({ name }: { name: string }) {
    const newName = name.replace(/\.[jt]s$/, ''); // remove .js or .ts extension
    return super.logMigration({ name: newName });
  }

  async unlogMigration({ name }: { name: string }) {
    const newName = name.replace(/\.[jt]s$/, ''); // remove .js or .ts extension
    return super.unlogMigration({ name: newName });
  }

  async executed() {
    const executedMigrations = await super.executed();
    return executedMigrations.flatMap(name => [
      `${name}.ts`,
      `${name}.js`,
    ]);
  }
}

export function migrateDb() {
  console.log(` Running Migrations ${__dirname}/../migrations/*.{js,ts}`);
  const migration = new Umzug({
    migrations: { glob: `${__dirname}/../migrations/*.{js,ts}` },
    context: sequelize.getQueryInterface(),
    storage: new CustomSequelizeStorage({ sequelize }),
    logger: undefined,
  });
  return migration.up();
}

export async function seedDb () {
  //console.log(`Running Seeders ${__dirname}/../../seeders/*.{js,ts}`);
  const seed = new Umzug({
    migrations: { glob: `${__dirname}/../../seeders/*.{js,ts}` },
    context: sequelize.getQueryInterface(),
    storage: new CustomSequelizeStorage({ sequelize }),
    logger: undefined,
  });
  return seed.up();
}

export async function prepareTestingDb() {
  await destroyDb();
  await migrateDb();
  await seedDb();
}

async function destroyDb() {
  // Destroy the database
  try {
    await sequelize.drop({ cascade: true});
    await sequelize.query('DROP TABLE IF EXISTS "SequelizeMeta";');
  } catch (e) {
    console.log(e);
  }
}
