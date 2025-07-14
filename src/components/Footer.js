import React, { useEffect, useState } from "react";
import { Box, Typography, Container, CircularProgress } from "@mui/material";

const Footer = () => {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
      .then((res) => res.json())
      .then((data) => {
        setFact(data.text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the fact:", error);
        setFact("Could not load fact.");
        setLoading(false);
      });
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          {loading ? <CircularProgress size={20} /> : fact}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;