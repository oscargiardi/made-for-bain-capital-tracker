import { createApi } from './lib/api.js';
import { getSession, onDbChange } from './lib/local-db.js';
import { renderLogin, renderHome, renderNewProjectModal } from './views/chrome.js';
import { renderTracker, setTrackerCtx } from './views/tracker.js';

const root = document.getElementById('app');
const api = createApi();
const state = {
  session: null,
  profile: null,
  projects: [],
  data: null,
  tab: 'team',
  week: 0,
  openDocs: { strategy: true, concept: false, dd: false, documentation: false },
  error: '',
};

let stopWatch;

function parseRoute() {
  const h = location.hash || '#/';
  const m = h.match(/^#\/project\/([0-9a-f-]+)/i);
  if (m) return { name: 'project', id: m[1] };
  if (h === '#/login') return { name: 'login' };
  return { name: 'home' };
}

function go(hash) {
  if (location.hash !== hash) location.hash = hash;
  else boot();
}

async function boot() {
  state.session = getSession();
  const route = parseRoute();

  if (!state.session) {
    renderLogin(root, {
      error: state.error,
      onSignIn: async ({ email, password }) => {
        try {
          state.error = '';
          await api.signIn(email, password);
          go('#/');
        } catch (e) {
          state.error = e.message;
          boot();
        }
      },
    });
    return;
  }

  if (route.name === 'project') {
    await openProject(route.id);
    return;
  }

  state.projects = await api.listProjects();
  renderHome(root, {
    projects: state.projects,
    email: state.session.email,
    onOpen: (id) => go('#/project/' + id),
    onSignOut: async () => {
      await api.signOut();
      go('#/login');
    },
    onReset: () => {
      if (!confirm('Reset all demo data back to Bain Capital only?')) return;
      api.resetDemo();
      boot();
    },
    onNew: () => {
      renderNewProjectModal(async (fields) => {
        const proj = await api.createProject(fields);
        go('#/project/' + proj.id);
      });
    },
  });
}

async function openProject(id) {
  const switched = state.data?.project?.id !== id;
  if (switched) {
    state.tab = 'team';
    state.week = 0;
    state.openDocs = { strategy: true, concept: false, dd: false, documentation: false };
  }
  try {
    state.data = await api.loadProject(id);
  } catch (e) {
    root.innerHTML = `<div class="content"><p class="auth-error">${e.message}</p><button class="btn btn-md btn-ghost" onclick="location.hash='#/'">Back</button></div>`;
    return;
  }
  setTrackerCtx({
    api,
    state,
    goHome: () => go('#/'),
    reload: async () => {
      state.data = await api.loadProject(id);
      renderTracker(root);
    },
    render: () => renderTracker(root),
  });
  renderTracker(root);
}

window.addEventListener('hashchange', boot);
stopWatch = onDbChange(() => {
  const route = parseRoute();
  if (route.name === 'project' && state.data?.project?.id === route.id) openProject(route.id);
  else if (route.name === 'home' && state.session) boot();
});
boot();
