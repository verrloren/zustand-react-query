"use client";

import { UsersList } from "@/modules/users/users-list";
import { QueryReduxWrapper } from "@/components/query-redux-wrapper";

export default function UsersPage() {
  return (
    <QueryReduxWrapper>
      <UsersList />
    </QueryReduxWrapper>
  );
}
