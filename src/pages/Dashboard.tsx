import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";

function Dashboard() {
  const { translate } = useLayout()
  return (
    <AuthLayout title={translate("dashboard")}>
      <div />
    </AuthLayout>
  );
}

export default Dashboard;
