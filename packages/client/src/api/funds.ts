import { fetcher } from "@/utils/fetcher";
import { Fund } from "../../../server/server/data/funds";

const API_URL = "http://localhost:3000";

export type GetFundsParams = {
  page?: number;
  limit?: number;
};

export type GetFundsResponse = {
  pagination: {
    page: number;
    limit: number;
    totalFunds: number;
    totalPages: number;
  };
  data: Fund[];
};

export async function getFunds(
  { page = 1, limit = 8 }: GetFundsParams = {}
): Promise<GetFundsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return fetcher<GetFundsResponse>(`${API_URL}/funds?${searchParams.toString()}`);
}
