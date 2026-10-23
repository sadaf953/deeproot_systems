// Copy and data for the homepage sections. Kept apart from App.tsx so the layout stays readable.
import {
  Mail, ShoppingBag, ScanText, Link2, Workflow, Landmark, FileText, Truck, Users, ShieldCheck,
  Search, MessageCircle, ScanBarcode, History, DatabaseBackup, FileSpreadsheet, ArchiveRestore,
  PenLine, MessagesSquare, ListChecks, Calculator, Receipt, BadgeCheck, ShoppingCart, Wallet,
  Stamp, SunMedium, Palette, ToggleRight, ListOrdered, Rows3, Compass, Hammer, Megaphone, Handshake,
  PhoneCall, Wrench, LifeBuoy, TrendingUp, BellRing, LayoutDashboard, CloudUpload,
  Infinity, SlidersHorizontal, UserX, Globe, HardDrive,
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
    "A one-time fee or a flat yearly fee, not per user",
    "A separate portal for each partner, showing only their work",
  ],
};

export const SOLARFLOW_STATS = [
  { value: "14", label: "stages from lead to subsidy" },
  { value: "9", label: "user roles with their own access" },
  { value: "2 AM", label: "automatic backup, every day" },
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
  { icon: ScanBarcode, title: "Scan serial numbers", desc: "Record product serial numbers just by scanning them with your phone." },
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
    tag: "Send & sign",
    title: "Send & Sign Documents by Link",
    pitch: "Get documents signed by your clients just by sharing a link. Quotations, agreements and invoices open on any phone, and they sign right there. No printing, scanning or couriering.",
    points: [
      "Customers sign with a finger on their phone, or type their name",
      "Signed copy saved automatically, with date and time",
      "Several people can sign the same document, in order",
      "See when a document was opened and when it was signed",
      "Links that expire or can be switched off",
      "Shareable forms to collect customer details and files",
    ],
  },
];

export const EXTRA_SETUPS = [
  { icon: MessageCircle, title: "WhatsApp alerts", desc: "Order, payment and status messages sent automatically." },
  { icon: LayoutDashboard, title: "Owner dashboard", desc: "Sales, collections and pending work on one screen." },
  { icon: ScanBarcode, title: "Serial number scanning", desc: "Scan product barcodes with a phone camera. No typing, no mistakes." },
  { icon: BellRing, title: "Reminders", desc: "Follow-ups and due dates that never slip." },
  { icon: CloudUpload, title: "Automatic backups", desc: "Your data copied to your own Drive every day." },
  { icon: FileSpreadsheet, title: "Sheets that update themselves", desc: "Live reports instead of copy-paste." },
  { icon: Stamp, title: "Branded documents", desc: "Letterhead and numbering on everything you send." },
  { icon: FileSpreadsheet, title: "Excel import", desc: "Your existing spreadsheets moved in on day one." },
];

export const SUPPORT_POINTS = [
  { icon: PhoneCall, title: "Same team, start to finish", desc: "The people who map your process are the ones who build and support it." },
  { icon: TrendingUp, title: "Grows as you grow", desc: "New branch, new partner type, new product line: the system changes with you." },
  { icon: Wrench, title: "Small changes, quickly", desc: "A new field, a renamed stage or a new report, without starting a new project." },
  { icon: LifeBuoy, title: "Support that stays", desc: "30 days included after launch, then optional flat-fee maintenance." },
];

export const PLANS = [
  {
    tag: "Pay once",
    title: "Perpetual licence",
    fit: "Buy it once and use it for as long as you like.",
    points: [
      "A single one-time fee, no renewals",
      "Your data is always yours, with daily backups",
      "30 days of support after launch included",
      "Optional maintenance charge for updates and support after that",
    ],
  },
  {
    tag: "Pay yearly",
    title: "Yearly subscription",
    fit: "No large upfront cost. Pay once a year instead.",
    points: [
      "A predictable yearly fee, not per user",
      "Hosting, updates and maintenance included",
      "The same custom system as the perpetual licence",
      "Your data is always yours, with daily backups",
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

// What every system comes with, shown under the hero
export const HIGHLIGHTS = [
  { icon: Infinity, title: "Perpetual licence", desc: "Pay once, use it for as long as you like." },
  { icon: SlidersHorizontal, title: "Built to your exact needs", desc: "Your stages, fields, documents and words." },
  { icon: UserX, title: "No per-user fees", desc: "Add your whole team without the bill growing." },
  { icon: DatabaseBackup, title: "Backed up daily at 2 AM", desc: "Automatic copies of your data, every night." },
  { icon: Globe, title: "On your own web address", desc: "Hosted at yourcompany.in, not someone else's domain." },
  { icon: HardDrive, title: "Your choice of file storage", desc: "Google Drive (personal or Workspace) or our secure storage." },
  { icon: Users, title: "Multi-role access", desc: "Each user sees only what their job needs." },
  { icon: Wrench, title: "Start with one tool", desc: "Begin small and add more as you grow." },
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

// Full SolarFlow feature list, grouped. Taken from the demo and client builds.
export const SOLARFLOW_ALL_FEATURES: { group: string; items: [string, string][] }[] = [
  {
    group: "Pipeline & customers",
    items: [
      ["14-stage pipeline", "Leads to Final Review, plus Completed and Lost Project"],
      ["Live stage counts", "Grouped sidebar showing how many customers sit in each stage"],
      ["Quick add lead", "Just a name and phone number to start, everything else optional"],
      ["Quote to lead", "Convert an approved quotation into a customer without retyping"],
      ["Automatic system size", "Capacity worked out from panel wattage and count"],
      ["Save & Move", "Each stage is a tab; save and move to the next in one click"],
      ["Stage essentials", "Only one or two required fields per stage, with a list of what is missing"],
      ["Search & filters", "Search everywhere, filter by partner, dealer, year and month"],
      ["Lost & resume", "Pause a project with a reason and follow-up date, resume where it stopped"],
      ["Locked when complete", "Finished records are frozen; an admin can unlock one if needed"],
      ["Customer timeline", "Dated history plus internal staff-only notes"],
      ["Stage remarks & hold reasons", "Notes against the current stage and why procurement is on hold"],
      ["Auto file numbers", "Every new customer gets a file number"],
      ["Red flags", "Mark customers that need a payment review"],
    ],
  },
  {
    group: "Sales & quotations",
    items: [
      ["Quotation maker", "Three brand or price options in one proposal, with discount, subsidy and GST"],
      ["Multi-page proposal PDF", "Savings vs EMI, breakeven, returns, subsidy explainer and terms"],
      ["Loan figures in quotes", "Down payment, lender, interest, tenure, tariff and monthly units"],
      ["Quotation ledger", "Search, preview, convert, mark lost with a reason, or reopen"],
      ["Revisions", "R1, R2 versions, locked after download"],
      ["Draft recovery", "Unsaved quotation edits can be restored"],
      ["Sign by link", "Customers view and accept the proposal with a signature; links expire"],
    ],
  },
  {
    group: "Loans & subsidy",
    items: [
      ["Jansamarth loan stage", "Application number, bank, branch and feasibility files"],
      ["Feasibility report PDF", "Generated from the loan tab, with missing fields flagged"],
      ["Loan tracking", "Inprocess, sanctioned, 1st and 2nd payment, received, with dated history"],
      ["Cash payments", "Amounts, dates and payment method"],
      ["PM Surya Ghar subsidy tracking", "Inprocess, redeemed, approved, received, with dated history"],
      ["Registration details", "Feasibility number, acknowledgement and subsidy token photo"],
    ],
  },
  {
    group: "Documents",
    items: [
      ["Customer documents", "Aadhaar, PAN, light bill, geo-tag photo, bank details and more"],
      ["Send back with a remark", "Return a wrong file to the partner who uploaded it"],
      ["Document checklists", "Tick documents off as received, without uploading"],
      ["Crop & rotate", "Fix photos before they are uploaded"],
      ["PM Surya Ghar agreement", "4-page consumer–vendor agreement with stamp upload, ready to print"],
      ["Google Drive link", "One-click open of each customer's Drive folder"],
      ["Download all as ZIP", "Every document for a customer in one download"],
    ],
  },
  {
    group: "Inventory & delivery",
    items: [
      ["Bill of materials", "Roof and shed templates, editable per customer, with a loaded tick per line"],
      ["Loading checklist print", "Two-page material and equipment loading checklist"],
      ["Serial number scanning", "Scan panel and inverter serials with a phone, or paste a list"],
      ["Material order details", "Roof or shed, invoice value, cable lengths and structure heights"],
      ["Delivery batches", "Several customers on one truck, with driver, vehicle and stop order"],
      ["Gate pass & challan", "Printable manifest with security gate and signature blocks"],
      ["Godown inventory", "Receive and issue stock, reorder levels and replaced materials"],
      ["Automatic stock deduction", "Stock deducted once on delivery; short stock blocks the delivery"],
      ["Reserved stock", "Saved BOMs hold material until the truck is loaded"],
      ["Daily godown report", "Opening, incoming, outgoing and closing stock for any day"],
    ],
  },
  {
    group: "Installation & field service",
    items: [
      ["Installer assignment", "Up to three installers per job, with a warning if one is on leave"],
      ["Installation tracking", "Every installation listed by status"],
      ["Geo-tag, meter & inspection", "Dates, photos and notes for each approval step"],
      ["Stamp maker jobs", "Send agreements for stamping and get the file back on the customer"],
      ["Installer payments", "Capacity, rate, payout month, paid and unpaid totals"],
      ["Installer payout view", "Installers see what they are owed and what is paid"],
      ["Job emails", "Vendors get an email when a job is assigned"],
      ["Service complaints", "Technicians claim jobs and close them with the customer's code"],
    ],
  },
  {
    group: "Portals & roles",
    items: [
      ["Channel partner & dealer portal", "Add leads, use quotations and see only their own customers"],
      ["Partner offices", "Each office sees its own leads and its dealers' leads"],
      ["Office managers", "A manager login for each partner office"],
      ["Installation team portal", "Assigned jobs, driver contact, BOM, geo-tag upload and payouts"],
      ["Stamp maker portal", "Request queue, file upload and a monthly record"],
      ["Role-based access", "Admin, office, partners, dealers, installers, stamp makers and technicians"],
      ["Database-level security", "Each role can only ever read its own records"],
      ["Password recovery", "Set, reset and recover passwords by email"],
    ],
  },
  {
    group: "Team & reports",
    items: [
      ["Shared calendar", "Site visits, meetings and leave, with installations and trucks added automatically"],
      ["Attendance & leave", "Check-in, leave requests and admin approval"],
      ["Team chat", "Message everyone, a group or one person"],
      ["Business dashboard", "Projects by stage, today's work, installed capacity and brand usage"],
      ["Excel & CSV exports", "Registrations and vendor payments in one click"],
      ["Directories", "Partners, dealers, drivers, teams, staff, brands and top performers"],
      ["User management", "Create, edit, deactivate and reset users; offices manage their own staff"],
      ["Customer import", "Bring in existing Excel or CSV sheets, even with Hinglish headers"],
    ],
  },
  {
    group: "Data safety",
    items: [
      ["Activity log", "Who changed what and when, including every stage move"],
      ["Trash & restore", "Deleted customers can be brought back; only admins delete for good"],
      ["Edit-conflict warning", "Shows your edit next to a colleague's when both change the same field"],
      ["Offline warning", "A banner when the internet connection drops"],
      ["Update prompt", "Users are told to reload when a new version is out"],
      ["Daily backups", "The database is backed up automatically every day"],
    ],
  },
];
