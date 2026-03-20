import { useState, useCallback } from “react”;

const CEREAL_FONT = `'Airbnb Cereal VF', 'Airbnb Cereal', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

// DLS Color Tokens
const C = {
rausch: ‘#FF385C’,
hof: ‘#222222’,
foggy: ‘#6A6A6A’,
babu: ‘#007E82’,
spruce: ‘#22BC4E’,
arches: ‘#C13515’,
ondo: ‘#D0650B’,
mykonou: ‘#2875F0’,
deco: ‘#DDDDDD’,
faint: ‘#F7F7F7’,
white: ‘#FFFFFF’,
nightberry: ‘#460479’,
hackberry: ‘#92174D’,
beach: ‘#FFAF0F’,
};

// Leviathan work stream tags — mapped to 6 continuous loops + critical blockers
const STREAMS = {
AI_AGENTS: { label: ‘AI Agents / Leviathan’, color: C.babu, icon: ‘⚙’ },
TA_OPS: { label: ‘TA Ops / Johnny’, color: C.mykonou, icon: ‘📊’ },
TALENT_INTEL: { label: ‘Talent Intelligence’, color: C.nightberry, icon: ‘🔍’ },
GOVERNANCE: { label: ‘AI Governance / D&B’, color: C.ondo, icon: ‘🛡’ },
SKILLS_WORKFORCE: { label: ‘Skills / Workforce’, color: C.spruce, icon: ‘🚀’ },
VENDOR_INTEL: { label: ‘Vendor / Market Intel’, color: C.hackberry, icon: ‘📊’ },
NETWORKING: { label: ‘Key People / Networking’, color: C.rausch, icon: ‘🤝’ },
BRIGHTHIRE: { label: ‘BrightHire / Interview Intel’, color: C.arches, icon: ‘🎤’ },
};

// Priority levels
const PRI = {
MUST: { label: ‘Must Attend’, color: C.rausch, bg: ‘#FFF0F3’ },
HIGH: { label: ‘High Value’, color: C.ondo, bg: ‘#FFF8F0’ },
OPT: { label: ‘If Available’, color: C.babu, bg: ‘#F0FAFA’ },
};

// Leviathan loop mapping for each session
const LOOPS = {
L1: { label: ‘Loop 1: Research’, color: C.babu },
L2: { label: ‘Loop 2: Positioning’, color: C.rausch },
L3: { label: ‘Loop 3: Pipeline’, color: C.spruce },
L4: { label: ‘Loop 4: Conversion’, color: C.nightberry },
L5: { label: ‘Loop 5: Analysis’, color: C.mykonou },
L6: { label: ‘Loop 6: Retention’, color: C.ondo },
};

const SCHEDULE = {
monday: {
date: ‘Monday, March 23’,
theme: ‘Reconnaissance — Map the Vendor Landscape’,
slots: [
{
time: ‘10:30 AM – 12:00 PM’,
room: ‘Meursault 1-2’,
title: ‘Keeping HR Human: When AI Becomes a Colleague, Not a Replacement’,
speakers: ‘Jamie Viramontes (Konnect), Adit Jain (Leena AI)’,
priority: PRI.HIGH,
streams: [STREAMS.AI_AGENTS, STREAMS.GOVERNANCE],
loops: [LOOPS.L4, LOOPS.L5],
why: ‘Leena AI is building HR AI agents and appears THREE times across Transform. This is your first contact. By Wednesday you should have a relationship with Adit Jain. Their “HR Superagent” framing directly parallels Leviathan's agent suite architecture. Extract their approach to governance and human-in-the-loop — compare against your Jidoka principle.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘1:00 PM – 2:30 PM’,
room: ‘Meursault 1-2’,
title: ‘Use AI to Make Better Hires, Faster’,
speakers: ‘Ariana Moon & Nkem Nwankwo (Greenhouse)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.TA_OPS, STREAMS.VENDOR_INTEL],
loops: [LOOPS.L1, LOOPS.L4],
why: ‘CRITICAL BLOCKER SESSION. Greenhouse is your ATS. Their AI product roadmap directly impacts AirHC integration. Scorecard access is blocked at the connector level — this is the face-to-face conversation to unblock it. Ask about MCP/API roadmap for scorecard data. Get names of the technical team who can help with the Greenhouse MCP server spec from the Runbook.’,
brianOrPat: ‘Brian’,
blocker: ‘Greenhouse MCP / Scorecard Access’,
},
{
time: ‘1:00 PM – 2:30 PM’,
room: ‘Bandol 1’,
title: ‘Skills-First Strategies in the Age of AI’,
speakers: ‘SHRM Foundation, US Chamber, IBM (Madison Gooch)’,
priority: PRI.HIGH,
streams: [STREAMS.SKILLS_WORKFORCE, STREAMS.AI_AGENTS],
loops: [LOOPS.L1, LOOPS.L2],
why: ‘IBM watsonx perspective on skills taxonomy. Airbnb leveling framework (L4-L13) is the backbone of every AirGuide output. Skills-first hiring maps directly to D&B “Outcomes Over Credentials” principle. Extract how IBM structures skills data for agent consumption — validate against your data container architecture.’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘3:00 PM – 4:00 PM’,
room: ‘Meursault 1-2’,
title: ‘Smart Tools, Dumb People Decisions: Who's Actually Running This?’,
speakers: ‘Matt Poepsel (The Predictive Index)’,
priority: PRI.OPT,
streams: [STREAMS.GOVERNANCE, STREAMS.AI_AGENTS],
loops: [LOOPS.L5],
why: ‘Metacognition thesis in the wild. “Who is actually running this” is the same question your Cognitive Intelligence Engine asks. Observe how a behavioral assessment company frames the human-AI decision boundary. This is research material for the CIE thesis.’,
brianOrPat: ‘Either’,
blocker: null,
},
{
time: ‘4:00 PM – 5:00 PM’,
room: ‘Bandol 1’,
title: ‘The AI Game Show: CHROs Compete to Transform’,
speakers: ‘Danny Guillory (Gametime), Rob Meadows (AI Foundation), Brandon Sammut (Zapier)’,
priority: PRI.OPT,
streams: [STREAMS.NETWORKING, STREAMS.AI_AGENTS],
loops: [LOOPS.L2],
why: ‘Light format but high-signal people. Zapier CPO Brandon Sammut also speaks Tuesday in the critical “AI-Enabled TA Team” session. Introduce yourself here, build rapport before his real talk. Plant the seed for the Tuesday deep dive.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘5:00 PM – 7:00 PM’,
room: ‘Wynn Pavilion’,
title: ‘Official Kickoff Reception’,
speakers: ‘’,
priority: PRI.MUST,
streams: [STREAMS.NETWORKING],
loops: [],
why: ‘The hallway IS the conference. BrightHire team will be here. Greenhouse people will be here. This is where you initiate the vendor unblocking conversations in a low-pressure setting. Find BrightHire product team and open the MCP conversation for Total Recall. Find Greenhouse technical contacts from the 1 PM session.’,
brianOrPat: ‘Both’,
blocker: ‘BrightHire MCP / Total Recall’,
},
],
},
tuesday: {
date: ‘Tuesday, March 24’,
theme: ‘Deep Intelligence — Agent Architecture + Vendor Unblocking’,
slots: [
{
time: ‘8:00 AM – 10:15 AM’,
room: ‘Lafite 4-9 (Plenary)’,
title: ‘Morning Plenary Block’,
speakers: ‘Jon Levy, Van Jones, Inna Landman (Procore CPO), Jacqui Canney (ServiceNow CPAO)’,
priority: PRI.HIGH,
streams: [STREAMS.NETWORKING, STREAMS.AI_AGENTS],
loops: [LOOPS.L2],
why: ‘Jacqui Canney (ServiceNow Chief People & AI Enablement Officer) is the keynote signal. Her title — “Chief People AND AI Enablement Officer” — is the exact role evolution Jose envisions for the org. Watch how she frames the people + AI integration. Take notes on language she uses — this becomes ammunition for Jose positioning.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘11:55 AM – 12:25 PM’,
room: ‘Learning Lab by Deloitte’,
title: ‘AI@Work: An AI-Enabled Talent Acquisition Team: Real Workflows, Real Results’,
speakers: ‘Brandon Sammut (CPO, Zapier), Tracy St.Dic (Global Head of Talent, Zapier)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.TA_OPS, STREAMS.TALENT_INTEL],
loops: [LOOPS.L1, LOOPS.L2, LOOPS.L3],
why: ‘THIS IS YOUR SESSION. Zapier's TA team using AI in real workflows. Not theory, not vendor pitch — an actual TA team showing what they built and how it works. Compare their architecture to Leviathan's three-layer model. What agents did they build? How do they handle data quality? What's their hallucination strategy? Zapier is an automation company — they've thought about this differently than recruiting shops.’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘11:55 AM – 12:25 PM’,
room: ‘Horizons Stage’,
title: ‘Finding Untapped Talent and Breakthroughs at the Edges’,
speakers: ‘Melissa Thompson (Ford, Global Head of TA), Felice Ajlouny (Former VP TA, SentinelOne)’,
priority: PRI.HIGH,
streams: [STREAMS.TALENT_INTEL, STREAMS.TA_OPS],
loops: [LOOPS.L1, LOOPS.L3],
why: ‘Ford and SentinelOne represent high-volume technical hiring at scale. Their “untapped talent” framing maps directly to the Nurtured Pipelines concept and D&B “Barriers Removed” principle. Extract their sourcing patterns for AirCompass intelligence — where do they find talent that LinkedIn misses?’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘12:00 PM – 12:45 PM’,
room: ‘Meursault 1-2’,
title: ‘The CHRO's Blueprint for Connected Talent Systems in the AI Era’,
speakers: ‘Stacey Harris (Sapient Insights), Arnaud Grunwald (CPO, ClearCo)’,
priority: PRI.HIGH,
streams: [STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL],
loops: [LOOPS.L5],
why: ‘Stacey Harris runs the most comprehensive HR tech survey in the industry. “Connected talent systems” is literally the Leviathan thesis — systems that talk to each other through an operating layer. Extract her data on what's working and what's not in connected HR tech stacks. This validates the three-layer architecture externally.’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘1:30 PM – 2:00 PM’,
room: ‘Meursault 1-2’,
title: ‘What Actually Changes when AI Enters the People Stack’,
speakers: ‘Giovanni Luperti (Humaans), Kit Krugman (Foursquare SVP), Jevan Lenox (WRITER)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL, STREAMS.GOVERNANCE],
loops: [LOOPS.L2, LOOPS.L5],
why: ‘WRITER is building enterprise AI with a focus on governance. Humaans is an HRIS startup rethinking the people stack. “What actually changes” is the diagnostic question — these are builders, not consultants. Extract how WRITER handles AI governance in production. Compare their approach to your Red Lines Architecture and circuit breaker protocol.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘2:05 PM – 2:35 PM’,
room: ‘Innovation Stage’,
title: ‘How Hypergrowth Companies Compete for Talent in the Age of AI’,
speakers: ‘David Paffenholz (Juicebox), Reggie Williams (Sequoia Capital), Patrick Ciavolella (Cognition)’,
priority: PRI.MUST,
streams: [STREAMS.TALENT_INTEL, STREAMS.VENDOR_INTEL, STREAMS.NETWORKING],
loops: [LOOPS.L1, LOOPS.L3],
why: ‘Cognition built Devin (the AI software engineer). Their Head of Talent is on this panel. Sequoia Capital's recruiting lead can speak to how the best-funded companies think about talent. These are the companies whose engineers Airbnb is competing for. Extract competitive intel for AirCompass — how are AI-native companies actually hiring differently?’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘2:05 PM – 2:35 PM’,
room: ‘Innovation Stage (alt)’,
title: ‘Governing AI Before it Governs Us’,
speakers: ‘George LaRocque (WorkTech), Karina Bernacki (VP People, CoreWeave), Christine Tozzi’,
priority: PRI.HIGH,
streams: [STREAMS.GOVERNANCE, STREAMS.AI_AGENTS],
loops: [LOOPS.L5],
why: ‘CoreWeave's VP People. CoreWeave is the GPU infrastructure company powering half of AI. Their governance challenges at the infrastructure layer are different from application-layer governance. Compare their approach to Leviathan's three-tier Red Lines Architecture (legal → ethical → system integrity).’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘2:40 PM – 3:10 PM’,
room: ‘Learning Lab by Deloitte’,
title: ‘AI@Work: Build Your Future Organization in Real Time’,
speakers: ‘Josh Newman (VP, Workforce Skills & Talent Readiness, ServiceNow)’,
priority: PRI.HIGH,
streams: [STREAMS.AI_AGENTS, STREAMS.SKILLS_WORKFORCE],
loops: [LOOPS.L1, LOOPS.L6],
why: ‘ServiceNow again. Josh Newman owns their workforce skills and talent readiness product. “Build your future org in real time” is the AirMap vision — internal talent mapping with predictive capability. Extract their data model for skills → roles → workforce planning. This feeds Loop 6 (Retention) architecture.’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘3:15 PM – 3:45 PM’,
room: ‘Learning Lab by Deloitte’,
title: ‘Exploration to Execution: Building an HR AI Literacy Engine’,
speakers: ‘Kyle Lagunas (Kyle & Co.), Rachel Bourne (VP AI Transformation, Jacobs), Melissa Laswell (Blue Origin)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.NETWORKING, STREAMS.BRIGHTHIRE],
loops: [LOOPS.L2, LOOPS.L4],
why: ‘Melissa Laswell runs executive recruiting at Blue Origin. She is the kind of operator who would immediately understand Leviathan's value. Rachel Bourne's title “VP AI Transformation” is the organizational change role that Leviathan needs evangelists for. Build relationships here — these are future reference cases and external validation for the platform thesis.’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘3:15 PM – 3:45 PM’,
room: ‘Avignon’,
title: ‘Fraud, Fakes, and the New Security Perimeter in Recruiting’,
speakers: ‘Leigh Miller (Gem), Jason Zoltak (tofu), Ryan Colthorp (Okta)’,
priority: PRI.HIGH,
streams: [STREAMS.GOVERNANCE, STREAMS.VENDOR_INTEL, STREAMS.TA_OPS],
loops: [LOOPS.L4, LOOPS.L5],
why: ‘Gem is in your stack. Okta is your identity layer (67 apps through SSO). This session addresses the FitSignal use case — how do you verify candidates are real and qualified when AI generates their materials? This is governance layer intelligence for the D&B Audit Agent and the coded language detection system.’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘3:50 PM – 4:20 PM’,
room: ‘Meursault 1-2’,
title: ‘When Everyone Has AI, What Actually Signals a Good Candidate?’,
speakers: ‘Aaron Wang (Alex.com), Tim Sackett (HRUTech.com)’,
priority: PRI.HIGH,
streams: [STREAMS.TALENT_INTEL, STREAMS.AI_AGENTS, STREAMS.BRIGHTHIRE],
loops: [LOOPS.L4],
why: ‘The signal vs noise problem in an AI-saturated candidate pool. Tim Sackett is the most-read TA blogger in the industry. This directly feeds the Assessment Agent and FitSignal design. When every candidate uses AI to polish their resume, what evidence actually predicts performance? This is the “Evidence Over Proxies” principle under stress.’,
brianOrPat: ‘Either’,
blocker: null,
},
{
time: ‘4:30 PM – 5:30 PM’,
room: ‘EXP Floor’,
title: ‘Office Hours + EXP Reception’,
speakers: ‘’,
priority: PRI.MUST,
streams: [STREAMS.NETWORKING, STREAMS.VENDOR_INTEL],
loops: [],
why: ‘Walk the expo floor. BrightHire booth conversation — follow up on Monday reception. Greenhouse booth — push the scorecard API conversation forward. Collect business cards from every relevant vendor. This is where you turn session conversations into committed follow-ups with technical contacts.’,
brianOrPat: ‘Both’,
blocker: ‘BrightHire + Greenhouse follow-up’,
},
],
},
wednesday: {
date: ‘Wednesday, March 25’,
theme: ‘Synthesis — Superagent Thesis + Johnny’s Panel + Closing Intel’,
slots: [
{
time: ‘9:00 AM – 10:15 AM’,
room: ‘Lafite 4-9 (Plenary)’,
title: ‘Morning Plenary: HR Superagent + The Now and Next of Work’,
speakers: ‘Josh Bersin + Adit Jain (Leena AI), Jena McGregor (Charter), Claude Silver (VaynerMedia)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL, STREAMS.NETWORKING],
loops: [LOOPS.L1, LOOPS.L2, LOOPS.L5],
why: ‘Josh Bersin + Leena AI presenting “From HR Tech to HR Superagent.” This is the industry thesis that validates Leviathan. Bersin's framing will become the language that leadership uses. Know it before Jose hears it. By now you should have a relationship with Adit Jain from Monday + Monday reception. This is the payoff of the compound thread.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘11:00 AM – 11:30 AM’,
room: ‘Meursault 1-2’,
title: ‘From Insights to Advantage: Powering High-Performance Culture Through Decision Quality’,
speakers: ‘Christine Preizler & Dr. Tanaya Devi (Sigma Squared), Jeff Batuhan & Dave Alonso (ExcelHRate)’,
priority: PRI.HIGH,
streams: [STREAMS.AI_AGENTS, STREAMS.TALENT_INTEL],
loops: [LOOPS.L5],
why: ‘Sigma Squared is a people analytics company using decision science. “Decision quality” maps to Leviathan's Analysis loop and the Cognitive Intelligence Engine thesis. How do you measure whether AI-augmented decisions are actually better? Extract their metrics framework — this feeds the reporting architecture and QBR cadence.’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘11:00 AM – 11:30 AM’,
room: ‘Avignon’,
title: ‘When Managers Hold Teams Back: Breaking the Performance Bottleneck’,
speakers: ‘Jenny Podewils (Leapsome), Melisa Miller (TKO EVP CPO), Apple Musni (REI CPO)’,
priority: PRI.OPT,
streams: [STREAMS.SKILLS_WORKFORCE, STREAMS.NETWORKING],
loops: [LOOPS.L6],
why: ‘Leapsome is a performance management platform with AI-native features. Performance bottlenecks connect to Loop 6 (Retention) — the internal mobility and attrition forecasting loop. If managers are the bottleneck, that's a signal the Career Advisor agent needs to account for.’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘11:35 AM – 12:05 PM’,
room: ‘Meursault 1-2’,
title: ‘Why Your Team Doesn't Trust AI (and How to Change That)’,
speakers: ‘Cathy Peterman (Wayfair CPO Tech), Lisa Fiondella (SVP AI, iCIMS), Dan Riley (Google DeepMind)’,
priority: PRI.MUST,
streams: [STREAMS.GOVERNANCE, STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL],
loops: [LOOPS.L5],
why: ‘Google DeepMind's People & Culture lead on a panel about AI trust. iCIMS is a major ATS competitor to Greenhouse. Wayfair's CPO Tech represents a company that has gone all-in on AI. The trust question is THE adoption question for Leviathan. If recruiters don't trust the agents, the system doesn't compound. Extract their trust-building playbook.’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘12:15 PM – 1:00 PM’,
room: ‘Bandol 1’,
title: ‘Your HR Superagent: Reimagining People, Work, and Business Partnership’,
speakers: ‘Josh Bersin, Adit Jain (Leena AI), Amy Farner (Josh Bersin Company)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL],
loops: [LOOPS.L1, LOOPS.L2, LOOPS.L3],
why: ‘Bersin's deep dive on the HR Superagent concept. This is the extended version of the plenary. If Bersin uses “operating system” language, note it — that's external validation of Jose's thesis. Compare his agent taxonomy to your 10-agent suite. What agents does he think matter? What does he think is missing?’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘1:05 PM – 1:35 PM’,
room: ‘Innovation Stage’,
title: ‘Cracked Engineers Are Not On LinkedIn’,
speakers: ‘Bolun Li & Alex Vasquez (Vamo Talent), Jev Wray (Maverixx)’,
priority: PRI.HIGH,
streams: [STREAMS.TALENT_INTEL, STREAMS.VENDOR_INTEL],
loops: [LOOPS.L1, LOOPS.L3],
why: ‘Vamo is building AI-powered engineering talent sourcing that goes beyond LinkedIn. “Cracked engineers” is their language for the highest-performing technical talent. This directly feeds AirCompass — where do you find people LinkedIn doesn't index? Their sourcing methodology is intelligence for the Research loop. Also connects to “Functional Relevance Over Prestige Logic.”’,
brianOrPat: ‘Brian’,
blocker: null,
},
{
time: ‘1:30 PM – 2:00 PM’,
room: ‘Meursault 1-2’,
title: ‘Digital Teammates: Where AI Agents Fit on the Org Chart’,
speakers: ‘Q Hamirani (HighLevel CPO), Nancy Hauge (Automation Anywhere), Danielle Korins’,
priority: PRI.HIGH,
streams: [STREAMS.AI_AGENTS, STREAMS.GOVERNANCE],
loops: [LOOPS.L2, LOOPS.L5],
why: ‘The org chart question for AI agents is the question Jose will ask about Leviathan. Where do agents sit in the operating model? How do you govern them? This session provides language and frameworks for when Jose asks “how do we integrate agents into the team structure?” Have an answer ready.’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘2:40 PM – 3:10 PM’,
room: ‘Avignon’,
title: ‘Turning Talent Conversations into Strategy: Meeting Intelligence’,
speakers: ‘Andrew Bartlow (People Leader Accelerator), Barb Bidan (Ryan LLC CPO), Trent Cotton (Hatchworks AI)’,
priority: PRI.MUST,
streams: [STREAMS.BRIGHTHIRE, STREAMS.AI_AGENTS, STREAMS.TA_OPS],
loops: [LOOPS.L4, LOOPS.L5],
why: ‘This is the BrightHire play. Otter.ai's VP of People is on the panel. Meeting intelligence is the Total Recall thesis — turning scattered conversation data into strategic context. Extract how they convert unstructured meeting data into structured intelligence. This directly informs the Total Recall four-layer architecture (Aggregator → Contextualizer → Researcher → Connector).’,
brianOrPat: ‘Brian’,
blocker: ‘Total Recall architecture validation’,
},
{
time: ‘2:40 PM – 3:10 PM’,
room: ‘Bandol 1’,
title: ‘Future-Proofing the Talent Function for a Changing World of Work’,
speakers: ‘Carolyn Frey (Hungryroot CPO), Becky McCullough (VP TA, HubSpot), Jeff Mooney (VP TA, Toast)’,
priority: PRI.HIGH,
streams: [STREAMS.TA_OPS, STREAMS.NETWORKING],
loops: [LOOPS.L2, LOOPS.L3],
why: ‘Four VP/Head of TA from tech companies (HubSpot, Toast, Dropbox, Hungryroot). These are operators running teams Brian and Pat's size or larger. Peer intelligence on what TA ops actually looks like at scale. What are they investing in? What have they cut?’,
brianOrPat: ‘Pat’,
blocker: null,
},
{
time: ‘2:50 PM – 3:20 PM’,
room: ‘Learning Lab by Deloitte’,
title: ‘Building the People Grid: How HR Can Become Product Builders with AI’,
speakers: ‘Stacey La Torre (CPO, Replit), Nick Co (Field Engineer, Replit)’,
priority: PRI.MUST,
streams: [STREAMS.AI_AGENTS, STREAMS.VENDOR_INTEL, STREAMS.SKILLS_WORKFORCE],
loops: [LOOPS.L2],
why: ‘Replit's CPO and a field engineer showing how HR people become product builders with AI. This is Brian's personal proof-of-concept story validated externally. Non-technical people building production tools. Extract their enablement model — how do they take someone from zero code to shipping? This is the training thesis for the broader recruiting org.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘3:15 PM – 4:00 PM’,
room: ‘Bandol 1’,
title: ‘Measuring TA Success in the World of AI’,
speakers: ‘Tim Sackett (HRUTech.com), Johnny Sanchez (Head of Recruiting Operations, Airbnb)’,
priority: PRI.MUST,
streams: [STREAMS.TA_OPS, STREAMS.AI_AGENTS, STREAMS.NETWORKING],
loops: [LOOPS.L5],
why: ‘JOHNNY IS ON THIS PANEL. Your colleague. Head of Recruiting Ops at Airbnb. On stage at the industry's premier conference. Be in the front row. Take notes. Know his talking points. This is alignment — if Johnny is publicly stating Airbnb's TA measurement philosophy, Leviathan's Analysis loop (Loop 5) needs to deliver exactly that. Post-panel: debrief with Johnny on what resonated from the audience. This is the role reclassification conversation opportunity.’,
brianOrPat: ‘Both’,
blocker: null,
},
{
time: ‘3:25 PM – 3:55 PM’,
room: ‘Learning Lab by Deloitte’,
title: ‘AI@Work: Building Enterprise-Ready AI Governance’,
speakers: ‘James Nicholas Kinney (Chief AI Officer, INVNT)’,
priority: PRI.OPT,
streams: [STREAMS.GOVERNANCE],
loops: [LOOPS.L5],
why: ‘Enterprise AI governance from a Chief AI Officer. If you miss the 3:15 slots, this is fallback governance intel. But Johnny's panel takes priority — no question.’,
brianOrPat: ‘Pat’,
blocker: null,
},
],
},
};

// Connection map: sessions that compound when attended together
const COMPOUNDS = [
{
label: ‘The Superagent Thread’,
sessions: [‘Keeping HR Human (Mon)’, ‘HR Superagent plenary (Wed AM)’, ‘HR Superagent deep dive (Wed PM)’],
insight: ‘Leena AI appears three times. By Wednesday you should have a relationship with Adit Jain. Track how the “Superagent” narrative evolves from competitor framing (Monday) to industry thesis (Wednesday). Note where Leviathan's multi-agent architecture diverges from Leena's single-agent model.’,
loops: [LOOPS.L1, LOOPS.L2],
},
{
label: ‘The TA Operations Pipeline’,
sessions: [‘Greenhouse AI (Mon)’, ‘Zapier AI-Enabled TA (Tue)’, ‘Measuring TA Success / Johnny's panel (Wed)’],
insight: ‘Monday you learn the ATS AI roadmap and push on scorecard access. Tuesday you see real AI TA workflows at Zapier. Wednesday Johnny defines what success looks like publicly. By Wednesday evening you should have: Greenhouse technical contacts + Zapier architecture comparison + Johnny's public measurement framework aligned to Loop 5.’,
loops: [LOOPS.L4, LOOPS.L5],
},
{
label: ‘The Trust Architecture Arc’,
sessions: [‘Governing AI (Tue)’, ‘Fraud & Security in Recruiting (Tue)’, ‘Why Teams Don't Trust AI (Wed)’, ‘Enterprise AI Governance (Wed)’],
insight: ‘Four sessions building the governance case. Start with regulatory framing, move to security perimeter, then adoption trust, then enterprise-ready governance. This arc produces a complete trust architecture you can map onto the Red Lines three-tier system. Bring this back to Jen/Dwetri as external validation for D&B governance integration.’,
loops: [LOOPS.L5],
},
{
label: ‘The Builder Thesis’,
sessions: [‘Zapier AI-Enabled TA (Tue)’, ‘Replit People Grid (Wed)’, ‘Cracked Engineers Not on LinkedIn (Wed)’],
insight: ‘HR people building AI tools (Zapier), HR becoming product builders (Replit), and sourcing beyond the usual platforms (Vamo). Three sessions that validate Brian's personal trajectory: non-technical person builds production AI systems. This is the narrative for Jose, for the CIE thesis, and for the role reclassification conversation.’,
loops: [LOOPS.L1, LOOPS.L2],
},
{
label: ‘The BrightHire / Interview Intelligence Thread’,
sessions: [‘When Everyone Has AI, What Signals a Good Candidate? (Tue)’, ‘Meeting Intelligence (Wed)’, ‘EXP Floor conversations (Tue/Wed)’],
insight: ‘Candidate signal quality in AI-saturated pools (Tue) plus meeting intelligence architecture (Wed) plus booth conversations. This thread produces: (1) BrightHire MCP conversation advanced, (2) Total Recall architecture validated against market, (3) Assessment Agent signal framework. All three feed Loop 4 (Conversion).’,
loops: [LOOPS.L4],
},
];

// Critical blockers to track across the conference
const BLOCKERS = [
{
label: ‘Greenhouse Scorecard Access’,
status: ‘Blocked’,
action: ‘Mon 1 PM session → Mon reception → Tue expo follow-up’,
agent: ‘AirHC’,
loop: ‘Loop 4: Conversion’,
},
{
label: ‘BrightHire MCP API’,
status: ‘Blocked’,
action: ‘Mon reception intro → Tue expo booth → Wed meeting intel session’,
agent: ‘Total Recall’,
loop: ‘Loop 4: Conversion’,
},
{
label: ‘Greenhouse MCP Server Spec’,
status: ‘Not Started’,
action: ‘Mon 1 PM technical contacts → Tue expo conversation → post-conference spec doc’,
agent: ‘AirHC + Leviathan PRD’,
loop: ‘Loop 4: Conversion’,
},
];

export default function TransformSchedule() {
const [activeDay, setActiveDay] = useState(‘monday’);
const [activeStream, setActiveStream] = useState(null);
const [expandedSlot, setExpandedSlot] = useState(null);
const [showCompounds, setShowCompounds] = useState(false);
const [showBlockers, setShowBlockers] = useState(false);
const [personFilter, setPersonFilter] = useState(null);

const days = Object.keys(SCHEDULE);
const dayData = SCHEDULE[activeDay];

const filteredSlots = dayData.slots.filter(slot => {
const streamMatch = !activeStream || slot.streams.some(s => s.label === activeStream);
const personMatch = !personFilter || slot.brianOrPat === personFilter || slot.brianOrPat === ‘Both’ || slot.brianOrPat === ‘Either’;
return streamMatch && personMatch;
});

const toggleExpand = useCallback((i) => {
setExpandedSlot(prev => prev === i ? null : i);
}, []);

const totalMust = Object.values(SCHEDULE).flatMap(d => d.slots).filter(s => s.priority === PRI.MUST).length;
const totalHigh = Object.values(SCHEDULE).flatMap(d => d.slots).filter(s => s.priority === PRI.HIGH).length;
const totalOpt = Object.values(SCHEDULE).flatMap(d => d.slots).filter(s => s.priority === PRI.OPT).length;

return (
<div style={{
fontFamily: CEREAL_FONT,
background: C.white,
minHeight: ‘100vh’,
color: C.hof,
}}>
{/* Header */}
<div style={{
background: `linear-gradient(135deg, ${C.hof} 0%, #1a1a2e 100%)`,
padding: ‘32px 24px 24px’,
color: C.white,
}}>
<div style={{ maxWidth: 960, margin: ‘0 auto’ }}>
<div style={{ display: ‘flex’, alignItems: ‘center’, gap: 12, marginBottom: 8 }}>
<div style={{
width: 44, height: 44, borderRadius: 12,
background: `linear-gradient(135deg, ${C.rausch} 0%, ${C.hackberry} 100%)`,
display: ‘flex’, alignItems: ‘center’, justifyContent: ‘center’,
fontSize: 20, fontWeight: 700,
}}>T</div>
<div>
<div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ‘0.08em’, opacity: 0.7, textTransform: ‘uppercase’ }}>
Transform 2026 · Wynn Las Vegas
</div>
<div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>
Leviathan Optimized Schedule
</div>
</div>
</div>
<div style={{ fontSize: 13, opacity: 0.8, marginTop: 8, lineHeight: 1.5 }}>
Brian + Pat · March 23–25 · Every session mapped to 6 continuous loops + 8 work streams
</div>
{/* Quick stats row */}
<div style={{ display: ‘flex’, gap: 20, marginTop: 16, flexWrap: ‘wrap’ }}>
{[
{ n: totalMust, label: ‘Must Attend’, color: C.rausch },
{ n: totalHigh, label: ‘High Value’, color: C.ondo },
{ n: totalOpt, label: ‘If Available’, color: C.babu },
{ n: BLOCKERS.length, label: ‘Active Blockers’, color: C.arches },
{ n: COMPOUNDS.length, label: ‘Compound Threads’, color: C.spruce },
].map((s, i) => (
<div key={i} style={{ textAlign: ‘center’ }}>
<div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.n}</div>
<div style={{ fontSize: 10, opacity: 0.7, fontWeight: 500, textTransform: ‘uppercase’, letterSpacing: ‘0.04em’ }}>{s.label}</div>
</div>
))}
</div>
</div>
</div>

```
  {/* Day tabs */}
  <div style={{
    background: C.white,
    borderBottom: `1px solid ${C.deco}`,
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 0, padding: '0 24px' }}>
      {days.map(d => (
        <button
          key={d}
          onClick={() => { setActiveDay(d); setExpandedSlot(null); }}
          style={{
            fontFamily: CEREAL_FONT,
            fontSize: 13,
            fontWeight: activeDay === d ? 700 : 500,
            padding: '12px 16px',
            border: 'none',
            borderBottom: activeDay === d ? `2px solid ${C.rausch}` : '2px solid transparent',
            background: 'none',
            color: activeDay === d ? C.hof : C.foggy,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {SCHEDULE[d].date}
        </button>
      ))}
    </div>
  </div>

  {/* Day theme */}
  <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 24px 0' }}>
    <div style={{
      fontSize: 14, fontWeight: 600, color: C.babu,
      padding: '10px 16px',
      background: `${C.babu}08`,
      borderRadius: 8,
      borderLeft: `3px solid ${C.babu}`,
    }}>
      {dayData.theme}
    </div>
  </div>

  {/* Filters */}
  <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px 24px 8px' }}>
    {/* Person filter */}
    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: C.foggy, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Who:</span>
      {[null, 'Brian', 'Pat'].map(p => (
        <button
          key={p || 'all'}
          onClick={() => setPersonFilter(p)}
          style={{
            fontFamily: CEREAL_FONT,
            fontSize: 12,
            fontWeight: personFilter === p ? 600 : 400,
            padding: '4px 12px',
            borderRadius: 16,
            border: `1px solid ${personFilter === p ? C.hof : C.deco}`,
            background: personFilter === p ? C.hof : C.white,
            color: personFilter === p ? C.white : C.foggy,
            cursor: 'pointer',
          }}
        >
          {p || 'Both'}
        </button>
      ))}
    </div>
    {/* Stream filter */}
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: C.foggy, textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Streams:</span>
      <button
        onClick={() => setActiveStream(null)}
        style={{
          fontFamily: CEREAL_FONT,
          fontSize: 11,
          fontWeight: !activeStream ? 600 : 400,
          padding: '3px 10px',
          borderRadius: 12,
          border: `1px solid ${!activeStream ? C.hof : C.deco}`,
          background: !activeStream ? C.hof : C.white,
          color: !activeStream ? C.white : C.foggy,
          cursor: 'pointer',
        }}
      >All</button>
      {Object.values(STREAMS).map(s => (
        <button
          key={s.label}
          onClick={() => setActiveStream(activeStream === s.label ? null : s.label)}
          style={{
            fontFamily: CEREAL_FONT,
            fontSize: 11,
            fontWeight: activeStream === s.label ? 600 : 400,
            padding: '3px 10px',
            borderRadius: 12,
            border: `1px solid ${activeStream === s.label ? s.color : C.deco}`,
            background: activeStream === s.label ? s.color : C.white,
            color: activeStream === s.label ? C.white : C.foggy,
            cursor: 'pointer',
          }}
        >{s.icon} {s.label}</button>
      ))}
    </div>
  </div>

  {/* Toggle buttons row */}
  <div style={{ maxWidth: 960, margin: '0 auto', padding: '8px 24px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <button
      onClick={() => setShowBlockers(!showBlockers)}
      style={{
        fontFamily: CEREAL_FONT,
        fontSize: 12,
        fontWeight: 600,
        padding: '8px 16px',
        borderRadius: 8,
        border: `1px solid ${C.arches}`,
        background: showBlockers ? C.arches : C.white,
        color: showBlockers ? C.white : C.arches,
        cursor: 'pointer',
      }}
    >
      {showBlockers ? '✕ Hide' : '⚠'} Active Blockers ({BLOCKERS.length})
    </button>
    <button
      onClick={() => setShowCompounds(!showCompounds)}
      style={{
        fontFamily: CEREAL_FONT,
        fontSize: 12,
        fontWeight: 600,
        padding: '8px 16px',
        borderRadius: 8,
        border: `1px solid ${C.babu}`,
        background: showCompounds ? C.babu : C.white,
        color: showCompounds ? C.white : C.babu,
        cursor: 'pointer',
      }}
    >
      {showCompounds ? '✕ Hide' : '◈ Show'} Compound Intelligence Threads ({COMPOUNDS.length})
    </button>
  </div>

  {/* Blockers panel */}
  {showBlockers && (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 16px' }}>
      <div style={{
        background: '#FFF5F5',
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${C.arches}22`,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: C.arches }}>
          Vendor Blockers to Unblock at Transform
        </div>
        <div style={{ fontSize: 12, color: C.foggy, marginBottom: 16, lineHeight: 1.5 }}>
          These are active blockers for Leviathan agent builds. Transform is the face-to-face unblocking opportunity.
        </div>
        {BLOCKERS.map((b, i) => (
          <div key={i} style={{
            background: C.white,
            borderRadius: 8,
            padding: 16,
            marginBottom: i < BLOCKERS.length - 1 ? 10 : 0,
            border: `1px solid ${C.deco}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.hof }}>{b.label}</div>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                background: C.arches + '15', color: C.arches, textTransform: 'uppercase',
              }}>{b.status}</span>
            </div>
            <div style={{ fontSize: 12, color: C.foggy, marginBottom: 4 }}>
              <span style={{ fontWeight: 600, color: C.hof }}>Agent:</span> {b.agent} · <span style={{ fontWeight: 600, color: C.hof }}>{b.loop}</span>
            </div>
            <div style={{ fontSize: 12, color: C.babu, fontWeight: 500 }}>
              {b.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Compound threads */}
  {showCompounds && (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 16px' }}>
      <div style={{
        background: '#F0FAFA',
        borderRadius: 12,
        padding: 20,
        border: `1px solid ${C.babu}22`,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: C.babu }}>
          Sessions That Compound Together
        </div>
        <div style={{ fontSize: 12, color: C.foggy, marginBottom: 16, lineHeight: 1.5 }}>
          These are not random groupings. Each thread builds intelligence across days. Attending in sequence creates compounding knowledge that isolated sessions cannot.
        </div>
        {COMPOUNDS.map((c, i) => (
          <div key={i} style={{
            background: C.white,
            borderRadius: 8,
            padding: 16,
            marginBottom: i < COMPOUNDS.length - 1 ? 12 : 0,
            border: `1px solid ${C.deco}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.hof }}>
                {c.label}
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {c.loops.map((l, j) => (
                  <span key={j} style={{
                    fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 3,
                    background: l.color + '15', color: l.color,
                  }}>{l.label}</span>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.foggy, marginBottom: 8 }}>
              {c.sessions.map((s, j) => (
                <span key={j}>
                  <span style={{ color: C.babu, fontWeight: 500 }}>{s}</span>
                  {j < c.sessions.length - 1 && <span style={{ color: C.deco }}> → </span>}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.hof, lineHeight: 1.5, fontStyle: 'italic' }}>
              {c.insight}
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Schedule cards */}
  <div style={{ maxWidth: 960, margin: '0 auto', padding: '8px 24px 48px' }}>
    {filteredSlots.length === 0 && (
      <div style={{ textAlign: 'center', padding: 48, color: C.foggy, fontSize: 14 }}>
        No sessions match this filter combination.
      </div>
    )}
    {filteredSlots.map((slot, i) => {
      const expanded = expandedSlot === i;
      return (
        <div
          key={i}
          onClick={() => toggleExpand(i)}
          style={{
            background: C.white,
            borderRadius: 12,
            border: `1px solid ${expanded ? slot.priority.color + '44' : C.deco}`,
            marginBottom: 12,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: expanded ? `0 4px 20px ${slot.priority.color}11` : 'none',
          }}
        >
          {/* Card header */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: slot.priority.bg,
                    color: slot.priority.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{slot.priority.label}</span>
                  <span style={{ fontSize: 12, color: C.foggy, fontWeight: 500 }}>
                    {slot.time}
                  </span>
                  <span style={{ fontSize: 11, color: C.foggy }}>
                    · {slot.room}
                  </span>
                  {slot.blocker && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 3,
                      background: C.arches + '15', color: C.arches, textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                    }}>BLOCKER</span>
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.hof, lineHeight: 1.3, marginBottom: 4 }}>
                  {slot.title}
                </div>
                {slot.speakers && (
                  <div style={{ fontSize: 12, color: C.foggy, lineHeight: 1.4 }}>
                    {slot.speakers}
                  </div>
                )}
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, minWidth: 80,
              }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 4,
                  background: slot.brianOrPat === 'Both' ? C.rausch + '15' : slot.brianOrPat === 'Brian' ? C.mykonou + '15' : slot.brianOrPat === 'Pat' ? C.spruce + '15' : C.foggy + '15',
                  color: slot.brianOrPat === 'Both' ? C.rausch : slot.brianOrPat === 'Brian' ? C.mykonou : slot.brianOrPat === 'Pat' ? C.spruce : C.foggy,
                }}>
                  {slot.brianOrPat === 'Both' ? 'B + P' : slot.brianOrPat === 'Either' ? 'B / P' : slot.brianOrPat}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: expanded ? C.babu : C.faint,
                  border: `1px solid ${expanded ? C.babu : C.deco}`,
                  transition: 'all 0.2s',
                }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: expanded ? C.white : C.babu,
                    whiteSpace: 'nowrap',
                  }}>
                    {expanded ? 'Close' : 'Why it matters'}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{
                      transform: expanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke={expanded ? C.white : C.babu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            {/* Stream + Loop tags */}
            <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
              {slot.streams.map((s, j) => (
                <span key={`s-${j}`} style={{
                  fontSize: 10,
                  fontWeight: 500,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: s.color + '12',
                  color: s.color,
                }}>
                  {s.icon} {s.label}
                </span>
              ))}
              {slot.loops && slot.loops.map((l, j) => (
                <span key={`l-${j}`} style={{
                  fontSize: 9,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 3,
                  background: l.color + '10',
                  color: l.color,
                  border: `1px solid ${l.color}25`,
                }}>
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* Expanded: Why attend */}
          {expanded && (
            <div style={{
              padding: '0 20px 20px',
              borderTop: `1px solid ${C.faint}`,
              marginTop: 0,
              paddingTop: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.babu, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                Why This Matters for Leviathan
              </div>
              <div style={{ fontSize: 13, color: C.hof, lineHeight: 1.6 }}>
                {slot.why}
              </div>
              {slot.blocker && (
                <div style={{
                  marginTop: 12, padding: '10px 14px', borderRadius: 8,
                  background: C.arches + '08', border: `1px solid ${C.arches}20`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.arches, marginBottom: 2 }}>
                    Blocker to Address
                  </div>
                  <div style={{ fontSize: 12, color: C.hof }}>{slot.blocker}</div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}
  </div>

  {/* Footer */}
  <div style={{
    background: C.faint,
    borderTop: `1px solid ${C.deco}`,
    padding: '24px 24px',
  }}>
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', fontSize: 11, color: C.foggy, lineHeight: 1.8 }}>
        Schedule optimized against 6 continuous loops · 8 Leviathan work streams · 5 compound intelligence threads · 3 active blockers
        <br />
        Split strategy: Brian owns agent architecture + vendor unblocking + Greenhouse/BrightHire conversations
        <br />
        Pat owns governance + skills taxonomy + alternative session coverage when Brian is in blocker sessions
        <br />
        <span style={{ color: C.babu, fontWeight: 600 }}>Johnny’s panel (Wed 3:15 PM) is non-negotiable — both attend, front row.</span>
      </div>
      {/* D&B footer bar */}
      <div style={{
        marginTop: 16,
        padding: '10px 0',
        borderTop: `1px solid ${C.deco}`,
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        {['Outcomes Over Credentials', 'Evidence Over Proxies', 'Barriers Removed', 'Explainability Required'].map((p, i) => (
          <span key={i} style={{ fontSize: 10, fontWeight: 600, color: C.babu, letterSpacing: '0.03em' }}>
            {p}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
```

);
}
