import Container from "../../../components/Container";
import CreatePatternDialog from "../components/dialogs/CreatePatternDialog";
import PatternItem from "../components/PatternItem";
import { useSpokenPatterns } from "../hooks/useSpokenPattern";

const SpokenPatternList = () => {
  const { patterns, isLoading, error } = useSpokenPatterns();

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 lg:px-0"}>
        <div className="mt-6 flex justify-between items-center">
          <h1 id="dashboard-title" className="text-2xl font-bold">
            Spoken Patterns
          </h1>
          <CreatePatternDialog />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {patterns?.map((pattern) => {
            return <PatternItem key={pattern.id} pattern={pattern} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default SpokenPatternList;
