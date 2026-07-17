import { users } from "../../data/users";

const AUTHENTICATED_USER_ID = "coo";

export function getUserContext() {
  return (
    users.find(
      (user) => user.id === AUTHENTICATED_USER_ID,
    ) ?? null
  );
}