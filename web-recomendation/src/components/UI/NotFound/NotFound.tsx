import { Container, Typography } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "600px",
      }}
    >
      <Typography sx={{ display: "block" }} variant="h4">
        Nothing to show...
      </Typography>
    </Container>
  );
};

export default NotFound;
