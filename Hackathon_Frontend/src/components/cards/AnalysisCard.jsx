export function AnalysisCard({ recommendation, risk, impact }) {
  const riskColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        AI Analysis
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Recommendation</h4>
          <p className="text-gray-700">{recommendation}</p>
        </div>

        <div className="flex gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Environmental Risk</h4>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${riskColors[risk] || riskColors.Low}`}>
              {risk}
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Sustainability Impact</h4>
          <p className="text-gray-700 text-sm">{impact}</p>
        </div>
      </div>
    </div>
  );
}
