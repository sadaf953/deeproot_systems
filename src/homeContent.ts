// Copy and data for the homepage sections. Kept apart from App.tsx so the layout stays readable.
import {
  Mail, ShoppingBag, ScanText, Link2, Workflow, Landmark, FileText, Truck, Users, ShieldCheck,
  Search, MessageCircle, ScanBarcode, History, DatabaseBackup, FileSpreadsheet, ArchiveRestore,
  PenLine, MessagesSquare, ListChecks, Calculator, Receipt, BadgeCheck, ShoppingCart, Wallet,
  Stamp, SunMedium, Palette, ToggleRight, ListOrdered, Rows3, Compass, Hammer, Megaphone, Handshake,
  PhoneCall, Wrench, LifeBuoy, TrendingUp, BellRing, LayoutDashboard, CloudUpload,
} from "lucide-react";

export const SOLARFLOW_DEMO_URL = "https://solarflow.deeprootsystems.in";

export const GENERIC_VS_BUILT = {
  generic: [
    "Built for every business, so it fits none of them properly",
    "You change how you work to match the software",
    "Dozens of fields you never use, and the ones you need are missing",
    "A per-user bill every month that grows with your team",
    "Partners and vendors either see everything or nothing",
  ],
  built: [
    "Your stages, your words, your approval steps",
    "The software follows the way your team already works",
    "Only the fields that matter, in the order you fill them",
    "A one-time fee or a flat monthly fee, not per user",
    "A separate portal for each partner, showing only their work",
  ],
};

export const SOLARFLOW_STATS = [
  { value: "14", label: "stages from lead to subsidy" },
  { value: "9", label: "user roles with their own access" },
  { value: "90+", label: "people using it every day" },
  { value: "3 to 5", label: "working days to launch a new copy" },
];

export const SOLARFLOW_FEATURES = [
  { icon: Workflow, title: "Lead-to-subsidy pipeline", desc: "Registration, loan, material, delivery, installation, geo-tag, DISCOM, meter, inspection and subsidy, one guided stage at a time." },
  { icon: Landmark, title: "Loan & subsidy tracking", desc: "Jansamarth loans and PM Surya Ghar subsidies on their own tracks, with dated history." },
  { icon: FileText, title: "Quotations & paperwork", desc: "Quotations, feasibility reports and DISCOM agreements generated as PDFs from the customer record." },
  { icon: Truck, title: "Godown & delivery trips", desc: "Bills of material, truck loading sheets, partial deliveries and stock deducted on delivery." },
  { icon: Users, title: "Portals for partners", desc: "Channel partners, dealers, vendors, technicians and stamp makers each see only their own work." },
  { icon: ShieldCheck, title: "Full audit trail", desc: "Every save and stage move is logged with the person behind it." },
];

// Client versions of SolarFlow and what was built specially for each
export const CLIENT_BUILDS = [
  {
    name: "Rooftop installer, high volume",
    type: "PM Surya Ghar residential projects",
    summary: "In daily use by the whole team, from the office to technicians in the field, across thousands of customers.",
    custom: [
      "Field service: technicians claim complaints and close them with the customer's WhatsApp code",
      "Delivery batches with truck loading sheets and panel serials per load",
      "Vendor calendar, vendor payments export and an installation payments ledger",
      "Team chat by role group, red flags on problem customers",
      "Edit-conflict warning when two people change the same record",
      "Automatic daily backups",
    ],
  },
  {
    name: "Solar EPC, growing fast",
    type: "Residential, commercial & industrial",
    summary: "A fresh design built around three asks: find any client in one step, see key info at a glance, and follow progress easily.",
    custom: [
      "Global search by name, phone, CRN, DISCOM number or partner",
      "A plain-English status line with the next step, owner and due date",
      "Six milestones from Booked to Closed, with \"most stuck\" sorting",
      "A \"Today\" board and a spreadsheet-style grid with saved views",
      "Partner home with commissions, field \"My jobs\" with barcode scanning",
      "Signature links and a name-mismatch check on documents",
    ],
  },
  {
    name: "Regional installers",
    type: "Solar companies in more states",
    summary: "The same core, shaped around each company's local DISCOM, stages and stock.",
    custom: [
      "Godown inventory, stock history and MIS upload",
      "Partner and customer payment tracking",
      "Stage lists that follow the local DISCOM's approval steps",
      "Custom bill-of-material print templates",
    ],
  },
];

export const CUSTOMIZATION_STEPS = [
  { icon: Palette, title: "Your brand", desc: "Company name, logo, GSTIN, address and bank details on every screen and document." },
  { icon: ToggleRight, title: "Your features", desc: "Around 20 modules switched on or off: partners, payments, subsidy, stock, installation, team." },
  { icon: ListOrdered, title: "Your stages", desc: "Rename, reorder, remove or add stages so the pipeline matches how your work really moves." },
  { icon: Rows3, title: "Your fields", desc: "Your own dropdown lists and extra fields, so you capture exactly what you track today." },
];

export const GOOD_FEATURES = [
  { icon: Search, title: "One search box", desc: "Find any customer by name, phone or ID from anywhere." },
  { icon: ListChecks, title: "Next step, always", desc: "Every record says what happens next and who owns it." },
  { icon: Users, title: "Role-based access", desc: "Each person sees only what their job needs." },
  { icon: History, title: "Who changed what", desc: "A full history on every record, with names and dates." },
  { icon: MessageCircle, title: "WhatsApp updates", desc: "Send quotes and status updates where customers already are." },
  { icon: ScanBarcode, title: "Barcode scanning", desc: "Capture serial numbers from a phone camera." },
  { icon: FileSpreadsheet, title: "Excel & Sheets export", desc: "Your data out in one click, whenever you want it." },
  { icon: DatabaseBackup, title: "Daily backups", desc: "Copies taken automatically, every day." },
  { icon: ArchiveRestore, title: "Trash & restore", desc: "Nothing is lost to a wrong click." },
  { icon: PenLine, title: "Signature links", desc: "Customers sign or approve on their phone." },
  { icon: MessagesSquare, title: "Team chat", desc: "Message one person, a role group or everyone." },
  { icon: LayoutDashboard, title: "Today board", desc: "What is due, what is stuck, what needs you now." },
];

export const TOOLS = [
  { icon: FileText, title: "Quote Generator", desc: "Multi-page proposals with a bill of materials." },
  { icon: Calculator, title: "GST Calculator", desc: "Add or remove GST with the CGST, SGST and IGST split." },
  { icon: Wallet, title: "EMI Calculator", desc: "Monthly loan payments for customers who finance." },
  { icon: SunMedium, title: "Savings Report", desc: "Savings, payback and breakeven for a solar customer." },
  { icon: Receipt, title: "Payment Receipt", desc: "A receipt with GST breakdown the moment they pay." },
  { icon: BadgeCheck, title: "Warranty Card", desc: "A certificate for every finished installation." },
  { icon: ShoppingCart, title: "Purchase Order", desc: "Clean POs to send to your suppliers." },
  { icon: Users, title: "Payslip Generator", desc: "Salary plus commission, ready to share." },
  { icon: Stamp, title: "Letterhead on any PDF", desc: "Put your letterhead on every page of a document." },
];

export const DOC_EXAMPLES = [
  "Quotations", "Proposals", "Tax invoices", "Proforma invoices", "Receipts", "Agreements",
  "Feasibility reports", "Purchase orders", "Payslips", "Warranty cards", "Offer letters", "Delivery challans",
];

export const DOC_FLOW = [
  { title: "Data you already have", desc: "A form, a spreadsheet, your CRM or a scanned PDF." },
  { title: "Your template", desc: "Your layout, letterhead, numbering and terms, set up once." },
  { title: "Ready in seconds", desc: "A print-ready PDF, or a link the customer opens on their phone." },
];

export const SETUPS = [
  {
    id: "email",
    icon: Mail,
    tag: "One-time setup",
    title: "Business Email on Your Domain",
    pitch: "Professional addresses like you@yourcompany.in, set up once and handed over. No per-user monthly bill from Google Workspace or Zoho.",
    points: [
      "Mailboxes for every person or team (sales@, accounts@, support@)",
      "SPF, DKIM and DMARC so your mail lands in the inbox, not spam",
      "Works on phones, Outlook and the Gmail app",
      "Old emails moved over from your current provider",
    ],
  },
  {
    id: "shopify",
    icon: ShoppingBag,
    tag: "Setup & integrations",
    title: "Shopify Stores",
    pitch: "A Shopify store ready to take orders, connected so nobody copies orders into spreadsheets by hand.",
    points: [
      "Store setup, theme customisation and product import from Excel",
      "UPI, cards and cash on delivery",
      "Shipping partners and order notifications",
      "Orders and stock synced with your sheets or back office",
    ],
  },
  {
    id: "ocr",
    icon: ScanText,
    tag: "OCR & data extraction",
    title: "PDF to Text Scanning",
    pitch: "Scanned bills, invoices and forms read automatically, with the numbers going straight into Excel or Google Sheets.",
    points: [
      "Reads digital PDFs and scanned paper",
      "Pulls invoice number, date, GSTIN and amounts",
      "Picks up PDF attachments from Gmail on its own",
      "Searchable text copies of old scanned files",
    ],
    projectId: "invoice_ocr",
    projectLabel: "See Invoice Automater",
  },
  {
    id: "links",
    icon: Link2,
    tag: "Secure sharing",
    title: "Send Documents by Link",
    pitch: "Quotations, agreements and invoices sent as a link instead of a heavy PDF. The customer taps it and it opens on any phone.",
    points: [
      "View, download or accept in one tap",
      "See when a document was opened",
      "Links that expire or can be switched off",
      "Shareable forms to collect customer details and files",
    ],
  },
];

export const EXTRA_SETUPS = [
  { icon: MessageCircle, title: "WhatsApp alerts", desc: "Order, payment and status messages sent automatically." },
  { icon: LayoutDashboard, title: "Owner dashboard", desc: "Sales, collections and pending work on one screen." },
  { icon: BellRing, title: "Reminders", desc: "Follow-ups and due dates that never slip." },
  { icon: CloudUpload, title: "Automatic backups", desc: "Your data copied to your own Drive every day." },
  { icon: FileSpreadsheet, title: "Sheets that update themselves", desc: "Live reports instead of copy-paste." },
  { icon: Stamp, title: "Branded documents", desc: "Letterhead and numbering on everything you send." },
];

export const SUPPORT_POINTS = [
  { icon: PhoneCall, title: "Same team, start to finish", desc: "The people who map your process are the ones who build and support it." },
  { icon: TrendingUp, title: "Grows as you grow", desc: "New branch, new partner type, new product line: the system changes with you." },
  { icon: Wrench, title: "Small changes, quickly", desc: "A new field, a renamed stage or a new report, without starting a new project." },
  { icon: LifeBuoy, title: "Support that stays", desc: "30 days included after launch, then optional flat-fee maintenance." },
];

export const PLANS = [
  {
    tag: "Buy & Own",
    title: "One-time project",
    fit: "For businesses that want to own the system outright.",
    points: [
      "A single fee to build and install the system",
      "You own the code and the data 100%",
      "30 days of support after launch, with optional monthly maintenance",
    ],
  },
  {
    tag: "Subscription",
    title: "Managed for you",
    fit: "For growing teams that want no large upfront cost.",
    points: [
      "A predictable monthly fee, not per user",
      "We host, run and maintain everything",
      "The same custom system, paid as a monthly expense",
    ],
  },
];

export const VENTURE_BENEFITS = [
  { icon: ShieldCheck, title: "No risk, no extra investment", desc: "You pay for your own software at a lower rate than a custom build. That's it." },
  { icon: Wallet, title: "Get your money back", desc: "When others in your field buy it, you earn a share of every sale until what you paid is returned, for up to two years." },
  { icon: FileText, title: "Everything in writing", desc: "Nothing is left to word of mouth. Both sides sign a detailed contract that protects your contribution and ours." },
];

export const VENTURE_STEPS = [
  { icon: Compass, title: "You bring the vision", desc: "You know your field and exactly how its software should work." },
  { icon: Hammer, title: "We build it together", desc: "A real product, shaped day to day around how your business runs." },
  { icon: Megaphone, title: "We offer it to the industry", desc: "If other companies in your field want it, we sell it to them too." },
  { icon: Handshake, title: "You earn from every sale", desc: "A share based on your contribution, agreed in the contract." },
];

// Short "why us" points shown under the hero
export const HIGHLIGHTS = [
  { value: "90+", label: "people use our software every day" },
  { value: "Stable", label: "running in production, daily backups" },
  { value: "1 tool", label: "is all you need to get started" },
  { value: "3 to 5 days", label: "to launch a ready product" },
];

// Client quotes. Only entries with approved: true are shown, and the section stays hidden until there is one.
// Add a quote here only once the client has agreed to the exact wording.
export const TESTIMONIALS: { quote: string; name: string; role: string; approved: boolean }[] = [
  {
    // Draft to send to the client for sign-off
    quote: "We just wanted something simple for our office and staff. All we asked for was a way to add a new page for each year, and that is exactly what they built. We are a small team, so we did not want a lot of bells and whistles.",
    name: "",
    role: "",
    approved: false,
  },
];
