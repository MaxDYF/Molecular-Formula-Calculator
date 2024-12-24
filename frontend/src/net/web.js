const getFormulaResult = async (text, url) => {
    try {
        console.log(JSON.stringify({ "formula-string": text }));
        let response = undefined;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "formula-string": `${text}` }), // 将对象转换为JSON字符串
            });
        } catch (err) {
            throw new Error(err);
        }
        if (response.ok) {
			const result = await response.json();
			if (typeof result === "string")
				return result;
			else if (result['elements'] === undefined || result['elements'] === null)
				return undefined;
			else
				return result;
        } else {
            const msg = JSON.stringify(response.json());
            throw new Error(msg);
        }
    } catch (err) {
        console.log(JSON.stringify(err));
        return JSON.stringify(err);
    }
};

export default getFormulaResult;
