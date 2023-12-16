import Button from "@mui/material/Button";

function CustomButton(props) {
  return (
    <Button
      disabled={props.disabled}
      component={props.component}
      type={props.type}
      fullWidth
      variant="contained"
      sx={props.sx}
      onClick={props.onClick}
      to={props.to}
    >
      {props.children}
    </Button>
  );
}

export default CustomButton;
