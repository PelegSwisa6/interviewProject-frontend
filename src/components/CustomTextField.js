import TextField from "@mui/material/TextField";

function CustomTextField(props) {
  return (
    <TextField
      dir="rtl"
      margin="normal"
      required
      fullWidth
      id={props.id}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
      name={props.name}
      autoComplete={props.autoComplete}
      autoFocus
    >
      {props.children}
    </TextField>
  );
}

export default CustomTextField;
