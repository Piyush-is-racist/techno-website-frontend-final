import DashboardLayout from "../components/DashboardLayout";

export default function FullDetails() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📝 Full Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h3 className="text-gray-600 text-sm mb-1">Name</h3>
            <p className="text-lg text-gray-900">John Doe</p>
          </div>
          <div className="bg-white p-4 rounded shadow-sm border">
            <h3 className="text-gray-600 text-sm mb-1">Email</h3>
            <p className="text-lg text-gray-900">john@example.com</p>
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </DashboardLayout>
  );
}
