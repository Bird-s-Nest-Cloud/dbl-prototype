import { 
  DollarSign, 
  Package, 
  Building, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Plus,
  ArrowRight,
  BarChart2
} from "lucide-react";

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Expenses",
      value: "৳1,245,000",
      change: "+12% vs last month",
      trend: "up",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Stock Valuation",
      value: "৳450,200",
      change: "-3% vs last month",
      trend: "down",
      icon: Package,
      color: "bg-emerald-500",
    },
    {
      title: "Occupied Flats",
      value: "42 / 60",
      change: "70% Occupancy",
      trend: "up",
      icon: Building,
      color: "bg-amber-500",
    },
    {
      title: "Active Labour",
      value: "128",
      change: "Across 5 sites",
      trend: "neutral",
      icon: Users,
      color: "bg-violet-500",
    },
  ];

  const topProjects = [
    { name: "Project Delta", budget: 500000, expense: 350000, status: "On Track" },
    { name: "Project Alpha", budget: 800000, expense: 780000, status: "Warning" },
    { name: "Project Sigma", budget: 300000, expense: 150000, status: "On Track" },
    { name: "Project Omega", budget: 1200000, expense: 400000, status: "On Track" },
    { name: "Project Gamma", budget: 450000, expense: 420000, status: "Critical" },
  ];

  const quickActions = [
    { name: "Log Daily Expenses", icon: DollarSign, color: "bg-slate-800 hover:bg-slate-700" },
    { name: "Update Stock Use", icon: Package, color: "bg-slate-800 hover:bg-slate-700" },
    { name: "Record Installment", icon: Building, color: "bg-slate-800 hover:bg-slate-700" },
    { name: "Add New Project", icon: Plus, color: "bg-amber-500 hover:bg-amber-600 text-slate-900" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
              </div>
              <div className={`w-12 h-12 ${metric.color} text-white rounded-lg flex items-center justify-center`}>
                <metric.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium">
              {metric.trend === "up" && <TrendingUp size={14} className="text-emerald-500" />}
              {metric.trend === "down" && <TrendingDown size={14} className="text-red-500" />}
              <span className={
                metric.trend === "up" ? "text-emerald-500" : 
                metric.trend === "down" ? "text-red-500" : "text-slate-500"
              }>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top Projects */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Top 5 Active Projects</h2>
            <button className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-5">
            {topProjects.map((project) => {
              const percentage = Math.round((project.expense / project.budget) * 100);
              let barColor = "bg-emerald-500";
              if (percentage > 90) barColor = "bg-red-500";
              else if (percentage > 70) barColor = "bg-amber-500";

              return (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium text-slate-700">{project.name}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                        project.status === "On Track" ? "bg-emerald-100 text-emerald-700" :
                        project.status === "Warning" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <span className="text-slate-500">৳{project.expense.toLocaleString()} / ৳{project.budget.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${barColor} rounded-full transition-all duration-500`} 
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    {percentage}% of budget used
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 flex-1">
            {quickActions.map((action) => (
              <button
                key={action.name}
                className={`w-full ${action.color} text-white rounded-lg p-4 flex items-center gap-4 transition-colors font-medium shadow-sm hover:shadow`}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <action.icon size={20} />
                </div>
                <span>{action.name}</span>
              </button>
            ))}
          </div>
          
          {/* Decorative Stat */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <BarChart2 className="text-amber-500" size={24} />
              <div>
                <p className="text-sm font-medium text-slate-700">System Health</p>
                <p className="text-xs text-slate-500">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
