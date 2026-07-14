function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search" className="visually-hidden">
        Search by company or job title
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search by company or job title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="search-bar__input"
      />
    </div>
  );
}

export default SearchBar;
