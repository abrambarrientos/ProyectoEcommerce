import { hasPrimaryKey } from '@astrojs/db/runtime';
import { defineToolbarApp } from 'astro/toolbar';
import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config


export default defineDb({
  tables: {}
});
