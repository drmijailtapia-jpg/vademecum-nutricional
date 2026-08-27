"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type Product = {
  id: string;
  name: string;
  subtitle: string;
  volume: string;
  kcal: number;
  density: string;
  protein: string;
  carbs: string;
  fat: string;
  sugar?: string;
  fiber?: string;
  distribution: string;
  highlight: string;
  special: string;
  profile: string;
  flavors: string;
  osmolarity: string;
  osmolality: string;
  sodium: string;
  potassium: string;
  phosphorus: string;
  calcium: string;
  compendium?: string;
  tags: string[];
  image: string;
  accent: string;
  tint: string;
};

const products: Product[] = [
  {
    id: "ensure",
    name: "Ensure",
    subtitle: "Completa, balanceada y con fibra",
    volume: "237 mL",
    kcal: 246,
    density: "1.04 kcal/mL",
    protein: "9 g",
    carbs: "39 g",
    fat: "6 g",
    sugar: "10 g",
    fiber: "3 g (FOS)",
    distribution: "HC 63% · P 15% · L 22%",
    highlight: "3 g de FOS",
    special: "Dieta polimérica con fibra, normocalórica y normoproteica.",
    profile: "Riesgo de desnutrición o deficiencias nutricionales, dificultad para masticar o deglutir, o ingesta habitual insuficiente para cubrir requerimientos.",
    flavors: "Vainilla, fresa y chocolate",
    osmolarity: "412 mOsm/L",
    osmolality: "502 mOsm/kg H₂O",
    sodium: "201 mg",
    potassium: "372 mg",
    phosphorus: "251 mg",
    calcium: "301 mg",
    tags: ["General"],
    image: "/products/ensure.png",
    accent: "#3083b8",
    tint: "#eaf5fb",
  },
  {
    id: "ensure-advance",
    name: "Ensure Advance",
    subtitle: "Nutrición completa con HMB",
    volume: "237 mL",
    kcal: 252,
    density: "1.06 kcal/mL",
    protein: "13 g",
    carbs: "32 g",
    fat: "8 g",
    sugar: "10 g",
    distribution: "HC 50.8% · P 20.6% · L 28.6%",
    highlight: "1.5 g de Ca-HMB",
    special: "Fórmula completa adicionada con Ca-HMB, metabolito de la leucina.",
    profile: "Desnutrición leve a moderada o pérdida de masa muscular asociada al envejecimiento o a condiciones clínicas, con ingesta habitual insuficiente.",
    flavors: "Vainilla, fresa, chocolate y café",
    osmolarity: "492 mOsm/L",
    osmolality: "598 mOsm/kg H₂O",
    sodium: "235 mg",
    potassium: "841 mg",
    phosphorus: "351 mg",
    calcium: "351 mg",
    tags: ["General", "Músculo"],
    image: "/products/ensure-advance.png",
    accent: "#3155a6",
    tint: "#eef1fb",
  },
  {
    id: "ensure-pro-care",
    name: "Ensure Pro-Care",
    subtitle: "Hipercalórica e hiperproteica",
    volume: "220 mL",
    kcal: 327,
    density: "1.47 kcal/mL",
    protein: "20 g",
    carbs: "37 g",
    fat: "11 g",
    sugar: "15 g",
    fiber: "1.7 g (FOS)",
    distribution: "HC 46% · P 25% · L 29%",
    highlight: "20 g proteína + Ca-HMB",
    special: "Hiperproteica e hipercalórica, adicionada con 1.5 g de Ca-HMB.",
    profile: "Desnutrición moderada a grave o pérdida de masa muscular asociada a enfermedad, y/o ingesta insuficiente para cubrir requerimientos.",
    flavors: "Vainilla",
    osmolarity: "557 mOsm/L",
    osmolality: "730 mOsm/kg H₂O",
    sodium: "330 mg",
    potassium: "594 mg",
    phosphorus: "260 mg",
    calcium: "499 mg",
    tags: ["Músculo", "General"],
    image: "/products/ensure-pro-care.png",
    accent: "#d39b21",
    tint: "#fff8e8",
  },
  {
    id: "glucerna",
    name: "Glucerna",
    subtitle: "Sistema de hidratos de lenta absorción",
    volume: "237 mL",
    kcal: 186,
    density: "0.78 kcal/mL",
    protein: "11 g",
    carbs: "15.2 g",
    fat: "9 g",
    fiber: "8.8 g (1.3 g FOS)",
    distribution: "HC 32.7% · P 23.7% · L 43.6%",
    highlight: "8.8 g fibra + inositol",
    special: "Sistema de hidratos de carbono de lenta absorción y 801 mg de inositol.",
    profile: "Desnutrición leve a moderada o ingesta insuficiente, con intolerancia a la glucosa, variabilidad glucémica, hiperglucemia o diabetes mellitus.",
    flavors: "Vainilla, fresa y chocolate",
    osmolarity: "574 mOsm/L",
    osmolality: "675 mOsm/kg H₂O",
    sodium: "199 mg",
    potassium: "429 mg",
    phosphorus: "249 mg",
    calcium: "249 mg",
    tags: ["Diabetes"],
    image: "/products/glucerna.png",
    accent: "#e56b32",
    tint: "#fff0e8",
  },
  {
    id: "prosure",
    name: "Prosure",
    subtitle: "Hiperproteica con EPA",
    volume: "220 mL",
    kcal: 271,
    density: "1.23 kcal/mL",
    protein: "14.63 g",
    carbs: "40.33 g",
    fat: "5.63 g",
    sugar: "14 g",
    fiber: "2.13 g (+ 2.42 g FOS)",
    distribution: "HC 59.5% · P 21.5% · L 19%",
    highlight: "1 g de EPA",
    special: "Mezcla concentrada de proteína de leche y caseína, baja en grasa y adicionada con 1 g de EPA.",
    profile: "Desnutrición energético-proteica, pérdida involuntaria de peso asociada a inflamación o caquexia relacionada con cáncer en cualquier estadio.",
    flavors: "Vainilla",
    osmolarity: "597 mOsm/L",
    osmolality: "753 mOsm/kg H₂O",
    sodium: "253 mg",
    potassium: "385 mg",
    phosphorus: "176 mg",
    calcium: "220 mg",
    compendium: "010.000.8012.00",
    tags: ["Oncología", "Músculo"],
    image: "/products/prosure.png",
    accent: "#8c4a9f",
    tint: "#f7eef9",
  },
  {
    id: "nepro-hp",
    name: "Nepro HP",
    subtitle: "Hiperproteica para terapia dialítica",
    volume: "237 mL",
    kcal: 434,
    density: "1.8 kcal/mL",
    protein: "19.2 g",
    carbs: "37.9 g",
    fat: "22.8 g",
    fiber: "3 g (2 g FOS)",
    distribution: "HC 35% · P 18% · L 47%",
    highlight: "Bajo aporte de P, K y Na",
    special: "Concentrada, hipercalórica e hiperproteica; sistema CarbSteady y bajo aporte de fósforo, potasio y sodio.",
    profile: "Enfermedad renal aguda o crónica en terapia dialítica, ingesta insuficiente, desgaste proteico-energético o restricción hídrica.",
    flavors: "Vainilla",
    osmolarity: "540 mOsm/L",
    osmolality: "745 mOsm/kg H₂O",
    sodium: "251 mg",
    potassium: "251 mg",
    phosphorus: "171 mg",
    calcium: "251 mg",
    compendium: "010.000.8006.00",
    tags: ["Renal"],
    image: "/products/nepro-hp.png",
    accent: "#168458",
    tint: "#e9f7f0",
  },
  {
    id: "nepro-low",
    name: "Nepro Low Prot",
    subtitle: "Hipercalórica y baja en proteína",
    volume: "237 mL",
    kcal: 432,
    density: "1.8 kcal/mL",
    protein: "10.6 g",
    carbs: "46.4 g",
    fat: "22.7 g",
    distribution: "HC 43% · P 10% · L 47%",
    highlight: "Etapas tempranas / prediálisis",
    special: "Hipercalórica, baja en proteína y reducida en fósforo, potasio y sodio; sistema CarbSteady.",
    profile: "Enfermedad renal crónica en etapas tempranas o prediálisis, ingesta insuficiente, desgaste proteico-energético o restricción hídrica.",
    flavors: "Vainilla",
    osmolarity: "566 mOsm/L",
    osmolality: "780 mOsm/kg H₂O",
    sodium: "190 mg",
    potassium: "270 mg",
    phosphorus: "211 mg",
    calcium: "292 mg",
    tags: ["Renal"],
    image: "/products/nepro-low.png",
    accent: "#687d35",
    tint: "#f1f5e8",
  },
  {
    id: "alitraq",
    name: "AlitraQ",
    subtitle: "Dieta elemental con glutamina y arginina",
    volume: "300 mL",
    kcal: 310,
    density: "1 kcal/mL",
    protein: "15.81 g",
    carbs: "51.57 g",
    fat: "4.5 g",
    sugar: "7.17 g",
    distribution: "HC 67% · P 20% · L 13%",
    highlight: "Glutamina + arginina + TCM",
    special: "Dieta elemental con 4.26 g de L-glutamina, 1.35 g de L-arginina y triglicéridos de cadena media.",
    profile: "Estrés metabólico o función gastrointestinal deteriorada, como enfermedad crítica, quemaduras, politraumatismo, malabsorción, insuficiencia pancreática o cirugía gastrointestinal.",
    flavors: "Vainilla",
    osmolarity: "504 mOsm/L",
    osmolality: "606 mOsm/kg H₂O",
    sodium: "300 mg",
    potassium: "420 mg",
    phosphorus: "159 mg",
    calcium: "219 mg",
    compendium: "010.000.8013.00",
    tags: ["Gastrointestinal"],
    image: "/products/alitraq.png",
    accent: "#e87523",
    tint: "#fff2e8",
  },
];

products.sort((first, second) => {
  if (first.id === "ensure-pro-care") return -1;
  if (second.id === "ensure-pro-care") return 1;
  return 0;
});

const filters = [
  "Todas",
  "General",
  "Músculo",
  "Diabetes",
  "Renal",
  "Oncología",
  "Gastrointestinal",
];

type GuideKey = "polymorbid" | "critical" | "geriatric" | "custom";

const guideProfiles: Record<GuideKey, {
  name: string;
  short: string;
  energy: number;
  energyMin: number;
  energyMax: number;
  protein: number;
  proteinMin: number;
  proteinMax: number;
  planned: number;
  note: string;
  source?: string;
}> = {
  polymorbid: {
    name: "ESPEN multimórbido",
    short: "Hospitalizado ≥65 años",
    energy: 27,
    energyMin: 25,
    energyMax: 30,
    protein: 1.2,
    proteinMin: 1.2,
    proteinMax: 1.5,
    planned: 100,
    note: "Selecciona 25–30 kcal/kg/día alrededor del valor orientador de 27 kcal/kg/día, y 1.2–1.5 g de proteína/kg/día. Si TFG <30 mL/min/1.73 m² sin terapia de reemplazo renal, la meta proteica requiere ajuste.",
    source: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN-practical-guideline-Nutritional-support-for-polymorbid-medical-inpatients.pdf",
  },
  critical: {
    name: "ESPEN paciente crítico",
    short: "UCI · sin calorimetría",
    energy: 25,
    energyMin: 20,
    energyMax: 25,
    protein: 1.3,
    proteinMin: 1.3,
    proteinMax: 1.3,
    planned: 70,
    note: "Selecciona 20–25 kcal/kg/día si no hay calorimetría indirecta. La guía establece una meta proteica de 1.3 g/kg/día, que debe alcanzarse progresivamente; ajusta la progresión con el porcentaje a administrar.",
    source: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN_practical_and_partially_revised_guideline_Clinical_nutrition_in_the_intensive_care_unit.pdf",
  },
  geriatric: {
    name: "ESPEN geriatría",
    short: "Persona mayor",
    energy: 30,
    energyMin: 27,
    energyMax: 30,
    protein: 1,
    proteinMin: 1,
    proteinMax: 1.5,
    planned: 100,
    note: "En personas mayores enfermas puedes seleccionar 27–30 kcal/kg/día. La proteína parte de 1.0 g/kg/día y puede ajustarse hasta 1.5 g/kg/día según enfermedad, estado nutricional y tolerancia.",
    source: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN_practical_guideline_Clinical_nutrition_and_hydration_in_geriatrics.pdf",
  },
  custom: {
    name: "Personalizado",
    short: "Definido por el profesional",
    energy: 25,
    energyMin: 10,
    energyMax: 60,
    protein: 1.2,
    proteinMin: 0.4,
    proteinMax: 3,
    planned: 100,
    note: "Introduce una meta individual de energía y proteína según la valoración clínica, el peso que corresponda y el objetivo terapéutico.",
  },
};

const numberFormat = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 });
const compactNumber = (value: number) => numberFormat.format(Number.isFinite(value) ? value : 0);
const productProtein = (product: Product) => Number.parseFloat(product.protein.replace(",", ".")) || 0;
const productVolume = (product: Product) => Number.parseFloat(product.volume.replace(",", ".")) || 0;

function rangeText(min: number, max: number) {
  return min === max ? `${min}` : `${min}–${max}`;
}

function TargetControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  custom,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  custom: boolean;
  onChange: (value: number) => void;
}) {
  const fixed = min === max;
  return (
    <label className="field target-field">
      <span>{label}</span>
      {custom || fixed ? (
        <div className={`input-with-unit ${fixed ? "fixed-target" : ""}`}>
          <input type="number" min={min} max={max} step={step} value={value} disabled={fixed} onChange={(event) => onChange(Number(event.target.value))} />
          <small>{unit}</small>
        </div>
      ) : (
        <>
          <div className="target-range">
            <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
            <output>{value} <small>{unit}</small></output>
          </div>
          <div className="range-bounds"><span>{min}</span><span>{max}</span></div>
        </>
      )}
      <small>{fixed ? "Meta indicada por la guía; la progresión se controla con el porcentaje a administrar." : custom ? "Valor definido por el profesional." : `Selecciona dentro del rango ${rangeText(min, max)} ${unit}.`}</small>
    </label>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h11.5v16H7A2.5 2.5 0 0 0 4.5 21V5.5Z" />
      <path d="M4.5 5.5V21M8 7h7M8 11h7" />
    </svg>
  );
}

export default function Home() {
  const [view, setView] = useState<"catalog" | "calculator">("catalog");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [guide, setGuide] = useState<GuideKey>("polymorbid");
  const [weight, setWeight] = useState(70);
  const [energyPerKg, setEnergyPerKg] = useState(27);
  const [proteinPerKg, setProteinPerKg] = useState(1.2);
  const [plannedPercent, setPlannedPercent] = useState(100);
  const [currentEnergyPercent, setCurrentEnergyPercent] = useState(50);
  const [currentProteinPercent, setCurrentProteinPercent] = useState(50);
  const [selectedProductId, setSelectedProductId] = useState("ensure-pro-care");
  const [simulationUnits, setSimulationUnits] = useState(1);

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0];

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capturePrompt);
    return () => window.removeEventListener("beforeinstallprompt", capturePrompt);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProduct]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const visibleProducts = useMemo(() => {
    const cleanQuery = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesFilter = filter === "Todas" || product.tags.includes(filter);
      const searchable = [product.name, product.subtitle, product.highlight, ...product.tags]
        .join(" ")
        .toLocaleLowerCase("es");
      return matchesFilter && (!cleanQuery || searchable.includes(cleanQuery));
    });
  }, [filter, query]);

  const targets = useMemo(() => {
    const safeWeight = Math.max(weight || 0, 0);
    const fullEnergy = safeWeight * Math.max(energyPerKg || 0, 0);
    const fullProtein = safeWeight * Math.max(proteinPerKg || 0, 0);
    const plannedRatio = Math.min(Math.max(plannedPercent || 0, 0), 100) / 100;
    const currentEnergy = fullEnergy * Math.min(Math.max(currentEnergyPercent || 0, 0), 100) / 100;
    const currentProtein = fullProtein * Math.min(Math.max(currentProteinPercent || 0, 0), 100) / 100;
    const plannedEnergy = fullEnergy * plannedRatio;
    const plannedProtein = fullProtein * plannedRatio;
    return {
      fullEnergy,
      fullProtein,
      plannedEnergy,
      plannedProtein,
      currentEnergy,
      currentProtein,
      energyDeficit: Math.max(plannedEnergy - currentEnergy, 0),
      proteinDeficit: Math.max(plannedProtein - currentProtein, 0),
    };
  }, [weight, energyPerKg, proteinPerKg, plannedPercent, currentEnergyPercent, currentProteinPercent]);

  const productCalculation = useMemo(() => {
    const protein = productProtein(selectedProduct);
    const volume = productVolume(selectedProduct);
    const unitsForEnergy = selectedProduct.kcal > 0 ? targets.energyDeficit / selectedProduct.kcal : 0;
    const unitsForProtein = protein > 0 ? targets.proteinDeficit / protein : 0;
    const suggestedUnits = Math.ceil(Math.max(unitsForEnergy, unitsForProtein));
    const simulatedEnergy = simulationUnits * selectedProduct.kcal;
    const simulatedProtein = simulationUnits * protein;
    return {
      protein,
      volume,
      unitsForEnergy,
      unitsForProtein,
      suggestedUnits,
      simulatedEnergy,
      simulatedProtein,
      simulatedVolume: simulationUnits * volume,
      energyCoverage: targets.fullEnergy > 0 ? Math.min((targets.currentEnergy + simulatedEnergy) / targets.fullEnergy * 100, 999) : 0,
      proteinCoverage: targets.fullProtein > 0 ? Math.min((targets.currentProtein + simulatedProtein) / targets.fullProtein * 100, 999) : 0,
    };
  }, [selectedProduct, simulationUnits, targets]);

  const applyGuide = (key: GuideKey) => {
    const profile = guideProfiles[key];
    setGuide(key);
    setEnergyPerKg(profile.energy);
    setProteinPerKg(profile.protein);
    setPlannedPercent(profile.planned);
  };

  const changeView = (next: "catalog" | "calculator") => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateWithProduct = (product: Product) => {
    setSelectedProductId(product.id);
    setSimulationUnits(1);
    setActiveProduct(null);
    changeView("calculator");
  };

  return (
    <main>
      <header className="topbar">
        <div className="shell topbar-inner">
          <button className="brand brand-button" type="button" onClick={() => changeView("catalog")} aria-label="Abrir vademécum">
            <span className="brand-mark"><BookIcon /></span>
            <span>
              <strong>Vademécum</strong>
              <small>Nutricional</small>
            </span>
          </button>
          <div className="header-actions">
            <nav className="module-nav" aria-label="Módulos">
              <button className={view === "catalog" ? "active" : ""} type="button" onClick={() => changeView("catalog")}>Productos</button>
              <button className={view === "calculator" ? "active" : ""} type="button" onClick={() => changeView("calculator")}>Calculadora</button>
            </nav>
            {installPrompt && (
              <button className="install-button" type="button" onClick={installApp}>
                Instalar app
              </button>
            )}
          </div>
        </div>
      </header>

      {view === "catalog" ? <>
        <section className="finder" id="inicio">
          <div className="shell finder-inner">
            <div className="finder-copy">
              <p className="eyebrow">Catálogo clínico · Abbott</p>
              <h1>Nutrición clínica, en una sola herramienta</h1>
              <p className="finder-intro">Consulta fórmulas Abbott, revisa su composición y estima requerimientos nutricionales desde un mismo lugar.</p>
              <p className="abbott-signature"><span>Life. To the Fullest.</span><small>Abbott</small></p>
            </div>

            <label className="searchbox">
              <span className="search-icon"><SearchIcon /></span>
              <span className="sr-only">Buscar una fórmula</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca por producto, condición o nutrimento…" />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda">×</button>}
            </label>

            <div className="filters" aria-label="Filtrar por perfil clínico">
              {filters.map((item) => (
                <button className={filter === item ? "active" : ""} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="catalog shell" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>01</span> Vademécum</p>
            <h2 id="catalog-title">Fórmulas disponibles</h2>
          </div>
          <p>{visibleProducts.length} {visibleProducts.length === 1 ? "resultado" : "resultados"}</p>
        </div>

        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
                style={{ "--accent": product.accent, "--tint": product.tint } as CSSProperties}
              >
                <div className="product-visual">
                  <img src={product.image} alt={`Presentación de ${product.name}`} />
                  <span>{product.tags[0]}</span>
                </div>
                <div className="product-body">
                  <div className="product-title">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.subtitle}</p>
                    </div>
                    <span className="density">{product.density}</span>
                  </div>

                  <dl className="macro-grid">
                    <div><dt>Energía</dt><dd>{product.kcal}<small> kcal</small></dd></div>
                    <div><dt>Proteína</dt><dd>{product.protein}</dd></div>
                    <div><dt>HC</dt><dd>{product.carbs}</dd></div>
                    <div><dt>Lípidos</dt><dd>{product.fat}</dd></div>
                  </dl>

                  <div className="product-footer">
                    <div>
                      <span>Por presentación</span>
                      <strong>{product.volume}</strong>
                    </div>
                    <p>{product.highlight}</p>
                  </div>
                  <div className="card-actions">
                    <button className="detail-button" type="button" onClick={() => setActiveProduct(product)}>
                      Ver ficha completa
                    </button>
                    <button className="calculate-button" type="button" onClick={() => calculateWithProduct(product)}>
                      Calcular aporte
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="brand-mark"><SearchIcon /></span>
            <h3>No encontramos coincidencias</h3>
            <p>Prueba con otro nombre, nutrimento o perfil clínico.</p>
            <button type="button" onClick={() => { setQuery(""); setFilter("Todas"); }}>
              Ver todas las fórmulas
            </button>
          </div>
        )}
        </section>
      </> : (
        <section className="calculator-page shell" id="calculadora" aria-labelledby="calculator-title">
          <div className="calculator-heading">
            <div>
              <p className="eyebrow"><span>02</span> Herramienta clínica</p>
              <h1 id="calculator-title">Calculadora nutricional</h1>
              <p>Estima requerimientos, identifica la brecha y tradúcela en volumen y presentaciones de la fórmula seleccionada.</p>
            </div>
          </div>

          <section className="guide-section" aria-labelledby="guide-title">
            <div className="calculator-section-title">
              <span>1</span><div><h2 id="guide-title">Selecciona el marco de cálculo</h2><p>Tres perfiles ESPEN y un modo personalizado.</p></div>
            </div>
            <div className="guide-grid">
              {(Object.keys(guideProfiles) as GuideKey[]).map((key, index) => {
                const profile = guideProfiles[key];
                return (
                  <button className={`guide-card ${guide === key ? "active" : ""}`} type="button" key={key} onClick={() => applyGuide(key)} aria-pressed={guide === key}>
                    <span className="guide-index">0{index + 1}</span>
                    <strong>{profile.name}</strong>
                    <small>{profile.short}</small>
                    <span className="guide-targets">{key === "custom" ? "Valores editables" : `${rangeText(profile.energyMin, profile.energyMax)} kcal/kg · ${rangeText(profile.proteinMin, profile.proteinMax)} g/kg`}</span>
                  </button>
                );
              })}
            </div>
            <div className="guide-note">
              <div><strong>{guideProfiles[guide].name}</strong><p>{guideProfiles[guide].note}</p></div>
              {guideProfiles[guide].source && <a href={guideProfiles[guide].source} target="_blank" rel="noreferrer">Consultar guía ESPEN ↗</a>}
            </div>
          </section>

          <div className="calculator-workspace">
            <section className="input-panel" aria-labelledby="inputs-title">
              <div className="calculator-section-title compact">
                <span>2</span><div><h2 id="inputs-title">Datos para el cálculo</h2><p>Sin nombres ni información identificable.</p></div>
              </div>
              <div className="field-grid">
                <label className="field full"><span>Peso utilizado</span><div className="input-with-unit"><input type="number" min="20" max="300" step="0.1" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><small>kg</small></div></label>
                <TargetControl label="Energía" value={energyPerKg} min={guideProfiles[guide].energyMin} max={guideProfiles[guide].energyMax} step={1} unit="kcal/kg" custom={guide === "custom"} onChange={setEnergyPerKg} />
                <TargetControl label="Proteína" value={proteinPerKg} min={guideProfiles[guide].proteinMin} max={guideProfiles[guide].proteinMax} step={0.1} unit="g/kg" custom={guide === "custom"} onChange={setProteinPerKg} />
                <label className="field full"><span>Meta a administrar</span><div className="range-line"><input type="range" min="10" max="100" step="5" value={plannedPercent} onChange={(event) => setPlannedPercent(Number(event.target.value))} /><strong>{plannedPercent}%</strong></div><small>En UCI, el perfil inicia en 70% para representar la fase aguda.</small></label>
                <label className="field"><span>Energía que ya recibe</span><div className="input-with-unit"><input type="number" min="0" max="100" step="5" value={currentEnergyPercent} onChange={(event) => setCurrentEnergyPercent(Number(event.target.value))} /><small>%</small></div></label>
                <label className="field"><span>Proteína que ya recibe</span><div className="input-with-unit"><input type="number" min="0" max="100" step="5" value={currentProteinPercent} onChange={(event) => setCurrentProteinPercent(Number(event.target.value))} /><small>%</small></div></label>
              </div>
            </section>

            <section className="requirement-panel" aria-labelledby="requirements-title">
              <div className="calculator-section-title compact inverse">
                <span>3</span><div><h2 id="requirements-title">Resultado de requerimientos</h2><p>Meta total, objetivo del día y brecha.</p></div>
              </div>
              <div className="requirement-main">
                <div><span>Requerimiento energético</span><strong>{compactNumber(targets.fullEnergy)} <small>kcal/día</small></strong></div>
                <div><span>Requerimiento proteico</span><strong>{compactNumber(targets.fullProtein)} <small>g/día</small></strong></div>
              </div>
              <dl className="requirement-list">
                <div><dt>Meta planificada ({plannedPercent}%)</dt><dd>{compactNumber(targets.plannedEnergy)} kcal · {compactNumber(targets.plannedProtein)} g</dd></div>
                <div><dt>Aporte actual estimado</dt><dd>{compactNumber(targets.currentEnergy)} kcal · {compactNumber(targets.currentProtein)} g</dd></div>
                <div className="deficit-row"><dt>Brecha por cubrir</dt><dd>{compactNumber(targets.energyDeficit)} kcal · {compactNumber(targets.proteinDeficit)} g</dd></div>
              </dl>
              <p className="calculation-formula">Peso × meta por kg × porcentaje planificado, menos el aporte que ya recibe.</p>
            </section>
          </div>

          <section className="formula-calculator" aria-labelledby="formula-title">
            <div className="calculator-section-title">
              <span>4</span><div><h2 id="formula-title">Lleva la brecha a una fórmula</h2><p>Selecciona un producto para estimar volumen y presentaciones.</p></div>
            </div>
            <div className="formula-picker">
              {products.map((product) => (
                <button className={`formula-option ${selectedProduct.id === product.id ? "active" : ""}`} type="button" key={product.id} onClick={() => { setSelectedProductId(product.id); setSimulationUnits(1); }}>
                  <img src={product.image} alt="" />
                  <span><strong>{product.name}</strong><small>{product.kcal} kcal · {product.protein}</small></span>
                </button>
              ))}
            </div>

            <div className="formula-result">
              <div className="selected-formula">
                <img src={selectedProduct.image} alt={`Presentación de ${selectedProduct.name}`} />
                <div><p className="eyebrow">Fórmula seleccionada</p><h3>{selectedProduct.name}</h3><span>{selectedProduct.volume} · {selectedProduct.kcal} kcal · {selectedProduct.protein} proteína</span><button type="button" onClick={() => setActiveProduct(selectedProduct)}>Consultar ficha completa</button></div>
              </div>
              <div className="coverage-options">
                <article><span>Para cubrir la brecha energética</span><strong>{compactNumber(productCalculation.unitsForEnergy)} <small>presentaciones</small></strong><p>{compactNumber(productCalculation.unitsForEnergy * productCalculation.volume)} mL aportarían {compactNumber(productCalculation.unitsForEnergy * productCalculation.protein)} g de proteína.</p></article>
                <article><span>Para cubrir la brecha proteica</span><strong>{compactNumber(productCalculation.unitsForProtein)} <small>presentaciones</small></strong><p>{compactNumber(productCalculation.unitsForProtein * productCalculation.volume)} mL aportarían {compactNumber(productCalculation.unitsForProtein * selectedProduct.kcal)} kcal.</p></article>
              </div>
              <div className="simulation-panel">
                <div className="simulation-control"><span>Simular presentaciones completas</span><div><button type="button" onClick={() => setSimulationUnits(Math.max(0, simulationUnits - 1))} aria-label="Restar una presentación">−</button><input type="number" min="0" max="20" step="1" value={simulationUnits} onChange={(event) => setSimulationUnits(Math.max(0, Number(event.target.value)))} /><button type="button" onClick={() => setSimulationUnits(Math.min(20, simulationUnits + 1))} aria-label="Agregar una presentación">+</button></div><button className="suggestion-button" type="button" onClick={() => setSimulationUnits(productCalculation.suggestedUnits)}>Usar sugerencia: {productCalculation.suggestedUnits}</button></div>
                <dl><div><dt>Volumen</dt><dd>{compactNumber(productCalculation.simulatedVolume)} mL</dd></div><div><dt>Aporte</dt><dd>{compactNumber(productCalculation.simulatedEnergy)} kcal · {compactNumber(productCalculation.simulatedProtein)} g proteína</dd></div><div><dt>Cobertura final estimada</dt><dd>Energía {compactNumber(productCalculation.energyCoverage)}% · Proteína {compactNumber(productCalculation.proteinCoverage)}%</dd></div></dl>
              </div>
            </div>
          </section>

          <aside className="clinical-warning"><strong>Interpretación profesional</strong><p>Los resultados son estimaciones y no sustituyen calorimetría indirecta, evaluación de función renal o hepática, riesgo de realimentación, tolerancia, balance hídrico ni la ficha técnica vigente. Una sola fórmula puede sobrecubrir energía al intentar alcanzar proteína, o viceversa.</p></aside>
        </section>
      )}

      {activeProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveProduct(null)}>
          <section
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
            onMouseDown={(event) => event.stopPropagation()}
            style={{ "--accent": activeProduct.accent, "--tint": activeProduct.tint } as CSSProperties}
          >
            <button className="modal-close" type="button" onClick={() => setActiveProduct(null)} aria-label="Cerrar ficha">×</button>
            <div className="detail-hero">
              <div className="detail-image">
                <img src={activeProduct.image} alt={`Presentación de ${activeProduct.name}`} />
              </div>
              <div className="detail-heading">
                <p className="eyebrow">{activeProduct.tags.join(" · ")}</p>
                <h2 id="detail-title">{activeProduct.name}</h2>
                <p>{activeProduct.subtitle}</p>
                <div className="detail-tags">
                  <span>{activeProduct.volume}</span>
                  <span>{activeProduct.density}</span>
                  {activeProduct.compendium && <span>Clave {activeProduct.compendium}</span>}
                </div>
              </div>
            </div>

            <div className="detail-content">
              <section className="profile-panel">
                <span>Perfil descrito en el catálogo</span>
                <p>{activeProduct.profile}</p>
              </section>

              <div className="detail-columns">
                <section>
                  <h3>Composición por presentación</h3>
                  <dl className="nutrition-list">
                    <div><dt>Energía</dt><dd>{activeProduct.kcal} kcal</dd></div>
                    <div><dt>Distribución energética</dt><dd>{activeProduct.distribution}</dd></div>
                    <div><dt>Hidratos de carbono</dt><dd>{activeProduct.carbs}</dd></div>
                    {activeProduct.sugar && <div><dt>Azúcares</dt><dd>{activeProduct.sugar}</dd></div>}
                    <div><dt>Proteína</dt><dd>{activeProduct.protein}</dd></div>
                    <div><dt>Lípidos</dt><dd>{activeProduct.fat}</dd></div>
                    {activeProduct.fiber && <div><dt>Fibra dietética</dt><dd>{activeProduct.fiber}</dd></div>}
                    <div><dt>Osmolaridad</dt><dd>{activeProduct.osmolarity}</dd></div>
                    <div><dt>Osmolalidad</dt><dd>{activeProduct.osmolality}</dd></div>
                  </dl>
                </section>

                <section>
                  <h3>Minerales de interés clínico</h3>
                  <dl className="mineral-grid">
                    <div><dt>Sodio</dt><dd>{activeProduct.sodium}</dd></div>
                    <div><dt>Potasio</dt><dd>{activeProduct.potassium}</dd></div>
                    <div><dt>Fósforo</dt><dd>{activeProduct.phosphorus}</dd></div>
                    <div><dt>Calcio</dt><dd>{activeProduct.calcium}</dd></div>
                  </dl>
                  <div className="special-panel">
                    <span>Características</span>
                    <p>{activeProduct.special}</p>
                  </div>
                  <p className="flavors"><strong>Sabores:</strong> {activeProduct.flavors}</p>
                </section>
              </div>

              <div className="detail-actions">
                <p>Valores correspondientes a la presentación indicada.</p>
                <button type="button" onClick={() => calculateWithProduct(activeProduct)}>Usar en calculadora</button>
              </div>
            </div>
          </section>
        </div>
      )}

      <footer>
        <div className="shell footer-inner">
          <p>
            Información de producto transcrita del catálogo proporcionado. Los cálculos son orientativos y deben individualizarse clínicamente.
          </p>
          <span>Uso exclusivo de profesionales de la salud</span>
        </div>
      </footer>
    </main>
  );
}
