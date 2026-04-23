import AdminLayout from "../components/AdminLayout.jsx";
import PagePlaceholder from "../components/PagePlaceholder.jsx";

const Settings = () => {
  return (
    <AdminLayout title="Settings">
      <PagePlaceholder
        title="Settings"
        description="Configure admin panel settings, manage user accounts, system preferences, and security options."
      />
    </AdminLayout>
  );
};

export default Settings;