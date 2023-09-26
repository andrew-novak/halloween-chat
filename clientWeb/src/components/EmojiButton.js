import React from "react";
import { IconButton } from "@mui/material";

const EmojiButton = ({ src, onClick }) => {
  return (
    <div>
      <IconButton
        sx={{
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
          onDragStart={(event) => event.preventDefault()}
        />
      </IconButton>
    </div>
  );
};

export default EmojiButton;
