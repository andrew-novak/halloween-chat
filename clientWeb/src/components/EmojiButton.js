import React from "react";
import { IconButton } from "@mui/material";

const EmojiButton = ({ src, onClick }) => {
  return (
    <div>
      <IconButton
        style={{
          borderRadius: "100%",
          width: "50px",
          height: "50px",
          padding: 0,
          overflow: "hidden",
        }}
        onClick={onClick}
      >
        <img
          src={src}
          alt="Emoji"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </IconButton>
    </div>
  );
};

export default EmojiButton;
