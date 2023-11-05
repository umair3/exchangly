export interface IPlanDetail {
  planId: number;
  planName: string;
  description: string;
  amount?: number;
  contacts: number;
  emails: number;
  recommends: boolean;
  showCurrentPlan: boolean;
  emailSupport: boolean;
  phoneSupport: boolean;
  noDailySendingLimit: boolean;
}

// export const PLAN_DETAILS: PlanDetail[] = [
//   {
//     showCurrentPlan: false,
//     planId: "premium",
//     planName: "Premium",
//     description: "Advanced features for pros who need more customization.",
//     amount: 299,
//     contactsDesc: "with 10,000 contacts",
//   },
//   {
//     showCurrentPlan: false,
//     planId: "standard",
//     planName: "Standard",
//     description:
//       "Better insights for growing businesses that want more customers.",
//     amount: 14.99,
//     contactsDesc: "with 500 contacts",
//     recommends: true,
//   },
//   {
//     showCurrentPlan: true,
//     planId: "essentials",
//     planName: "Essentials",
//     description: "Must-have features for email senders who want added support.",
//     amount: 9.99,
//     contactsDesc: "with 500 contacts",
//   },
//   {
//     showCurrentPlan: false,
//     planId: "free",
//     planName: "Free",
//     description: "All the basics for businesses that are just getting started.",
//     amount: 0,
//     contactsDesc: "2,000 contact maximum",
//   },
// ];
