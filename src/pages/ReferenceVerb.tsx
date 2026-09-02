import { Link, Navigate, useParams } from "react-router-dom";
import { ConjugationTable } from "../components/ConjugationTable";
import { CONJUGATIONS } from "../data/conjugations";
import { labelForTag } from "../data/tagGroups";

export function ReferenceVerb() {
  const { verbTag } = useParams<{ verbTag: string }>();
  const verb = verbTag ? CONJUGATIONS[verbTag] : undefined;

  if (!verb) return <Navigate to="/reference" replace />;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 md:py-16">
      <Link to="/reference" className="font-display text-sm text-brand-black/60 uppercase hover:cursor-pointer">
        ← Reference
      </Link>
      <h1 className="font-display text-4xl uppercase md:text-5xl">{labelForTag(verb.verbTag)}</h1>
      <ConjugationTable verb={verb} />
    </div>
  );
}
