import axios from "axios";

const API_URL = "http://localhost:5000/api/leads";

const getLeads = async (
  page = 1,
  keyword = "",
  status = "",
  source = "",
  sort = "-createdAt",
) => {
  const config = {
    params: {
      page,
      keyword,
      status,
      source,
      sort,
    },
  };

  const { data } = await axios.get(API_URL, config);
  return data;
};

const getLeadById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

const getLeadAnalytics = async () => {
  const { data } = await axios.get(`${API_URL}/analytics`);
  return data;
};

export default {
  getLeads,
  getLeadById,
  getLeadAnalytics,
};
