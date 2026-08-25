import { DEMO_USERS, getSession, loadDb, saveDb, setSession, uid, resetDemo } from './local-db.js';

function byId(rows, id) {
  return rows.find((r) => r.id === id);
}

export function createApi() {
  return {
    async profile() {
      const session = getSession();
      if (!session) return null;
      const user = DEMO_USERS.find((u) => u.id === session.id) || session;
      return { user, profile: { id: user.id, role: user.role || 'staff', display_name: user.display_name } };
    },

    async signIn(email, password) {
      const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) throw new Error('Unknown email or password. Use mitch@made-for.com.au / 123456');
      setSession(user);
      return { user };
    },

    async signOut() {
      setSession(null);
    },

    async listProjects() {
      return loadDb()
        .projects.slice()
        .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
    },

    async createProject({ name, client_name, address }) {
      const db = loadDb();
      const project = {
        id: uid(),
        name,
        client_name,
        address: address || '',
        created_at: new Date().toISOString(),
      };
      db.projects.push(project);
      saveDb(db);
      return project;
    },

    async loadProject(id) {
      const db = loadDb();
      const project = byId(db.projects, id);
      if (!project) throw new Error('Project not found.');
      const weeks = db.weeks
        .filter((w) => w.project_id === id)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((w) => ({
          ...w,
          outstanding_items: db.outstanding_items
            .filter((o) => o.week_id === w.id)
            .sort((a, b) => a.sort_order - b.sort_order),
        }));
      return {
        project,
        team: db.team_members.filter((r) => r.project_id === id).sort((a, b) => a.sort_order - b.sort_order),
        weeks,
        phases: db.programme_phases.filter((r) => r.project_id === id).sort((a, b) => a.sort_order - b.sort_order),
        milestones: db.programme_milestones.filter((r) => r.project_id === id).sort((a, b) => a.sort_order - b.sort_order),
        budgetLines: db.budget_lines.filter((r) => r.project_id === id).sort((a, b) => a.sort_order - b.sort_order),
        variations: db.variations.filter((r) => r.project_id === id),
        documents: db.documents.filter((r) => r.project_id === id),
        tender: db.tender_parties.filter((r) => r.project_id === id),
        rec: db.tender_recommendations.find((r) => r.project_id === id) || null,
      };
    },

    async insert(table, row) {
      const db = loadDb();
      const rec = { id: uid(), ...row };
      db[table].push(rec);
      saveDb(db);
      return rec;
    },

    async update(table, id, patch) {
      const db = loadDb();
      const rec = byId(db[table], id);
      if (!rec) throw new Error('Not found');
      Object.assign(rec, patch);
      saveDb(db);
      return rec;
    },

    async remove(table, id) {
      const db = loadDb();
      db[table] = db[table].filter((r) => r.id !== id);
      if (table === 'weeks') db.outstanding_items = db.outstanding_items.filter((o) => o.week_id !== id);
      saveDb(db);
    },

    async upsertRec(projectId, row) {
      const db = loadDb();
      const i = db.tender_recommendations.findIndex((r) => r.project_id === projectId);
      const rec = { project_id: projectId, ...row };
      if (i >= 0) db.tender_recommendations[i] = rec;
      else db.tender_recommendations.push(rec);
      saveDb(db);
      return rec;
    },

    async clearRec(projectId) {
      const db = loadDb();
      db.tender_recommendations = db.tender_recommendations.filter((r) => r.project_id !== projectId);
      saveDb(db);
    },

    resetDemo,
  };
}
