import * as React from "react";
import { styled, useTheme } from "@material-ui/core";
import { Typography, Box } from "@material-ui/core";
import Navigate from "../../utils/navigation";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 350,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Widgets({ alignment, gradient, items }) {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Navigate routeTo={`/products/?category=${items.id}`}>
        <Box
          sx={{
            width: 345,
            maxWidth: "100%",
            background: `linear-gradient(${gradient} 100%, rgb(227,135,118) 0%)`,
            borderRadius: 16,
            cursor: "pointer",
          }}
        >
          <Widget>
            <Box
              sx={{
                display: "flex",
                flexDirection: `${alignment}`,
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.1s ease-in-out",
                "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
              }}
            >
              <CoverImage>
                <img alt="can't win - Chilling Sunday" src={items.imageUrl} />
              </CoverImage>
              <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {items.name}
                </Typography>
                <Typography noWrap>
                  <b>{items.description}</b>
                </Typography>
                {items.price && (
                  <Typography noWrap letterSpacing={-0.25}>
                    {items.price}
                  </Typography>
                )}
              </Box>
            </Box>
          </Widget>
        </Box>
      </Navigate>
    </Box>
  );
}
