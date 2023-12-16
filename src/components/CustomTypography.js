import Typography from "@mui/material/Typography";

function CustomTypography(props) {
  return (
    <Typography
      variant={props.variant}
      sx={{
        textAlign: "center",
        maxWidth: props.maxWidth,
        p: 1,
        fontSize: 25,
        fontFamily: "revert",
      }}
    >
      {props.children}
    </Typography>
  );
}

export default CustomTypography;
