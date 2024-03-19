import { useState } from "react";
import Input from "./ui/Input";

function App() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<string[]>([]);

    return (
        <>
            <Input
                placeholder="Lasagne Recipe"
                input={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <div>
                {results.map((result, idx) => (
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
