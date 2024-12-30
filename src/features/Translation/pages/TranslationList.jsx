import { useLocation, useParams } from "react-router-dom";
import Container from "../../../components/Container";
import TranslationItem from "../components/TranslationItem";
import { useAllTranslations } from "../hooks/useTranslation";
import CreateTranslationDialog from "../components/dialogs/CreateTranslationDialog";

const TranslationList = () => {
  const { "day-id": dayId } = useParams();
  const { state } = useLocation();
  const { translationDay } = state || {};
  const { data: translations, isLoading, error } = useAllTranslations(dayId);

  return (
    <section>
      <Container className={"flex flex-col gap-4 px-6 lg:px-0"}>
        <div className="mt-6 flex justify-between items-center">
          <h1 id="dashboard-title" className="text-2xl font-bold">
            Translations - {translationDay.day_name}
          </h1>
          <CreateTranslationDialog translationDayId={dayId} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {translations?.map((translation) => {
            return (
              <TranslationItem key={translation.id} translation={translation} />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TranslationList;
