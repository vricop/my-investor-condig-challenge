import Container from "@/components/Container";
import FundsTable from "@/components/FundsTable";
import { getFunds } from "@/lib/api/funds";

export default async function Home() {
  const funds = await getFunds();

  return (
    <Container>
      <FundsTable data={funds.data} />
    </Container>
  );
}
