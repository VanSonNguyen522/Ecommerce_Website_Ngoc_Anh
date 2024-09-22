import DashboardLayout from '@/app/dashboard/DashboardLayout';

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Example Widgets */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="mt-2 text-gray-600">View your analytics here.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="mt-2 text-gray-600">View revenue data here.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">User Activity</h2>
          <p className="mt-2 text-gray-600">Monitor user activity here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;

