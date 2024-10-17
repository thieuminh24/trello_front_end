import { useColorScheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };
  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover .MuiInputBase-root fieldset": {
          borderColor: "white",
        },
      }}
      size="small"
    >
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: "white",
          borderColor: "white",
        }}
      >
        Mode
      </InputLabel>

      <Select
        labelId="label-select-dark-light-mode"
        id="demo-select-small"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{ color: "white" }}
      >
        <MenuItem value="light">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LightModeIcon /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <DarkModeIcon /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SettingsBrightnessIcon /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
