import { V2Chrome } from "../components/v2-chrome";
import { OfficeConsole } from "./office-console";

export default function AgentsOfficePage() {
  return (
    <V2Chrome active="office" title="Agents Office">
      <OfficeConsole />
    </V2Chrome>
  );
}
