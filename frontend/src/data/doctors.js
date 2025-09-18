// /src/data/doctorSelection.js
export function saveSelectedDoctor(raw) {
  const payload = {
    id: raw?.id ?? raw?.d_id ?? raw?.doctor_id ?? null,
    d_name: raw?.d_name ?? raw?.name ?? raw?.doctor_name ?? null,
    d_email: raw?.d_email ?? raw?.email ?? null,
    specialization:
      raw?.specialization ?? raw?.speciality ?? raw?.department ?? "Specialist",
  };
  if (!payload.id || !payload.d_name) return false;
  localStorage.setItem("selected_doctor", JSON.stringify(payload));
  return true;
}

export function loadSelectedDoctor() {
  const str = localStorage.getItem("selected_doctor");
  if (!str) return null;
  try {
    const raw = JSON.parse(str);
    const id = raw?.id ?? raw?.d_id ?? raw?.doctor_id ?? null;
    const name = raw?.d_name ?? raw?.name ?? raw?.doctor_name ?? null;
    const email = raw?.d_email ?? raw?.email ?? null;
    const specialization =
      raw?.specialization ?? raw?.speciality ?? raw?.department ?? "Specialist";
    return id && name ? { id, name, email, specialization } : null;
  } catch {
    return null;
  }
}

export function clearSelectedDoctor() {
  localStorage.removeItem("selected_doctor");
}
