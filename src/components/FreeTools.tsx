/// <reference types="vite/client" />
// Free browser tools. Everything runs on the visitor's device: files are never uploaded.
// Heavy libraries (PDF, QR, background removal) are loaded only when a tool is used.
import * as React from "react";
import {
  Calculator, Wallet, SunMedium, FileText, Files, ImagePlus, Eraser, Minimize2, QrCode,
  Upload, Download, Copy, ArrowUp, ArrowDown, X, Lock, Loader2, ArrowRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

type ToolId = "gst" | "emi" | "solar" | "pdf-text" | "pdf-merge" | "img-pdf" | "bg-remove" | "compress" | "qr";

const TOOL_GROUPS: { group: string; tools: { id: ToolId; icon: React.ElementType; title: string; desc: string }[] }[] = [
  {
    group: "Calculators",
    tools: [
      { id: "gst", icon: Calculator, title: "GST Calculator", desc: "Add or remove GST, with the CGST, SGST and IGST split" },
      { id: "emi", icon: Wallet, title: "EMI Calculator", desc: "Monthly loan payment and total interest" },
      { id: "solar", icon: SunMedium, title: "Solar Savings", desc: "Savings, PM Surya Ghar subsidy and payback" },
    ],
  },
  {
    group: "PDF",
    tools: [
      { id: "pdf-text", icon: FileText, title: "PDF to Text / Markdown", desc: "Copy the text out of any digital PDF" },
      { id: "pdf-merge", icon: Files, title: "Merge PDFs", desc: "Join several PDFs into one, in your order" },
      { id: "img-pdf", icon: ImagePlus, title: "Images to PDF", desc: "Photos or scans into a single A4 PDF" },
    ],
  },
  {
    group: "Images",
    tools: [
      { id: "bg-remove", icon: Eraser, title: "Remove Background", desc: "Cut a person out of a photo, on a transparent background" },
      { id: "compress", icon: Minimize2, title: "Compress & Resize", desc: "Make photos small enough to upload or email" },
      { id: "qr", icon: QrCode, title: "QR Code Maker", desc: "For a link, UPI ID, phone number or text" },
    ],
  },
];

const ALL_TOOLS = TOOL_GROUPS.flatMap((g) => g.tools);
const isToolId = (s: string): s is ToolId => ALL_TOOLS.some((t) => t.id === s);

// ---------- small shared pieces ----------

const inr = (n: number) =>
  "₹" + (Number.isFinite(n) ? n : 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

const kb = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${Math.round(bytes / 1024)} KB`);

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const baseName = (name: string) => name.replace(/\.[^.]+$/, "");

const inputCls =
  "w-full h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 focus:outline-hidden focus:border-[#22c55e]/70";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-zinc-400">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-zinc-500">{hint}</span>}
    </label>
  );
}

function NumberInput({ value, onChange, step = "any", min = 0 }: { value: number; onChange: (n: number) => void; step?: string; min?: number }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={inputCls}
      value={Number.isFinite(value) ? value : ""}
      min={min}
      step={step}
      onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
    />
  );
}

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex flex-wrap rounded-md border border-zinc-800 bg-zinc-950 p-0.5">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`px-3 h-8 text-xs font-medium rounded cursor-pointer transition-colors ${
            value === v ? "bg-[#22c55e] text-zinc-950" : "text-zinc-400 hover:text-zinc-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Result({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-zinc-900 last:border-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className={strong ? "font-display text-xl font-bold text-[#22c55e]" : "text-sm font-semibold text-zinc-100"}>{value}</span>
    </div>
  );
}

function FilePicker({ accept, multiple, onFiles, label }: { accept: string; multiple?: boolean; onFiles: (f: File[]) => void; label: string }) {
  const [over, setOver] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => ref.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        if (files.length) onFiles(multiple ? files : files.slice(0, 1));
      }}
      className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        over ? "border-[#22c55e] bg-[#14321a]/30" : "border-zinc-800 hover:border-[#22c55e]/50"
      }`}
    >
      <Upload className="h-6 w-6 text-[#22c55e] mx-auto" />
      <div className="text-sm font-medium text-zinc-200 mt-3">{label}</div>
      <div className="text-xs text-zinc-500 mt-1">Click to choose, or drop {multiple ? "files" : "a file"} here</div>
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []) as File[];
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function ErrorNote({ msg }: { msg: string }) {
  return msg ? <p className="text-sm text-red-400">{msg}</p> : null;
}

// ---------- calculators ----------

function GstTool() {
  const [amount, setAmount] = React.useState(10000);
  const [rate, setRate] = React.useState(18);
  const [mode, setMode] = React.useState<"add" | "remove">("add");
  const [supply, setSupply] = React.useState<"intra" | "inter">("intra");

  const a = amount || 0;
  const base = mode === "add" ? a : a / (1 + rate / 100);
  const gst = base * (rate / 100);
  const total = base + gst;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Segmented value={mode} onChange={setMode} options={[["add", "Add GST"], ["remove", "Remove GST"]]} />
        <Field label={mode === "add" ? "Amount before GST (₹)" : "Amount including GST (₹)"}>
          <NumberInput value={amount} onChange={setAmount} />
        </Field>
        <Field label="GST rate">
          <div className="flex flex-wrap gap-2">
            {[0, 3, 5, 12, 18, 28, 40].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={`h-8 px-3 rounded-md border text-xs font-medium cursor-pointer ${
                  rate === r ? "border-[#22c55e] bg-[#14321a]/50 text-white" : "border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {r}%
              </button>
            ))}
            <input
              type="number"
              aria-label="Custom GST rate"
              className={`${inputCls} !w-20 !h-8`}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
            />
          </div>
        </Field>
        <Segmented value={supply} onChange={setSupply} options={[["intra", "Same state (CGST + SGST)"], ["inter", "Other state (IGST)"]]} />
      </div>
      <div className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-5">
        <Result label="Taxable value" value={inr(base)} />
        {supply === "intra" ? (
          <>
            <Result label={`CGST @ ${rate / 2}%`} value={inr(gst / 2)} />
            <Result label={`SGST @ ${rate / 2}%`} value={inr(gst / 2)} />
          </>
        ) : (
          <Result label={`IGST @ ${rate}%`} value={inr(gst)} />
        )}
        <Result label="Total GST" value={inr(gst)} />
        <Result label="Total amount" value={inr(total)} strong />
      </div>
    </div>
  );
}

function EmiTool() {
  const [principal, setPrincipal] = React.useState(200000);
  const [rate, setRate] = React.useState(9.5);
  const [tenure, setTenure] = React.useState(5);
  const [unit, setUnit] = React.useState<"years" | "months">("years");

  const n = Math.max(1, Math.round(unit === "years" ? tenure * 12 : tenure) || 1);
  const r = (rate || 0) / 12 / 100;
  const p = principal || 0;
  const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Field label="Loan amount (₹)"><NumberInput value={principal} onChange={setPrincipal} /></Field>
        <Field label="Interest rate (% per year)"><NumberInput value={rate} onChange={setRate} /></Field>
        <Field label="Tenure">
          <div className="flex gap-2">
            <NumberInput value={tenure} onChange={setTenure} />
            <Segmented value={unit} onChange={setUnit} options={[["years", "Years"], ["months", "Months"]]} />
          </div>
        </Field>
      </div>
      <div className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-5">
        <Result label="Monthly EMI" value={inr(Math.round(emi))} strong />
        <Result label="Number of payments" value={String(n)} />
        <Result label="Total interest" value={inr(Math.round(total - p))} />
        <Result label="Total paid" value={inr(Math.round(total))} />
      </div>
    </div>
  );
}

// PM Surya Ghar residential subsidy: ₹30,000/kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000.
function suryaGharSubsidy(kw: number) {
  const k = Math.max(0, kw);
  return Math.min(k, 2) * 30000 + Math.min(Math.max(k - 2, 0), 1) * 18000;
}

function SolarTool() {
  const [kw, setKw] = React.useState(3);
  const [costPerKw, setCostPerKw] = React.useState(65000);
  const [tariff, setTariff] = React.useState(7.5);
  const [unitsPerKwDay, setUnitsPerKwDay] = React.useState(4);
  const [subsidy, setSubsidy] = React.useState(true);

  const cost = (kw || 0) * (costPerKw || 0);
  const sub = subsidy ? suryaGharSubsidy(kw || 0) : 0;
  const net = Math.max(cost - sub, 0);
  const yearlyUnits = (kw || 0) * (unitsPerKwDay || 0) * 365;
  const yearlySaving = yearlyUnits * (tariff || 0);
  const payback = yearlySaving > 0 ? net / yearlySaving : 0;
  // 25 years with 0.5% panel output loss each year
  let lifetime = 0;
  for (let y = 0; y < 25; y++) lifetime += yearlySaving * Math.pow(0.995, y);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Field label="System size (kW)"><NumberInput value={kw} onChange={setKw} /></Field>
        <Field label="Cost per kW (₹)" hint="Before subsidy, including installation"><NumberInput value={costPerKw} onChange={setCostPerKw} /></Field>
        <Field label="Electricity tariff (₹ per unit)"><NumberInput value={tariff} onChange={setTariff} /></Field>
        <Field label="Units generated per kW per day" hint="About 4 in most of India; 4.5 to 5 in sunnier regions">
          <NumberInput value={unitsPerKwDay} onChange={setUnitsPerKwDay} />
        </Field>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={subsidy} onChange={(e) => setSubsidy(e.target.checked)} className="accent-[#22c55e]" />
          Include PM Surya Ghar subsidy (residential)
        </label>
      </div>
      <div className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-5">
        <Result label="System cost" value={inr(Math.round(cost))} />
        <Result label="Subsidy" value={inr(sub)} />
        <Result label="Your cost after subsidy" value={inr(Math.round(net))} />
        <Result label="Units per year" value={Math.round(yearlyUnits).toLocaleString("en-IN")} />
        <Result label="Savings per year" value={inr(Math.round(yearlySaving))} strong />
        <Result label="Payback" value={payback ? `${payback.toFixed(1)} years` : "—"} />
        <Result label="Savings over 25 years" value={inr(Math.round(lifetime))} />
        <p className="text-[11px] text-zinc-500 pt-3">
          An estimate. Subsidy follows the PM Surya Ghar residential rates (₹30,000/kW up to 2 kW, ₹18,000 for the 3rd kW, ₹78,000 max). Actual output depends on roof, shade and weather.
        </p>
      </div>
    </div>
  );
}

// ---------- PDF ----------

async function loadPdfjs() {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs;
}

type PdfLine = { text: string; size: number; y: number; page: number };

// Rebuild lines from positioned text, then turn bigger lines into headings and bullet glyphs into list items.
function linesToMarkdown(lines: PdfLine[]) {
  const sizes = lines.map((l) => l.size).sort((a, b) => a - b);
  const body = sizes[Math.floor(sizes.length / 2)] || 10;
  const out: string[] = [];
  let prev: PdfLine | null = null;
  for (const l of lines) {
    if (prev && (prev.page !== l.page || prev.y - l.y > Math.max(prev.size, l.size) * 1.8)) out.push("");
    let t = l.text;
    if (l.size >= body * 1.6) t = `# ${t}`;
    else if (l.size >= body * 1.25) t = `## ${t}`;
    else t = t.replace(/^[•●▪◦‣∙·\-–]\s*/, "- ");
    if (t.startsWith("#") && out.length && out[out.length - 1] !== "") out.push("");
    out.push(t);
    if (t.startsWith("#")) out.push("");
    prev = l;
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function PdfTextTool() {
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [lines, setLines] = React.useState<PdfLine[]>([]);
  const [format, setFormat] = React.useState<"md" | "txt">("md");
  const [copied, setCopied] = React.useState(false);

  const run = async (f: File) => {
    setFile(f);
    setBusy(true);
    setError("");
    setLines([]);
    try {
      const pdfjs = await loadPdfjs();
      const doc = await pdfjs.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
      const all: PdfLine[] = [];
      for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const content = await page.getTextContent();
        const rows = new Map<number, { x: number; str: string; size: number; w: number }[]>();
        for (const item of content.items) {
          if (!("str" in item) || !item.str.trim()) continue;
          const y = Math.round(item.transform[5]);
          const key = [...rows.keys()].find((k) => Math.abs(k - y) <= 2) ?? y;
          if (!rows.has(key)) rows.set(key, []);
          rows.get(key)!.push({ x: item.transform[4], str: item.str, size: Math.abs(item.transform[3]) || item.height, w: item.width });
        }
        [...rows.entries()]
          .sort((a, b) => b[0] - a[0])
          .forEach(([y, parts]) => {
            parts.sort((a, b) => a.x - b.x);
            let text = "";
            let end = -Infinity;
            for (const part of parts) {
              const gap = part.x - end;
              if (text && gap > part.size * 0.15 && !text.endsWith(" ") && !part.str.startsWith(" ")) text += gap > part.size * 2 ? "   " : " ";
              text += part.str;
              end = part.x + part.w;
            }
            all.push({ text: text.replace(/\u0000/g, "").trim(), size: Math.max(...parts.map((q) => q.size)), y, page: p });
          });
      }
      if (!all.length) setError("No text found. This looks like a scanned PDF, which needs OCR to read. We can set that up for you.");
      setLines(all);
    } catch (e) {
      setError(e instanceof Error && e.name === "PasswordException" ? "This PDF is password-protected." : "Could not read this PDF.");
    } finally {
      setBusy(false);
    }
  };

  const output = React.useMemo(() => {
    if (!lines.length) return "";
    if (format === "md") return linesToMarkdown(lines);
    return lines.map((l, i) => (i && lines[i - 1].page !== l.page ? "\n" : "") + l.text).join("\n");
  }, [lines, format]);

  return (
    <div className="space-y-4">
      <FilePicker accept="application/pdf" onFiles={(f) => run(f[0])} label="Choose a PDF" />
      {busy && <p className="text-sm text-zinc-400 flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Reading {file?.name}…</p>}
      <ErrorNote msg={error} />
      {output && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Segmented value={format} onChange={setFormat} options={[["md", "Markdown"], ["txt", "Plain text"]]} />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                <Copy className="h-3.5 w-3.5 mr-1.5" />{copied ? "Copied" : "Copy"}
              </Button>
              <Button size="sm" onClick={() => downloadBlob(new Blob([output], { type: "text/plain" }), `${baseName(file!.name)}.${format}`)}>
                <Download className="h-3.5 w-3.5 mr-1.5" />Download .{format}
              </Button>
            </div>
          </div>
          <textarea readOnly value={output} className="w-full h-80 rounded-md border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-200" />
        </>
      )}
    </div>
  );
}

function MergePdfTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");

  const move = (i: number, d: number) =>
    setFiles((fs) => {
      const next = [...fs];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      return next;
    });

  const merge = async () => {
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const f of files) {
        try {
          const src = await PDFDocument.load(await f.arrayBuffer());
          const pages = await out.copyPages(src, src.getPageIndices());
          pages.forEach((p) => out.addPage(p));
        } catch {
          throw new Error(`Could not read ${f.name}. It may be damaged or password-protected.`);
        }
      }
      downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), "merged.pdf");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merge failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <FilePicker accept="application/pdf" multiple onFiles={(f) => setFiles((fs) => [...fs, ...f])} label="Add PDFs" />
      {files.length > 0 && (
        <ol className="space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-md border border-zinc-850 bg-zinc-950/60 px-3 py-2">
              <span className="text-xs text-zinc-500 w-5">{i + 1}</span>
              <span className="flex-1 truncate text-sm text-zinc-200">{f.name}</span>
              <span className="text-xs text-zinc-500">{kb(f.size)}</span>
              <button aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"><ArrowUp className="h-4 w-4" /></button>
              <button aria-label="Move down" disabled={i === files.length - 1} onClick={() => move(i, 1)} className="p-1 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"><ArrowDown className="h-4 w-4" /></button>
              <button aria-label="Remove" onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))} className="p-1 text-zinc-400 hover:text-red-400 cursor-pointer"><X className="h-4 w-4" /></button>
            </li>
          ))}
        </ol>
      )}
      <ErrorNote msg={error} />
      <Button disabled={files.length < 2 || busy} onClick={merge}>
        {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
        Merge {files.length > 1 ? `${files.length} PDFs` : ""} and download
      </Button>
    </div>
  );
}

// Draw any image into a canvas so it can be re-encoded (handles WebP, HEIC-as-JPEG, etc.)
async function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

function canvasBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), type, quality));
}

function ImagesToPdfTool() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [fit, setFit] = React.useState<"a4" | "image">("a4");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");

  const make = async () => {
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const f of files) {
        const img = await loadImage(f);
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const jpg = await doc.embedJpg(await (await canvasBlob(c, "image/jpeg", 0.9)).arrayBuffer());
        if (fit === "image") {
          const page = doc.addPage([jpg.width * 0.75, jpg.height * 0.75]);
          page.drawImage(jpg, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
        } else {
          const [W, H, m] = [595.28, 841.89, 28];
          const s = Math.min((W - 2 * m) / jpg.width, (H - 2 * m) / jpg.height);
          const page = doc.addPage([W, H]);
          page.drawImage(jpg, { x: (W - jpg.width * s) / 2, y: (H - jpg.height * s) / 2, width: jpg.width * s, height: jpg.height * s });
        }
      }
      downloadBlob(new Blob([await doc.save()], { type: "application/pdf" }), "images.pdf");
    } catch {
      setError("One of the images could not be read. Try JPG, PNG or WebP.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <FilePicker accept="image/*" multiple onFiles={(f) => setFiles((fs) => [...fs, ...f])} label="Add images" />
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((f, i) => (
            <span key={`${f.name}-${i}`} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-850 bg-zinc-950/60 pl-2.5 pr-1 py-1 text-xs text-zinc-300">
              {i + 1}. {f.name}
              <button aria-label="Remove" onClick={() => setFiles((fs) => fs.filter((_, j) => j !== i))} className="p-0.5 hover:text-red-400 cursor-pointer"><X className="h-3.5 w-3.5" /></button>
            </span>
          ))}
        </div>
      )}
      <Segmented value={fit} onChange={setFit} options={[["a4", "Fit on A4 pages"], ["image", "Page size = image size"]]} />
      <ErrorNote msg={error} />
      <div>
        <Button disabled={!files.length || busy} onClick={make}>
          {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
          Make PDF
        </Button>
      </div>
    </div>
  );
}

// ---------- images ----------

function BeforeAfter({ before, after, checker }: { before: string; after: string; checker?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {[["Original", before], ["Result", after]].map(([label, src]) => (
        <figure key={label} className="space-y-2">
          <figcaption className="text-xs text-zinc-500">{label}</figcaption>
          <div
            className="rounded-lg border border-zinc-850 overflow-hidden flex items-center justify-center min-h-40"
            style={checker && label === "Result" ? { background: "repeating-conic-gradient(#2a2a2a 0 25%, #3a3a3a 0 50%) 0 0 / 20px 20px" } : undefined}
          >
            <img src={src} alt={label} className="max-h-80 w-auto" />
          </div>
        </figure>
      ))}
    </div>
  );
}

type CutOut = { toCanvas: () => HTMLCanvasElement | OffscreenCanvas };
// Returns one image for one input (older versions returned a list)
type Segmenter = (input: string) => Promise<CutOut | CutOut[]>;
let segmenterPromise: Promise<Segmenter> | null = null;

function BgRemoveTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [before, setBefore] = React.useState("");
  const [after, setAfter] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [error, setError] = React.useState("");
  const resultBlob = React.useRef<Blob | null>(null);

  const run = async (f: File) => {
    setFile(f);
    setError("");
    setAfter("");
    const src = URL.createObjectURL(f);
    setBefore(src);
    try {
      if (!segmenterPromise) {
        setStatus("Downloading the cut-out model (about 25 MB, only the first time)…");
        segmenterPromise = import("@huggingface/transformers").then(
          ({ pipeline }) => pipeline("background-removal", "Xenova/modnet", { dtype: "fp32" }) as unknown as Promise<Segmenter>,
        );
        segmenterPromise.catch(() => (segmenterPromise = null));
      }
      const seg = await segmenterPromise;
      setStatus("Removing background…");
      const res = await seg(src);
      const out = Array.isArray(res) ? res[0] : res;
      const canvas = out.toCanvas() as HTMLCanvasElement | OffscreenCanvas;
      const blob = "convertToBlob" in canvas ? await canvas.convertToBlob({ type: "image/png" }) : await canvasBlob(canvas, "image/png");
      resultBlob.current = blob;
      setAfter(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      setError("Could not process this image. Check your connection (the model downloads once) and try a JPG or PNG.");
    } finally {
      setStatus("");
    }
  };

  return (
    <div className="space-y-4">
      <FilePicker accept="image/*" onFiles={(f) => run(f[0])} label="Choose a photo" />
      <p className="text-[11px] text-zinc-500">
        Made for photos of people: profile pictures, staff and ID photos. Your photo stays on your device; only the model is downloaded.
      </p>
      {status && <p className="text-sm text-zinc-400 flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{status}</p>}
      <ErrorNote msg={error} />
      {before && after && <BeforeAfter before={before} after={after} checker />}
      {after && (
        <Button onClick={() => downloadBlob(resultBlob.current!, `${baseName(file!.name)}-no-bg.png`)}>
          <Download className="h-4 w-4 mr-2" />Download PNG
        </Button>
      )}
    </div>
  );
}

function CompressTool() {
  const [file, setFile] = React.useState<File | null>(null);
  const [img, setImg] = React.useState<HTMLImageElement | null>(null);
  const [maxW, setMaxW] = React.useState(1600);
  const [quality, setQuality] = React.useState(75);
  const [format, setFormat] = React.useState<"image/jpeg" | "image/webp" | "image/png">("image/jpeg");
  const [out, setOut] = React.useState<{ blob: Blob; url: string; w: number; h: number } | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!img) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      const s = Math.min(1, (maxW || img.naturalWidth) / img.naturalWidth);
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * s);
      c.height = Math.round(img.naturalHeight * s);
      const ctx = c.getContext("2d")!;
      if (format === "image/jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, c.width, c.height);
      }
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const blob = await canvasBlob(c, format, quality / 100);
      if (cancelled) return;
      setOut((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, url: URL.createObjectURL(blob), w: c.width, h: c.height };
      });
    }, 200);
    return () => { cancelled = true; clearTimeout(t); };
  }, [img, maxW, quality, format]);

  const ext = format.split("/")[1].replace("jpeg", "jpg");

  return (
    <div className="space-y-4">
      <FilePicker
        accept="image/*"
        onFiles={async ([f]) => {
          setError("");
          try {
            setImg(await loadImage(f));
            setFile(f);
          } catch {
            setError("Could not open this image.");
          }
        }}
        label="Choose an image"
      />
      <ErrorNote msg={error} />
      {img && file && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label={`Max width: ${maxW}px`} hint={`Original ${img.naturalWidth} × ${img.naturalHeight}`}>
              <input type="range" min={200} max={Math.max(img.naturalWidth, 200)} step={50} value={Math.min(maxW, img.naturalWidth)} onChange={(e) => setMaxW(Number(e.target.value))} className="w-full accent-[#22c55e]" />
            </Field>
            <Field label={`Quality: ${quality}%`} hint={format === "image/png" ? "PNG ignores quality" : undefined}>
              <input type="range" min={30} max={95} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[#22c55e]" />
            </Field>
            <Field label="Format">
              <Segmented value={format} onChange={setFormat} options={[["image/jpeg", "JPG"], ["image/webp", "WebP"], ["image/png", "PNG"]]} />
            </Field>
          </div>
          {out && (
            <>
              <div className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-zinc-300">
                  {kb(file.size)} → <span className="font-semibold text-[#22c55e]">{kb(out.blob.size)}</span>
                  <span className="text-zinc-500"> ({out.w} × {out.h})</span>
                  {out.blob.size < file.size && <span className="text-zinc-500"> · {Math.round((1 - out.blob.size / file.size) * 100)}% smaller</span>}
                </div>
                <Button size="sm" onClick={() => downloadBlob(out.blob, `${baseName(file.name)}-small.${ext}`)}>
                  <Download className="h-3.5 w-3.5 mr-1.5" />Download
                </Button>
              </div>
              <BeforeAfter before={img.src} after={out.url} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function QrTool() {
  const [kind, setKind] = React.useState<"link" | "upi" | "phone" | "text">("link");
  const [value, setValue] = React.useState("https://deeprootsystems.in");
  const [upiName, setUpiName] = React.useState("");
  const [upiAmount, setUpiAmount] = React.useState(NaN);
  const [png, setPng] = React.useState("");
  const [svg, setSvg] = React.useState("");

  const data = React.useMemo(() => {
    const v = value.trim();
    if (!v) return "";
    if (kind === "upi") {
      const params = new URLSearchParams({ pa: v, cu: "INR" });
      if (upiName.trim()) params.set("pn", upiName.trim());
      if (upiAmount > 0) params.set("am", upiAmount.toFixed(2));
      return `upi://pay?${params.toString()}`;
    }
    if (kind === "phone") return `tel:${v.replace(/\s/g, "")}`;
    if (kind === "link" && !/^[a-z]+:/i.test(v)) return `https://${v}`;
    return v;
  }, [kind, value, upiName, upiAmount]);

  React.useEffect(() => {
    if (!data) { setPng(""); setSvg(""); return; }
    let cancelled = false;
    import("qrcode").then(async (QR) => {
      const opts = { margin: 2, errorCorrectionLevel: "M" as const };
      const [p, s] = await Promise.all([QR.toDataURL(data, { ...opts, width: 1024 }), QR.toString(data, { ...opts, type: "svg" })]);
      if (!cancelled) { setPng(p); setSvg(s); }
    });
    return () => { cancelled = true; };
  }, [data]);

  const placeholder = { link: "yourcompany.in", upi: "yourname@okhdfcbank", phone: "+91 98765 43210", text: "Any text" }[kind];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Segmented value={kind} onChange={(k) => { setKind(k); setValue(""); }} options={[["link", "Link"], ["upi", "UPI payment"], ["phone", "Phone"], ["text", "Text"]]} />
        <Field label={kind === "upi" ? "UPI ID" : kind === "phone" ? "Phone number" : kind === "link" ? "Web address" : "Text"}>
          {kind === "text" ? (
            <textarea className={`${inputCls} h-28 py-2`} value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} />
          ) : (
            <input className={inputCls} value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} />
          )}
        </Field>
        {kind === "upi" && (
          <>
            <Field label="Payee name (optional)"><input className={inputCls} value={upiName} onChange={(e) => setUpiName(e.target.value)} /></Field>
            <Field label="Fixed amount in ₹ (optional)" hint="Leave empty to let the customer type the amount"><NumberInput value={upiAmount} onChange={setUpiAmount} /></Field>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        {png ? (
          <>
            <img src={png} alt="QR code" className="w-56 h-56 rounded-lg bg-white" />
            <div className="flex gap-2">
              <Button size="sm" onClick={async () => downloadBlob(await (await fetch(png)).blob(), "qr-code.png")}>
                <Download className="h-3.5 w-3.5 mr-1.5" />PNG
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg")}>
                <Download className="h-3.5 w-3.5 mr-1.5" />SVG (for print)
              </Button>
            </div>
          </>
        ) : (
          <div className="w-56 h-56 rounded-lg border border-dashed border-zinc-800 flex items-center justify-center text-xs text-zinc-500">Type something to make a QR</div>
        )}
      </div>
    </div>
  );
}

const TOOL_COMPONENTS: Record<ToolId, React.ComponentType> = {
  gst: GstTool, emi: EmiTool, solar: SolarTool,
  "pdf-text": PdfTextTool, "pdf-merge": MergePdfTool, "img-pdf": ImagesToPdfTool,
  "bg-remove": BgRemoveTool, compress: CompressTool, qr: QrTool,
};

// ---------- page ----------

export function FreeToolsView({ onEnquire }: { onEnquire: (message: string) => void }) {
  const [active, setActive] = React.useState<ToolId>("gst");
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Deep links like /tools/#qr open that tool
  React.useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1);
      if (isToolId(h)) setActive(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const pick = (id: ToolId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    if (window.innerWidth < 1024) setTimeout(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const tool = ALL_TOOLS.find((t) => t.id === active)!;
  const Active = TOOL_COMPONENTS[active];

  return (
    <div className="space-y-10">
      <div className="max-w-2xl space-y-4">
        <div className="text-sm font-semibold text-[#22c55e]">Free tools</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Small tools for everyday business work.
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Calculators, PDF and image tools you can use right now. No sign-up, no watermark, no limits.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#14321a] bg-[#14321a]/30 px-3.5 py-1.5 text-xs text-green-200">
          <Lock className="h-3.5 w-3.5" />
          Runs in your browser. Your files are never uploaded.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <nav className="lg:col-span-4 space-y-6" aria-label="Tools">
          {TOOL_GROUPS.map((g) => (
            <div key={g.group} className="space-y-2">
              <div className="text-xs font-semibold text-zinc-500">{g.group}</div>
              {g.tools.map((t) => {
                const Icon = t.icon;
                const on = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => pick(t.id)}
                    aria-current={on}
                    className={`w-full text-left flex items-center gap-3 rounded-lg px-3 py-2.5 border transition-colors cursor-pointer ${
                      on ? "border-[#22c55e]/60 bg-[#14321a]/40" : "border-transparent hover:bg-zinc-900/60"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 text-[#22c55e] shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-zinc-100">{t.title}</span>
                      <span className="block text-xs text-zinc-500 truncate">{t.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div ref={panelRef} className="lg:col-span-8 scroll-mt-24">
          <div className="rounded-2xl border border-zinc-850 bg-zinc-900/30 p-5 sm:p-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">{tool.title}</h2>
              <p className="text-sm text-zinc-400 mt-1">{tool.desc}</p>
            </div>
            <Active key={active} />
          </div>
          <button
            onClick={() => onEnquire(`I used your free ${tool.title} and would like something like it built into my business system.`)}
            className="mt-4 group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white cursor-pointer"
          >
            Want this inside your own system, with your letterhead and data?
            <span className="text-[#22c55e] font-medium">Talk to us</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#22c55e] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
