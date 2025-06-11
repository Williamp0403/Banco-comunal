import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import dayjs from "dayjs"

export function Input ({ type, name, label, register, errors }) {
  return (
      <TextField 
        error={!!errors}
        className='w-full' 
        label={label} 
        name={name}
        type={type}
        {...register(name, { valueAsNumber: type === "number" }) }
        variant="outlined" 
        helperText={errors?.message}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
              borderColor: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "black"
            },
          },
        }}
      />
  );
}

export function InputDate({ name, label, register, errors, restrictionType }) {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  return (
    <TextField 
      {...register(name)}
      inputRef={register(name).ref}
      error={!!errors}
      className="w-full"
      label={label}
      name={name}
      type="date"
      variant="outlined"
      helperText={errors?.message}
      InputLabelProps={{
        shrink: true
      }}
      inputProps={{
        min: restrictionType === "future" ? tomorrow : undefined, // No permite hoy ni anteriores
        max: restrictionType === "past" ? today : restrictionType === "noTodayOrFuture" ? dayjs().subtract(1, "day").format("YYYY-MM-DD") : undefined, // No permite hoy ni futuras
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused": {
            borderColor: "black",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
          },
        },
        "& .MuiInputLabel-root": {
          "&.Mui-focused": {
            color: "black"
          },
        },
      }}
    />
  );
}


export function InputMonto({ value, onChange, ...props }) {
  return (
    <NumericFormat
      {...props}
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      className="w-full border rounded-md p-3 focus:outline-none"
    />
  );
}

export function Textarea ({ label, register, name, errors }) {
  return (
      <TextField 
        error={!!errors}
        className='w-full' 
        label={label} 
        name={name}
        {...register(name) }
        helperText={errors?.message}
        multiline
        rows={3}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
              borderColor: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "black"
            },
          },
        }}
      />
  )
}