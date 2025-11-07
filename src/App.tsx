import { useEffect, useState } from "react";
import { users } from "./users";

function App() {
  const [searchName, setSearchName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const filteredUsers = searchName
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : users;

  const toggleUserSelection = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedUsers = users.filter((user) => selectedUserIds.includes(user.id));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-500">
      <div
        className="card w-[600px] shadow-lg"
        style={{ backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">لیست کاربران</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-white dark:text-gray-900"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            {theme === "dark" ? "☀️ لایت مود" : "🌙 دارک مود"}
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="جستجو با نام..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 mb-4 rounded border"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-card)",
            color: "var(--color-text)",
          }}
        />

        {/* Users Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => toggleUserSelection(user.id)}
              className="cursor-pointer p-2 rounded-lg text-center text-sm transition-all duration-200"
              style={{
                backgroundColor: selectedUserIds.includes(user.id)
                  ? "var(--color-accent)"
                  : "var(--color-card)",
                color: selectedUserIds.includes(user.id) ? "#fff" : "var(--color-text)",
                border: `1px solid var(--color-border)`,
              }}
            >
              {user.name} <br />
              <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>ID: {user.id}</span>
            </div>
          ))}
        </div>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div
            className="mt-4 p-4 rounded-lg border"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
            }}
          >
            <h2 className="text-lg font-semibold mb-2">کاربران انتخاب شده:</h2>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
                >
                  {user.name} (ID: {user.id})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
