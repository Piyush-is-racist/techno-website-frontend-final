import DashboardLayout from "../components/DashboardLayout";

export default function Marks() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 Marks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded shadow-sm p-4">
            <h3 className="font-medium text-gray-900 mb-2">Semester 1</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>CA1: 23</li>
              <li>CA2: 25</li>
              <li>CA3: 24</li>
              <li>CA4: 22</li>
            </ul>
          </div>
          {/* Repeat for other semesters */}
        </div>
      </div>
    </DashboardLayout>
  );
}
