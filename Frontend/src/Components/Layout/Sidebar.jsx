import React, { useContext, useState } from "react";
import { UserContext } from "../context/context";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = () => {
  const { category } = useContext(UserContext);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-1/5 h-screen bg-gray-100 p-4 text-sm ">
      <h2 className="font-semibold mb-4"></h2>
      <ul>
        <li className="mb-2 font-medium text-xl">All Categories</li>

        {Array.isArray(category) &&
          category.map((cat) => (
            <li key={cat._id} className="mb-2 ">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(cat._id)}>
                <span className="font-semibold">{cat.name}</span>
                <span className="ml-2">
                  {expanded[cat._id] ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {expanded[cat._id] &&
                cat.subcategories?.length > 0 && (
                  <ul className="pl-4 list-disc text-gray-600 mt-1">
                    {cat.subcategories.map((sub) => (
                      <li key={sub._id}>{sub.name}</li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
