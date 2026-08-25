import weeksSeed from '../seed/weeks.js';

const DB_KEY = 'mf-tracker-demo-v1';
const SESSION_KEY = 'mf-tracker-demo-session';
const CHANNEL = 'mf-tracker-demo';

export const DEMO_USERS = [
  { id: 'user-mitch', email: 'mitch@made-for.com.au', password: '123456', role: 'staff', display_name: 'Mitch' },
  { id: 'user-kat', email: 'kat@made-for.com.au', password: '123456', role: 'staff', display_name: 'Kat' },
];

const BAIN_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

function uid() {
  return crypto.randomUUID();
}

function emptyDb() {
  return {
    projects: [],
    team_members: [],
    weeks: [],
    outstanding_items: [],
    programme_phases: [],
    programme_milestones: [],
    budget_lines: [],
    variations: [],
    documents: [],
    tender_parties: [],
    tender_recommendations: [],
  };
}

function seedBain(db) {
  db.projects.push({
    id: BAIN_ID,
    name: 'Bain Capital, Sydney',
    client_name: 'Bain Capital',
    address: 'Suite 28.01 & 28.02, Aurora Place 88 Phillip Street, Sydney 2000',
    created_at: '2025-08-03T00:00:00.000Z',
  });

  const team = [
    {
      name: 'Kat McMahon',
      role: 'Strategy Director',
      phone: '0411 760 246',
      email: 'kat@made-for.com.au',
      responsibilities:
        'Champions the project internally.\nEnsures strategic alignment with business goals and global workplace standards.\nProvides guidance, support, and escalation pathways for critical decisions.\nSafeguards quality and outcomes without managing daily tasks.\nSits in on key client meetings, fact finds and presentations.',
    },
    {
      name: 'Chris Free',
      role: 'Design Director',
      phone: '0488 327 815',
      email: 'chris@made-for.com.au',
      responsibilities:
        'Drives the overarching design strategy from briefing to delivery including client presentations.\nLeads all consultant coordination and ensures design alignment.\nProvides quality control across all drawing packages.\nBalances big-picture vision with detailed technical resolution.\nEnsures consistency of design narrative throughout the project.',
    },
    {
      name: 'Sophie Woods',
      role: 'Interior Designer',
      phone: '',
      email: '',
      responsibilities:
        'Develops design documentation across all phases of the project.\nSelects materials, finishes, and furniture aligned with the design narrative.\nProduces drawings, mood boards, and presentation materials.\nSupports coordination with suppliers and consultants.\nEnsures detailing reflects both creative intent and practical needs.',
    },
    {
      name: 'Lara Pillot',
      role: 'Associate Director',
      phone: '',
      email: '',
      responsibilities:
        'Leads the client side PM role on site in collaboration with the strategy lead.\nRuns tender process with select tenderers.\nReviews cost proposals and issues value management solutions through tender stage.\nCoordinates PCG meetings with on site team.\nManages CDC application and landlord communication.\nIssues and coordinates As Built drawings.\nCoordinates 30, 90 and 365 day check ins.\nIssues client weekly wrap emails and communications.',
    },
  ];
  team.forEach((m, i) => db.team_members.push({ id: uid(), project_id: BAIN_ID, sort_order: i, ...m }));

  weeksSeed.forEach((w, i) => {
    const weekId = uid();
    db.weeks.push({
      id: weekId,
      project_id: BAIN_ID,
      date_label: w.date,
      this_week: (w.thisWeek || []).join('\n'),
      next_week: (w.nextWeek || []).join('\n'),
      programme_note: w.programmeNote || '',
      sort_order: i,
    });
    (w.outstanding || []).forEach((item, j) => {
      db.outstanding_items.push({
        id: uid(),
        week_id: weekId,
        text: item.text,
        done: !!item.done,
        sort_order: j,
      });
    });
  });

  const phases = [
    ['MOBILISE & STRATEGY', '2025-08-03', '2025-08-09', '#3F65D6'],
    ['CONCEPT DESIGN', '2025-08-10', '2025-09-06', '#A490DB'],
    ['DESIGN DEVELOPMENT', '2025-09-07', '2025-10-04', '#A490DB'],
    ['TENDER DOCUMENTATION', '2025-10-05', '2025-11-01', '#3F65D6'],
    ['TENDER & VALUE MANAGEMENT', '2025-11-02', '2025-11-29', '#3F65D6'],
    ['CONSTRUCTION & DELIVERY', '2025-11-30', '2026-02-07', '#299F3D'],
  ];
  phases.forEach(([label, start_date, end_date, color], i) => {
    db.programme_phases.push({ id: uid(), project_id: BAIN_ID, label, start_date, end_date, color, sort_order: i });
  });

  const ms = [
    ['Kick-off', '2025-08-03'],
    ['Concept Approval', '2025-08-31'],
    ['Design Sign-off', '2025-09-28'],
    ['Page Turn', '2025-10-26'],
    ['Issue for Tender', '2025-11-02'],
    ['Tender Returns', '2025-11-16'],
    ['Award GC', '2025-11-23'],
    ['Take On Site', '2025-11-30'],
    ['FDOB', '2026-02-01'],
  ];
  ms.forEach(([label, date], i) => {
    db.programme_milestones.push({ id: uid(), project_id: BAIN_ID, label, date, sort_order: i });
  });

  const budget = [
    ['construction', 'Expansion Space ($3,000 / SQM)', 438000],
    ['construction', 'Workspace ($1,500 / SQM)', 75000],
    ['consultants', 'MEP, Security Fire, Acoustics', 15000],
    ['consultants', 'Certifier / Associated Fees', 6500],
    ['consultants', 'Long Service Levy', 6725],
    ['fees', 'Made For Design Fee', 14875],
    ['fees', 'Made For Project Mgmt Fee', 19440],
  ];
  budget.forEach(([category, label, amount], i) => {
    db.budget_lines.push({ id: uid(), project_id: BAIN_ID, category, label, amount, sort_order: i });
  });
}

export function loadDb() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      /* fall through */
    }
  }
  const db = emptyDb();
  seedBain(db);
  saveDb(db);
  return db;
}

export function saveDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  try {
    new BroadcastChannel(CHANNEL).postMessage({ type: 'changed' });
  } catch {
    /* ignore */
  }
}

export function resetDemo() {
  localStorage.removeItem(DB_KEY);
  return loadDb();
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function setSession(user) {
  if (!user) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, role: user.role }));
}

export function onDbChange(fn) {
  let ch;
  try {
    ch = new BroadcastChannel(CHANNEL);
    ch.onmessage = () => fn();
  } catch {
    /* ignore */
  }
  const onStorage = (e) => {
    if (e.key === DB_KEY) fn();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('storage', onStorage);
    ch?.close();
  };
}

export { uid };
