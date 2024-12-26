import Box from "@mui/material/Box";
import "./OutputBox.css";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";

function DownloadButton({ content, title }) {
    const handleDownload = () => {
        // 创建一个Blob对象，内容为传入的content，类型为纯文本
        const blob = new Blob([content], { type: "text/plain" });

        // 创建一个可下载的链接
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.txt`; // 设置下载文件名

        // 将链接添加到DOM中并触发点击，然后移除链接
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 释放创建的URL对象
        URL.revokeObjectURL(url);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleDownload}>
            下载文件
        </Button>
    );
}

const OutputBox = ({ content, setTextContent }) => {
    if (content === undefined) return <div>没有输入哦~</div>;
    else if (typeof content === "string") {
        // 假设错误信息直接传入字符串
        return <div style={{ color: "red" }}>{content}</div>;
    } else if (content && typeof content === "object") {
        let text = "";
        Object.entries(content.elements)
            .sort((a, b) => a[1].id - b[1].id)
            .map(([elemName, value]) => {
                text += `${elemName}: ${value.number}\n`;
            });
        text += `Total Weight: ${content.weight.toFixed(3)}`;
        return (
            <Box
                sx={{
                    display: "flex", // 使用flex布局
                    flexDirection: "column", // 子元素垂直排列
                    alignItems: "center", // 水平居中
                    justifyContent: "center", // 垂直居中
                    width: "100%", // 占满整个容器宽度
                }}
            >
                <DownloadButton
                    content={text}
                    title={"result"}
                ></DownloadButton>
                <p align="center">1 Mol 该元素中含有：</p>
                <Box sx={{ alignContent: "center" }}>
                    {Object.entries(content.elements)
                        .sort((a, b) => a[1].id - b[1].id)
                        .map(([elemName, value]) => {
                            return (
                                <Box
                                    className={`box-elem-${value.id}`}
                                    key={value.id}
                                    borderBottom={4}
                                    sx={{
                                        padding: "10px",
                                        marginTop: "10px",
                                        borderRadius: "5px",
                                        width: "200px",
                                        textAlign: "center",
                                    }}
                                >
                                    <b>
                                        {elemName} {value.number} Mol
                                    </b>
                                </Box>
                            );
                        })}
                </Box>
                <p>总相对原子质量: {content.weight.toFixed(3)}</p>
            </Box>
        );
    }
    return <div />;
};

export default OutputBox;
