import { Container, TextField } from "@mui/material";

import React from "react";
import { useSearchParams } from "react-router-dom";

const SearchField: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      page: "1",
      query: e.currentTarget.value.trim() || "",
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "20px",
        mb: "20px",
      }}
    >
      <TextField
        value={query?.trim() || ""}
        onChange={onChangeHandler}
        sx={{
          minWidth: "300px",
          width: "600px",
        }}
        variant="standard"
        placeholder="Search Something..."
        inputProps={{
          style: {
            borderBottomColor: "green",
            fontSize: 30,
            padding: "10px",
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: 30,
            marginBottom: "0px",
          },
        }}
      />
    </Container>
  );
};

export default SearchField;
