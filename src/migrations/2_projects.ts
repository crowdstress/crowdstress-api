/* eslint-disable sort-keys */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export const up = async (pgm: MigrationBuilder): Promise<void> => {
  pgm.createTable('projects', {
    id: 'id',
    name: {
      notNull: true,
      type: 'varchar(100)',
    },
    owner: {
      notNull: true,
      type: 'integer',
      references: '"users"',
    },
    updatedAt: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    data: {
      notNull: true,
      type: 'jsonb',
    },
  });
};
