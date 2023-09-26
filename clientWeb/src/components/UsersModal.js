import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Users from "components/Users";

const UsersModal = ({ isShown, users, hide }) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(19, 6, 19, 0.9)",
        //background: "rgba(0, 0, 0, 0.8)",
        //padding: 8,
        //paddingTop: 72 + 8,
        display: isShown ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          height: 72,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ color: "#c87974", fontSize: 40 }} onClick={hide}>
          <CloseIcon size={40} sx={{ fontSize: 40 }} />
        </IconButton>
      </div>
      <Users users={users} />
    </div>
  );
};

export default UsersModal;
