import React, { useState, useEffect } from "react";
import { fetchLeadStats } from "../api/leads.api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    leadByStage: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchLeadStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load statistics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const conversionRate = stats.totalLeads
    ? ((stats.convertedLeads / stats.totalLeads) * 100).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your overview
          </p>
        </div>
        <Link
          to="/leads"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors font-medium"
        >
          View All Leads
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase">
                Total Leads
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalLeads}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Converted Leads */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase">
                Converted Leads
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.convertedLeads}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase">
                Conversion Rate
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {conversionRate}%
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Prospects */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase">
                Active Prospects
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.leadByStage?.Prospect || 0}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Leads by Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Leads by Stage
          </h2>
          <div className="space-y-4">
            {/* Lead Stage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Lead</span>
                <span className="text-gray-600 font-semibold">
                  {stats.leadByStage?.Lead || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.totalLeads
                        ? ((stats.leadByStage?.Lead || 0) / stats.totalLeads) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Prospect Stage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Prospect</span>
                <span className="text-gray-600 font-semibold">
                  {stats.leadByStage?.Prospect || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.totalLeads
                        ? ((stats.leadByStage?.Prospect || 0) /
                            stats.totalLeads) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Customer Stage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Customer</span>
                <span className="text-gray-600 font-semibold">
                  {stats.leadByStage?.Customer || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.totalLeads
                        ? ((stats.leadByStage?.Customer || 0) /
                            stats.totalLeads) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Summary Cards */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Stage Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Lead</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {stats.leadByStage?.Lead || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Prospect</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">
                {stats.leadByStage?.Prospect || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Customer</span>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {stats.leadByStage?.Customer || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/leads?status=New"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <svg
              className="w-8 h-8 text-blue-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-medium text-gray-700">View New Leads</span>
          </Link>

          <Link
            to="/leads?status=Contacted"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all text-center"
          >
            <svg
              className="w-8 h-8 text-yellow-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="font-medium text-gray-700">View Contacted</span>
          </Link>

          <Link
            to="/leads?status=Converted"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
          >
            <svg
              className="w-8 h-8 text-green-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-gray-700">View Converted</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
