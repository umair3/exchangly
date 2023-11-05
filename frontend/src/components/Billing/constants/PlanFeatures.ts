interface ISinglePlan {
  id: number;
  description: string;
  features: string[];
}

interface IPlansWithFeatures {
  [planName: string]: ISinglePlan;
}

export const PLAN_FEATURES: Readonly<IPlansWithFeatures> = {
  premium: {
    id: 1,
    description: "Everything in Standard, plus",
    features: [
      "Advanced segmentation",
      "Multivariate testing",
      "Unlimited seats and role-based access",
      "Phone support",
    ],
  },

  standard: {
    id: 2,
    description: "Everything in Essentials, plus",
    features: [
      "Journey automations",
      "Retargeting ads",
      "Custom-coded email templates",
      "Advanced audience insights",
    ],
  },

  essentials: {
    id: 3,
    description: "Everything in Free, plus",
    features: [
      "All email templates",
      "A/B testing",
      "Custom branding",
      "24/7 award-winning support",
    ],
  },

  free: {
    id: 4,
    description: "Free Plan",
    features: [
      "7 marketing channels",
      "Single email automations",
      "5 email templates",
      "Marketing CRM",
    ],
  },
};
