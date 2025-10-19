import { column, defineDb, defineTable } from "astro:db";

const ProjectDetailsCache = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    data: column.json(),
    ts: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    ProjectDetailsCache,
  },
});
