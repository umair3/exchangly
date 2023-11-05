interface Campaign {
  id?: number;
  title: string;
  created?: string;
  updated?: string;
}

export interface IMockedDataExecutionView {
  id: number;
  created: string;
  status: string;
  campaign: Campaign;
}

export const mockedData: IMockedDataExecutionView[] = [
  {
    id: 1,
    created: new Date("20 feb,2022").toDateString(),
    status: "Send",
    campaign: {
      title: "Wot Blitz Campaign",
    },
  },

  {
    id: 2,
    created: new Date("21 feb,2022").toDateString(),
    status: "Selected",
    campaign: {
      title: "Google Mail Campaign",
    },
  },
  {
    id: 3,
    created: new Date("21 feb,2022").toDateString(),
    status: "Selected",
    campaign: {
      title: "Wot Blitz Campaign",
    },
  },
  {
    id: 4,
    created: new Date("21 feb,2022").toDateString(),
    status: "Selected",
    campaign: {
      title: "Google Mail Campaign",
    },
  },
];
