import InputBox from "./components/InputBox";
import OutputBox from "./components/OutputBox";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import getFormulaResult from "./net/web";

const server_port = 11451;
const server_url = `http://localhost:${server_port}/api`;

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(undefined);
    const [error, setError] = useState(false);
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });
    const handleOnSubmit = (value) => {
        setInputValue(value);
        getFormulaResult(value, `${server_url}/calc`).then((json) => {
            setResult(json);
            if (typeof json === "string") setError(true);
            else setError(false);
        });
    };
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        分子量计算器
                    </Typography>
                    <IconButton color="inherit" onClick={toggleDarkMode}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <InputBox handleOnSubmit={handleOnSubmit} isError={error} />
                <Box
                    sx={{
                        minHeight: "300px",
                        minWidth: "1000px",
                        border: 1,
                        borderColor: "divider",
                        m: 1,
                        p: 2,
                        width: "50",
                        marginTop: 2,
                        alignItems: "center",
                    }}
                >
                    <OutputBox content={result} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default App;
