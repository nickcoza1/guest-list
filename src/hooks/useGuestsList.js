import { useEffect, useState } from "react";
import { api } from "../api/client";
import { MOCK_GUESTS } from "../mocks/guests";
export function useGuestsList({ useMock }) {
  const [guests,setGuests]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(null);
  useEffect(()=>{ let cancelled=false; (async()=>{
    setLoading(true); setError(null);
    try {
      if(useMock){ await new Promise(r=>setTimeout(r,200)); if(!cancelled) setGuests(MOCK_GUESTS.map(g=>({id:g.id,name:g.name,email:g.email}))); }
      else { const data = await api.listGuests(); if(!cancelled) setGuests(data); }
    } catch(e){ if(!cancelled) setError(e); } finally { if(!cancelled) setLoading(false); }
  })(); return ()=>{cancelled=true}; },[useMock]);
  return { guests, loading, error };
}
