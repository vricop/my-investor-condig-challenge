import { type Fund } from "../../../../server/server/data/funds";
const API_URL = "http://localhost:3000";

export type GetFundsParams = {
  page?: number;
  limit?: number;
};

export type GetFundsResponse = {
  pagaination: {
    page: number;
    limit: number;
    totalFunds: number;
    totalPages: number;
  };
  data: Fund[];
};

export async function getFunds({
  page = 1,
  limit = 8,
}: GetFundsParams = {}): Promise<GetFundsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const data = await fetch(`${API_URL}/funds?${searchParams.toString()}`);

  if (!data.ok) {
    throw new Error(`Failes to fetch funds: ${data.status} ${data.statusText}`);
  }

  return await data.json();
}
