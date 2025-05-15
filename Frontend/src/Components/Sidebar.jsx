// components/Sidebar.jsx
const Sidebar = () => {
  return (
    <aside className="w-1/5 bg-red-90 p-4 text-sm">
      <h2 className="font-semibold mb-4">Categories</h2>
      <ul>
        <li>All categories</li>
        <li>Laptop
          <ul className="pl-4">
            <li>HP</li>
            <li>Dell</li>
          </ul>
        </li>
        <li>Tablet</li>
        <li>Headphones</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
