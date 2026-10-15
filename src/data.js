export const REPO_URL = 'https://github.com/PRASHIRAWAL/event-sponsorship-tracker';

export const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#pipeline', label: 'Pipeline' },
  { href: '#results', label: 'Results' },
  { href: '#features', label: 'Features' },
  { href: '#timeline', label: 'Timeline' },
];

export const heroStats = [
  { value: '#12', label: 'Successful Jenkins build' },
  { value: '82', label: 'Unit & integration tests' },
  { value: '8', label: 'Selenium E2E tests' },
  { value: '9', label: 'Automated pipeline stages' },
];

export const objectives = [
  {
    title: 'Automate the delivery path',
    text: 'Every change flows from a Git commit to a verified deployment through a single Jenkins pipeline, with no manual build or copy steps.',
  },
  {
    title: 'Test at every layer',
    text: 'JUnit 5 unit and integration tests run on every build, followed by Selenium end-to-end tests in headless Chrome.',
  },
  {
    title: 'Ship immutable containers',
    text: 'The Spring Boot app and Nginx proxy are packaged as Docker images and published to Docker Hub with build-numbered and latest tags.',
  },
  {
    title: 'Configure environments as code',
    text: 'Ansible playbooks describe host configuration and reliability checks so environments are repeatable rather than hand-built.',
  },
  {
    title: 'Verify, don’t assume',
    text: 'The pipeline only goes green after the application and MySQL health checks report UP through both the app port and Nginx.',
  },
  {
    title: 'Collaborate through Git',
    text: 'Feature branches, pull requests and a development branch keep work reviewable and history traceable.',
  },
];

export const technologies = [
  { name: 'Git & GitHub', abbr: 'Git', role: 'Version control', text: 'Feature branches, pull requests and merge-conflict resolution on a shared development branch.' },
  { name: 'Jenkins', abbr: 'Jk', role: 'CI/CD orchestration', text: 'Declarative Jenkinsfile with build parameters, credentials binding, timeouts and test reporting.' },
  { name: 'Maven', abbr: 'Mvn', role: 'Build & dependencies', text: 'Compiles, tests and packages the Spring Boot JAR; a dedicated e2e profile runs browser tests.' },
  { name: 'Selenium', abbr: 'Se', role: 'End-to-end testing', text: 'WebDriver tests in headless Chrome exercise real user flows and capture screenshots on failure.' },
  { name: 'Docker', abbr: 'Dk', role: 'Containerization', text: 'Separate images for the application and the Nginx proxy, joined by a dedicated Docker network.' },
  { name: 'Docker Hub', abbr: 'Hub', role: 'Image registry', text: 'Images pushed with build-numbered and latest tags, then pulled back for deployment.' },
  { name: 'Spring Boot', abbr: 'SB', role: 'Application framework', text: 'Java 21 and Spring Boot 3 with Spring Web, Data JPA, Thymeleaf views and Actuator health.' },
  { name: 'MySQL', abbr: 'SQL', role: 'Relational database', text: 'MySQL 8 stores events, sponsors and sponsorship records; tests use an isolated H2 profile.' },
  { name: 'Nginx', abbr: 'Nx', role: 'Reverse proxy', text: 'Serves as the public entry point on port 80 and forwards traffic to the Spring Boot container.' },
  { name: 'Ansible', abbr: 'An', role: 'Configuration management', text: 'Playbooks for environment configuration and post-deployment reliability validation.' },
];

export const pipelineStages = [
  { name: 'Commit & Push', tool: 'Git / GitHub', text: 'Developer pushes a feature branch and merges it through a pull request.' },
  { name: 'Checkout', tool: 'Jenkins', text: 'Jenkins checks out the exact commit under test from the repository.' },
  { name: 'Build', tool: 'Maven', text: 'mvn clean compile on JDK 21 validates that the code compiles.' },
  { name: 'Unit & Integration Tests', tool: 'JUnit 5 · Maven', text: 'Surefire runs the test suite against an H2 profile and publishes JUnit reports.' },
  { name: 'E2E Tests', tool: 'Selenium', text: 'Headless Chrome tests run via the e2e profile; failure screenshots are archived.' },
  { name: 'Package', tool: 'Maven', text: 'The executable Spring Boot JAR is packaged and fingerprinted as a build artifact.' },
  { name: 'Image & Publish', tool: 'Docker · Docker Hub', text: 'App and Nginx images are built and pushed with build-number and latest tags.' },
  { name: 'Deploy', tool: 'Docker · Nginx', text: 'Versioned images are pulled and run on a shared network behind the Nginx proxy.' },
  { name: 'Verify Deployment', tool: 'Actuator health', text: 'Health endpoints are polled directly and through Nginx; the build fails unless both report UP.' },
];

export const results = [
  { value: 'SUCCESS', title: 'Jenkins Build #12', text: 'The full Jenkins pipeline, from checkout to deployment verification, completed successfully.' },
  { value: '82 / 0', title: 'Unit & integration tests', text: '82 tests executed with zero failures.' },
  { value: '8 / 0', title: 'End-to-end tests', text: '8 Selenium tests executed with zero failures.' },
  { value: 'versioned + latest', title: 'Docker Hub images', text: 'Images published with versioned and latest tags.' },
  { value: 'UP', title: 'Application health', text: 'Spring Boot Actuator health check reported UP.' },
  { value: 'UP', title: 'MySQL health', text: 'Database connectivity health check reported UP.' },
];

export const features = [
  { title: 'Sponsorship dashboard', text: 'Summary indicators for events, sponsors and committed revenue, with search and status drill-down.', screen: 'dashboard' },
  { title: 'Event management', text: 'Create, edit, search and filter events by upcoming or past, with linked sponsors on each event.', screen: 'events' },
  { title: 'Sponsor tracking', text: 'Sponsor profiles with sponsorship and payment status, filterable by status or event.', screen: 'sponsors' },
  { title: 'Alerts & exceptions', text: 'Flags overdue payments, unsigned contracts and other states that need attention.', screen: 'alerts' },
];

export const timeline = [
  { phase: 'Planning', title: 'Scope, Agile planning & architecture', text: 'Problem statement, backlog, requirements and the Nginx → Spring Boot → MySQL architecture.' },
  { phase: 'Foundation', title: 'GitHub repository & branching', text: 'Spring Boot project initialized with a development branch, issue templates and pull-request workflow.' },
  { phase: 'MVP', title: 'Event and sponsor management', text: 'Event and sponsor CRUD, REST API, searchable dashboard, status drill-down and alerts.' },
  { phase: 'CI', title: 'Jenkins pipeline', text: 'Declarative Jenkinsfile for checkout, Maven build, tests and packaging.' },
  { phase: 'Testing', title: 'Selenium end-to-end tests', text: 'Browser tests added to the pipeline, including a deliberate defect to prove failures are caught.' },
  { phase: 'Containers', title: 'Docker, Nginx & Docker Hub', text: 'Containerized deployment behind Nginx, with images published to Docker Hub.' },
  { phase: 'Operations', title: 'Ansible & reliability validation', text: 'Configuration management playbooks and health-based reliability checks.' },
];

export const lessons = [
  { title: 'A red build is useful', text: 'Introducing a temporary Selenium assertion defect proved the pipeline stops bad changes before they reach deployment.' },
  { title: 'Isolate test dependencies', text: 'Running tests against an H2 profile kept CI fast and removed the need for a database on the Jenkins agent.' },
  { title: 'Keep secrets out of code', text: 'Docker Hub and database credentials live in Jenkins credentials and are injected as environment variables.' },
  { title: 'Health checks define “done”', text: 'Polling Actuator health through both the app and Nginx turned deployment success into something measurable.' },
  { title: 'Version every artifact', text: 'Build-numbered image tags make each deployment traceable and easy to roll back, while latest stays convenient.' },
  { title: 'Small, reviewable changes', text: 'Feature branches and pull requests made merge conflicts manageable and history easy to follow.' },
];
