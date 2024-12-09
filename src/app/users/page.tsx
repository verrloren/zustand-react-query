"use client";

import { Provider } from "react-redux";
import { UsersList } from "@/modules/users/users-list";
import store from "@/store/store";

export default function UsersPage() {


  return (
    <div>
      <Provider store={store}>
        <UsersList />
      </Provider>
    </div>
  );
}
