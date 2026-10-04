const navItems = [
  { label: "Explore", icon: "⌖", active: true },
  { label: "Search", icon: "⌕", active: false },
  { label: "Saved", icon: "☆", active: false },
];

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function NavigationIcon({ type }: { type: string }) {
  if (type === "⌕") {
    return <SearchIcon />;
  }

  return (
    <span aria-hidden="true" style={{ fontSize: "20px", lineHeight: 1 }}>
      {type}
    </span>
  );
}

export default function Home() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand" aria-label="TrainTracker">
          T
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-button${item.active ? " active" : ""}`}
              title={item.label}
              aria-label={item.label}
            >
              <NavigationIcon type={item.icon} />
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-button"
            title="Settings"
            aria-label="Settings"
          >
            ⚙
          </button>
        </div>
      </aside>

      <section className="main-area">
        <div className="topbar">
          <label className="search">
            <SearchIcon />

            <input
              type="search"
              placeholder="Search trains, stations..."
              aria-label="Search trains and stations"
            />

            <span className="search-shortcut">/</span>
          </label>

          <div className="status-pill">
            <span className="status-dot" />
            Systems operational
          </div>
        </div>

        <div className="map-viewport">
          <div className="map-grid" />

          <div className="map-placeholder">
            <strong>TrainTracker</strong>
            <span>Map layer will be initialized here.</span>
          </div>

          <div className="map-controls">
            <button className="map-control" aria-label="Zoom in">
              +
            </button>
            <button className="map-control" aria-label="Zoom out">
              −
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}