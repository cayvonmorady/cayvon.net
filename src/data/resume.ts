import type { ResumeSiteData } from "@/types/resume";

export const resumeData: ResumeSiteData = {
  headline: {
    currentTitle: "Senior Technical Program Manager",

    currentCompany: "Twitch, Inc.",
  },
  summary:
    "Technical Program Manager with a background in Information Systems and a history of achievement in the Marketing Technology space. I align Tech and non-Tech organizations, helping to ship high-impact initiatives from strategy through production.",
  experience: [
    {
      company: "Twitch, Inc.",
      role: "Senior Technical Program Manager, MarTech",
      start: "DEC 2023",
      end: "CURRENT",
      highlights: [
        "Deployed Claude-powered agentic coding workflows (via Amazon Bedrock) across marketing technology operations, directly contributing to codebases in GitHub and AWS.",
        "Led a 4x increase in developer resourcing for MarTech by orchestrating a cross-functional partnership between Marketing and IT Systems Engineering.",
        "Central coordinator for complex, multi-stakeholder programs spanning the migration of MarTech-owned sites and services to Amazon's internal code repository, TwitchCon's event-tech infrastructure, internationalization of the Twitch platform into new languages, and away-team engineering initiatives driving creator and viewer growth.",
        "Expanded scope well beyond Marketing, serving as strategic TPM partner to multiple organizations across the company.",
      ],
    },
    {
      company: "Twitch, Inc.",
      role: "Technical Program Manager, MarTech",
      start: "MAY 2021",
      end: "DEC 2023",
      highlights: [
        "Owned the MarTech customer lifecycle end-to-end, aligning technology solutions with company and organizational goals across Marketing, Product, and Data teams.",
        "Built and maintained marketing workflow automation by directly engineering front-end solutions for MarTech-owned properties (Legal, Blog, CreatorCamp, TwitchCon), leveraging AI-assisted development before the mainstream adoption of agentic coding tools.",
        "Established sustainable operating models for ongoing site maintenance and continuous improvement across the MarTech portfolio.",
      ],
    },
    {
      company: "Twitch, Inc.",
      role: "Performance Marketing Manager, MarTech",
      start: "AUG 2019",
      end: "MAY 2021",
      highlights: [
        "Led user acquisition and re-engagement campaigns across US and international markets, managing performance measurement for next-gen viewer growth.",
        "Co-developed marketing performance goals and KPI frameworks with Data Science, validated by Twitch's executive suite including the CMO.",
        "Drove incrementality-informed budget allocation decisions across channels to optimize spend efficiency.",
        "Recipient of Twitch's Applause Award and Lifetime Applause Award for exemplary impact.",
      ],
    },
    {
      company: "Fetch Media, Inc.",
      role: "Performance Marketing",
      start: "FEB 2016",
      end: "MAY 2019",
      highlights: [
        "Managed $15M+ in annual marketing spend across major clients including Hulu, Apple, Twitch, Expedia, and Uber Eats.",
        "Led the transition from siloed per-client buying to a holistic vendor management strategy, improving spend efficiency and partner coordination.",
        "Built fraud analysis systems and validation processes alongside Data Science to protect measurement integrity.",
        "Developed partner onboarding governance and quality standards.",
        "Conducted independent data analysis to inform budget allocation and campaign optimization.",
      ],
    },
  ],
  skills: [
    {
      category: "Program Management",
      items: [
        "Multi-org program management",
        "Process automation and optimization",
        "Data-driven decision making",
        "Technical program execution",
      ],
    },
    {
      category: "Technical",
      items: [
        "Agentic coding workflows",
        "Amazon Bedrock",
        "AWS Suite",
        "Git",
        "React",
        "SQL",
      ],
    },
    {
      category: "Growth & Measurement",
      items: [
        "Performance marketing & attribution",
        "Budget optimization & ROI",
        "Experimentation & incrementality",
        "KPI framework development",
        "Data analysis",
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

