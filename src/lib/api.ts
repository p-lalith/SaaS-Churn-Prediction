const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getHealth(): Promise<{ status: string; model_loaded: boolean }> {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error("API health check failed");
  return res.json();
}

export async function predictCSV(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE_URL}/predict-csv`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Prediction failed");
  }
  return res.blob();
}

export async function predictJSON(
  records: Record<string, unknown>[]
): Promise<{ predictions: { churn_risk_score: number }[] }> {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ records }),
  });
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}
