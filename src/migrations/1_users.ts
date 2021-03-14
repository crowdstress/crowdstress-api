/* eslint-disable sort-keys */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createTable('users', {
    id: 'id',
    email: {
      notNull: true,
      type: 'varchar(100)',
    },
    hash: {
      notNull: true,
      type: 'varchar(100)',
    },
    salt: {
      notNull: true,
      type: 'varchar(100)',
    },
    pro: {
      default: false,
      notNull: true,
      type: 'boolean',
    },
  });
};
