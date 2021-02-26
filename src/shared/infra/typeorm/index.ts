import {
  Connection,
  createConnection as createTypeormConnection,
  getConnectionOptions,
} from 'typeorm';

const createConnection = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();

  return createTypeormConnection(
    Object.assign(connectionOptions, {
      name:
        process.env.NODE_ENV === 'test'
          ? 'database_test.sqlite'
          : connectionOptions.database,
    }),
  );
};

export default createConnection();
