import React from "react";
import Container from "../../../components/Container";
import CreatePatternExampleDialog from "./dialogs/CreatePatternExampleDialog";
import { usePatternExamples } from "../hooks/usePatternExample";
import PatternExampleItem from "./PatternExampleItem";

const PatternExampleList = ({ patternId }) => {
  const { examples, isLoading, error } = usePatternExamples(patternId);
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md border-gray-300">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Examples</h3>
        <CreatePatternExampleDialog patternId={patternId} />
      </div>
      <div className="flex flex-col gap-2 h-96 overflow-auto pe-2">
        {examples?.map((example) => {
          return (
            <PatternExampleItem
              key={example.id}
              example={example}
              patternId={patternId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PatternExampleList;
