import { API_URL } from "@/lib/constant";

export async function ping() {
  const result = await fetch(`${API_URL}/ping`);
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return result.json();
}
