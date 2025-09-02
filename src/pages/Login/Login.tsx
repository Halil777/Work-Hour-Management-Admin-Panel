import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import {
  authenticate,
  isAuthenticated,
  type Role,
  roleOptions,
} from "../../utils/auth";

export default function Login() {
  const [role, setRole] = useState<Role | "">("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (role && authenticate(role, login, password)) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              required
            >
              {roleOptions.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Login"
            fullWidth
            margin="normal"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </AuthLayout>
  );
}

