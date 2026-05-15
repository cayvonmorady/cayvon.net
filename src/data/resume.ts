import type { ResumeSiteData } from "@/types/resume";

export const resumeData: ResumeSiteData = {
  headline: {
    currentTitle: "Senior Technical Program Manager",

    currentCompany: "Twitch, Inc.",
  },
  summary:
    "Technical program manager with 9+ years bridging engineering and enterprise stakeholders. Experienced owning data contracts, webhook architectures, and third-party platform evaluations across complex, multi-system environments. Known for a data-first discovery approach — asking the right questions to surface edge cases and unstated requirements before they become failures. Proven ability to build working prototypes and demos to drive stakeholder alignment, and to translate technical tradeoffs into business decisions across large organizations.",
  experience: [
    {
      company: "Twitch, Inc.",
      role: "Senior Technical Program Manager, MarTech",
      start: "DEC 2023",
      end: "CURRENT",
      highlights: [
        "Served as technical lead for enterprise-scale cross-functional programs — running solution design sessions, surfacing data edge cases and unstated requirements that redirected program scope, and translating engineering tradeoffs into business recommendations for executive stakeholders.",
        "Built internal proof-of-concept demos to drive product decisions without committing engineering resources — including interactive prototypes simulating Twitch chat badge and emote rendering, and a clip-discovery tool surfacing content based on user input.",
        "Deployed agentic coding workflows via Claude and Amazon Bedrock; contributed directly to codebases in GitHub and AWS, maintaining hands-on technical depth across the MarTech stack.",
      ],
    },
    {
      company: "Twitch, Inc.",
      role: "Technical Program Manager, MarTech",
      start: "MAY 2021",
      end: "DEC 2023",
      highlights: [
        "Owned end-to-end API integrations with CDPs, ad networks, and attribution platforms — designing data contracts, payload schemas, and webhook architectures between systems; identified and resolved codebase issues in partner teams during cross-functional solutioning.",
        "Built a working demo replacing the team's reliance on the blog for product update distribution — consuming a JSON feed from an API endpoint to dynamically populate a standalone front-end surface, which became the adopted solution.",
        "Engineered front-end solutions for MarTech-owned properties (Legal, Blog, CreatorCamp, TwitchCon) and led ongoing platform migrations; primary technical point of contact across Marketing, Product, and Data teams.",
      ],
    },
    {
      company: "Twitch, Inc.",
      role: "Performance Marketing Manager, MarTech",
      start: "AUG 2019",
      end: "MAY 2021",
      highlights: [
        "Co-developed KPI frameworks and incrementality-based measurement models with Data Science, validated by executive leadership including the CMO — translating analytical outputs into budget allocation strategy across US and international markets.",
        "Led viewer acquisition programs spanning multiple channels; drove incrementality-informed decisions to optimize spend efficiency at scale.",
      ],
    },
    {
      company: "Fetch Media, Inc.",
      role: "Performance Marketing",
      start: "FEB 2016",
      end: "MAY 2019",
      highlights: [
        "Managed $15M+ in annual spend across major enterprise clients including Hulu, Apple, Twitch, Expedia, and Uber Eats — serving as the technical and analytical point of contact for campaign architecture and optimization.",
        "Built fraud analysis systems and measurement validation processes alongside Data Science; developed partner onboarding governance to protect data integrity across the portfolio.",
      ],
    },
  ],
  skills: [
    {
      category: "Technical",
      items: [
        "API integration & authentication",
        "Webhook & data contract design",
        "Postman",
        "SQL",
        "React",
        "Hugo",
        "Tailwind CSS",
        "Git",
        "AWS",
        "Agentic coding workflows (Claude, Bedrock)",
      ],
    },
    {
      category: "Pre-Sales Adjacent",
      items: [
        "Solution design & scoping",
        "Discovery & requirements elicitation",
        "POC & demo development",
        "Third-party platform evaluation",
        "Engineering-to-business translation",
        "Cross-functional stakeholder alignment",
        "RFP-style business case development",
      ],
    },
    {
      category: "Analysis",
      items: [
        "KPI framework development",
        "Incrementality & experimentation",
        "Data analysis & reporting",
        "Business value quantification",
      ],
    },
  ],
  education: [
    {
      institution: "San Francisco State University",
      program: "Management Information Systems",
      date: "December 2014",
      notes: [
        "Recipient of SAP Student Recognition Award.",
        "Coursework in enterprise systems, data management, and business technology strategy.",
      ],
    },
  ],
};

