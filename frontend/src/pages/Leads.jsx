import React, { useState, useEffect } from "react";
import { fetchLeads } from "../api/leads.api";
import { Link, useSearchParams } from "react-router-dom";

const Leads = () => {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [stage, setStage] = useState(searchParams.get("stage") || "");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, status, stage, sort, order]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        ...(search && { search }),
        ...(status && { status }),
        ...(stage && { stage }),
        sort,
        order,
      };
      const data = await fetchLeads(params);
      setLeads(data.leads);
      setTotal(data.total);
    } catch (err) {
      setError("Failed to load leads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleStageChange = (e) => {
    setStage(e.target.value);
    setPage(1);
  };

  const handleSortChange = (field) => {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("desc");
    }
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setStage("");
    setSort("createdAt");
    setOrder("desc");
    setPage(1);
  };

  const getStatusBadge = (status) => {
    const badges = {
      New: "bg-blue-100 text-blue-800",
      Contacted: "bg-yellow-100 text-yellow-800",
      Converted: "bg-green-100 text-green-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getStageBadge = (stage) => {
    const badges = {
      Lead: "bg-purple-100 text-purple-800",
      Prospect: "bg-orange-100 text-orange-800",
      Customer: "bg-teal-100 text-teal-800",
    };
    return badges[stage] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
        <p className="text-gray-600 mt-1">
          Manage and track all your leads in one place
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name or email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stage
            </label>
            <select
              value={stage}
              onChange={handleStageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Stages</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(search || status || stage) && (
          <div className="mt-4">
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {leads.length > 0 ? (page - 1) * limit + 1 : 0} to{" "}
          {Math.min(page * limit, total)} of {total} leads
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Leads Table - Desktop */}
      {!loading && !error && leads.length > 0 && (
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sort === "name" && (
                      <span className="ml-2">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange("email")}
                >
                  <div className="flex items-center">
                    Email
                    {sort === "email" && (
                      <span className="ml-2">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sort === "status" && (
                      <span className="ml-2">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange("stage")}
                >
                  <div className="flex items-center">
                    Stage
                    {sort === "stage" && (
                      <span className="ml-2">
                        {order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {lead.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        lead.status,
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageBadge(
                        lead.stage,
                      )}`}
                    >
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/leads/${lead._id}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Leads Cards - Mobile */}
      {!loading && !error && leads.length > 0 && (
        <div className="md:hidden space-y-4">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-lg shadow-md p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {lead.name}
                  </h3>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  <p className="text-sm text-gray-600">{lead.phone}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    lead.status,
                  )}`}
                >
                  {lead.status}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageBadge(
                    lead.stage,
                  )}`}
                >
                  {lead.stage}
                </span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {lead.source}
                </span>
              </div>
              <Link
                to={`/leads/${lead._id}`}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors font-medium"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && leads.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No leads found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && leads.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
