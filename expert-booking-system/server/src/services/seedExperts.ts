import 'dotenv/config';
import { connectDB } from '../config/db';
import { Expert } from '../models/Expert';

const generateSlots = (numDays: number, startOffset: number = 0) => {
  const slots = [];
  const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  for (let i = 0; i < numDays; i++) {
    const date = new Date('2026-05-11');
    date.setDate(date.getDate() + startOffset + i);
    const dateStr = date.toISOString().split('T')[0];
    const shuffled = [...times].sort(() => Math.random() - 0.5);
    slots.push({ date: dateStr, slots: shuffled.slice(0, Math.floor(Math.random() * 3) + 3) });
  }
  return slots;
};

const experts = [
  // --- CAREER (15) ---
  { name: 'Dr. Sarah Mitchell', category: 'Career', experience: 10, rating: 4.8, bio: 'Career strategist with a decade of experience helping professionals pivot and grow in competitive industries.', availableSlots: generateSlots(3, 0) },
  { name: 'Michael Thornton', category: 'Career', experience: 12, rating: 4.7, bio: 'Executive coach and former Fortune 500 HR director specializing in leadership transitions.', availableSlots: generateSlots(3, 1) },
  { name: 'Priya Nair', category: 'Career', experience: 7, rating: 4.9, bio: 'Career counselor helping fresh graduates and mid-level professionals find their dream roles.', availableSlots: generateSlots(3, 2) },
  { name: 'Derek Walsh', category: 'Career', experience: 9, rating: 4.6, bio: 'LinkedIn branding expert and resume coach with a 90% interview conversion rate.', availableSlots: generateSlots(3, 3) },
  { name: 'Fatima Al-Hassan', category: 'Career', experience: 11, rating: 4.8, bio: 'International career consultant helping professionals navigate cross-cultural job markets.', availableSlots: generateSlots(3, 0) },
  { name: 'Tom Nguyen', category: 'Career', experience: 6, rating: 4.5, bio: 'Startup career specialist guiding professionals into high-growth early-stage companies.', availableSlots: generateSlots(3, 1) },
  { name: 'Rachel Simmons', category: 'Career', experience: 14, rating: 4.9, bio: 'Author and career coach focused on women in leadership and executive advancement.', availableSlots: generateSlots(3, 2) },
  { name: 'Carlos Mendez', category: 'Career', experience: 8, rating: 4.7, bio: 'FAANG recruiter turned career advisor helping candidates ace technical hiring processes.', availableSlots: generateSlots(3, 3) },
  { name: 'Hannah Lee', category: 'Career', experience: 5, rating: 4.6, bio: 'Creative industry career coach for designers, marketers, and media professionals.', availableSlots: generateSlots(3, 0) },
  { name: 'Samuel Okafor', category: 'Career', experience: 13, rating: 4.8, bio: 'Global talent strategist with experience in emerging markets and multinational corporations.', availableSlots: generateSlots(3, 1) },
  { name: 'Ling Wei', category: 'Career', experience: 9, rating: 4.7, bio: 'Career transition specialist helping corporate professionals move into entrepreneurship.', availableSlots: generateSlots(3, 2) },
  { name: 'Natasha Ivanova', category: 'Career', experience: 10, rating: 4.6, bio: 'Negotiation coach helping professionals maximize compensation and benefits packages.', availableSlots: generateSlots(3, 3) },
  { name: 'Ben Harper', category: 'Career', experience: 7, rating: 4.5, bio: 'Remote work specialist helping distributed teams and nomadic professionals thrive.', availableSlots: generateSlots(3, 0) },
  { name: 'Divya Sharma', category: 'Career', experience: 8, rating: 4.8, bio: 'MBA admissions and career counselor for aspiring business school students.', availableSlots: generateSlots(3, 1) },
  { name: 'Oliver Grant', category: 'Career', experience: 15, rating: 4.9, bio: 'C-suite career consultant and board advisor with 150+ senior placements.', availableSlots: generateSlots(3, 2) },

  // --- FINANCE (15) ---
  { name: 'James Carter', category: 'Finance', experience: 8, rating: 4.7, bio: 'Certified financial advisor specializing in personal wealth management and retirement planning.', availableSlots: generateSlots(3, 0) },
  { name: 'Dr. Linda Zhao', category: 'Finance', experience: 16, rating: 4.9, bio: 'Economist and financial planner helping families build generational wealth through smart investing.', availableSlots: generateSlots(3, 1) },
  { name: 'Marcus Bell', category: 'Finance', experience: 10, rating: 4.8, bio: 'Chartered accountant specializing in tax optimization for freelancers and small businesses.', availableSlots: generateSlots(3, 2) },
  { name: 'Sophia Patel', category: 'Finance', experience: 7, rating: 4.6, bio: 'Personal finance coach helping millennials eliminate debt and build savings from scratch.', availableSlots: generateSlots(3, 3) },
  { name: 'Robert Kim', category: 'Finance', experience: 12, rating: 4.8, bio: 'Investment strategist with expertise in equity markets, ETFs, and passive income portfolios.', availableSlots: generateSlots(3, 0) },
  { name: 'Amara Diallo', category: 'Finance', experience: 9, rating: 4.7, bio: 'Microfinance and impact investing advisor with a background in development economics.', availableSlots: generateSlots(3, 1) },
  { name: 'George Papadopoulos', category: 'Finance', experience: 11, rating: 4.6, bio: 'Real estate investment consultant helping clients build property portfolios across markets.', availableSlots: generateSlots(3, 2) },
  { name: 'Claire Dubois', category: 'Finance', experience: 8, rating: 4.7, bio: 'Certified financial planner specializing in expat finance and cross-border wealth management.', availableSlots: generateSlots(3, 3) },
  { name: 'Raj Verma', category: 'Finance', experience: 14, rating: 4.9, bio: 'Venture capital advisor and startup CFO mentor with expertise in fundraising and financial modeling.', availableSlots: generateSlots(3, 0) },
  { name: 'Emma Blackwood', category: 'Finance', experience: 6, rating: 4.5, bio: 'Budgeting coach for young professionals and recent graduates starting their financial journey.', availableSlots: generateSlots(3, 1) },
  { name: 'Hiroshi Tanaka', category: 'Finance', experience: 13, rating: 4.8, bio: 'Options and derivatives strategist with 13 years in institutional trading.', availableSlots: generateSlots(3, 2) },
  { name: 'Ngozi Adeyemi', category: 'Finance', experience: 10, rating: 4.7, bio: 'Cryptocurrency and blockchain financial advisor with expertise in DeFi investment strategies.', availableSlots: generateSlots(3, 3) },
  { name: 'Stefan Müller', category: 'Finance', experience: 9, rating: 4.6, bio: 'ESG investing expert helping clients align portfolios with sustainable and ethical principles.', availableSlots: generateSlots(3, 0) },
  { name: 'Patricia Owens', category: 'Finance', experience: 17, rating: 4.9, bio: 'Estate planning and insurance specialist helping high-net-worth families protect their assets.', availableSlots: generateSlots(3, 1) },
  { name: 'Arjun Malhotra', category: 'Finance', experience: 8, rating: 4.7, bio: 'SME financial consultant helping small businesses with cash flow, lending, and growth financing.', availableSlots: generateSlots(3, 2) },

  // --- TECH (15) ---
  { name: 'Aisha Khan', category: 'Tech', experience: 6, rating: 4.9, bio: 'Senior software engineer and engineering mentor helping developers level up in system design.', availableSlots: generateSlots(3, 0) },
  { name: 'Daniel Park', category: 'Tech', experience: 9, rating: 4.8, bio: 'Full-stack developer and technical interview coach with a 95% offer rate among mentees.', availableSlots: generateSlots(3, 1) },
  { name: 'Mei-Lin Chen', category: 'Tech', experience: 11, rating: 4.7, bio: 'Machine learning engineer specializing in NLP and LLM fine-tuning for production applications.', availableSlots: generateSlots(3, 2) },
  { name: 'Luca Ferrari', category: 'Tech', experience: 8, rating: 4.6, bio: 'DevOps and cloud architecture expert with extensive experience in AWS and Kubernetes.', availableSlots: generateSlots(3, 3) },
  { name: 'Yusuf Ibrahim', category: 'Tech', experience: 7, rating: 4.8, bio: 'Cybersecurity consultant helping startups build secure infrastructure from the ground up.', availableSlots: generateSlots(3, 0) },
  { name: 'Sandra Kowalski', category: 'Tech', experience: 12, rating: 4.9, bio: 'Product engineering leader with experience scaling teams at Series A through IPO-stage companies.', availableSlots: generateSlots(3, 1) },
  { name: 'Kevin Tran', category: 'Tech', experience: 5, rating: 4.7, bio: 'Mobile developer and app monetization specialist for iOS and Android platforms.', availableSlots: generateSlots(3, 2) },
  { name: 'Dr. Ananya Bose', category: 'Tech', experience: 14, rating: 4.9, bio: 'AI researcher and data science mentor helping professionals transition into the AI field.', availableSlots: generateSlots(3, 3) },
  { name: 'Ethan Brooks', category: 'Tech', experience: 10, rating: 4.8, bio: 'Blockchain developer and Web3 architect with experience building DApps and smart contracts.', availableSlots: generateSlots(3, 0) },
  { name: 'Zara Ahmed', category: 'Tech', experience: 6, rating: 4.6, bio: 'Frontend engineering mentor specializing in React, performance optimization, and accessibility.', availableSlots: generateSlots(3, 1) },
  { name: 'Nathan Cole', category: 'Tech', experience: 13, rating: 4.8, bio: 'CTO coach helping technical founders build and manage high-performing engineering teams.', availableSlots: generateSlots(3, 2) },
  { name: 'Pooja Rajan', category: 'Tech', experience: 8, rating: 4.7, bio: 'Data engineering specialist with expertise in pipelines, data lakes, and real-time analytics.', availableSlots: generateSlots(3, 3) },
  { name: 'André Laurent', category: 'Tech', experience: 9, rating: 4.6, bio: 'QA engineering and test automation expert helping teams ship reliable software faster.', availableSlots: generateSlots(3, 0) },
  { name: 'Victoria Osei', category: 'Tech', experience: 7, rating: 4.8, bio: 'Tech career switcher coach helping non-CS backgrounds break into software engineering.', availableSlots: generateSlots(3, 1) },
  { name: 'Bryan Nakamura', category: 'Tech', experience: 11, rating: 4.9, bio: 'Site reliability engineer and platform architect with experience at hyperscale companies.', availableSlots: generateSlots(3, 2) },

  // --- HEALTH (10) ---
  { name: 'Dr. Helen Rogers', category: 'Health', experience: 15, rating: 4.9, bio: 'Preventive medicine physician helping individuals build sustainable healthy lifestyles.', availableSlots: generateSlots(3, 0) },
  { name: 'Marcus Johnson', category: 'Health', experience: 8, rating: 4.7, bio: 'Certified nutritionist and metabolic health coach specializing in evidence-based dietary plans.', availableSlots: generateSlots(3, 1) },
  { name: 'Dr. Priyanka Rao', category: 'Health', experience: 12, rating: 4.8, bio: 'Integrative medicine doctor combining conventional and holistic approaches for chronic conditions.', availableSlots: generateSlots(3, 2) },
  { name: 'Jake Freeman', category: 'Health', experience: 7, rating: 4.6, bio: 'Strength and conditioning coach for busy professionals seeking efficient, science-backed fitness.', availableSlots: generateSlots(3, 3) },
  { name: 'Amelia Obi', category: 'Health', experience: 10, rating: 4.8, bio: 'Sleep health specialist helping clients overcome insomnia and optimize recovery.', availableSlots: generateSlots(3, 0) },
  { name: 'Dr. James Whitfield', category: 'Health', experience: 18, rating: 4.9, bio: 'Sports medicine physician with experience working with Olympic and professional athletes.', availableSlots: generateSlots(3, 1) },
  { name: 'Nina Petrova', category: 'Health', experience: 9, rating: 4.7, bio: 'Gut health and microbiome nutritionist helping clients resolve digestive and autoimmune issues.', availableSlots: generateSlots(3, 2) },
  { name: 'Tony Castillo', category: 'Health', experience: 6, rating: 4.5, bio: 'Certified personal trainer and lifestyle coach focused on sustainable weight management.', availableSlots: generateSlots(3, 3) },
  { name: 'Dr. Yuki Matsuda', category: 'Health', experience: 13, rating: 4.8, bio: 'Functional medicine practitioner specializing in hormonal health and longevity optimization.', availableSlots: generateSlots(3, 0) },
  { name: 'Sharon Adebayo', category: 'Health', experience: 11, rating: 4.7, bio: "Women's health coach specializing in PCOS, fertility, and prenatal wellness.", availableSlots: generateSlots(3, 1) },

  // --- LEGAL (10) ---
  { name: 'Advocate Ravi Shankar', category: 'Legal', experience: 14, rating: 4.8, bio: 'Corporate lawyer specializing in contracts, IP protection, and startup legal structuring.', availableSlots: generateSlots(3, 0) },
  { name: 'Jennifer Walsh', category: 'Legal', experience: 10, rating: 4.7, bio: 'Employment law consultant helping both employees and employers navigate workplace disputes.', availableSlots: generateSlots(3, 1) },
  { name: 'Dr. Kwame Asante', category: 'Legal', experience: 16, rating: 4.9, bio: 'International trade and commercial law expert advising businesses on cross-border operations.', availableSlots: generateSlots(3, 2) },
  { name: 'Laura Fitzgerald', category: 'Legal', experience: 9, rating: 4.6, bio: 'Family law attorney guiding clients through divorce, custody, and estate matters with compassion.', availableSlots: generateSlots(3, 3) },
  { name: 'Hassan El-Amin', category: 'Legal', experience: 12, rating: 4.8, bio: 'Immigration lawyer helping professionals and families navigate visa, PR, and citizenship processes.', availableSlots: generateSlots(3, 0) },
  { name: 'Catherine Bloom', category: 'Legal', experience: 11, rating: 4.7, bio: 'Data privacy and GDPR compliance consultant for tech companies and digital platforms.', availableSlots: generateSlots(3, 1) },
  { name: 'Sanjay Gupta', category: 'Legal', experience: 8, rating: 4.6, bio: 'Tax law specialist helping individuals and SMEs with compliance, disputes, and planning.', availableSlots: generateSlots(3, 2) },
  { name: 'Monica Hernandez', category: 'Legal', experience: 13, rating: 4.8, bio: 'Real estate attorney with expertise in commercial and residential property transactions.', availableSlots: generateSlots(3, 3) },
  { name: 'Peter Larsson', category: 'Legal', experience: 10, rating: 4.7, bio: 'Intellectual property attorney helping creators and inventors protect their innovations.', availableSlots: generateSlots(3, 0) },
  { name: 'Adaeze Eze', category: 'Legal', experience: 7, rating: 4.5, bio: 'Legal tech consultant helping law firms and startups automate and modernize legal workflows.', availableSlots: generateSlots(3, 1) },

  // --- MARKETING (10) ---
  { name: 'Sophie Turner', category: 'Marketing', experience: 9, rating: 4.8, bio: 'Growth marketing strategist with expertise in performance ads, SEO, and conversion optimization.', availableSlots: generateSlots(3, 0) },
  { name: 'Chris Malone', category: 'Marketing', experience: 11, rating: 4.7, bio: 'Brand strategist helping startups and SMEs build memorable, differentiated brand identities.', availableSlots: generateSlots(3, 1) },
  { name: 'Rina Kapoor', category: 'Marketing', experience: 7, rating: 4.6, bio: 'Social media marketing expert helping businesses grow organic audiences across platforms.', availableSlots: generateSlots(3, 2) },
  { name: 'David Owusu', category: 'Marketing', experience: 10, rating: 4.8, bio: 'Content marketing strategist helping B2B companies generate leads through thought leadership.', availableSlots: generateSlots(3, 3) },
  { name: 'Isabelle Martin', category: 'Marketing', experience: 12, rating: 4.9, bio: 'Email and CRM marketing consultant maximizing customer lifetime value for e-commerce brands.', availableSlots: generateSlots(3, 0) },
  { name: 'Alex Novak', category: 'Marketing', experience: 8, rating: 4.7, bio: 'Influencer marketing and creator economy strategist for consumer brands.', availableSlots: generateSlots(3, 1) },
  { name: 'Tolu Adeoye', category: 'Marketing', experience: 6, rating: 4.5, bio: 'Video and YouTube marketing specialist helping brands grow engaged audiences through storytelling.', availableSlots: generateSlots(3, 2) },
  { name: 'Claudia Reyes', category: 'Marketing', experience: 14, rating: 4.9, bio: 'CMO advisor and fractional marketing leader for Series A and B tech startups.', availableSlots: generateSlots(3, 3) },
  { name: 'Eric Sundaram', category: 'Marketing', experience: 9, rating: 4.6, bio: 'Product marketing specialist bridging the gap between product development and go-to-market.', availableSlots: generateSlots(3, 0) },
  { name: 'Becky Williamson', category: 'Marketing', experience: 10, rating: 4.7, bio: 'Community-led growth strategist helping SaaS companies build engaged user communities.', availableSlots: generateSlots(3, 1) },

  // --- EDUCATION (10) ---
  { name: 'Prof. Alan Bishop', category: 'Education', experience: 20, rating: 4.9, bio: 'Former Oxford educator and academic coach helping students excel in higher education.', availableSlots: generateSlots(3, 0) },
  { name: 'Maria Santos', category: 'Education', experience: 12, rating: 4.8, bio: 'K-12 curriculum designer and edtech consultant helping schools modernize learning.', availableSlots: generateSlots(3, 1) },
  { name: 'Dr. Felix Oduya', category: 'Education', experience: 15, rating: 4.7, bio: 'PhD and research advisor helping graduate students structure and complete their dissertations.', availableSlots: generateSlots(3, 2) },
  { name: 'Grace Kim', category: 'Education', experience: 8, rating: 4.6, bio: 'Online course creator and instructional designer helping experts monetize their knowledge.', availableSlots: generateSlots(3, 3) },
  { name: 'Jonathan Price', category: 'Education', experience: 10, rating: 4.8, bio: 'Standardized test prep coach specializing in SAT, GMAT, and GRE strategy.', availableSlots: generateSlots(3, 0) },
  { name: 'Dr. Layla Hassan', category: 'Education', experience: 13, rating: 4.9, bio: 'STEM education specialist helping underrepresented students access top university programs.', availableSlots: generateSlots(3, 1) },
  { name: "Patrick O'Brien", category: 'Education', experience: 9, rating: 4.7, bio: 'Language learning coach with expertise in accelerated acquisition methods for professionals.', availableSlots: generateSlots(3, 2) },
  { name: 'Sunita Pillai', category: 'Education', experience: 11, rating: 4.8, bio: 'Special education consultant helping parents and schools support neurodiverse learners.', availableSlots: generateSlots(3, 3) },
  { name: 'Aaron Mensah', category: 'Education', experience: 7, rating: 4.6, bio: 'Educational psychologist helping students overcome learning blocks and exam anxiety.', availableSlots: generateSlots(3, 0) },
  { name: 'Tanya Sorokin', category: 'Education', experience: 14, rating: 4.9, bio: 'University admissions consultant helping students craft winning applications to top global schools.', availableSlots: generateSlots(3, 1) },

  // --- BUSINESS (10) ---
  { name: 'Bruce Hartley', category: 'Business', experience: 18, rating: 4.9, bio: 'Serial entrepreneur and business strategist having co-founded three successful exits.', availableSlots: generateSlots(3, 0) },
  { name: 'Deepa Nambiar', category: 'Business', experience: 11, rating: 4.8, bio: 'Operations consultant helping SMEs streamline processes and scale efficiently.', availableSlots: generateSlots(3, 1) },
  { name: 'Mark Sullivan', category: 'Business', experience: 14, rating: 4.7, bio: 'Franchise business advisor helping entrepreneurs evaluate and launch franchise opportunities.', availableSlots: generateSlots(3, 2) },
  { name: 'Cynthia Obi', category: 'Business', experience: 9, rating: 4.6, bio: 'E-commerce business coach helping sellers scale on Amazon, Shopify, and global marketplaces.', availableSlots: generateSlots(3, 3) },
  { name: 'Dr. Hassan Malik', category: 'Business', experience: 16, rating: 4.9, bio: 'Corporate strategy advisor with consulting experience at McKinsey and Bain.', availableSlots: generateSlots(3, 0) },
  { name: 'Anna Volkov', category: 'Business', experience: 10, rating: 4.7, bio: 'Supply chain and procurement consultant helping businesses reduce costs and improve resilience.', availableSlots: generateSlots(3, 1) },
  { name: 'Jerome Baptiste', category: 'Business', experience: 12, rating: 4.8, bio: 'Social enterprise coach helping mission-driven founders build sustainable impact businesses.', availableSlots: generateSlots(3, 2) },
  { name: 'Leila Nazari', category: 'Business', experience: 8, rating: 4.6, bio: 'SaaS business model expert helping founders design pricing, packaging, and GTM strategies.', availableSlots: generateSlots(3, 3) },
  { name: 'Thomas Acheampong', category: 'Business', experience: 13, rating: 4.8, bio: 'African market entry strategist helping international companies expand into emerging economies.', availableSlots: generateSlots(3, 0) },
  { name: 'Isabella Conti', category: 'Business', experience: 9, rating: 4.7, bio: 'Business plan and pitch deck consultant helping founders raise seed and Series A funding.', availableSlots: generateSlots(3, 1) },

  // --- DESIGN (8) ---
  { name: 'Kai Yoshida', category: 'Design', experience: 9, rating: 4.8, bio: 'UX/UI designer and design systems architect helping product teams ship beautiful, usable software.', availableSlots: generateSlots(3, 0) },
  { name: 'Amara Nwosu', category: 'Design', experience: 7, rating: 4.7, bio: 'Brand and visual identity designer helping companies create distinctive, lasting impressions.', availableSlots: generateSlots(3, 1) },
  { name: 'Felix Bergmann', category: 'Design', experience: 11, rating: 4.8, bio: 'Motion design and video production mentor for creatives entering the commercial industry.', availableSlots: generateSlots(3, 2) },
  { name: 'Serena Chow', category: 'Design', experience: 8, rating: 4.6, bio: 'Product designer specializing in mobile-first interfaces and user research methodologies.', availableSlots: generateSlots(3, 3) },
  { name: 'Remy Fontaine', category: 'Design', experience: 12, rating: 4.9, bio: 'Design thinking facilitator helping cross-functional teams solve complex problems creatively.', availableSlots: generateSlots(3, 0) },
  { name: 'Nadia El-Sayed', category: 'Design', experience: 6, rating: 4.5, bio: 'Fashion and textile designer transitioning professionals into sustainable fashion careers.', availableSlots: generateSlots(3, 1) },
  { name: 'Lucas Rodrigues', category: 'Design', experience: 10, rating: 4.7, bio: '3D visualization and AR/VR design consultant for architecture and product industries.', availableSlots: generateSlots(3, 2) },
  { name: 'Suki Park', category: 'Design', experience: 9, rating: 4.8, bio: 'Packaging and industrial design expert helping CPG brands create shelf-winning products.', availableSlots: generateSlots(3, 3) },

  // --- MENTAL HEALTH (9) ---
  { name: 'Dr. Omotola Adeyemi', category: 'Mental Health', experience: 12, rating: 4.9, bio: 'Clinical psychologist specializing in anxiety, burnout, and workplace stress management.', availableSlots: generateSlots(3, 0) },
  { name: 'Paul Steiner', category: 'Mental Health', experience: 9, rating: 4.8, bio: 'Mindfulness and resilience coach helping executives manage high-pressure environments.', availableSlots: generateSlots(3, 1) },
  { name: 'Dr. Meera Krishnamurthy', category: 'Mental Health', experience: 15, rating: 4.9, bio: 'Therapist specializing in CBT and ACT for depression, grief, and relationship challenges.', availableSlots: generateSlots(3, 2) },
  { name: 'Jordan Ellis', category: 'Mental Health', experience: 7, rating: 4.7, bio: 'Life coach and NLP practitioner helping individuals overcome limiting beliefs and find purpose.', availableSlots: generateSlots(3, 3) },
  { name: 'Dr. Fatou Diop', category: 'Mental Health', experience: 11, rating: 4.8, bio: 'Trauma-informed therapist helping survivors of childhood and workplace trauma heal and thrive.', availableSlots: generateSlots(3, 0) },
  { name: 'Lena Hoffmann', category: 'Mental Health', experience: 8, rating: 4.6, bio: 'Couples therapist and relationship coach helping partners communicate and reconnect.', availableSlots: generateSlots(3, 1) },
  { name: 'Dr. Mohammed Al-Farsi', category: 'Mental Health', experience: 14, rating: 4.9, bio: 'Psychiatrist and mental wellness educator bridging clinical care and everyday well-being.', availableSlots: generateSlots(3, 2) },
  { name: 'Chiara Ricci', category: 'Mental Health', experience: 6, rating: 4.5, bio: 'Somatic therapist helping clients release trauma stored in the body through movement and breath.', availableSlots: generateSlots(3, 3) },
  { name: 'Dr. Aarav Seth', category: 'Mental Health', experience: 10, rating: 4.7, bio: 'Positive psychology practitioner helping individuals build flourishing, meaningful lives.', availableSlots: generateSlots(3, 0) },
];

(async () => {
  await connectDB(process.env.MONGODB_URI || '');
  await Expert.deleteMany({});
  await Expert.insertMany(experts);
  const categories = [...new Set(experts.map((e) => e.category))];
  console.log(`✅ Successfully seeded ${experts.length} experts across ${categories.length} categories`);
  console.log(`   Categories: ${categories.join(', ')}`);
  process.exit(0);
})();
