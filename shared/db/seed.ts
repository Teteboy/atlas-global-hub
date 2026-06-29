import { db } from "./src/index";
import { servicesTable } from "./src/schema/services";
import { projectsTable } from "./src/schema/projects";
import { insightsTable } from "./src/schema/insights";
import { sectorsTable } from "./src/schema/sectors";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(sectorsTable);
  await db.delete(insightsTable);
  await db.delete(projectsTable);
  await db.delete(servicesTable);

  // Seed services - 5 service baskets from document
  await db.insert(servicesTable).values([
    {
      slug: "digital-economy-productivity-competitiveness",
      titleFr: "Digital Economy, Productivity & Compétitivité",
      titleEn: "Digital Economy, Productivity & Competitiveness",
      taglineFr: "Accélérer la transformation numérique et la performance productive",
      taglineEn: "Accelerate digital transformation and productive performance",
      descriptionFr: "Diagnostics, feuilles de route, pilotes, PMO, modernisation de services, compétitivité des PME, préparation AfCFTA.",
      descriptionEn: "Diagnostics, roadmaps, pilots, PMO, service modernization, SME competitiveness, AfCFTA preparation.",
      icon: "laptop",
      color: "#00C4D4",
      deliverablesFr: ["Stratégie numérique", "Feuilles de route", "Pilotes", "PMO", "Modernisation de services", "Compétitivité PME", "Préparation AfCFTA"],
      deliverablesEn: ["Digital strategy", "Roadmaps", "Pilots", "PMO", "Service modernization", "SME competitiveness", "AfCFTA preparation"],
      mandateExamplesFr: ["Transformation numérique", "Compétitivité productive", "Modernisation de services"],
      mandateExamplesEn: ["Digital transformation", "Productive competitiveness", "Service modernization"],
      order: 1,
    },
    {
      slug: "education-skills-institutional-transformation",
      titleFr: "Education, Skills & Transformation Institutionnelle",
      titleEn: "Education, Skills & Institutional Transformation",
      taglineFr: "Transformer des plateformes d'apprentissage en moteurs de valeur et d'employabilité",
      taglineEn: "Transform learning platforms into value and employability engines",
      descriptionFr: "Transformation de centres, monétisation d'offres, compétences, employabilité, climate-smart education, continuité pédagogique.",
      descriptionEn: "Center transformation, offer monetization, skills, employability, climate-smart education, pedagogical continuity.",
      icon: "graduation-cap",
      color: "#6366F1",
      deliverablesFr: ["Transformation de centres", "Monétisation d'offres", "Compétences", "Employabilité", "Climate-smart education", "Continuité pédagogique"],
      deliverablesEn: ["Center transformation", "Offer monetization", "Skills", "Employability", "Climate-smart education", "Pedagogical continuity"],
      mandateExamplesFr: ["Réforme éducative", "Transformation de plateformes", "Compétences et employabilité"],
      mandateExamplesEn: ["Educational reform", "Platform transformation", "Skills and employability"],
      order: 2,
    },
    {
      slug: "climate-action-green-finance-resilience",
      titleFr: "Climate Action, Green Finance & Résilience",
      titleEn: "Climate Action, Green Finance & Resilience",
      taglineFr: "Préparer des initiatives plus résilientes, plus finançables et plus crédibles",
      taglineEn: "Prepare more resilient, fundable and credible initiatives",
      descriptionFr: "Pipelines d'adaptation, concepts de green facility, bankable projects, résilience communautaire, systèmes éducatifs résilients.",
      descriptionEn: "Adaptation pipelines, green facility concepts, bankable projects, community resilience, resilient education systems.",
      icon: "leaf",
      color: "#10B981",
      deliverablesFr: ["Pipelines d'adaptation", "Concepts de green facility", "Bankable projects", "Résilience communautaire", "Systèmes éducatifs résilients"],
      deliverablesEn: ["Adaptation pipelines", "Green facility concepts", "Bankable projects", "Community resilience", "Resilient education systems"],
      mandateExamplesFr: ["Finance verte", "Résilience climatique", "Projets bankables"],
      mandateExamplesEn: ["Green finance", "Climate resilience", "Bankable projects"],
      order: 3,
    },
    {
      slug: "partnerships-globalization-strategic-positioning",
      titleFr: "Partnerships, Globalization & Positionnement Stratégique",
      titleEn: "Partnerships, Globalization & Strategic Positioning",
      taglineFr: "Créer des corridors de coopération, de marché et de mise en œuvre",
      taglineEn: "Create cooperation, market and implementation corridors",
      descriptionFr: "Canada–Afrique, Canada–Europe–Afrique, notes stratégiques, partenariats, convening, local value creation.",
      descriptionEn: "Canada–Africa, Canada–Europe–Africa, strategic notes, partnerships, convening, local value creation.",
      icon: "globe",
      color: "#F59E0B",
      deliverablesFr: ["Corridors Canada–Afrique", "Corridors Canada–Europe–Afrique", "Notes stratégiques", "Partenariats", "Convening", "Local value creation"],
      deliverablesEn: ["Canada–Africa corridors", "Canada–Europe–Africa corridors", "Strategic notes", "Partnerships", "Convening", "Local value creation"],
      mandateExamplesFr: ["Corridors commerciaux", "Partenariats internationaux", "Positionnement stratégique"],
      mandateExamplesEn: ["Trade corridors", "International partnerships", "Strategic positioning"],
      order: 4,
    },
    {
      slug: "governance-pmo-political-economy-navigation",
      titleFr: "Governance, PMO & Navigation Économie Politique",
      titleEn: "Governance, PMO & Political-Economy Navigation",
      taglineFr: "Sécuriser l'exécution dans des environnements complexes",
      taglineEn: "Secure execution in complex environments",
      descriptionFr: "PMO, cartographie des parties prenantes, séquençage des réformes, reporting, coordination, delivery support.",
      descriptionEn: "PMO, stakeholder mapping, reform sequencing, reporting, coordination, delivery support.",
      icon: "shield",
      color: "#EC4899",
      deliverablesFr: ["PMO", "Cartographie des parties prenantes", "Séquençage des réformes", "Reporting", "Coordination", "Delivery support"],
      deliverablesEn: ["PMO", "Stakeholder mapping", "Reform sequencing", "Reporting", "Coordination", "Delivery support"],
      mandateExamplesFr: ["Gouvernance", "PMO", "Réformes institutionnelles"],
      mandateExamplesEn: ["Governance", "PMO", "Institutional reforms"],
      order: 5,
    },
  ]);

  // Seed projects - from document specifications
  await db.insert(projectsTable).values([
    {
      titleFr: "Renforcer l'employabilité des femmes et la croissance verte par les compétences, le numérique et l'inclusion",
      titleEn: "Strengthening women's employability and green growth through skills, digital and inclusion",
      taglineFr: "Projet pilote régional axé sur les compétences, l'employabilité des femmes et la croissance sobre en carbone en Afrique centrale",
      taglineEn: "Regional pilot project focused on skills, women's employability and low-carbon growth in Central Africa",
      challengeFr: "Besoin de développer des compétences et l'employabilité féminine dans des filières sobres en carbone",
      challengeEn: "Need to develop skills and female employability in low-carbon sectors",
      approachFr: "Un projet qui relie développement des compétences, inclusion, numérique, employabilité féminine et besoins du marché du travail dans des filières sobres en carbone",
      approachEn: "A project linking skills development, inclusion, digital, female employability and labor market needs in low-carbon sectors",
      scopeFr: "Cameroun, République centrafricaine et Tchad",
      scopeEn: "Cameroon, Central African Republic and Chad",
      resultFr: "Résilience Economique de la Femme en Univers Sobre en Carbone (REFUS-Carbone)",
      resultEn: "Economic Resilience of Women in a Low-Carbon Environment (REFUS-Carbone)",
      countries: ["Cameroun", "République centrafricaine", "Tchad"],
      duration: "14 mois",
      budget: "149 110,38 EUR",
      funder: "AUF / PRICNAC",
      category: "Compétences & Climat",
      featured: true,
    },
    {
      titleFr: "Concevoir des dispositifs de formation hybrides, inclusifs et résilients en contexte de crise",
      titleEn: "Designing hybrid, inclusive and resilient training devices in crisis contexts",
      taglineFr: "Initiative de renforcement de la gouvernance pédagogique, de la formation des enseignants et de l'innovation éducative dans un environnement numérique et plurilingue",
      taglineEn: "Initiative to strengthen pedagogical governance, teacher training and educational innovation in a digital and multilingual environment",
      challengeFr: "Besoin de dispositifs de formation résilients en contexte de crise",
      challengeEn: "Need for resilient training devices in crisis contexts",
      approachFr: "Une référence forte pour illustrer la capacité à articuler gouvernance, contenus, numérique, hybridation pédagogique, résilience et qualité de l'apprentissage",
      approachEn: "A strong reference to illustrate the ability to articulate governance, content, digital, pedagogical hybridization, resilience and learning quality",
      scopeFr: "Cameroun, RCA et Tchad",
      scopeEn: "Cameroon, CAR and Chad",
      resultFr: "Dispositifs de formation hybrides et résilients opérationnels",
      resultEn: "Operational hybrid and resilient training devices",
      countries: ["Cameroun", "République centrafricaine", "Tchad"],
      duration: "01/04/2021 au 31/12/2023",
      budget: "1 425 700 EUR",
      funder: "CRDI",
      category: "Éducation & Gouvernance",
      featured: true,
    },
  ]);

  // Seed insights - based on document themes
  await db.insert(insightsTable).values([
    {
      titleFr: "Les corridors Canada–Afrique : opportunités et défis",
      titleEn: "Canada–Africa corridors: opportunities and challenges",
      summaryFr: "Analyse des mécanismes de coopération et des corridors stratégiques entre le Canada et l'Afrique",
      summaryEn: "Analysis of cooperation mechanisms and strategic corridors between Canada and Africa",
      bodyFr: "Les corridors transatlantiques représentent une opportunité unique pour renforcer les liens économiques et politiques entre le Canada et l'Afrique. Cet article explore les mécanismes existants et propose des pistes pour une collaboration accrue.",
      bodyEn: "Transatlantic corridors represent a unique opportunity to strengthen economic and political ties between Canada and Africa. This article explores existing mechanisms and proposes avenues for increased collaboration.",
      category: "Corridors",
      featured: true,
    },
    {
      titleFr: "Compétitivité des PME dans l'espace AfCFTA",
      titleEn: "SME competitiveness in the AfCFTA space",
      summaryFr: "Stratégies pour préparer les PME africaines à la Zone de Libre-Échange Continentale Africaine",
      summaryEn: "Strategies to prepare African SMEs for the African Continental Free Trade Area",
      bodyFr: "La Zone de Libre-Échange Continentale Africaine (AfCFTA) offre des opportunités sans précédent pour les PME africaines. Nous examinons les défis et les stratégies de préparation.",
      bodyEn: "The African Continental Free Trade Area (AfCFTA) offers unprecedented opportunities for African SMEs. We examine the challenges and preparation strategies.",
      category: "Compétitivité",
      featured: true,
    },
    {
      titleFr: "Climate-smart education : former pour l'avenir",
      titleEn: "Climate-smart education: training for the future",
      summaryFr: "Intégrer la résilience climatique dans les systèmes éducatifs africains",
      summaryEn: "Integrating climate resilience into African education systems",
      bodyFr: "L'éducation climatique intelligente est essentielle pour préparer les générations futures aux défis du changement climatique tout en créant des opportunités d'emploi.",
      bodyEn: "Climate-smart education is essential to prepare future generations for climate change challenges while creating employment opportunities.",
      category: "Éducation",
      featured: true,
    },
    {
      titleFr: "Finance verte : mécanismes et opportunités",
      titleEn: "Green finance: mechanisms and opportunities",
      summaryFr: "Stratégies pour mobiliser le financement climatique en Afrique",
      summaryEn: "Strategies to mobilize climate finance in Africa",
      bodyFr: "La finance verte est un levier essentiel pour le développement durable en Afrique. Nous examinons les instruments disponibles et les conditions nécessaires pour attirer les investissements climatiques.",
      bodyEn: "Green finance is an essential lever for sustainable development in Africa. We examine available instruments and necessary conditions to attract climate investments.",
      category: "Finance",
      featured: true,
    },
    {
      titleFr: "Transformation de plateformes institutionnelles",
      titleEn: "Transformation of institutional platforms",
      summaryFr: "Moderniser les institutions pour une meilleure efficacité et résilience",
      summaryEn: "Modernizing institutions for better efficiency and resilience",
      bodyFr: "La transformation des plateformes institutionnelles est cruciale pour améliorer l'efficacité publique et la résilience face aux crises.",
      bodyEn: "Transforming institutional platforms is crucial to improve public efficiency and resilience in the face of crises.",
      category: "Transformation",
      featured: true,
    },
    {
      titleFr: "Delivery & PMO : assurer l'exécution",
      titleEn: "Delivery & PMO: ensuring execution",
      summaryFr: "Optimiser la gestion de projet et le delivery dans les environnements complexes",
      summaryEn: "Optimizing project management and delivery in complex environments",
      bodyFr: "Les bureaux de gestion de projet (PMO) jouent un rôle crucial dans la réussite des initiatives publiques. Nous partageons nos meilleures pratiques et leçons apprises.",
      bodyEn: "Project management offices (PMOs) play a crucial role in the success of public initiatives. We share our best practices and lessons learned.",
      category: "Gouvernance",
      featured: true,
    },
  ]);

  // Seed sectors - 4 corridors from document
  await db.insert(sectorsTable).values([
    {
      slug: "canada-cameroun",
      titleFr: "Canada – Cameroun",
      titleEn: "Canada – Cameroon",
      descriptionFr: "Transformation numérique, plateformes universitaires, compétences, pilotes démonstratifs",
      descriptionEn: "Digital transformation, university platforms, skills, demonstration pilots",
      icon: "map",
      corridor: "Transatlantique",
      countries: ["Canada", "Cameroun"],
      highlights: ["Transformation numérique", "Plateformes universitaires", "Compétences", "Pilotes démonstratifs"],
    },
    {
      slug: "canada-nigeria",
      titleFr: "Canada – Nigéria",
      titleEn: "Canada – Nigeria",
      descriptionFr: "Productivité, compétitivité, transformation industrielle, systèmes de compétences",
      descriptionEn: "Productivity, competitiveness, industrial transformation, skills systems",
      icon: "map",
      corridor: "Transatlantique",
      countries: ["Canada", "Nigéria"],
      highlights: ["Productivité", "Compétitivité", "Transformation industrielle", "Systèmes de compétences"],
    },
    {
      slug: "afrique-regionale",
      titleFr: "Afrique Régionale",
      titleEn: "Regional Africa",
      descriptionFr: "Climat, finance verte, résilience, systèmes éducatifs et partenariats sectoriels",
      descriptionEn: "Climate, green finance, resilience, education systems and sectoral partnerships",
      icon: "globe",
      corridor: "Régional",
      countries: ["Afrique Centrale", "Afrique de l'Ouest", "Afrique de l'Est"],
      highlights: ["Climat", "Finance verte", "Résilience", "Systèmes éducatifs", "Partenariats sectoriels"],
    },
    {
      slug: "transatlantique",
      titleFr: "Transatlantique",
      titleEn: "Transatlantic",
      descriptionFr: "Stratégie, positionnement, consortiums, coopération institutionnelle",
      descriptionEn: "Strategy, positioning, consortiums, institutional cooperation",
      icon: "globe",
      corridor: "Transatlantique",
      countries: ["Canada", "Europe", "Afrique"],
      highlights: ["Stratégie", "Positionnement", "Consortiums", "Coopération institutionnelle"],
    },
  ]);

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
