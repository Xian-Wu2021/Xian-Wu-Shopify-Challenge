import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./Prompt.css";

require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

function Prompt() {
  const [responseList, setResponseList] = useState([]);
  const [promptText, promptChange] = useState("");

  const handleChange = (event) => {
    promptChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const engine = event.target.children[0].children[1].value;
    (async () => {
      const completion = await openai.createCompletion(engine, {
        prompt: promptText
      });
      setResponseList([
        {
          prompt: promptText,
          engine: engine,
          response: completion.data.choices[0].text
        },
        ...responseList
      ]);
    })();
  };

  const handlePreset1 = () => {
    promptChange("Write a poem please");
  };

  const handlePreset2 = () => {
    promptChange("How do you like apples");
  };

  const handlePreset3 = () => {
    promptChange("What is your hobby");
  };

  const createResponsesList = responseList.map((entry) => {
    return (
      <div className="ResponseItem">
        <span className="ResponseTitle">Prompt</span>
        <span>{entry.prompt}</span>
        <span className="ResponseTitle">Engine</span>
        <span>{entry.engine}</span>
        <span className="ResponseTitle">Response</span>
        <span>{entry.response}</span>
      </div>
    );
  });

  return (
    <div className="PromptContainer">
      <h1>Fun with AI</h1>
      <form className="PromptForm" onSubmit={handleSubmit}>
        <div>
          <p className="PromptLabel">Choose Engine</p>
          <select className="PromptSelect">
            <option value="text-curie-001">text-curie-001</option>
            <option value="text-davinci-001">text-davinci-001</option>
            <option value="text-babbage-001">text-babbage-001</option>
            <option value="text-ada-001">text-ada-001</option>
          </select>
        </div>
        <div>
          <p className="PromptLabel">Use preset prompt</p>
          <button className="PresetButton" onClick={handlePreset1}>
            preset 1
          </button>
          <button className="PresetButton" onClick={handlePreset2}>
            preset 2
          </button>
          <button className="PresetButton" onClick={handlePreset3}>
            preset 3
          </button>
        </div>

        <p className="PromptLabel">Enter prompt</p>
        <textarea
          className="PromptTextarea"
          value={promptText}
          onChange={handleChange}
        />

        <input className="PromptSubmitButton" type="submit" />
      </form>
      <h2 className="ResponseLabel">Responses</h2>
      <div className="ResponsesListContainer">{createResponsesList}</div>
    </div>
  );
}

export default Prompt;
