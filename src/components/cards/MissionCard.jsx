import Card from "../ui/Card";

export default function MissionCard({ location, action }) {
  return (
    <Card>
      <p className="text-xl font-bold text-white">
        Today's Mission
      </p>

      <h2 className="mt-6 text-2xl font-bold text-blue-400">
        {location}
      </h2>

      <p className="text-2xl font-bold text-blue-400">
        {action}
      </p>
    </Card>
  );
}