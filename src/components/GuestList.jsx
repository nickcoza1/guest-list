export default function GuestList({ guests, onSelect }) {
  return (
    <div>
      <h2>Guest List</h2>
      <ul>
        {guests.map((g) => (
          <li key={g.id}>
            <button onClick={() => onSelect(g.id)}>
              {g.name} — {g.email}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
