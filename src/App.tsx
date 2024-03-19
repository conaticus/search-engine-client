import { useState } from "react";
import Input from "./ui/Input";

interface QueryResult {
    executionSeconds?: number;
    results: string[];
}

function App() {
    const [input, setInput] = useState("");
    const [queryResult, setQueryResult] = useState<QueryResult>({
        results: [],
    });

    async function sendQuery() {
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

            <div>
                {queryResult.results.map((result, idx) => (
                    <div style={{ marginBottom: "10px", fontSize: "25px" }}>
                        <a key={idx} href={result}>
                            {result}
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
