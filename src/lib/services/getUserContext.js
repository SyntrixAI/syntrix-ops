import { users } from "../../data/users";

export function getUserContext() {
  return users.find((user) => user.id === "coo");
}