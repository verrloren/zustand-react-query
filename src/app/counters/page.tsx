import { QueryReduxWrapper } from "@/components/query-redux-wrapper";
import { Counters } from "../../modules/counters/counters";

export default function CountersPage() {
  return (
    <QueryReduxWrapper>
      <Counters />
    </QueryReduxWrapper>
  );
}
