export const REPO_URL = 'https://github.com/PRASHIRAWAL/event-sponsorship-tracker';
export const DOCKER_HUB_URL = 'https://hub.docker.com/r/prashirawal/event-sponsorship-tracker';
export const DOCKER_HUB_NGINX_URL = 'https://hub.docker.com/r/prashirawal/event-sponsorship-tracker-nginx';

export const student = { name: 'Prashi Rawal', roll: '23102C0067', subject: 'DevOps · 2026–2027' };

export const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#builds', label: 'Builds' },
  { href: '#testing', label: 'Testing' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#app', label: 'App' },
  { href: '#timeline', label: 'Timeline' },
];

// Latest verified run: Jenkins build #13 on 18 Oct 2026 (commit ec98951 on development).
export const latestBuild = {
  number: 13,
  commit: 'ec98951',
  branch: 'development',
  date: '18 Oct 2026, 09:46',
  duration: '7 min 21 s',
  tests: 156,
};

export const heroStats = [
  { value: 156, label: 'Tests passing in build #13' },
  { value: 8, label: 'Automated Jenkins stages' },
  { value: 13, label: 'Jenkins builds run' },
  { value: 37, label: 'Commits on main' },
];

export const tools = [
  'Git', 'GitHub', 'Jenkins 2.568.2', 'Maven', 'Java 21', 'Spring Boot 3.3.4', 'JUnit 5', 'MockMvc',
  'Selenium 4.35', 'Headless Chrome', 'Docker', 'Docker Hub', 'Docker Compose', 'Nginx 1.30', 'MySQL 8.4',
  'H2', 'Ansible 2.16', 'Ubuntu 24.04 · WSL2', 'Spring Security', 'Thymeleaf',
];

export const problem = {
  title: 'From spreadsheet chaos to a tested, deployed product',
  text: 'Student event teams track sponsors in spreadsheets and chat threads: who committed, how much, what has been paid and what is overdue. The Event Sponsorship Tracker replaces that with one web app, and every change to it travels through an automated DevOps pipeline before anyone sees it.',
  points: [
    'Events, sponsors, tiers, payments and funding targets in one place',
    'Eight alert rules flag overdue payments and missing details automatically',
    'Every commit is compiled, tested in a real browser, containerised and deployed by Jenkins',
  ],
};

export const objectives = [
  { icon: 'flow', title: 'Automate the delivery path', text: 'One declarative Jenkinsfile takes a commit from GitHub to a verified deployment. Nothing is built or copied by hand.' },
  { icon: 'test', title: 'Test at every layer', text: '142 JUnit 5 unit and integration tests, then 14 Selenium tests that drive the real app in headless Chrome.' },
  { icon: 'box', title: 'Ship immutable images', text: 'The app and its Nginx proxy are Docker images, pushed to Docker Hub as build-numbered tags plus latest.' },
  { icon: 'gear', title: 'Configure servers as code', text: 'Ansible playbooks install prerequisites and deploy the app idempotently: a second run changes nothing.' },
  { icon: 'pulse', title: 'Define done as healthy', text: 'A build only goes green once Actuator health reports UP directly and through Nginx, and signed-in page checks pass.' },
  { icon: 'branch', title: 'Collaborate through Git', text: 'Feature branches, pull requests, a resolved merge conflict and a protected path from development to main.' },
];

export const pipelineStages = [
  {
    name: 'Checkout',
    tool: 'Git · Jenkins',
    command: 'checkout scm',
    text: 'Jenkins pulls the exact commit from the development branch on GitHub.',
    log: ['Checking out Revision ec989512ed93b01bbaf8da4646c1091db8d12a64 (refs/remotes/origin/development)'],
  },
  {
    name: 'Build',
    tool: 'Maven · JDK 21',
    command: 'mvn -B -V clean compile',
    text: 'Compiles all 65 application source files with Java 21.',
    log: ['[INFO] Compiling 65 source files with javac [debug parameters release 21] to target\\classes', '[INFO] BUILD SUCCESS', '[INFO] Total time:  23.735 s'],
  },
  {
    name: 'Test',
    tool: 'JUnit 5 · MockMvc · H2',
    command: 'mvn -B test',
    text: 'Unit and integration tests run against an in-memory H2 database; the JUnit report is published.',
    log: ['[INFO] Compiling 25 source files with javac [debug parameters release 21] to target\\test-classes', '[INFO] Tests run: 142, Failures: 0, Errors: 0, Skipped: 0', '[INFO] Total time:  01:02 min'],
  },
  {
    name: 'E2E Tests',
    tool: 'Selenium · Headless Chrome',
    command: 'mvn -B -Pe2e verify',
    text: 'Fourteen browser tests sign in and click through real flows. A failing test saves a screenshot.',
    log: ['[INFO] Running com.eventtracker.e2e.LoginIT', '[INFO] Tests run: 14, Failures: 0, Errors: 0, Skipped: 0', '[INFO] Total time:  01:36 min'],
  },
  {
    name: 'Package',
    tool: 'Maven',
    command: 'mvn -B package -DskipTests',
    text: 'Builds the executable Spring Boot JAR and archives it as a fingerprinted artifact.',
    log: ['[INFO] Building jar: …\\target\\event-sponsorship-tracker-0.0.1-SNAPSHOT.jar', '[INFO] BUILD SUCCESS', '[INFO] Total time:  7.600 s'],
  },
  {
    name: 'Docker Image',
    tool: 'Docker · Docker Hub',
    command: 'docker build && docker push',
    text: 'Builds the app and Nginx images and pushes the build-number tag and latest to Docker Hub.',
    log: ['13: digest: sha256:9e7bc6fcc1b78383005a050717ff1eedcb1fda3c05be73c3bc8e8c26ee396ce4 size: 2052', 'latest: digest: sha256:9e7bc6fcc1b7… size: 2052', '13: digest: sha256:4425ca0478528fb27ebb9740ddf2ccac144b692c4f4c8f7e5bc3c237b50fc39a size: 2262'],
  },
  {
    name: 'Deploy',
    tool: 'Docker · Nginx',
    command: 'docker pull && docker run',
    text: 'Replaces only the app and Nginx containers. Secrets are passed by name, never as values.',
    log: ['docker rm -f eventtracker-app', 'docker run -d --name eventtracker-app --network eventtracker-net --restart unless-stopped -p 8081:8080 -e DB_URL -e DB_USERNAME -e DB_PASSWORD -e ADMIN_USERNAME -e ADMIN_PASSWORD … prashirawal/event-sponsorship-tracker:13', 'docker run -d --name eventtracker-nginx … -p 80:80 prashirawal/event-sponsorship-tracker-nginx:13'],
  },
  {
    name: 'Verify Deployment',
    tool: 'Actuator · curl',
    command: 'curl /actuator/health',
    text: 'Health must be UP on the app and through Nginx; then the main pages and API are checked signed in.',
    log: ['health-app.json: {"status":"UP"}', 'health-nginx.json: {"status":"UP"}', 'Deployed build 13: app http://localhost:8081, Nginx http://localhost:80'],
  },
];

// Builds kept by Jenkins (last 10). Durations in seconds, from the Jenkins API.
export const builds = [
  { n: 3, result: 'SUCCESS', seconds: 214, date: '14 Oct 12:23', note: 'Selenium stage added' },
  { n: 5, result: 'SUCCESS', seconds: 197, date: '14 Oct 13:49', note: 'First Docker + Nginx deployment' },
  { n: 6, result: 'SUCCESS', seconds: 166, date: '14 Oct 14:14', note: 'Deployment re-run' },
  { n: 7, result: 'FAILURE', seconds: 165, date: '14 Oct 14:54', note: 'Planted Selenium defect caught: 89 passed, 1 failed' },
  { n: 8, result: 'FAILURE', seconds: 0, date: '14 Oct 15:10', note: 'Jenkinsfile could not be loaded from SCM' },
  { n: 9, result: 'SUCCESS', seconds: 156, date: '14 Oct 15:10', note: 'Defect fixed: "test: fix event title assertion"' },
  { n: 10, result: 'FAILURE', seconds: 175, date: '14 Oct 16:36', note: 'Docker Hub login rejected: wrong token' },
  { n: 11, result: 'SUCCESS', seconds: 229, date: '14 Oct 16:44', note: 'Token fixed; images pushed to Docker Hub' },
  { n: 12, result: 'SUCCESS', seconds: 217, date: '14 Oct 18:52', note: 'MVP: 90 tests, deployed and verified' },
  { n: 13, result: 'SUCCESS', seconds: 441, date: '18 Oct 09:46', note: 'v2 release: 156 tests, deployed with sign-in checks' },
];

// Test classes in build #13, grouped by package.
export const unitTests = [
  { group: 'Controllers', items: [['DashboardControllerTest', 13], ['PaymentAndLifecycleTest', 13], ['EventControllerTest', 10], ['SponsorControllerTest', 10], ['EventApiControllerTest', 9], ['SponsorApiControllerTest', 8], ['PageViewTest', 5]] },
  { group: 'Security', items: [['SecurityTest', 16], ['LoginAttemptServiceTest', 4]] },
  { group: 'Services', items: [['AlertServiceTest', 13], ['EventServiceTest', 5], ['SponsorServiceTest', 5], ['CsvExporterTest', 3], ['FundingCalculatorTest', 3], ['DashboardServiceTest', 2]] },
  { group: 'Model & app', items: [['PaymentStatusTest', 12], ['SponsorFormValidationTest', 6], ['EventValidationTest', 4], ['ApplicationTests', 1]] },
];

export const e2eTests = [
  { name: 'LoginIT', count: 4, text: 'Sign-in required, wrong password, admin signs in and out, viewer is read-only' },
  { name: 'EventIT', count: 3, text: 'Create an event, blank name rejected, search filters the table' },
  { name: 'SponsorIT', count: 3, text: 'Create a linked sponsor, invalid phone rejected, missing contact raises an alert' },
  { name: 'PaymentIT', count: 2, text: 'Record a payment, block overpayment, delete through the dialog, funding progress' },
  { name: 'NavigationIT', count: 2, text: 'Dashboard KPI cards render, top-bar links open every section' },
];

export const defectStory = [
  { build: '#7', tone: 'fail', title: 'Defect planted', text: 'Commit 781c55e changed one EventIT assertion to expect "Create Event Defect".' },
  { build: '#7', tone: 'fail', title: 'Pipeline stopped', text: '89 passed, 1 failed. Jenkins archived the browser screenshot and skipped Package, Docker and Deploy.' },
  { build: '#9', tone: 'ok', title: 'Fixed and green', text: 'Commit b505f06 restored the assertion. Nothing broken ever reached Docker Hub.' },
];

export const images = [
  { repo: 'prashirawal/event-sponsorship-tracker', role: 'Spring Boot app', size: '524 MB', base: 'eclipse-temurin:21 JRE', digest: 'sha256:9e7bc6fcc1b7', url: DOCKER_HUB_URL, details: ['Runs as non-root user app', 'Copies the JAR Jenkins already tested', 'Configured only by environment variables'] },
  { repo: 'prashirawal/event-sponsorship-tracker-nginx', role: 'Reverse proxy', size: '92.8 MB', base: 'nginx 1.30', digest: 'sha256:4425ca047852', url: DOCKER_HUB_NGINX_URL, details: ['Only public entry point, port 80', 'gzip and security headers', 'server_tokens off, 1-hour static caching'] },
];

export const imageTags = ['11', '12', '13', 'latest'];

export const runtime = [
  { name: 'eventtracker-nginx', port: '80', role: 'Public entry point' },
  { name: 'eventtracker-app', port: '8081 → 8080', role: 'Spring Boot, non-root' },
  { name: 'eventtracker-mysql', port: '3306', role: 'MySQL 8.4, persistent volume' },
  { name: 'Jenkins', port: '8040', role: 'Builds, deploys, verifies' },
];

export const playbooks = [
  {
    file: 'configure_server.yml',
    title: 'Server prerequisites',
    items: ['Installs curl, ca-certificates, unzip and nginx', 'Creates the eventtracker system user and group', 'Creates /opt, /var/log and /etc app directories (mode 0750)', 'Writes a deployment spec of containers, network and ports'],
    runs: [{ label: 'First run', recap: 'ok=8 changed=5 failed=0' }, { label: 'Second run', recap: 'ok=8 changed=0 failed=0' }],
  },
  {
    file: 'deploy.yml',
    title: 'Idempotent v2 deployment',
    items: ['Checks Docker access and the isolated task14-net network', 'Starts the test database only when it is stopped', 'Replaces the app only when its image differs from tag 13', 'Waits for /actuator/health to report UP (18 × 10 s)'],
    runs: [{ label: 'Deploy v2', recap: 'ok=11 changed=3 failed=0' }, { label: 'Second run', recap: 'ok=8 changed=0 failed=0' }],
  },
];

export const ansibleLog = [
  { t: 'cmd', text: '$ ansible-playbook -i inventory.ini deploy.yml' },
  { t: 'task', text: 'TASK [Remove application container if image differs]' },
  { t: 'changed', text: 'changed: [localhost]' },
  { t: 'task', text: 'TASK [Deploy application if missing or image differs]' },
  { t: 'changed', text: 'changed: [localhost]' },
  { t: 'task', text: 'TASK [Wait for application health endpoint]' },
  { t: 'ok', text: 'ok: [localhost]' },
  { t: 'msg', text: '"msg": "Application health: UP"' },
  { t: 'recap', text: 'localhost : ok=11  changed=3  unreachable=0  failed=0  skipped=1' },
  { t: 'cmd', text: '$ ansible-playbook -i inventory.ini deploy.yml   # run again' },
  { t: 'recap', text: 'localhost : ok=8   changed=0  unreachable=0  failed=0  skipped=4' },
];

export const screens = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', src: '/screens/dashboard.webp', dark: '/screens/dashboard-dark.webp', text: 'KPIs for events, sponsors, committed and collected funds, upcoming events against targets, and the most severe alerts.' },
  { id: 'events', label: 'Events', path: '/events', src: '/screens/events.webp', text: 'Searchable, sortable and paginated events with Upcoming / Past filters and funding progress.' },
  { id: 'event-detail', label: 'Event detail', path: '/events/1', src: '/screens/event-detail.webp', text: 'One event with its sponsorship target, committed amount and every linked sponsor.' },
  { id: 'sponsors', label: 'Sponsors', path: '/sponsors', src: '/screens/sponsors.webp', text: 'Filters by status, event, tier and payment status; CSV export of the current view.' },
  { id: 'sponsor-detail', label: 'Payments', path: '/sponsors/1', src: '/screens/sponsor-detail.webp', text: 'Payments recorded per sponsor with a derived status (Unpaid, Partially paid, Paid, Overdue) and full history.' },
  { id: 'reports', label: 'Reports', path: '/reports', src: '/screens/reports.webp', text: 'Funding by event, tier and payment method, built from the same data as the REST reports API.' },
  { id: 'alerts', label: 'Alerts', path: '/alerts', src: '/screens/alerts.webp', text: 'Eight rules, most severe first: overdue payments, events below target, missing contacts and more.' },
  { id: 'activity', label: 'Activity log', path: '/activity', src: '/screens/activity.webp', text: 'An audit trail of every create, update, payment and delete, visible to admins only.' },
  { id: 'login', label: 'Sign-in', path: '/login', src: '/screens/login.webp', text: 'Spring Security sign-in with Admin and Viewer roles, BCrypt passwords and lockout after five failures.' },
];

export const jenkinsShots = [
  { src: '/screens/jenkins-job.webp', title: 'Job page', text: 'Build history #3–#13, archived artifacts and the test trend: the dip at #7 is the planted defect.' },
  { src: '/screens/jenkins-tests.webp', title: 'Build #13 test report', text: '156 tests, zero failures, published from the JUnit XML of both suites.' },
  { src: '/screens/jenkins-console.webp', title: 'Build #13 console', text: 'The run ends with "Deployed build 13" and Finished: SUCCESS.' },
];

export const features = [
  { icon: 'pay', title: 'Payments & status', text: 'Record payments by method and reference. Status is derived, overpayment is blocked and cancelled deals take no payments.' },
  { icon: 'target', title: 'Funding targets', text: 'Each event can carry a target, with progress bars and an alert when an event in the next 30 days is below it.' },
  { icon: 'tier', title: 'Tiers & industries', text: 'Platinum to Community tiers and sponsor industries, charted on the dashboard and reports.' },
  { icon: 'alert', title: '8 alert rules', text: 'Recalculated on every request and sorted by severity, so nothing goes stale in the database.' },
  { icon: 'lock', title: 'Sign-in & roles', text: 'Admin has full access; Viewer is read-only without alerts, activity or payment records. CSRF protection throughout.' },
  { icon: 'export', title: 'Reports & CSV', text: 'Reports page, CSV export, pagination, sorting and delete with confirmation.' },
  { icon: 'api', title: 'REST API', text: '20 JSON endpoints for events, sponsors, payments, dashboard and reports, validated like the forms.' },
  { icon: 'theme', title: 'Modern UI', text: 'Animated top-navigation layout with dark mode and a mobile layout, built with Thymeleaf and vanilla JS.' },
];

export const codeStats = [
  { value: 4278, label: 'lines of application Java', sub: '65 source files' },
  { value: 3125, label: 'lines of test Java', sub: '25 test files' },
  { value: 290, label: 'line Jenkinsfile', sub: '8 stages, 3 parameters' },
  { value: 19, label: 'Thymeleaf templates', sub: 'light and dark themes' },
];

export const timeline = [
  { date: '1 Oct', title: 'Scope, planning & repository', text: 'Problem statement, Agile plan and architecture; Spring Boot skeleton, README, branching policy and issue templates (commit 85681c9).' },
  { date: '13 Oct', title: 'MVP through pull requests', text: 'PRs #1–#4 merged into development, including a README merge conflict resolved by hand.' },
  { date: '14 Oct', title: 'Jenkins CI', text: 'First pipeline build (#2), Selenium stage (#3), then the first Docker + Nginx deployments (#5, #6).' },
  { date: '14 Oct', title: 'Failure handling proven', text: 'Planted defect fails build #7 with a screenshot; build #9 is green again. A bad Docker Hub token fails #10; #11 passes.' },
  { date: '14 Oct', title: 'Registry, deploy & Ansible', text: 'Build #12 pushes tagged images and deploys behind Nginx; Ansible playbooks configure the server idempotently.' },
  { date: '18 Oct', title: 'v2 release', text: 'Payments, targets, tiers, reports, activity log, sign-in with roles and a redesigned UI; 142 unit and 14 Selenium tests.' },
  { date: '18 Oct', title: 'Build #13 → main', text: 'Jenkins builds, tests, pushes :13 and deploys v2; Ansible moves to tag 13; PR #5 releases development to main.' },
];

export const lessons = [
  { title: 'A red build is a feature', text: 'The planted Selenium defect proved the pipeline stops a bad change before Package, Docker or Deploy can run.' },
  { title: 'Isolate test dependencies', text: 'Tests use in-memory H2, so the Jenkins agent needs no database and both suites stay fast and repeatable.' },
  { title: 'Secrets stay out of commands', text: 'Credentials live in Jenkins and reach Docker as -e NAME with no value, so logs and process lists never show them.' },
  { title: 'Health checks define done', text: 'Polling Actuator directly and through Nginx, then signed-in page checks, turned "deployed" into something measurable.' },
  { title: 'Plan for restarts', text: 'A reboot stopped MySQL and a WSL Nginx took port 80. Restart policies and disabling the stray service fixed both for good.' },
  { title: 'Version every artifact', text: 'Build-numbered tags tie each deployment to one build and make rollback a redeploy of an older tag.' },
];
