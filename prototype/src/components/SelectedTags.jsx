import React from "react";
const tags = [
  { name: "Batman" },
  { name: "Hero's Journey" },
  { name: "Origin Story" },
  { name: "Redemption" },
  { name: "Villain Origin" },
  { name: "Revenge" },
  { name: "Epic Quest" },
  { name: "Parallel Universe" },
  { name: "Time Travel" },
  { name: "Coming of Age" },
  { name: "Betrayal" },
  { name: "Love Story" },
  { name: "Friendship" },
  { name: "Family Drama" },
  { name: "Underdog" },
  { name: "Sacrifice" },
  { name: "Discovery" },
  { name: "Identity Crisis" },
  { name: "Mystery" },
  { name: "Survival" },
  { name: "Political Intrigue" },
  { name: "Conspiracy" },
  { name: "Quest for Knowledge" },
  { name: "Dystopia" },
  { name: "Escape" },
  { name: "Resilience" },
  { name: "Innocence Lost" },
  { name: "Fate vs. Free Will" },
  { name: "Eternal Conflict" },
  { name: "Forgiveness" },
];

const SelectedTags = () => {
  return (
    <div className="ml-[10px]  lg:flex lg:gap-x-12 overflow-x-auto py-[14px]">
      <div className="flex space-x-4">
        {tags.map((item) => (
          <a
            key={item.name}
            className=" font-bold leading-6 text-white hover:text-cyan-500 text-lg hover:transition ease-in-out duration-300 hover:-translate-y-1 "
            style={{ whiteSpace: "nowrap" }}
          >
            |{item.name}|
          </a>
        ))}
      </div>
    </div>
  );
};

export default SelectedTags;
