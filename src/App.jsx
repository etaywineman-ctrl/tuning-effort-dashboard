import React, { useState } from 'react';
import { Layers, Activity, Target, BarChart3, PieChart, ArrowRight } from 'lucide-react';

export default function App() {
  // Data extracted and cleaned from the provided Excel screenshot
  const summaryData = [
    { id: 1, plan: 'BCD_Demand_Plan', currentProfiles: 3, recProfiles: 3, mostVolume: 'High Variability (66%)' },
    { id: 2, plan: 'CSD_Demand_Plan', currentProfiles: 3, recProfiles: 4, mostVolume: '~33% per profile' },
    { id: 3, plan: 'GSD_Demand_Plan', currentProfiles: 3, recProfiles: 4, mostVolume: 'Low Variability (54%)' },
    { id: 4, plan: 'SUD_Demand_Plan', currentProfiles: 3, recProfiles: 4, mostVolume: 'High Variability (44%)' },
    { id: 5, plan: 'PPA_Demand_Plan', currentProfiles: 3, recProfiles: 4, mostVolume: 'High Variability (44%)' },
    { id: 6, plan: 'BID_Consumables', currentProfiles: 4, recProfiles: 3, mostVolume: 'Low Variability (69%)' },
    { id: 7, plan: 'BID_Antibodies', currentProfiles: 3, recProfiles: 3, mostVolume: 'High Intermittency (48%)' },
    { id: 8, plan: 'BID_OEM_Demand', currentProfiles: 3, recProfiles: 3, mostVolume: 'High Intermittency (45%)' },
    { id: 9, plan: 'BID_Instruments', currentProfiles: 4, recProfiles: 4, mostVolume: 'Low Variability (70%)' },
    { id: 10, plan: 'BID_Spark_Demand', currentProfiles: 4, recProfiles: 3, mostVolume: 'High Variability (51%)' },
  ];

  const segmentData = [
    {
      plan: 'BCD_Demand_Plan',
      totalVolume: '68.1M',
      segments: [
        { name: 'High Intermittency', comb: 31, vol: 33, color: 'bg-purple-500' },
        { name: 'High Variability', comb: 41, vol: 66, color: 'bg-rose-500' },
        { name: 'Low Var Slow-Moving', comb: 27, vol: 0, color: 'bg-teal-500' }
      ]
    },
    {
      plan: 'CSD_Demand_Plan',
      totalVolume: '2.5M',
      segments: [
        { name: 'High Intermittency', comb: 21, vol: 32, color: 'bg-purple-500' },
        { name: 'High Variability', comb: 36, vol: 35, color: 'bg-rose-500' },
        { name: 'Low Var Slow-Moving', comb: 43, vol: 33, color: 'bg-teal-500' }
      ]
    },
    {
      plan: 'GSD_Demand_Plan',
      totalVolume: '4.9M',
      segments: [
        { name: 'High Intermittency', comb: 28, vol: 15, color: 'bg-purple-500' },
        { name: 'High Variability', comb: 40, vol: 31, color: 'bg-rose-500' },
        { name: 'Low Var Slow-Moving', comb: 32, vol: 54, color: 'bg-teal-500' }
      ]
    },
    {
      plan: 'SUD_Demand_Plan',
      totalVolume: '22.6M',
      segments: [
        { name: 'High Intermittency', comb: 41, vol: 17, color: 'bg-purple-500' },
        { name: 'High Variability', comb: 42, vol: 44, color: 'bg-rose-500' },
        { name: 'Low Var Slow-Moving', comb: 17, vol: 39, color: 'bg-teal-500' }
      ]
    }
  ];

  // Calculations for KPIs
  const totalBUs = summaryData.length;
  const totalRecommendedProfiles = summaryData.reduce((acc, curr) => acc + curr.recProfiles, 0);
  const highEffortBUs = summaryData.filter(d => d.recProfiles === 4).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tuning Project: Effort & Profiling Dashboard</h1>
          <p className="text-slate-500 mt-2">
            Estimating the tuning effort by identifying how many profiles need to be created per Business Unit and where focus should be directed. Note: All BUs require tuning; this analysis is based on the <strong>"Final Bookings History"</strong> data.
          </p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard title="Total BUs Analyzed" value={totalBUs} icon={<Layers className="w-6 h-6 text-blue-500" />} />
          <KpiCard title="Total Profiles Needed" value={totalRecommendedProfiles} icon={<Target className="w-6 h-6 text-emerald-500" />} subtitle="Estimated profile creation effort" />
          <KpiCard title="High Effort BUs (4 Profiles)" value={highEffortBUs} icon={<BarChart3 className="w-6 h-6 text-orange-500" />} subtitle="Requires extended focus" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Effort Distribution */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-slate-400" />
              Recommended Tuning Effort
            </h2>
            <div className="space-y-4">
              {summaryData.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="w-1/2 pr-2">
                    <p className="text-sm font-medium text-slate-700 truncate" title={item.plan}>{item.plan.replace('_Demand_Plan', '').replace('_Demand', '')}</p>
                  </div>
                  <div className="w-1/2 flex items-center space-x-2">
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                      {/* Visualizing the recommendation: max scale of 4 */}
                      <div 
                        className={`h-full ${item.recProfiles === 4 ? 'bg-orange-400' : 'bg-blue-500'}`} 
                        style={{ width: `${(item.recProfiles / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-bold w-6 text-right ${item.recProfiles === 4 ? 'text-orange-600' : 'text-blue-600'}`}>
                      {item.recProfiles}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Segment Deep Dive */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-slate-400" />
                Volume vs. Combination Breakdown (Sample BUs)
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {segmentData.map((bu, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-800">{bu.plan.replace('_Plan', '')}</h3>
                    <span className="text-xs font-medium bg-slate-200 text-slate-600 px-2 py-1 rounded">Vol: {bu.totalVolume}</span>
                  </div>

                  {/* Custom Dual-Bar Chart for each segment */}
                  <div className="space-y-4">
                    {bu.segments.map((seg, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-slate-600">{seg.name}</span>
                        </div>
                        <div className="relative pt-1">
                          {/* Combinations Bar */}
                          <div className="flex items-center mb-1">
                            <span className="text-[10px] w-12 text-slate-400 uppercase">Combs</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${seg.color} opacity-60`} style={{ width: `${seg.comb}%` }}></div>
                            </div>
                            <span className="text-[10px] w-8 text-right font-medium">{seg.comb}%</span>
                          </div>
                          {/* Volume Bar */}
                          <div className="flex items-center">
                            <span className="text-[10px] w-12 text-slate-400 uppercase">Volume</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className={`h-full ${seg.color}`} style={{ width: `${seg.vol}%` }}></div>
                            </div>
                            <span className="text-[10px] w-8 text-right font-bold">{seg.vol}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
            
            {/* Legend for Segments */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-600 justify-center">
              <span className="flex items-center"><span className="w-3 h-3 rounded-sm bg-purple-500 mr-2"></span> High Intermittency</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-sm bg-rose-500 mr-2"></span> High Variability</span>
              <span className="flex items-center"><span className="w-3 h-3 rounded-sm bg-teal-500 mr-2"></span> Low Var Slow-Moving</span>
            </div>

          </div>
        </div>
        
        {/* Summary Narrative */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
          <h3 className="text-blue-900 font-bold mb-2 flex items-center">
            <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
            Executive Takeaway
          </h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            While all items require tuning, this breakdown estimates the effort required to create <strong>35 total profiles</strong> across the 10 Business Units using the <strong>Final Bookings History</strong> data. 
            Four specific units (CSD, GSD, SUD, and PPA) are recommended for a slightly higher segmentation effort (4 profiles) to properly isolate their High/Low Variability splits. These specific areas indicate where our team's tuning focus and extended effort will be heavily directed.
          </p>
        </div>

      </div>
    </div>
  );
}

// Simple Reusable KPI Card Component
function KpiCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}