export const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "";

  const d = new Date(dateStr);

  if (Number.isNaN(d.getTime())) return "";

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); 
  const day = d.getDate(); 
  
  return `${yyyy}-${mm}-${day}`;
};
