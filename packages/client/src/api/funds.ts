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

export type GetFundResponse = {
  data: Fund;
};

export async function getFund(id: string): Promise<GetFundResponse> {
  return fetcher<GetFundResponse>(`${API_URL}/funds/${encodeURIComponent(id)}`);
}

export type PortfolioHolding = { id: string; quantity: number };

export type BuyFundBody = {
  /** Units to buy; must be > 0 */
  quantity: number;
};

export type BuyFundResponse = {
  message: string;
  data: { portfolio: PortfolioHolding[] };
};

export async function buyFund(
  id: string,
  { quantity }: BuyFundBody
): Promise<BuyFundResponse> {
  if (!(quantity > 0)) {
    throw new Error("Quantity must be greater than 0");
  }

  return fetcher<BuyFundResponse>(`${API_URL}/funds/${encodeURIComponent(id)}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
}
