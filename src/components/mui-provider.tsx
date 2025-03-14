"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { type ReactNode, useMemo } from "react";
import { useTheme } from "next-themes";

export default function MuiProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  // Create a theme instance that respects the current theme mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
          primary: {
            main: "#8CC63F",
          },
          secondary: {
            main: "#555555",
          },
          background: {
            default: resolvedTheme === "dark" ? "#121212" : "#f5f5f5",
            paper: resolvedTheme === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        typography: {
          fontFamily: "inherit",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      }),
    [resolvedTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
