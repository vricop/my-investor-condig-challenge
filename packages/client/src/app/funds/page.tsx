import Container from "@/components/Container";
import { FundsTable } from "@/components/FundsTable";
import { Pagination } from "@/components/Pagination";
import { getFunds } from "@/lib/api/funds";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyInvestor - funds",
};

type HomeParams = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeParams) {
  const filters = await searchParams;
  const funds = await getFunds(filters);
  const { page, limit, totalPages, ...query } = funds.pagination;

  return (
    <Container>
      <FundsTable data={funds.data} />
      <Pagination
        page={page}
        limit={limit}
        totalPages={totalPages}
        {...query}
      />
    </Container>
  );
}
