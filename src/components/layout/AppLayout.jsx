import Sidebar from "./Sidebar";
import { getNavigation, getUserContext } from "../../lib/services";

export default function AppLayout({ children }) {
  const user = getUserContext();
  const navigation = getNavigation(user);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar navigation={navigation} />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}