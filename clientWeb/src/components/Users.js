import { Typography } from "@mui/material";

const Users = ({ users }) => {
  return (
    <div style={{ height: "100%", width: "100%", padding: 8 }}>
      <Typography variant="h6" sx={{ color: "#c87974" }}>
        Users:
      </Typography>
      <div
        style={{
          height: "2px",
          width: "100%",
          background: "#c87974",
        }}
      />
      {users.map((user) => (
        <Typography
          sx={{
            color: "#c87974",
            // text breaking
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-word",
            hyphens: "auto",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          {user}
        </Typography>
      ))}
    </div>
  );
};

export default Users;
