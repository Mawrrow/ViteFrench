import type { Pronoun, VerbConjugation } from "../types/conjugation";

export const PRONOUNS: Pronoun[] = ["je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles"];

/** Shorthand for building a tense's forms — il/elle/on and ils/elles share a form unless overridden (see agreement()). */
function forms(je: string, tu: string, singular3rd: string, nous: string, vous: string, plural3rd: string) {
  return { je, tu, il: singular3rd, elle: singular3rd, on: singular3rd, nous, vous, ils: plural3rd, elles: plural3rd };
}

/**
 * Passé composé for être-auxiliary verbs, where the participle agrees with
 * the subject's gender/number. je/tu/nous/vous are gender-ambiguous, so they
 * get the standard textbook "(e)"/"(e)s" notation; il/on take the masculine
 * form, elle/ils/elles take the form their gender and number actually require.
 * `participle` must end in a vowel (allé, venu, parti…), true for all seven
 * être-auxiliary verbs here.
 */
function etreAgreement(auxJe: string, auxTu: string, auxSingular3rd: string, auxNous: string, auxVous: string, auxPlural3rd: string, participle: string) {
  return {
    je: `${auxJe} ${participle}(e)`,
    tu: `${auxTu} ${participle}(e)`,
    il: `${auxSingular3rd} ${participle}`,
    elle: `${auxSingular3rd} ${participle}e`,
    on: `${auxSingular3rd} ${participle}`,
    nous: `${auxNous} ${participle}(e)s`,
    vous: `${auxVous} ${participle}(e)(s)`,
    ils: `${auxPlural3rd} ${participle}s`,
    elles: `${auxPlural3rd} ${participle}es`,
  };
}

/**
 * Conjugation reference tables, keyed by verb tag. Adding a verb here is
 * enough to make it show up in /reference and get an in-quiz lookup button —
 * nothing else needs to change (see findConjugatedVerbTag below).
 */
export const CONJUGATIONS: Record<string, VerbConjugation> = {
  etre: {
    verbTag: "etre",
    tenses: [
      { tenseTag: "present", forms: forms("suis", "es", "est", "sommes", "êtes", "sont") },
      { tenseTag: "passe_compose", forms: forms("ai été", "as été", "a été", "avons été", "avez été", "ont été") },
      { tenseTag: "imparfait", forms: forms("étais", "étais", "était", "étions", "étiez", "étaient") },
      { tenseTag: "futur", forms: forms("serai", "seras", "sera", "serons", "serez", "seront") },
      { tenseTag: "conditionnel", forms: forms("serais", "serais", "serait", "serions", "seriez", "seraient") },
      { tenseTag: "subjonctif", forms: forms("sois", "sois", "soit", "soyons", "soyez", "soient") },
    ],
  },
  avoir: {
    verbTag: "avoir",
    tenses: [
      { tenseTag: "present", forms: forms("ai", "as", "a", "avons", "avez", "ont") },
      { tenseTag: "passe_compose", forms: forms("ai eu", "as eu", "a eu", "avons eu", "avez eu", "ont eu") },
      { tenseTag: "imparfait", forms: forms("avais", "avais", "avait", "avions", "aviez", "avaient") },
      { tenseTag: "futur", forms: forms("aurai", "auras", "aura", "aurons", "aurez", "auront") },
      { tenseTag: "conditionnel", forms: forms("aurais", "aurais", "aurait", "aurions", "auriez", "auraient") },
      { tenseTag: "subjonctif", forms: forms("aie", "aies", "ait", "ayons", "ayez", "aient") },
    ],
  },
  aller: {
    verbTag: "aller",
    tenses: [
      { tenseTag: "present", forms: forms("vais", "vas", "va", "allons", "allez", "vont") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "allé") },
      { tenseTag: "imparfait", forms: forms("allais", "allais", "allait", "allions", "alliez", "allaient") },
      { tenseTag: "futur", forms: forms("irai", "iras", "ira", "irons", "irez", "iront") },
      { tenseTag: "conditionnel", forms: forms("irais", "irais", "irait", "irions", "iriez", "iraient") },
      { tenseTag: "subjonctif", forms: forms("aille", "ailles", "aille", "allions", "alliez", "aillent") },
    ],
  },
  faire: {
    verbTag: "faire",
    tenses: [
      { tenseTag: "present", forms: forms("fais", "fais", "fait", "faisons", "faites", "font") },
      { tenseTag: "passe_compose", forms: forms("ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait") },
      { tenseTag: "imparfait", forms: forms("faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient") },
      { tenseTag: "futur", forms: forms("ferai", "feras", "fera", "ferons", "ferez", "feront") },
      { tenseTag: "conditionnel", forms: forms("ferais", "ferais", "ferait", "ferions", "feriez", "feraient") },
      { tenseTag: "subjonctif", forms: forms("fasse", "fasses", "fasse", "fassions", "fassiez", "fassent") },
    ],
  },
  prendre: {
    verbTag: "prendre",
    tenses: [
      { tenseTag: "present", forms: forms("prends", "prends", "prend", "prenons", "prenez", "prennent") },
      { tenseTag: "passe_compose", forms: forms("ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris") },
      { tenseTag: "imparfait", forms: forms("prenais", "prenais", "prenait", "prenions", "preniez", "prenaient") },
      { tenseTag: "futur", forms: forms("prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront") },
      { tenseTag: "conditionnel", forms: forms("prendrais", "prendrais", "prendrait", "prendrions", "prendriez", "prendraient") },
      { tenseTag: "subjonctif", forms: forms("prenne", "prennes", "prenne", "prenions", "preniez", "prennent") },
    ],
  },
  venir: {
    verbTag: "venir",
    tenses: [
      { tenseTag: "present", forms: forms("viens", "viens", "vient", "venons", "venez", "viennent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "venu") },
      { tenseTag: "imparfait", forms: forms("venais", "venais", "venait", "venions", "veniez", "venaient") },
      { tenseTag: "futur", forms: forms("viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront") },
      { tenseTag: "conditionnel", forms: forms("viendrais", "viendrais", "viendrait", "viendrions", "viendriez", "viendraient") },
      { tenseTag: "subjonctif", forms: forms("vienne", "viennes", "vienne", "venions", "veniez", "viennent") },
    ],
  },
  pouvoir: {
    verbTag: "pouvoir",
    tenses: [
      { tenseTag: "present", forms: forms("peux", "peux", "peut", "pouvons", "pouvez", "peuvent") },
      { tenseTag: "passe_compose", forms: forms("ai pu", "as pu", "a pu", "avons pu", "avez pu", "ont pu") },
      { tenseTag: "imparfait", forms: forms("pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient") },
      { tenseTag: "futur", forms: forms("pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront") },
      { tenseTag: "conditionnel", forms: forms("pourrais", "pourrais", "pourrait", "pourrions", "pourriez", "pourraient") },
      { tenseTag: "subjonctif", forms: forms("puisse", "puisses", "puisse", "puissions", "puissiez", "puissent") },
    ],
  },
  devoir: {
    verbTag: "devoir",
    tenses: [
      { tenseTag: "present", forms: forms("dois", "dois", "doit", "devons", "devez", "doivent") },
      { tenseTag: "passe_compose", forms: forms("ai dû", "as dû", "a dû", "avons dû", "avez dû", "ont dû") },
      { tenseTag: "imparfait", forms: forms("devais", "devais", "devait", "devions", "deviez", "devaient") },
      { tenseTag: "futur", forms: forms("devrai", "devras", "devra", "devrons", "devrez", "devront") },
      { tenseTag: "conditionnel", forms: forms("devrais", "devrais", "devrait", "devrions", "devriez", "devraient") },
      { tenseTag: "subjonctif", forms: forms("doive", "doives", "doive", "devions", "deviez", "doivent") },
    ],
  },
  vouloir: {
    verbTag: "vouloir",
    tenses: [
      { tenseTag: "present", forms: forms("veux", "veux", "veut", "voulons", "voulez", "veulent") },
      { tenseTag: "passe_compose", forms: forms("ai voulu", "as voulu", "a voulu", "avons voulu", "avez voulu", "ont voulu") },
      { tenseTag: "imparfait", forms: forms("voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient") },
      { tenseTag: "futur", forms: forms("voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront") },
      { tenseTag: "conditionnel", forms: forms("voudrais", "voudrais", "voudrait", "voudrions", "voudriez", "voudraient") },
      { tenseTag: "subjonctif", forms: forms("veuille", "veuilles", "veuille", "voulions", "vouliez", "veuillent") },
    ],
  },
  savoir: {
    verbTag: "savoir",
    tenses: [
      { tenseTag: "present", forms: forms("sais", "sais", "sait", "savons", "savez", "savent") },
      { tenseTag: "passe_compose", forms: forms("ai su", "as su", "a su", "avons su", "avez su", "ont su") },
      { tenseTag: "imparfait", forms: forms("savais", "savais", "savait", "savions", "saviez", "savaient") },
      { tenseTag: "futur", forms: forms("saurai", "sauras", "saura", "saurons", "saurez", "sauront") },
      { tenseTag: "conditionnel", forms: forms("saurais", "saurais", "saurait", "saurions", "sauriez", "sauraient") },
      { tenseTag: "subjonctif", forms: forms("sache", "saches", "sache", "sachions", "sachiez", "sachent") },
    ],
  },
  connaitre: {
    verbTag: "connaitre",
    tenses: [
      { tenseTag: "present", forms: forms("connais", "connais", "connaît", "connaissons", "connaissez", "connaissent") },
      { tenseTag: "passe_compose", forms: forms("ai connu", "as connu", "a connu", "avons connu", "avez connu", "ont connu") },
      { tenseTag: "imparfait", forms: forms("connaissais", "connaissais", "connaissait", "connaissions", "connaissiez", "connaissaient") },
      { tenseTag: "futur", forms: forms("connaîtrai", "connaîtras", "connaîtra", "connaîtrons", "connaîtrez", "connaîtront") },
      { tenseTag: "conditionnel", forms: forms("connaîtrais", "connaîtrais", "connaîtrait", "connaîtrions", "connaîtriez", "connaîtraient") },
      { tenseTag: "subjonctif", forms: forms("connaisse", "connaisses", "connaisse", "connaissions", "connaissiez", "connaissent") },
    ],
  },
  dire: {
    verbTag: "dire",
    tenses: [
      { tenseTag: "present", forms: forms("dis", "dis", "dit", "disons", "dites", "disent") },
      { tenseTag: "passe_compose", forms: forms("ai dit", "as dit", "a dit", "avons dit", "avez dit", "ont dit") },
      { tenseTag: "imparfait", forms: forms("disais", "disais", "disait", "disions", "disiez", "disaient") },
      { tenseTag: "futur", forms: forms("dirai", "diras", "dira", "dirons", "direz", "diront") },
      { tenseTag: "conditionnel", forms: forms("dirais", "dirais", "dirait", "dirions", "diriez", "diraient") },
      { tenseTag: "subjonctif", forms: forms("dise", "dises", "dise", "disions", "disiez", "disent") },
    ],
  },
  voir: {
    verbTag: "voir",
    tenses: [
      { tenseTag: "present", forms: forms("vois", "vois", "voit", "voyons", "voyez", "voient") },
      { tenseTag: "passe_compose", forms: forms("ai vu", "as vu", "a vu", "avons vu", "avez vu", "ont vu") },
      { tenseTag: "imparfait", forms: forms("voyais", "voyais", "voyait", "voyions", "voyiez", "voyaient") },
      { tenseTag: "futur", forms: forms("verrai", "verras", "verra", "verrons", "verrez", "verront") },
      { tenseTag: "conditionnel", forms: forms("verrais", "verrais", "verrait", "verrions", "verriez", "verraient") },
      { tenseTag: "subjonctif", forms: forms("voie", "voies", "voie", "voyions", "voyiez", "voient") },
    ],
  },
  mettre: {
    verbTag: "mettre",
    tenses: [
      { tenseTag: "present", forms: forms("mets", "mets", "met", "mettons", "mettez", "mettent") },
      { tenseTag: "passe_compose", forms: forms("ai mis", "as mis", "a mis", "avons mis", "avez mis", "ont mis") },
      { tenseTag: "imparfait", forms: forms("mettais", "mettais", "mettait", "mettions", "mettiez", "mettaient") },
      { tenseTag: "futur", forms: forms("mettrai", "mettras", "mettra", "mettrons", "mettrez", "mettront") },
      { tenseTag: "conditionnel", forms: forms("mettrais", "mettrais", "mettrait", "mettrions", "mettriez", "mettraient") },
      { tenseTag: "subjonctif", forms: forms("mette", "mettes", "mette", "mettions", "mettiez", "mettent") },
    ],
  },
  partir: {
    verbTag: "partir",
    tenses: [
      { tenseTag: "present", forms: forms("pars", "pars", "part", "partons", "partez", "partent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "parti") },
      { tenseTag: "imparfait", forms: forms("partais", "partais", "partait", "partions", "partiez", "partaient") },
      { tenseTag: "futur", forms: forms("partirai", "partiras", "partira", "partirons", "partirez", "partiront") },
      { tenseTag: "conditionnel", forms: forms("partirais", "partirais", "partirait", "partirions", "partiriez", "partiraient") },
      { tenseTag: "subjonctif", forms: forms("parte", "partes", "parte", "partions", "partiez", "partent") },
    ],
  },
  sortir: {
    verbTag: "sortir",
    tenses: [
      { tenseTag: "present", forms: forms("sors", "sors", "sort", "sortons", "sortez", "sortent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "sorti") },
      { tenseTag: "imparfait", forms: forms("sortais", "sortais", "sortait", "sortions", "sortiez", "sortaient") },
      { tenseTag: "futur", forms: forms("sortirai", "sortiras", "sortira", "sortirons", "sortirez", "sortiront") },
      { tenseTag: "conditionnel", forms: forms("sortirais", "sortirais", "sortirait", "sortirions", "sortiriez", "sortiraient") },
      { tenseTag: "subjonctif", forms: forms("sorte", "sortes", "sorte", "sortions", "sortiez", "sortent") },
    ],
  },
  dormir: {
    verbTag: "dormir",
    tenses: [
      { tenseTag: "present", forms: forms("dors", "dors", "dort", "dormons", "dormez", "dorment") },
      { tenseTag: "passe_compose", forms: forms("ai dormi", "as dormi", "a dormi", "avons dormi", "avez dormi", "ont dormi") },
      { tenseTag: "imparfait", forms: forms("dormais", "dormais", "dormait", "dormions", "dormiez", "dormaient") },
      { tenseTag: "futur", forms: forms("dormirai", "dormiras", "dormira", "dormirons", "dormirez", "dormiront") },
      { tenseTag: "conditionnel", forms: forms("dormirais", "dormirais", "dormirait", "dormirions", "dormiriez", "dormiraient") },
      { tenseTag: "subjonctif", forms: forms("dorme", "dormes", "dorme", "dormions", "dormiez", "dorment") },
    ],
  },
  boire: {
    verbTag: "boire",
    tenses: [
      { tenseTag: "present", forms: forms("bois", "bois", "boit", "buvons", "buvez", "boivent") },
      { tenseTag: "passe_compose", forms: forms("ai bu", "as bu", "a bu", "avons bu", "avez bu", "ont bu") },
      { tenseTag: "imparfait", forms: forms("buvais", "buvais", "buvait", "buvions", "buviez", "buvaient") },
      { tenseTag: "futur", forms: forms("boirai", "boiras", "boira", "boirons", "boirez", "boiront") },
      { tenseTag: "conditionnel", forms: forms("boirais", "boirais", "boirait", "boirions", "boiriez", "boiraient") },
      { tenseTag: "subjonctif", forms: forms("boive", "boives", "boive", "buvions", "buviez", "boivent") },
    ],
  },
  lire: {
    verbTag: "lire",
    tenses: [
      { tenseTag: "present", forms: forms("lis", "lis", "lit", "lisons", "lisez", "lisent") },
      { tenseTag: "passe_compose", forms: forms("ai lu", "as lu", "a lu", "avons lu", "avez lu", "ont lu") },
      { tenseTag: "imparfait", forms: forms("lisais", "lisais", "lisait", "lisions", "lisiez", "lisaient") },
      { tenseTag: "futur", forms: forms("lirai", "liras", "lira", "lirons", "lirez", "liront") },
      { tenseTag: "conditionnel", forms: forms("lirais", "lirais", "lirait", "lirions", "liriez", "liraient") },
      { tenseTag: "subjonctif", forms: forms("lise", "lises", "lise", "lisions", "lisiez", "lisent") },
    ],
  },
  ecrire: {
    verbTag: "ecrire",
    tenses: [
      { tenseTag: "present", forms: forms("écris", "écris", "écrit", "écrivons", "écrivez", "écrivent") },
      { tenseTag: "passe_compose", forms: forms("ai écrit", "as écrit", "a écrit", "avons écrit", "avez écrit", "ont écrit") },
      { tenseTag: "imparfait", forms: forms("écrivais", "écrivais", "écrivait", "écrivions", "écriviez", "écrivaient") },
      { tenseTag: "futur", forms: forms("écrirai", "écriras", "écrira", "écrirons", "écrirez", "écriront") },
      { tenseTag: "conditionnel", forms: forms("écrirais", "écrirais", "écrirait", "écririons", "écririez", "écriraient") },
      { tenseTag: "subjonctif", forms: forms("écrive", "écrives", "écrive", "écrivions", "écriviez", "écrivent") },
    ],
  },
  manger: {
    verbTag: "manger",
    tenses: [
      { tenseTag: "present", forms: forms("mange", "manges", "mange", "mangeons", "mangez", "mangent") },
      { tenseTag: "passe_compose", forms: forms("ai mangé", "as mangé", "a mangé", "avons mangé", "avez mangé", "ont mangé") },
      { tenseTag: "imparfait", forms: forms("mangeais", "mangeais", "mangeait", "mangions", "mangiez", "mangeaient") },
      { tenseTag: "futur", forms: forms("mangerai", "mangeras", "mangera", "mangerons", "mangerez", "mangeront") },
      { tenseTag: "conditionnel", forms: forms("mangerais", "mangerais", "mangerait", "mangerions", "mangeriez", "mangeraient") },
      { tenseTag: "subjonctif", forms: forms("mange", "manges", "mange", "mangions", "mangiez", "mangent") },
    ],
  },
  parler: {
    verbTag: "parler",
    tenses: [
      { tenseTag: "present", forms: forms("parle", "parles", "parle", "parlons", "parlez", "parlent") },
      { tenseTag: "passe_compose", forms: forms("ai parlé", "as parlé", "a parlé", "avons parlé", "avez parlé", "ont parlé") },
      { tenseTag: "imparfait", forms: forms("parlais", "parlais", "parlait", "parlions", "parliez", "parlaient") },
      { tenseTag: "futur", forms: forms("parlerai", "parleras", "parlera", "parlerons", "parlerez", "parleront") },
      { tenseTag: "conditionnel", forms: forms("parlerais", "parlerais", "parlerait", "parlerions", "parleriez", "parleraient") },
      { tenseTag: "subjonctif", forms: forms("parle", "parles", "parle", "parlions", "parliez", "parlent") },
    ],
  },
  finir: {
    verbTag: "finir",
    tenses: [
      { tenseTag: "present", forms: forms("finis", "finis", "finit", "finissons", "finissez", "finissent") },
      { tenseTag: "passe_compose", forms: forms("ai fini", "as fini", "a fini", "avons fini", "avez fini", "ont fini") },
      { tenseTag: "imparfait", forms: forms("finissais", "finissais", "finissait", "finissions", "finissiez", "finissaient") },
      { tenseTag: "futur", forms: forms("finirai", "finiras", "finira", "finirons", "finirez", "finiront") },
      { tenseTag: "conditionnel", forms: forms("finirais", "finirais", "finirait", "finirions", "finiriez", "finiraient") },
      { tenseTag: "subjonctif", forms: forms("finisse", "finisses", "finisse", "finissions", "finissiez", "finissent") },
    ],
  },
  choisir: {
    verbTag: "choisir",
    tenses: [
      { tenseTag: "present", forms: forms("choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent") },
      { tenseTag: "passe_compose", forms: forms("ai choisi", "as choisi", "a choisi", "avons choisi", "avez choisi", "ont choisi") },
      { tenseTag: "imparfait", forms: forms("choisissais", "choisissais", "choisissait", "choisissions", "choisissiez", "choisissaient") },
      { tenseTag: "futur", forms: forms("choisirai", "choisiras", "choisira", "choisirons", "choisirez", "choisiront") },
      { tenseTag: "conditionnel", forms: forms("choisirais", "choisirais", "choisirait", "choisirions", "choisiriez", "choisiraient") },
      { tenseTag: "subjonctif", forms: forms("choisisse", "choisisses", "choisisse", "choisissions", "choisissiez", "choisissent") },
    ],
  },
  attendre: {
    verbTag: "attendre",
    tenses: [
      { tenseTag: "present", forms: forms("attends", "attends", "attend", "attendons", "attendez", "attendent") },
      { tenseTag: "passe_compose", forms: forms("ai attendu", "as attendu", "a attendu", "avons attendu", "avez attendu", "ont attendu") },
      { tenseTag: "imparfait", forms: forms("attendais", "attendais", "attendait", "attendions", "attendiez", "attendaient") },
      { tenseTag: "futur", forms: forms("attendrai", "attendras", "attendra", "attendrons", "attendrez", "attendront") },
      { tenseTag: "conditionnel", forms: forms("attendrais", "attendrais", "attendrait", "attendrions", "attendriez", "attendraient") },
      { tenseTag: "subjonctif", forms: forms("attende", "attendes", "attende", "attendions", "attendiez", "attendent") },
    ],
  },
  vendre: {
    verbTag: "vendre",
    tenses: [
      { tenseTag: "present", forms: forms("vends", "vends", "vend", "vendons", "vendez", "vendent") },
      { tenseTag: "passe_compose", forms: forms("ai vendu", "as vendu", "a vendu", "avons vendu", "avez vendu", "ont vendu") },
      { tenseTag: "imparfait", forms: forms("vendais", "vendais", "vendait", "vendions", "vendiez", "vendaient") },
      { tenseTag: "futur", forms: forms("vendrai", "vendras", "vendra", "vendrons", "vendrez", "vendront") },
      { tenseTag: "conditionnel", forms: forms("vendrais", "vendrais", "vendrait", "vendrions", "vendriez", "vendraient") },
      { tenseTag: "subjonctif", forms: forms("vende", "vendes", "vende", "vendions", "vendiez", "vendent") },
    ],
  },
  arriver: {
    verbTag: "arriver",
    tenses: [
      { tenseTag: "present", forms: forms("arrive", "arrives", "arrive", "arrivons", "arrivez", "arrivent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "arrivé") },
      { tenseTag: "imparfait", forms: forms("arrivais", "arrivais", "arrivait", "arrivions", "arriviez", "arrivaient") },
      { tenseTag: "futur", forms: forms("arriverai", "arriveras", "arrivera", "arriverons", "arriverez", "arriveront") },
      { tenseTag: "conditionnel", forms: forms("arriverais", "arriverais", "arriverait", "arriverions", "arriveriez", "arriveraient") },
      { tenseTag: "subjonctif", forms: forms("arrive", "arrives", "arrive", "arrivions", "arriviez", "arrivent") },
    ],
  },
  entrer: {
    verbTag: "entrer",
    tenses: [
      { tenseTag: "present", forms: forms("entre", "entres", "entre", "entrons", "entrez", "entrent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "entré") },
      { tenseTag: "imparfait", forms: forms("entrais", "entrais", "entrait", "entrions", "entriez", "entraient") },
      { tenseTag: "futur", forms: forms("entrerai", "entreras", "entrera", "entrerons", "entrerez", "entreront") },
      { tenseTag: "conditionnel", forms: forms("entrerais", "entrerais", "entrerait", "entrerions", "entreriez", "entreraient") },
      { tenseTag: "subjonctif", forms: forms("entre", "entres", "entre", "entrions", "entriez", "entrent") },
    ],
  },
  rester: {
    verbTag: "rester",
    tenses: [
      { tenseTag: "present", forms: forms("reste", "restes", "reste", "restons", "restez", "restent") },
      { tenseTag: "passe_compose", forms: etreAgreement("suis", "es", "est", "sommes", "êtes", "sont", "resté") },
      { tenseTag: "imparfait", forms: forms("restais", "restais", "restait", "restions", "restiez", "restaient") },
      { tenseTag: "futur", forms: forms("resterai", "resteras", "restera", "resterons", "resterez", "resteront") },
      { tenseTag: "conditionnel", forms: forms("resterais", "resterais", "resterait", "resterions", "resteriez", "resteraient") },
      { tenseTag: "subjonctif", forms: forms("reste", "restes", "reste", "restions", "restiez", "restent") },
    ],
  },
  regarder: {
    verbTag: "regarder",
    tenses: [
      { tenseTag: "present", forms: forms("regarde", "regardes", "regarde", "regardons", "regardez", "regardent") },
      { tenseTag: "passe_compose", forms: forms("ai regardé", "as regardé", "a regardé", "avons regardé", "avez regardé", "ont regardé") },
      { tenseTag: "imparfait", forms: forms("regardais", "regardais", "regardait", "regardions", "regardiez", "regardaient") },
      { tenseTag: "futur", forms: forms("regarderai", "regarderas", "regardera", "regarderons", "regarderez", "regarderont") },
      { tenseTag: "conditionnel", forms: forms("regarderais", "regarderais", "regarderait", "regarderions", "regarderiez", "regarderaient") },
      { tenseTag: "subjonctif", forms: forms("regarde", "regardes", "regarde", "regardions", "regardiez", "regardent") },
    ],
  },
  aimer: {
    verbTag: "aimer",
    tenses: [
      { tenseTag: "present", forms: forms("aime", "aimes", "aime", "aimons", "aimez", "aiment") },
      { tenseTag: "passe_compose", forms: forms("ai aimé", "as aimé", "a aimé", "avons aimé", "avez aimé", "ont aimé") },
      { tenseTag: "imparfait", forms: forms("aimais", "aimais", "aimait", "aimions", "aimiez", "aimaient") },
      { tenseTag: "futur", forms: forms("aimerai", "aimeras", "aimera", "aimerons", "aimerez", "aimeront") },
      { tenseTag: "conditionnel", forms: forms("aimerais", "aimerais", "aimerait", "aimerions", "aimeriez", "aimeraient") },
      { tenseTag: "subjonctif", forms: forms("aime", "aimes", "aime", "aimions", "aimiez", "aiment") },
    ],
  },
  chercher: {
    verbTag: "chercher",
    tenses: [
      { tenseTag: "present", forms: forms("cherche", "cherches", "cherche", "cherchons", "cherchez", "cherchent") },
      { tenseTag: "passe_compose", forms: forms("ai cherché", "as cherché", "a cherché", "avons cherché", "avez cherché", "ont cherché") },
      { tenseTag: "imparfait", forms: forms("cherchais", "cherchais", "cherchait", "cherchions", "cherchiez", "cherchaient") },
      { tenseTag: "futur", forms: forms("chercherai", "chercheras", "cherchera", "chercherons", "chercherez", "chercheront") },
      { tenseTag: "conditionnel", forms: forms("chercherais", "chercherais", "chercherait", "chercherions", "chercheriez", "chercheraient") },
      { tenseTag: "subjonctif", forms: forms("cherche", "cherches", "cherche", "cherchions", "cherchiez", "cherchent") },
    ],
  },
  trouver: {
    verbTag: "trouver",
    tenses: [
      { tenseTag: "present", forms: forms("trouve", "trouves", "trouve", "trouvons", "trouvez", "trouvent") },
      { tenseTag: "passe_compose", forms: forms("ai trouvé", "as trouvé", "a trouvé", "avons trouvé", "avez trouvé", "ont trouvé") },
      { tenseTag: "imparfait", forms: forms("trouvais", "trouvais", "trouvait", "trouvions", "trouviez", "trouvaient") },
      { tenseTag: "futur", forms: forms("trouverai", "trouveras", "trouvera", "trouverons", "trouverez", "trouveront") },
      { tenseTag: "conditionnel", forms: forms("trouverais", "trouverais", "trouverait", "trouverions", "trouveriez", "trouveraient") },
      { tenseTag: "subjonctif", forms: forms("trouve", "trouves", "trouve", "trouvions", "trouviez", "trouvent") },
    ],
  },
  penser: {
    verbTag: "penser",
    tenses: [
      { tenseTag: "present", forms: forms("pense", "penses", "pense", "pensons", "pensez", "pensent") },
      { tenseTag: "passe_compose", forms: forms("ai pensé", "as pensé", "a pensé", "avons pensé", "avez pensé", "ont pensé") },
      { tenseTag: "imparfait", forms: forms("pensais", "pensais", "pensait", "pensions", "pensiez", "pensaient") },
      { tenseTag: "futur", forms: forms("penserai", "penseras", "pensera", "penserons", "penserez", "penseront") },
      { tenseTag: "conditionnel", forms: forms("penserais", "penserais", "penserait", "penserions", "penseriez", "penseraient") },
      { tenseTag: "subjonctif", forms: forms("pense", "penses", "pense", "pensions", "pensiez", "pensent") },
    ],
  },
  donner: {
    verbTag: "donner",
    tenses: [
      { tenseTag: "present", forms: forms("donne", "donnes", "donne", "donnons", "donnez", "donnent") },
      { tenseTag: "passe_compose", forms: forms("ai donné", "as donné", "a donné", "avons donné", "avez donné", "ont donné") },
      { tenseTag: "imparfait", forms: forms("donnais", "donnais", "donnait", "donnions", "donniez", "donnaient") },
      { tenseTag: "futur", forms: forms("donnerai", "donneras", "donnera", "donnerons", "donnerez", "donneront") },
      { tenseTag: "conditionnel", forms: forms("donnerais", "donnerais", "donnerait", "donnerions", "donneriez", "donneraient") },
      { tenseTag: "subjonctif", forms: forms("donne", "donnes", "donne", "donnions", "donniez", "donnent") },
    ],
  },
  acheter: {
    verbTag: "acheter",
    tenses: [
      { tenseTag: "present", forms: forms("achète", "achètes", "achète", "achetons", "achetez", "achètent") },
      { tenseTag: "passe_compose", forms: forms("ai acheté", "as acheté", "a acheté", "avons acheté", "avez acheté", "ont acheté") },
      { tenseTag: "imparfait", forms: forms("achetais", "achetais", "achetait", "achetions", "achetiez", "achetaient") },
      { tenseTag: "futur", forms: forms("achèterai", "achèteras", "achètera", "achèterons", "achèterez", "achèteront") },
      { tenseTag: "conditionnel", forms: forms("achèterais", "achèterais", "achèterait", "achèterions", "achèteriez", "achèteraient") },
      { tenseTag: "subjonctif", forms: forms("achète", "achètes", "achète", "achetions", "achetiez", "achètent") },
    ],
  },
  jouer: {
    verbTag: "jouer",
    tenses: [
      { tenseTag: "present", forms: forms("joue", "joues", "joue", "jouons", "jouez", "jouent") },
      { tenseTag: "passe_compose", forms: forms("ai joué", "as joué", "a joué", "avons joué", "avez joué", "ont joué") },
      { tenseTag: "imparfait", forms: forms("jouais", "jouais", "jouait", "jouions", "jouiez", "jouaient") },
      { tenseTag: "futur", forms: forms("jouerai", "joueras", "jouera", "jouerons", "jouerez", "joueront") },
      { tenseTag: "conditionnel", forms: forms("jouerais", "jouerais", "jouerait", "jouerions", "joueriez", "joueraient") },
      { tenseTag: "subjonctif", forms: forms("joue", "joues", "joue", "jouions", "jouiez", "jouent") },
    ],
  },
  ecouter: {
    verbTag: "ecouter",
    tenses: [
      { tenseTag: "present", forms: forms("écoute", "écoutes", "écoute", "écoutons", "écoutez", "écoutent") },
      { tenseTag: "passe_compose", forms: forms("ai écouté", "as écouté", "a écouté", "avons écouté", "avez écouté", "ont écouté") },
      { tenseTag: "imparfait", forms: forms("écoutais", "écoutais", "écoutait", "écoutions", "écoutiez", "écoutaient") },
      { tenseTag: "futur", forms: forms("écouterai", "écouteras", "écoutera", "écouterons", "écouterez", "écouteront") },
      { tenseTag: "conditionnel", forms: forms("écouterais", "écouterais", "écouterait", "écouterions", "écouteriez", "écouteraient") },
      { tenseTag: "subjonctif", forms: forms("écoute", "écoutes", "écoute", "écoutions", "écoutiez", "écoutent") },
    ],
  },
  payer: {
    verbTag: "payer",
    tenses: [
      { tenseTag: "present", forms: forms("paie", "paies", "paie", "payons", "payez", "paient") },
      { tenseTag: "passe_compose", forms: forms("ai payé", "as payé", "a payé", "avons payé", "avez payé", "ont payé") },
      { tenseTag: "imparfait", forms: forms("payais", "payais", "payait", "payions", "payiez", "payaient") },
      { tenseTag: "futur", forms: forms("paierai", "paieras", "paiera", "paierons", "paierez", "paieront") },
      { tenseTag: "conditionnel", forms: forms("paierais", "paierais", "paierait", "paierions", "paieriez", "paieraient") },
      { tenseTag: "subjonctif", forms: forms("paie", "paies", "paie", "payions", "payiez", "paient") },
    ],
  },
  travailler: {
    verbTag: "travailler",
    tenses: [
      { tenseTag: "present", forms: forms("travaille", "travailles", "travaille", "travaillons", "travaillez", "travaillent") },
      {
        tenseTag: "passe_compose",
        forms: forms("ai travaillé", "as travaillé", "a travaillé", "avons travaillé", "avez travaillé", "ont travaillé"),
      },
      { tenseTag: "imparfait", forms: forms("travaillais", "travaillais", "travaillait", "travaillions", "travailliez", "travaillaient") },
      { tenseTag: "futur", forms: forms("travaillerai", "travailleras", "travaillera", "travaillerons", "travaillerez", "travailleront") },
      {
        tenseTag: "conditionnel",
        forms: forms("travaillerais", "travaillerais", "travaillerait", "travaillerions", "travailleriez", "travailleraient"),
      },
      { tenseTag: "subjonctif", forms: forms("travaille", "travailles", "travaille", "travaillions", "travailliez", "travaillent") },
    ],
  },
};

/** The first tag on a question (if any) that has a conjugation table available. */
export function findConjugatedVerbTag(tags: string[]): string | undefined {
  return tags.find((tag) => tag in CONJUGATIONS);
}
