import api from "./axios";

export const fetchLeads = async (params) => {
  const { data } = await api.get("/leads", { params });
  return data;
};

export const fetchLeadById = async (id) => {
  const { data } = await api.get(`/leads/${id}`);
  return data;
};

export const fetchLeadStats = async () => {
  const { data } = await api.get("/leads/stats");
  return data;
};
