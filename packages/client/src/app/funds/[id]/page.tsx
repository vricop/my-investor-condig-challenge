import type { Metadata } from "next"
import { getFund } from "@/api/funds"
import { Container } from "@/components/Container"

export const metadata: Metadata = {
  title: "MyInvestor - fund details",
}

type PageParams = {
  params: Promise<{ id: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function FundDetailsPage({ params }: PageParams) {
  const { id } = await params

  const fund = await getFund(id)

  return <Container>Found id: {fund.data.id}</Container>
}
