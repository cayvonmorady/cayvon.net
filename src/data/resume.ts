import type { ResumeSiteData } from "@/types/resume";

export const resumeData: ResumeSiteData = {
  headline: {
    currentTitle: "Senior Technical Program Manager",

    currentCompany: "Twitch, Inc.",
  },
  summary:
    "Technical leader with a background in Information Systems and a track record of translating complex technology into business outcomes. Experienced operating at the intersection of engineering and business stakeholders — driving alignment, shaping solutions, and owning technical execution across multi-org programs. Hands-on contributor in agentic AI, cloud infrastructure, and marketing technology platforms.",
  experience: [
    {
      company: "Twitch, Inc.",
      role: "Senior Technical Program Manager, MarTech",
      start: "DEC 2023",
      end: "CURRENT",
      highlights: [
        "Deployed Claude-powered agentic coding workflows (via Amazon Bedrock) across marketing technology operations, directly contributing to codebases in GitHub and AWS.",
        "Led a 4x increase in developer resourcing for MarTech by orchestrating a cross-functional partnership between Marketing and IT Systems Engineering.",
        "Served as technical lead for cross-functional stakeholders — running solution design sessions, evaluating third-party platform integrations, and translating engineering tradeoffs into business recommendations across programs spanning MarTech site migrations, TwitchCon event-tech infrastructure, platform internationalization, and creator and viewer growth initiatives.",
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
        "Built and maintained marketing workflow automation by directly engineering front-end solutions for MarTech-owned properties (Legal, Blog, CreatorCamp, TwitchCon), including integrating third-party APIs for CDPs, ad networks, and attribution platforms — owning data contracts and payload schemas between systems.",
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
        "Cross-functional stakeholder alignment",
        "Solution design & technical scoping",
        "Cross-org program delivery",
        "Process automation & workflow design",
      ],
    },
    {
      category: "Technical",
      items: [
        "API integration & authentication",
        "Webhook & data contract design",
        "SQL",
        "React",
        "Hugo",
        "Tailwind CSS",
        "Git",
        "AWS Suite",
        "Agentic coding workflows",
      ],
    },
    {
      category: "Growth & Measurement",
      items: [
        "Experimentation & incrementality testing",
        "KPI framework development",
        "Business value translation",
        "Data analysis & reporting",
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

