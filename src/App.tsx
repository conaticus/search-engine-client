import { useState } from "react";
import Input from "./ui/Input";

interface Website {
    url: string;
    title: string;
    description: string;
}

interface QueryResult {
    executionSeconds?: number;
    results: Website[];
}

function App() {
    const [input, setInput] = useState("");
    const [queryResult, setQueryResult] = useState<QueryResult>({
        results: [],
    });

    async function sendQuery() {
        if (input.length == 0) return;

        const res = await fetch("/api/query", {
            method: "POST",
            body: JSON.stringify({
                query: input,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        setQueryResult(data);
    }

    return (
        <>
            <Input
                placeholder="Lasagne Recipe"
                input={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={sendQuery}
            />

            {queryResult.executionSeconds && (
                <p style={{ color: "#9A9A9A", fontSize: "15px", marginBottom: "20px" }}>
                    Found {queryResult.results.length} Results ({queryResult.executionSeconds}{" "}
                    seconds)
                </p>
            )}

            <div style={{ width: "80vw" }}>
                {queryResult.results.map((result, idx) => (
                    <div
                        style={{
                            marginBottom: "20px",
                            fontSize: "25px",
                        }}
                    >
                        <a
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                width: "100%",
                                display: "block",
                                marginBottom: "5px",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            href={result.url}
                        >
                            {result.title}
                        </a>
                        <p
                            style={{
                                fontSize: "15px",
                                color: "#d1d1d1",
                                display: "-webkit-box",
                                lineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                margin: 0,
                            }}
                        >
                            {result.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
