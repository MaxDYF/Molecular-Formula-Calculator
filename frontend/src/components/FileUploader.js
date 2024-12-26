import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
function FileUploader({ setInputValue, submitValue }) {
    const fileInputRef = useRef(null);
    const [file, setFile] = React.useState(null); // 用于存储用户选择的文件

    const handleChooseFile = () => {
        // 触发文件输入元素
        fileInputRef.current.click();
    };

    const handleFileUpload = () => {
        // 检查是否选择了文件
        if (file) {
            // 读取文件内容
            const reader = new FileReader();

            reader.onload = (e) => {
                // 读取文件内容后的处理
                console.log(e.target.result);
                setInputValue(e.target.result); // 使用e.target.result而不是reader.result
                submitValue(e.target.result);
            };
            reader.readAsText(file); // 以文本形式读取文件
        } else {
            // 提示用户选择文件
            console.log("请先选择一个文件");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // 更新文件状态
    };

    return (
        <div>
            <Input
                accept=".txt" // 限制只能上传文本文件
                inputRef={fileInputRef} // 引用input元素
                id="file-upload-button"
                multiple={false} // 允许选择多个文件可能会导致一些逻辑问题，所以这里设置为false
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange} // 当文件选择后更新文件状态
            />
            <Button
                variant="contained"
                component="span"
                onClick={handleChooseFile}
            >
                选择文件
            </Button>
            <Button
                variant="contained"
                component="span"
                onClick={handleFileUpload}
                style={{ marginLeft: 8 }} // 为上传按钮添加一些间距
            >
                上传文件
            </Button>
        </div>
    );
}

export default FileUploader;
