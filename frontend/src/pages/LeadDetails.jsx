import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchLeadById } from "../api/leads.api";

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadLead = async () => {
    try {
      setLoading(true);
      const data = await fetchLeadById(id);
      setLead(data.lead);
    } catch (err) {
      setError("Failed to load lead details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      New: "bg-blue-100 text-blue-800 border-blue-300",
      Contacted: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Converted: "bg-green-100 text-green-800 border-green-300",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStageBadge = (stage) => {
    const badges = {
      Lead: "bg-purple-100 text-purple-800 border-purple-300",
      Prospect: "bg-orange-100 text-orange-800 border-orange-300",
      Customer: "bg-teal-100 text-teal-800 border-teal-300",
    };
    return badges[stage] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getSourceIcon = (source) => {
    const icons = {
      Website: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      Ads: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      Referral: (
        <svg
          className="w-6 h-6"
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
      ),
    };
    return icons[source] || icons.Website;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="space-y-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || "Lead not found"}
        </div>
        <Link
          to="/leads"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            to="/leads"
            className="text-blue-600 hover:text-blue-800 font-medium mb-2 inline-block"
          >
            ← Back to Leads
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Lead Details</h1>
          <p className="text-gray-600 mt-1">
            Complete information about this lead
          </p>
        </div>
      </div>

      {/* Lead Information Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{lead.name}</h2>
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadge(
                lead.status,
              )}`}
            >
              {lead.status}
            </span>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStageBadge(
                lead.stage,
              )}`}
            >
              {lead.stage}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {lead.email}
                    </a>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
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
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Lead Source
                  </label>
                  <div className="flex items-center">
                    <div className="text-gray-400 mr-2">
                      {getSourceIcon(lead.source)}
                    </div>
                    <span className="text-gray-800 font-medium">
                      {lead.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Status & Stage Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Lead Status & Stage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Current Status
                </label>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full border inline-block ${getStatusBadge(
                    lead.status,
                  )}`}
                >
                  {lead.status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Current Stage
                </label>
                <span
                  className={`px-4 py-2 text-sm font-semibold rounded-full border inline-block ${getStageBadge(
                    lead.stage,
                  )}`}
                >
                  {lead.stage}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Timeline Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
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
              Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Created At
                </label>
                <p className="text-gray-800 font-medium">
                  {formatDate(lead.createdAt)}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Last Updated
                </label>
                <p className="text-gray-800 font-medium">
                  {formatDate(lead.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={`mailto:${lead.email}`}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Send Email
          </a>

          <a
            href={`tel:${lead.phone}`}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Call Lead
          </a>

          <button
            onClick={() => navigate("/leads")}
            className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
