import { useState } from "react";
import { getAIRecommendation } from "../services/api";

export default function AIRecommendation() {
  const [input, setInput] = useState({});
  const [result, setResult] = useState("");

  const runAI = async () => {
    const res = await getAIRecommendation({
      ...input,
      skills: input.skills?.split(","),
      performanceScore: Number(input.performanceScore)
    });

    setResult(res.data.choices[0].message.content);
  };

  return (
    <div className="page">
      <div className="container card">

        <h2>AI Analysis</h2>

        <input placeholder="Name" onChange={(e) => setInput({ ...input, name: e.target.value })} />
        <input placeholder="Skills" onChange={(e) => setInput({ ...input, skills: e.target.value })} />
        <input type="number" placeholder="Score" onChange={(e) => setInput({ ...input, performanceScore: e.target.value })} />

        <button className="primary-btn" onClick={runAI}>
          Analyze
        </button>

        {result && (
          <div className="ai-card">
            <pre>{result}</pre>
          </div>
        )}

      </div>
    </div>
  );
}