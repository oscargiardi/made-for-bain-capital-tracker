import { esc } from '../lib/util.js';

export function renderLogin(root, { error, onSignIn }) {
  root.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="modal-head"><h3>Made For — Progress Tracker</h3></div>
        <div class="modal-body">
          <p class="eyebrow" style="color:var(--grey);margin-bottom:8px;">Staff sign in</p>
          <p class="setup-note">Demo login: <strong>mitch@made-for.com.au</strong> / <strong>123456</strong></p>
          ${error ? `<p class="auth-error">${esc(error)}</p>` : ''}
          <div class="fg"><label>Email</label><input id="em" type="email" autocomplete="username" value="mitch@made-for.com.au"></div>
          <div class="fg"><label>Password</label><input id="pw" type="password" autocomplete="current-password" value="123456"></div>
          <button class="btn btn-md btn-blue" id="si">Sign in</button>
        </div>
      </div>
    </div>`;
  root.querySelector('#si').onclick = () =>
    onSignIn({ email: root.querySelector('#em').value.trim(), password: root.querySelector('#pw').value });
  root.querySelector('#pw').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') root.querySelector('#si').click();
  });
}

export function renderHome(root, { projects, onOpen, onNew, onSignOut, onReset, email }) {
  const rows = (projects || [])
    .map(
      (p) => `
      <button class="project-row" data-id="${p.id}">
        <div>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.client_name)}${p.address ? ' — ' + esc(p.address) : ''}</p>
        </div>
        <span class="btn btn-sm btn-blue">Open</span>
      </button>`
    )
    .join('');

  root.innerHTML = `
    <div class="tracker">
      <div class="header">
        <div class="header-inner">
          <div class="header-top">
            <div>
              <p class="eyebrow">Made For. — Site Progress Tracker</p>
              <h1 class="header-title">Projects.</h1>
            </div>
            <div class="header-actions">
              <button class="btn btn-md btn-blue" id="np">New Project</button>
              <button class="btn btn-md btn-ghost dark" id="out">Sign out</button>
            </div>
          </div>
          <div class="header-meta">
            <span class="header-meta-item">${esc(email || '')}</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="home-list">${rows || '<p class="empty">No projects yet. Create one.</p>'}</div>
      </div>
      <div class="footer">
        <span class="footer-left">Demo data is saved in this browser.</span>
        <button class="btn btn-sm btn-dim" id="reset">Reset demo data</button>
      </div>
    </div>
    <div id="modalContainer"></div>`;

  root.querySelector('#np').onclick = onNew;
  root.querySelector('#out').onclick = onSignOut;
  root.querySelector('#reset').onclick = onReset;
  root.querySelectorAll('.project-row').forEach((el) => {
    el.onclick = () => onOpen(el.dataset.id);
  });
}

export function renderNewProjectModal(onSave, onClose) {
  const wrap = document.getElementById('modalContainer');
  wrap.innerHTML = `
    <div class="modal-overlay" id="ov">
      <div class="modal">
        <div class="modal-head"><h3>New Project</h3><button class="modal-close" id="x">×</button></div>
        <div class="modal-body">
          <div class="fg"><label>Project name</label><input id="n" placeholder="e.g. Bain Capital"></div>
          <div class="fg"><label>Client name</label><input id="c" placeholder="e.g. Bain Capital"></div>
          <div class="fg"><label>Address</label><input id="a" placeholder="Suite, building, city"></div>
        </div>
        <div class="modal-foot">
          <button class="btn btn-md btn-ghost" id="cancel">Cancel</button>
          <button class="btn btn-md btn-blue" id="save">Create project</button>
        </div>
      </div>
    </div>`;
  const close = () => {
    wrap.innerHTML = '';
    onClose?.();
  };
  wrap.querySelector('#x').onclick = close;
  wrap.querySelector('#cancel').onclick = close;
  wrap.querySelector('#ov').addEventListener('click', (e) => {
    if (e.target.id === 'ov') close();
  });
  wrap.querySelector('#save').onclick = () => {
    const name = wrap.querySelector('#n').value.trim();
    const client_name = wrap.querySelector('#c').value.trim();
    const address = wrap.querySelector('#a').value.trim();
    if (!name || !client_name) {
      alert('Project name and client name are required.');
      return;
    }
    onSave({ name, client_name, address });
  };
}
