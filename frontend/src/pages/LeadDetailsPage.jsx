import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import leadService from "../services/leadService";

const LeadDetailsPage = () => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const data = await leadService.getLeadById(id);
        setLead(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Button component={Link} to="/leads" variant="outlined" sx={{ mb: 2 }}>
        Go Back
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : lead ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {lead.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{lead.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone:</Typography>
              <Typography>{lead.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Status:</Typography>
              <Typography>{lead.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Source:</Typography>
              <Typography>{lead.source}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Notes:</Typography>
              <Typography>{lead.notes}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Created At:</Typography>
              <Typography>
                {new Date(lead.createdAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Alert severity="info">No lead data available.</Alert>
      )}
    </Container>
  );
};

export default LeadDetailsPage;
