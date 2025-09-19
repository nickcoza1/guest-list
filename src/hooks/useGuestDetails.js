import { useEffect, useState } from "react";
import { api } from "../api/client";
import { MOCK_GUESTS } from "../mocks/guests";
export function useGuestDetails(id,{useMock}) {
  const [guest,setGuest]=useState(null); const [loading,setLoading]=useState(false); const [error,setError]=useState(null);
  useEffect(()=>{ if(!id){setGuest(null);return;} let cancelled=false; (async()=>{
    setLoading(true); setError(null);
    try {
      if(useMock){ await new Promise(r=>setTimeout(r,200)); const found = MOCK_GUESTS.find(g=>g.id===id)||null; if(!cancelled) setGuest(found); }
      else { const data = await api.getGuest(id); if(!cancelled) setGuest(data); }
    } catch(e){ if(!cancelled) setError(e); } finally { if(!cancelled) setLoading(false); }
  })(); return ()=>{cancelled=true}; },[id,useMock]);
  return { guest, loading, error };
}
