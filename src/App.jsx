import { useState } from "react";
import GuestList from "./components/GuestList.jsx";
import GuestDetails from "./components/GuestDetails.jsx";
import { useGuestsList } from "./hooks/useGuestsList.js";
import { useGuestDetails } from "./hooks/useGuestDetails.js";

const USE_MOCK = true; // keep true until your API is ready

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const { guests, loading: listLoading, error: listError } = useGuestsList({ useMock: USE_MOCK });
  const { guest, loading: detailsLoading, error: detailsError } = useGuestDetails(selectedId, { useMock: USE_MOCK });

  if (listLoading) return <p style={{padding:16}}>Loading…</p>;
  if (listError)  return <p style={{padding:16}}>Error: {listError.message}</p>;

  return (
    <div style={{padding:16}}>
      <h1>Fullstack Convention Center — Guests</h1>
      {!selectedId ? (
        <GuestList guests={guests} onSelect={setSelectedId} />
      ) : detailsLoading ? (
        <p>Loading details…</p>
      ) : detailsError ? (
        <p>Error: {detailsError.message}</p>
      ) : (
        <GuestDetails guest={guest} onBack={() => setSelectedId(null)} />
      )}
    </div>
  );
}
