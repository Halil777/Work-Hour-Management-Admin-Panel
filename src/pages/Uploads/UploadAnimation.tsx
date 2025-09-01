import { keyframes } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box } from "@mui/material";

// Animasiýa hereketi
const float = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-12px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1); opacity: 0.6; }
`;

export default function UploadAnimation() {
  return (
    <Box
      sx={{
        position: "relative",
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background pulse ring */}
      <Box
        sx={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.4,
          animation: `${pulse} 1.8s infinite ease-out`,
        }}
      />

      {/* Upload cloud */}
      <CloudUploadIcon
        sx={{
          fontSize: 48,
          color: "primary.main",
          zIndex: 2,
        }}
      />

      {/* Arrow moving up */}
      <ArrowUpwardIcon
        sx={{
          position: "absolute",
          bottom: 18,
          fontSize: 28,
          color: "success.main",
          animation: `${float} 1.2s infinite ease-in-out`,
        }}
      />
    </Box>
  );
}
