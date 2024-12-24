import Box from "@mui/material/Box";
import "./OutputBox.css";

const OutputBox = ({ content }) => {
    if (content === undefined) return <div>没有输入哦~</div>;
    else if (typeof content === "string") {
        // 假设错误信息直接传入字符串
        return <div style={{ color: "red" }}>{content}</div>;
    } else if (content && typeof content === "object") {
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
                <p align="center">1 Mol 该元素中含有：</p>
                <Box sx={{ alignContent: "center" }}>
                    {Object.entries(content.elements).sort((a, b) => a[1].id - b[1].id).map(
                        ([elemName, value]) => {
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
                        }
                    )}
                </Box>
                <p>总相对原子质量: {content.weight.toFixed(3)}</p>
            </Box>
        );
    }
    return <div />;
};

export default OutputBox;
