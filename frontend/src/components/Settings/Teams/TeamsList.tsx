import React from "react";
import TeamItem from "./TeamItem";

const teamItems = [
  {
    id: 1,
    email: "usamabilal444@gmail.com",
    password: "34242424sdfsfsdfsdf",
    first_name: "Usama",
    last_name: "Bilal",
    active: false,
    roles: ["testing1", "testing2"],
  },

  {
    id: 2,
    email: "umair.anwr@gmail.com",
    password: "sadas34324",
    first_name: "Umair",
    last_name: "Anwar",
    active: true,
    roles: ["testing1", "testing2", "testing3", "testing4"],
  },

  {
    id: 3,
    email: "testing@gmail.com",
    password: "sdadad",
    first_name: "Tester",
    last_name: "Account",
    active: true,
    roles: ["testing1", "testing2"],
  },
];

const TeamsList = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      {teamItems.map((team) => (
        <TeamItem {...team} key={team.email} />
      ))}
    </div>
  );
};

export default TeamsList;
