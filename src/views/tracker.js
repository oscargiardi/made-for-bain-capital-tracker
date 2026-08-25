import { esc, lines, cur, DOC_SECS } from '../lib/util.js';

let C;

export function setTrackerCtx(ctx) {
  C = ctx;
  window.MF = {
    tab: (t) => {
      C.state.tab = t;
      C.render();
    },
    panel: (open) => {
      document.getElementById('sidePanel')?.classList.toggle('open', open);
      document.getElementById('panelBg')?.classList.toggle('open', open);
    },
    home: () => C.goHome(),
    sw: (i) => {
      C.state.week = i;
      C.render();
    },
    toggleIF: (id) => document.getElementById(id)?.classList.toggle('open'),
    ts: (k) => {
      C.state.openDocs[k] = !C.state.openDocs[k];
      C.render();
    },
    addMember: addMember,
    rmMember: (id) => mutate(() => C.api.remove('team_members', id)),
    addWeek: addWeek,
    tick: (id, done) => mutate(() => C.api.update('outstanding_items', id, { done })),
    addPhase: addPhase,
    rmPhase: (id) => mutate(() => C.api.remove('programme_phases', id)),
    addMilestone: addMilestone,
    rmMilestone: (id) => mutate(() => C.api.remove('programme_milestones', id)),
    addLine: addLine,
    rmLine: (id) => mutate(() => C.api.remove('budget_lines', id)),
    addVar: addVar,
    approveVar: approveVar,
    rmVar: (id) => mutate(() => C.api.remove('variations', id)),
    addDoc: addDoc,
    rmDoc: (id) => mutate(() => C.api.remove('documents', id)),
    addLong: addLong,
    rmParty: (id) => mutate(() => C.api.remove('tender_parties', id)),
    toShort: toShort,
    addRes: addRes,
    setRec: setRec,
    clrRec: () => mutate(() => C.api.clearRec(C.state.data.project.id)),
  };
}

async function mutate(fn) {
  try {
    await fn();
    await C.reload();
  } catch (e) {
    alert(e.message || String(e));
  }
}

function val(id) {
  return document.getElementById(id)?.value?.trim() || '';
}

function addMember() {
  const name = val('tm_n');
  if (!name) return alert('Enter a name.');
  return mutate(() =>
    C.api.insert('team_members', {
      project_id: C.state.data.project.id,
      name,
      role: val('tm_r'),
      phone: val('tm_p'),
      email: val('tm_e'),
      responsibilities: val('tm_s'),
      sort_order: C.state.data.team.length,
    })
  );
}

function addWeek() {
  const date_label = val('wDate');
  if (!date_label) return alert('Enter a week ending date.');
  const this_week = val('wThis');
  const next_week = val('wNext');
  const out = lines(val('wOut'));
  const programme_note = val('wProg');
  return mutate(async () => {
    const w = await C.api.insert('weeks', {
      project_id: C.state.data.project.id,
      date_label,
      this_week,
      next_week,
      programme_note,
      sort_order: C.state.data.weeks.length,
    });
    for (let i = 0; i < out.length; i++) {
      await C.api.insert('outstanding_items', { week_id: w.id, text: out[i], done: false, sort_order: i });
    }
    C.state.week = C.state.data.weeks.length;
    document.getElementById('modalContainer').innerHTML = '';
  });
}

function addPhase() {
  const label = val('ph_l');
  if (!label) return alert('Enter a phase name.');
  return mutate(() =>
    C.api.insert('programme_phases', {
      project_id: C.state.data.project.id,
      label,
      start_date: val('ph_s') || null,
      end_date: val('ph_e') || null,
      sort_order: C.state.data.phases.length,
    })
  );
}

function addMilestone() {
  const label = val('ms_l');
  if (!label) return alert('Enter a milestone.');
  return mutate(() =>
    C.api.insert('programme_milestones', {
      project_id: C.state.data.project.id,
      label,
      date: val('ms_d') || null,
      sort_order: C.state.data.milestones.length,
    })
  );
}

function addLine(cat) {
  const label = val('bl_' + cat);
  const amount = parseFloat(val('ba_' + cat)) || 0;
  if (!label) return alert('Enter a line description.');
  return mutate(() =>
    C.api.insert('budget_lines', {
      project_id: C.state.data.project.id,
      category: cat,
      label,
      amount,
      sort_order: C.state.data.budgetLines.filter((l) => l.category === cat).length,
    })
  );
}

function addVar(k) {
  const desc = val('vd_' + k);
  const amount = parseFloat(val('va_' + k)) || 0;
  if (!desc || !amount) return alert('Enter a description and amount.');
  return mutate(() =>
    C.api.insert('variations', { project_id: C.state.data.project.id, kind: k, description: desc, amount, status: 'pending' })
  );
}

function approveVar(id) {
  const today = new Date();
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const approved_date = today.getDate() + ' ' + M[today.getMonth()] + ' ' + today.getFullYear();
  return mutate(() => C.api.update('variations', id, { status: 'approved', approved_date }));
}

function addDoc(stage) {
  const name = val('dn_' + stage);
  if (!name) return alert('Enter a document name.');
  return mutate(() =>
    C.api.insert('documents', {
      project_id: C.state.data.project.id,
      stage,
      name,
      date: val('dd_' + stage) || '—',
      url: val('du_' + stage),
      status: val('ds_' + stage),
      notes: val('dno_' + stage),
    })
  );
}

function addLong() {
  const name = val('ll_n');
  if (!name) return alert('Enter a contractor name.');
  return mutate(() =>
    C.api.insert('tender_parties', {
      project_id: C.state.data.project.id,
      list: 'longlist',
      name,
      notes: val('ll_no'),
    })
  );
}

function toShort(id) {
  return mutate(() => C.api.update('tender_parties', id, { list: 'shortlist' }));
}

function addRes() {
  const name = val('tr_n');
  if (!name) return alert('Enter a contractor name.');
  return mutate(() =>
    C.api.insert('tender_parties', {
      project_id: C.state.data.project.id,
      list: 'responses',
      name,
      amount: parseFloat(val('tr_a')) || 0,
      date: val('tr_d') || '—',
      url: val('tr_u'),
      notes: val('tr_no'),
    })
  );
}

function setRec() {
  const name = val('rec_n');
  if (!name) return alert('Enter a contractor name.');
  return mutate(() =>
    C.api.upsertRec(C.state.data.project.id, { name, amount: parseFloat(val('rec_a')) || 0, notes: val('rec_no') })
  );
}

export function openAddWeekModal() {
  window.MF.panel(false);
  document.getElementById('modalContainer').innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this)this.innerHTML=''">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-head"><h3>Add Week</h3><button class="modal-close" onclick="document.getElementById('modalContainer').innerHTML=''">×</button></div>
        <div class="modal-body">
          <div class="fg"><label>Week Ending Date</label><input id="wDate" placeholder="e.g. 4 Jul 2025"></div>
          <div class="fg"><label>This Week (One Item Per Line)</label><textarea id="wThis"></textarea></div>
          <div class="fg"><label>Next Week (One Item Per Line)</label><textarea id="wNext"></textarea></div>
          <div class="fg"><label>Outstanding Items (One Per Line)</label><textarea id="wOut"></textarea></div>
          <div class="fg"><label>Programme Note</label><textarea id="wProg"></textarea></div>
        </div>
        <div class="modal-foot">
          <button class="btn btn-md btn-ghost" onclick="document.getElementById('modalContainer').innerHTML=''">Cancel</button>
          <button class="btn btn-md btn-blue" onclick="MF.addWeek()">Save week</button>
        </div>
      </div>
    </div>`;
}

export function renderTracker(root) {
  const { project } = C.state.data;
  const tab = C.state.tab;
  const name = project.name || 'Project';
  const parts = name.split(/(,)/);
  const title =
    parts.length > 1
      ? `${esc(parts[0])}<span class="accent">${esc(parts.slice(1).join(''))}</span>`
      : `${esc(name)}<span class="accent">.</span>`;

  root.innerHTML = `
    <div class="tracker">
      <div class="panel" id="sidePanel">
        <div class="panel-label">Project Menu</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('team')">Made For Team</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('progress')">Progress</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('programme')">Programme</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('budget')">Budget</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('documents')">Key Documents</div>
        <div class="panel-item" onclick="MF.panel(false);MF.tab('tender')">Tender</div>
        <hr class="panel-hr">
        <div class="panel-item" onclick="openAddWeek()">+ Add Week</div>
        <div class="panel-item" onclick="MF.home()">All projects</div>
      </div>
      <div class="panel-bg" id="panelBg" onclick="MF.panel(false)"></div>
      <div class="header">
        <div class="header-inner">
          <div class="header-top">
            <div>
              <p class="eyebrow">Made For. — Site Progress Tracker</p>
              <h1 class="header-title">${title}</h1>
            </div>
            <div class="header-actions">
              <button class="btn btn-md btn-ghost dark" onclick="MF.home()">Projects</button>
              <button class="hamburger" onclick="MF.panel(true)"><span></span><span></span><span></span></button>
            </div>
          </div>
          <div class="header-meta">
            ${project.client_name ? `<span class="header-meta-item">${esc(project.client_name)}</span>` : ''}
            ${project.address ? `<span class="header-meta-item">${esc(project.address)}</span>` : ''}
          </div>
        </div>
        <div class="tabs">
          ${['team', 'progress', 'programme', 'budget', 'documents', 'tender']
            .map((t) => {
              const labels = {
                team: 'Made For Team',
                progress: 'Progress',
                programme: 'Programme',
                budget: 'Budget',
                documents: 'Key Documents',
                tender: 'Tender',
              };
              return `<button class="tab${tab === t ? ' active' : ''}" onclick="MF.tab('${t}')">${labels[t]}</button>`;
            })
            .join('')}
        </div>
      </div>
      <div class="content" id="mainContent"></div>
      <div class="footer">
        <span class="footer-left">Made For.</span>
        <span class="footer-right">Site Progress Tracker.</span>
      </div>
    </div>
    <div id="modalContainer"></div>`;

  window.openAddWeek = openAddWeekModal;
  const main = root.querySelector('#mainContent');
  if (tab === 'team') rTeam(main);
  else if (tab === 'progress') rProgress(main);
  else if (tab === 'programme') rProgramme(main);
  else if (tab === 'budget') rBudget(main);
  else if (tab === 'tender') rTender(main);
  else rDocuments(main);
}

function rTeam(el) {
  const members = C.state.data.team;
  let h = `<div class="team-grid">`;
  members.forEach((m) => {
    h += `<div style="background:var(--offwhite);border:1px solid var(--grey);border-radius:4px;overflow:hidden;display:flex;flex-direction:column;">
      <div style="padding:18px 18px 0;">
        <p style="font-size:16px;font-weight:900;line-height:1.15;margin-bottom:5px;">${esc(m.name)}</p>
        <p style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--blue);margin-bottom:14px;">${esc(m.role)}</p>
      </div>
      <div style="padding:0 18px;flex:1;"><div style="border-top:1px solid rgba(163,172,165,0.35);padding-top:12px;">`;
    lines(m.responsibilities).forEach((r) => {
      h += `<p style="font-size:12px;line-height:1.6;padding:4px 0;border-bottom:1px solid rgba(163,172,165,0.15);display:flex;gap:8px;"><span style="font-weight:700;">—</span>${esc(r)}</p>`;
    });
    h += `</div></div>`;
    h += `<div style="border-top:1px solid rgba(163,172,165,0.35);margin:14px 18px 0;padding:12px 0 18px;">`;
    if (m.phone) h += `<p style="font-size:12px;font-weight:500;">${esc(m.phone)}</p>`;
    if (m.email) h += `<p style="font-size:12px;color:var(--blue);">${esc(m.email)}</p>`;
    h += `<button class="btn btn-sm btn-dim" style="margin-top:8px;" onclick="MF.rmMember('${m.id}')">Remove</button></div></div>`;
  });
  h += `</div>
    <div class="block" style="margin-top:16px;">
      <div class="block-head"><span class="block-label">Add team member</span></div>
      <div class="block-body">
        <div class="form-row">
          <div class="fg" style="margin-bottom:0;"><label>Name</label><input id="tm_n"></div>
          <div class="fg" style="margin-bottom:0;"><label>Role</label><input id="tm_r"></div>
        </div>
        <div class="form-row" style="margin-top:10px;">
          <div class="fg" style="margin-bottom:0;"><label>Phone</label><input id="tm_p"></div>
          <div class="fg" style="margin-bottom:0;"><label>Email</label><input id="tm_e"></div>
        </div>
        <div class="fg" style="margin-top:10px;"><label>Responsibilities (one per line)</label><textarea id="tm_s"></textarea></div>
        <button class="btn btn-md btn-blue" onclick="MF.addMember()">Add team member</button>
      </div>
    </div>`;
  if (!members.length) h = `<p class="empty">No staff cards yet.</p>` + h;
  el.innerHTML = h;
}

function rProgress(el) {
  const w = C.state.data.weeks;
  if (!w.length) {
    el.innerHTML = `<p class="empty">No weeks yet.</p><button class="btn btn-md btn-blue" onclick="openAddWeek()">+ Add week</button>`;
    return;
  }
  let aw = C.state.week;
  if (aw >= w.length) aw = w.length - 1;
  C.state.week = aw;
  const c = w[aw];
  let h = `<div class="week-bar"><div class="week-bar-label">Week</div><div class="week-chips">`;
  w.forEach((wk, i) => {
    h += `<span class="chip${i === aw ? ' active' : ''}" onclick="MF.sw(${i})">${esc(wk.date_label)}</span>`;
  });
  h += `<span class="chip add" onclick="openAddWeek()">+ Add week</span></div></div>`;
  h += `<div class="block"><div class="block-head"><span class="block-label">This week</span></div><div class="block-body"><ol class="num-list">`;
  lines(c.this_week).forEach((t) => {
    h += `<li>${esc(t)}</li>`;
  });
  if (!lines(c.this_week).length) h += `</ol><p class="empty" style="padding:0;">Nothing logged.</p>`;
  else h += `</ol>`;
  h += `</div></div>`;
  h += `<div class="block"><div class="block-head"><span class="block-label">Next week</span></div><div class="block-body"><ol class="num-list">`;
  lines(c.next_week).forEach((t) => {
    h += `<li>${esc(t)}</li>`;
  });
  h += `</ol></div></div>`;
  h += `<div class="block"><div class="block-head"><span class="block-label">Outstanding</span></div><div class="block-body">`;
  (c.outstanding_items || []).forEach((item) => {
    h += `<div class="oi${item.done ? ' done' : ''}"><input type="checkbox" ${item.done ? 'checked' : ''} onchange="MF.tick('${item.id}', this.checked)"><label>${esc(item.text)}</label></div>`;
  });
  if (!(c.outstanding_items || []).length) h += `<p class="empty" style="padding:0;">None.</p>`;
  h += `</div></div>`;
  if (c.programme_note) {
    h += `<div class="block"><div class="block-head"><span class="block-label">Programme note</span></div><div class="block-body"><p>${esc(c.programme_note)}</p></div></div>`;
  }
  el.innerHTML = h;
}

function rProgramme(el) {
  const { phases, milestones, weeks } = C.state.data;
  let h = `<div class="block"><div class="block-head"><span class="block-label">Phases</span></div>`;
  if (!phases.length) h += `<p class="empty">No phases yet. Dates are typed in, not calculated.</p>`;
  phases.forEach((p) => {
    h += `<div class="prog-row"><div><p style="font-weight:700;">${esc(p.label)}</p></div><div class="prog-dates">${esc(p.start_date || '—')} → ${esc(p.end_date || '—')} <button class="btn btn-sm btn-dim" onclick="MF.rmPhase('${p.id}')">Remove</button></div></div>`;
  });
  h += `<div class="inline-form open" style="border-top:1px solid rgba(163,172,165,0.2);">
    <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Phase</label><input id="ph_l"></div>
    <div class="fg" style="margin-bottom:0;"><label>Start date</label><input id="ph_s" type="date"></div></div>
    <div class="fg"><label>End date</label><input id="ph_e" type="date"></div>
    <button class="btn btn-md btn-blue" onclick="MF.addPhase()">Add phase</button>
  </div></div>`;

  h += `<div class="block"><div class="block-head"><span class="block-label">Milestones</span></div>`;
  if (!milestones.length) h += `<p class="empty">No milestones yet.</p>`;
  milestones.forEach((m) => {
    h += `<div class="prog-row"><div><p style="font-weight:700;">${esc(m.label)}</p></div><div class="prog-dates">${esc(m.date || '—')} <button class="btn btn-sm btn-dim" onclick="MF.rmMilestone('${m.id}')">Remove</button></div></div>`;
  });
  h += `<div class="inline-form open">
    <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Milestone</label><input id="ms_l"></div>
    <div class="fg" style="margin-bottom:0;"><label>Date</label><input id="ms_d" type="date"></div></div>
    <button class="btn btn-md btn-blue" onclick="MF.addMilestone()">Add milestone</button>
  </div></div>`;

  const notes = weeks.filter((w) => w.programme_note);
  if (notes.length) {
    h += `<div class="block"><div class="block-head"><span class="block-label">Programme notes</span></div><div class="block-body">`;
    notes.forEach((n) => {
      h += `<div style="display:flex;gap:16px;padding:8px 0;border-bottom:1px solid rgba(163,172,165,0.2);"><span style="font-size:11px;color:var(--grey);min-width:88px;">${esc(n.date_label)}</span><p style="font-size:13px;">${esc(n.programme_note)}</p></div>`;
    });
    h += `</div></div>`;
  }
  el.innerHTML = h;
}

function rBudget(el) {
  const linesB = C.state.data.budgetLines;
  const vars = C.state.data.variations;
  const cats = [
    { key: 'construction', title: 'Estimated Construction Cost', accent: 'var(--blue)' },
    { key: 'consultants', title: 'External Consultant Fees', accent: 'var(--purple)' },
    { key: 'fees', title: 'Made For Professional Fees', accent: 'var(--sky)' },
  ];
  const app = vars.filter((v) => v.status === 'approved').reduce((s, v) => s + Number(v.amount), 0);
  let h = `<div style="display:flex;gap:14px;margin-bottom:16px;align-items:flex-start;flex-wrap:wrap;">`;
  let total = 0;
  cats.forEach((cat) => {
    const rows = linesB.filter((l) => l.category === cat.key);
    const sub = rows.reduce((s, r) => s + Number(r.amount), 0) + (cat.key === 'construction' ? app : 0);
    total += rows.reduce((s, r) => s + Number(r.amount), 0);
    h += `<div style="flex:1;min-width:220px;border:1px solid var(--grey);border-radius:4px;overflow:hidden;border-top:3px solid ${cat.accent};">
      <div style="padding:16px 20px 14px;border-bottom:1px solid rgba(163,172,165,0.3);"><p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${cat.title}</p></div>`;
    rows.forEach((r) => {
      h += `<div class="var-row"><span class="var-desc">${esc(r.label)}</span><span>${cur(r.amount)} <button class="btn btn-sm btn-dim" onclick="MF.rmLine('${r.id}')">×</button></span></div>`;
    });
    if (cat.key === 'construction' && app) {
      h += `<div class="var-row"><span class="var-desc">Approved Variations</span><span class="var-amt-green">${cur(app)}</span></div>`;
    }
    h += `<div class="var-row" style="background:rgba(163,172,165,0.1);"><span style="font-weight:700;">Subtotal (ex GST)</span><span style="font-weight:900;">${cur(sub)}</span></div>
      <div class="inline-form open"><div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Line</label><input id="bl_${cat.key}"></div>
      <div class="fg" style="margin-bottom:0;"><label>Amount ($)</label><input id="ba_${cat.key}" type="number"></div></div>
      <button class="btn btn-sm btn-blue" onclick="MF.addLine('${cat.key}')">Add line</button></div></div>`;
  });
  h += `</div>`;
  total += app;
  h += `<div style="border:1px solid var(--charcoal);border-radius:4px;padding:20px 28px;background:var(--charcoal);display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
    <p style="font-size:16px;font-weight:900;color:var(--offwhite);">Fitout Total (ex GST)</p>
    <p style="font-size:32px;font-weight:900;color:var(--offwhite);">${cur(total)}</p></div>`;
  h += varBlock('c', 'CONTRACTOR VARIATIONS', 'var(--purple)');
  h += varBlock('d', 'DESIGN VARIATIONS', 'var(--sky)');
  el.innerHTML = h;
}

function varBlock(k, label, accent) {
  const vars = C.state.data.variations.filter((v) => v.kind === k);
  const approved = vars.filter((v) => v.status === 'approved');
  const pending = vars.filter((v) => v.status === 'pending');
  const appTot = approved.reduce((s, v) => s + Number(v.amount), 0);
  let h = `<div class="var-block" style="border-left:3px solid ${accent};">
    <div class="var-block-head"><span class="var-block-title">${label}</span><span class="var-block-total">Approved: ${cur(appTot)}</span></div>`;
  if (approved.length) {
    h += `<div class="var-sublabel">Approved</div>`;
    approved.forEach((v) => {
      h += `<div class="var-row"><div><p class="var-desc">${esc(v.description)}</p><p class="var-meta">Approved ${esc(v.approved_date)}.</p></div><span class="var-amt-green">${cur(v.amount)}</span></div>`;
    });
  }
  if (pending.length) {
    h += `<div class="var-sublabel">Pending Approval</div>`;
    pending.forEach((v) => {
      h += `<div class="var-row"><div><p class="var-desc">${esc(v.description)}</p></div><div style="display:flex;align-items:center;gap:10px;"><span class="var-amt-gold">${cur(v.amount)}</span>
        <button class="btn btn-sm btn-blue" onclick="MF.approveVar('${v.id}')">Approve</button>
        <button class="btn btn-sm btn-dim" onclick="MF.rmVar('${v.id}')">Remove</button></div></div>`;
    });
  }
  if (!vars.length) h += `<p class="empty">No variations logged.</p>`;
  h += `<div class="inline-form" id="vf_${k}">
    <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Description</label><input id="vd_${k}"></div>
    <div class="fg" style="margin-bottom:0;"><label>Amount ($)</label><input id="va_${k}" type="number"></div></div>
    <button class="btn btn-md btn-blue" onclick="MF.addVar('${k}')">Add To Pending</button></div>
    <div class="var-footer"><button class="btn btn-md btn-ghost" onclick="MF.toggleIF('vf_${k}')">+ Add Variation</button></div></div>`;
  return h;
}

function rDocuments(el) {
  let h = '';
  DOC_SECS.forEach((sec) => {
    const docs = C.state.data.documents.filter((d) => d.stage === sec.key);
    const isOpen = C.state.openDocs[sec.key];
    h += `<div class="doc-accordion"><div class="doc-acc-head" onclick="MF.ts('${sec.key}')">
      <div class="doc-acc-left"><div class="doc-icon" style="background:${sec.color}15;">${sec.icon}</div>
      <div><p class="doc-acc-title">${sec.label}</p><p class="doc-acc-count">${docs.length} item${docs.length !== 1 ? 's' : ''}</p></div></div>
      <div class="doc-chevron${isOpen ? ' open' : ''}">&#8964;</div></div>
      <div class="doc-body${isOpen ? ' open' : ''}">`;
    if (!docs.length) h += `<p class="empty">No documents added yet.</p>`;
    docs.forEach((doc) => {
      h += `<div class="doc-row"><div><p class="doc-name">${esc(doc.name)}</p><p class="doc-meta">${esc(doc.date)}${doc.notes ? ' — ' + esc(doc.notes) : ''}</p></div>
        <div class="doc-right">${doc.status ? `<span class="status-pill s-${esc(doc.status)}">${esc(doc.status)}</span>` : ''}${doc.url ? `<a class="doc-link" href="${esc(doc.url)}" target="_blank">Open ↗</a>` : ''}
        <button class="doc-link" onclick="MF.rmDoc('${doc.id}')">Remove</button></div></div>`;
    });
    h += `<div class="doc-add"><button class="btn btn-md btn-ghost" onclick="MF.toggleIF('daf_${sec.key}')">+ Add Document</button>
      <div class="inline-form" id="daf_${sec.key}" style="margin-top:12px;border-top:none;padding:0;">
        <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Document Name</label><input id="dn_${sec.key}"></div>
        <div class="fg" style="margin-bottom:0;"><label>Date</label><input id="dd_${sec.key}"></div></div>
        <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Link (Optional)</label><input id="du_${sec.key}"></div>
        <div class="fg" style="margin-bottom:0;"><label>Status</label><select id="ds_${sec.key}"><option value="">— None —</option><option value="draft">Draft</option><option value="final">Final</option><option value="issued">Issued</option><option value="approved">Approved</option><option value="pending">Pending</option></select></div></div>
        <div class="fg"><label>Notes (Optional)</label><input id="dno_${sec.key}"></div>
        <button class="btn btn-md btn-blue" onclick="MF.addDoc('${sec.key}')">Add Document</button>
      </div></div></div></div>`;
  });
  el.innerHTML = h;
}

function rTender(el) {
  const t = C.state.data.tender;
  const rec = C.state.data.rec;
  const longlist = t.filter((x) => x.list === 'longlist');
  const shortlist = t.filter((x) => x.list === 'shortlist');
  const responses = t.filter((x) => x.list === 'responses');
  let h = `<div class="stat-row">
    <div class="stat"><p class="stat-label">Long List</p><p class="stat-value">${longlist.length}</p></div>
    <div class="stat"><p class="stat-label">Short List</p><p class="stat-value">${shortlist.length}</p></div>
    <div class="stat"><p class="stat-label">Responses Received</p><p class="stat-value">${responses.length}</p><p class="stat-sub">${rec ? 'Recommendation set.' : 'Pending recommendation.'}</p></div>
  </div>`;
  h += `<div class="block"><div class="block-head"><span class="block-label">Long List</span></div>`;
  if (!longlist.length) h += `<div class="block-body"><p class="empty" style="padding:0;">No contractors added yet.</p></div>`;
  longlist.forEach((c) => {
    h += `<div class="c-row"><div><p class="c-name">${esc(c.name)}</p><p class="c-notes">${esc(c.notes)}</p></div>
      <div class="c-right"><span class="badge b-long">Long List</span>
      <button class="btn btn-sm btn-purple" onclick="MF.toShort('${c.id}')">Shortlist ↓</button>
      <button class="btn btn-sm btn-dim" onclick="MF.rmParty('${c.id}')">Remove</button></div></div>`;
  });
  h += `<div class="var-footer"><button class="btn btn-md btn-ghost" onclick="MF.toggleIF('tf_ll')">+ Add Contractor</button>
    <div class="inline-form" id="tf_ll"><div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Contractor Name</label><input id="ll_n"></div>
    <div class="fg" style="margin-bottom:0;"><label>Notes</label><input id="ll_no"></div></div>
    <button class="btn btn-md btn-blue" onclick="MF.addLong()">Add To Long List</button></div></div></div>`;

  h += `<div class="block"><div class="block-head"><span class="block-label">Short List</span></div>`;
  if (!shortlist.length) h += `<div class="block-body"><p class="empty" style="padding:0;">Shortlisted contractors will appear here.</p></div>`;
  shortlist.forEach((c) => {
    h += `<div class="c-row"><div><p class="c-name">${esc(c.name)}</p><p class="c-notes">${esc(c.notes)}</p></div>
      <div class="c-right"><span class="badge b-short">Short List</span><button class="btn btn-sm btn-dim" onclick="MF.rmParty('${c.id}')">Remove</button></div></div>`;
  });
  h += `</div>`;

  h += `<div class="block"><div class="block-head"><span class="block-label">Tender Responses</span></div>`;
  if (!responses.length) h += `<div class="block-body"><p class="empty" style="padding:0;">Tender responses will appear here once received.</p></div>`;
  responses.forEach((r) => {
    h += `<div class="r-row"><div><p class="r-name">${esc(r.name)}</p><p class="r-meta">Received ${esc(r.date)}.${r.notes ? ' — ' + esc(r.notes) : ''}</p></div>
      <div style="display:flex;align-items:center;gap:12px;"><p class="r-amt">${r.amount ? cur(r.amount) : ''}</p>
      ${r.url ? `<a class="doc-link" href="${esc(r.url)}" target="_blank">Open ↗</a>` : ''}
      <button class="btn btn-sm btn-dim" onclick="MF.rmParty('${r.id}')">Remove</button></div></div>`;
  });
  h += `<div class="var-footer"><button class="btn btn-md btn-ghost" onclick="MF.toggleIF('tf_res')">+ Add Response</button>
    <div class="inline-form" id="tf_res">
      <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Contractor</label><input id="tr_n"></div>
      <div class="fg" style="margin-bottom:0;"><label>Tender Sum ($)</label><input id="tr_a" type="number"></div></div>
      <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Date Received</label><input id="tr_d"></div>
      <div class="fg" style="margin-bottom:0;"><label>Document Link</label><input id="tr_u"></div></div>
      <div class="fg"><label>Notes</label><input id="tr_no"></div>
      <button class="btn btn-md btn-blue" onclick="MF.addRes()">Add Response</button></div></div></div>`;

  h += `<div class="block"><div class="block-head"><span class="block-label">Recommendation</span></div>`;
  if (rec) {
    h += `<div class="c-row"><div><p class="c-name" style="color:var(--green);">${esc(rec.name)}</p><p class="c-notes">${rec.amount ? cur(rec.amount) + ' — ' : ''}${esc(rec.notes)}</p></div>
      <div class="c-right"><span class="badge b-rec">Recommended</span><button class="btn btn-sm btn-dim" onclick="MF.clrRec()">Clear</button></div></div>`;
  } else {
    h += `<div class="block-body"><p class="empty" style="padding:0;">No recommendation set yet.</p></div>
      <div class="var-footer"><button class="btn btn-md btn-ghost" onclick="MF.toggleIF('tf_rec')">+ Set Recommendation</button>
      <div class="inline-form" id="tf_rec">
        <div class="form-row"><div class="fg" style="margin-bottom:0;"><label>Recommended Contractor</label><input id="rec_n"></div>
        <div class="fg" style="margin-bottom:0;"><label>Recommended Sum ($)</label><input id="rec_a" type="number"></div></div>
        <div class="fg"><label>Recommendation Notes</label><input id="rec_no"></div>
        <button class="btn btn-md btn-blue" onclick="MF.setRec()">Set Recommendation</button></div></div>`;
  }
  h += `</div>`;
  el.innerHTML = h;
}
