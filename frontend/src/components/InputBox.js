import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploader from "./FileUploader";
function InputBox({ handleOnSubmit, isError }) {
    // 使用useState钩子来管理输入框的状态
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        console.log(`inputValue = ${inputValue}`);
    };
    const handleSubmit = (event) => {
        console.log("Submitted value:", inputValue);
        // 这里可以添加处理提交的逻辑
        event.preventDefault(); // 阻止表单默认提交行为
        handleOnSubmit(inputValue); // 调用传入的handleOnSubmit方法，并传递输入框的值
    };
    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                    label="要计算的化学式"
                    value={inputValue}
                    onChange={handleInputChange}
                    sx={{ mr: 1 }}
                    error={isError}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    提交
                </Button>
            </Box>

            <FileUploader
                setInputValue={setInputValue}
                submitValue={handleOnSubmit}
            />
        </div>
    );
}

export default InputBox;
