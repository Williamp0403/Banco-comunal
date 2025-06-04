import { useEffect, useState } from "react";
import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useBank } from "../context/BankContext";

export function SelectBasic ({ name, label, register, errors }) {
  const [state, setState] = useState('');

  const {
    onChange: formOnChange,
    ...restRegister
  } = register(name);

  const handleChange = (event) => {
    setState(event.target.value);
    formOnChange(event)
  };

  return (
    <FormControl fullWidth error={!!errors}>
        <InputLabel 
          id="demo-simple-select-label"
          sx={{
            "&.Mui-focused": {
              color: "black", // Reemplaza "yourColor" con tu color preferido
            },
          }}
          >
            Estado
          </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={state}
          label={label}
          {...restRegister}
          onChange={handleChange}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
        >
          <MenuItem value='Pendiente'>Pendiente</MenuItem>
          <MenuItem value='En Progreso'>En Progreso</MenuItem>
        </Select>
        { errors && <FormHelperText>{errors.message}</FormHelperText>}
      </FormControl>
  )
}

export function SelectFilter({ setValue, watch, errors }) {
  const { projects } = useBank();

  const proyectosEnProgreso = projects.filter((project) => project.estado === "En Progreso");

  // 🔹 Obtén el valor actual de `id_proyecto` desde React Hook Form
  const selectedProject = proyectosEnProgreso.find(p => p.id_proyecto === watch("id_proyecto")) || null;

  return (
    <Autocomplete
      disablePortal
      options={proyectosEnProgreso}
      value={selectedProject} // 👈 Esto asegura que el input se borre cuando `reset()` lo limpie
      getOptionLabel={(option) => `${option.nombre} - ${option.monto_total - option.monto_gastado} Bs`}
      onChange={(_, value) => setValue("id_proyecto", value?.id_proyecto || "")} // 👈 Borra el valor si se resetea
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Proyectos"
          error={!!errors.id_proyecto}
          helperText={errors.id_proyecto?.message}
          sx={{
            "& .MuiOutlinedInput-root": { "&.Mui-focused": { borderColor: "black !important" } },
            "& .MuiInputLabel-root": { color: "black !important" },
          }}
        />
      )}
    />
  );
}
