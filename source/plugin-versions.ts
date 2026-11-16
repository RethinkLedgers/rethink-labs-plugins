// The versions of the industry plug-ins, oldest first. The last entry is the current one (PLUGIN_VERSION in
// plugins.ts; `pnpm plugins:check` fails if they differ). A plug-in published from the client portal is pinned
// to the version it was published with and keeps that version's behaviour until the client upgrades it in the
// portal (portal/publish.ts). Plug-ins served from profile files and the industry-wide plug-ins always run the
// current version.
//
// When a change alters what customers see or what the assistant is told, add a version here with its notes
// and a feature flag, and keep the old behaviour behind the flag in plugin-mcp.ts.

export type PluginFeatures = {
  /** show_menu renders the ChatGPT card with buttons and short forms (widgets/plugin-widget.ts). */
  menuCard: boolean;
  /**
   * The card runs the tools itself and draws their results (a price list, availability, open times, an
   * estimate, a status, a sent request), and results from the chat render in it too.
   */
  cardResults: boolean;
  /**
   * Browsing in the card: tap-to-choose options on the forms (the business's own categories and services, date
   * and party-size shortcuts), category filters and search on a list, an item or option opened on its own
   * screen with Back, the business's published questions and answers in the card, and, on the industry-wide
   * plug-in, choosing the business in the card.
   */
  cardNavigation: boolean;
  /**
   * The business's own WhatsApp number, saved by the client in the portal, is offered with its contact details
   * and after a sent request, as a link that opens a chat with the business's message filled in.
   */
  whatsappContact: boolean;
  /**
   * Buttons to the business's own pages, saved by the client in the portal: a payment page after a sent request;
   * its booking page, directions and review page with its contact details.
   */
  businessLinks: boolean;
  /**
   * The business's buttons where they help: on the menu card, a booking button next to availability and open
   * times, and the assistant is told which ones exist. Presses are counted for the business's dashboard.
   */
  quickActions: boolean;
  /**
   * The assistant is told how the business takes payment: on its own payment page when it saved one (Stripe,
   * PayPal, Square or another), otherwise directly with the business. Never in the chat. get_contact also returns
   * the payment page, so a customer can find it before or without a request.
   */
  paymentAnswers: boolean;
  /**
   * Checkout on the business's own Stripe account (stripe-checkout.ts), when it connected one in the portal: a request
   * with a firm price opens a Stripe Checkout page in the business's name, and the status tool asks Stripe whether it
   * was paid. Test mode only for now.
   */
  stripeCheckout: boolean;
  /**
   * The plug-in says who it is when a client connects: a description, its website and, for BizPlug's own
   * industry-wide plug-ins, the BizPlug logo, with the privacy policy, terms and support contact.
   */
  listingDetails: boolean;
  /**
   * Every tool states all three hints a directory review asks for: whether it only reads, whether what it does
   * cannot be taken back (a request, once sent, cannot), and whether it reaches outside the business's own data.
   */
  fullAnnotations: boolean;
};

export type PluginVersion = {
  version: string;
  date: string; // ISO date
  /** One sentence on what changed, for the public pages and the package READMEs. */
  summary: string;
  /** What is new, in the client's words. Shown in the portal next to the Upgrade button. */
  notes: string[];
  features: PluginFeatures;
};

export const PLUGIN_VERSIONS: PluginVersion[] = [
  {
    version: "0.1.0",
    date: "2026-11-15",
    summary: "The plug-in's tools for the industry, answers from the business's own information, and a text menu of what it can do.",
    notes: ["The plug-in's tools for your industry, questions answered from your own information, and a text menu of what it can do."],
    features: { menuCard: false, cardResults: false, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.2.0",
    date: "2026-11-16",
    summary: "A menu card in ChatGPT, with a button and a short form for each thing a customer can do.",
    notes: [
      "A menu card in ChatGPT: your customers see a button for each thing they can do.",
      "Each button opens a short form (dates and party size, an item, a reference, a question or a request), so customers tap and fill in instead of typing everything.",
    ],
    features: { menuCard: true, cardResults: false, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.3.0",
    date: "2026-11-16",
    summary: "Results show inside the card (prices, availability, open times, estimates and statuses), and a request can be sent straight from a result.",
    notes: [
      "Results show inside the card: prices, availability, open times, estimates and statuses, instead of only as text in the chat.",
      "Customers can go from a result straight to a request in the card: pick an option or a time, add their name and email, and send.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: false, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.4.0",
    date: "2026-11-16",
    summary:
      "Browsing by tapping in the card: quick options on each form, search and category filters on a list, an item or option on its own screen with Back, the business's published questions and answers, and choosing the business on an industry-wide plug-in.",
    notes: [
      "Customers browse by tapping: your own categories and services, and shortcuts for dates and party size, appear as buttons on each form.",
      "A list can be searched and filtered by category in the card, and each item or option opens on its own screen, with Back to return.",
      "Your published questions and answers show in the card, so common questions are answered with one tap. Other questions still go to the chat.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: false, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.5.0",
    date: "2026-11-16",
    summary: "A WhatsApp button to the business's own number, with its contact details and after a sent request, when the business has saved its number in the portal.",
    notes: [
      "A WhatsApp button to your own number: save your WhatsApp number and a first message under Integrations on your plug-in page, and customers can open a chat with you from your contact details and after they send a request.",
      "Requests still reach you by email as before. WhatsApp is an extra way for a customer to reach you, and nothing is sent until they press send in WhatsApp.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: false, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.6.0",
    date: "2026-11-16",
    summary: "Buttons to the business's own pages, when it has saved them in the portal: a payment page after a sent request, and its booking page, directions and review page with its contact details.",
    notes: [
      "A Pay online button after a request, to your own payment page (for example a Stripe Payment Link). BizPlug takes no payment: the customer pays on your page.",
      "Book online, Get directions and Leave a review buttons with your contact details, each to a link you save under Integrations on your plug-in page.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: false, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.7.0",
    date: "2026-11-16",
    summary: "The business's own buttons (WhatsApp, booking, directions, reviews, social media) on the menu card and next to availability, with presses counted for the business.",
    notes: [
      "Your buttons show on your menu card, so a customer can message, book, find or follow you without asking first.",
      "A Book button to your booking page shows next to availability and open times, where a customer decides.",
      "The assistant knows which buttons you have and points to the right one at the right moment.",
      "Your Traction page counts how often each button is pressed, and where each request was delivered.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: false, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.8.0",
    date: "2026-11-16",
    summary: "Clear answers on how to pay: the business's own payment page when it has one, offered whenever a customer asks, and payment never taken in the chat.",
    notes: [
      "When a customer asks how to pay or whether they can pay online, the assistant answers from your settings: your own payment page if you saved one (Stripe, PayPal, Square or another), otherwise that payment is arranged with you directly.",
      "Your payment page is also listed with your contact details, so a customer can find it before or without sending a request. It still shows after a request as before.",
      "The assistant never takes card details or payment in the chat. The customer pays on your page, and the money never passes through BizPlug.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: false, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.9.0",
    date: "2026-11-16",
    summary: "Checkout on the business's own Stripe or Checkout.com account, when it has connected one: customers pay for an order or booking right after the request, and the status check asks the provider whether it was paid.",
    notes: [
      "Connect your own Stripe account (sign in with Stripe, or paste a key) or your Checkout.com account under Integrations: after a customer sends an order or booking with a price, they get a Pay now button to a checkout page in your business's name. The money goes to your account, never through BizPlug.",
      "The price is taken from your published files, never from the chat. Your plug-in confirms each payment with the provider, you get an email when an order is paid, and you can refund it from Payments on your plug-in page.",
      "Test mode first: no real money. Live payments are switched on for your plug-in once BizPlug has approved it. You still confirm every request yourself.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: false, fullAnnotations: false },
  },
  {
    version: "0.10.0",
    date: "2026-11-17",
    summary: "The plug-in introduces itself to ChatGPT and other clients with a description and a website, and BizPlug's industry-wide plug-ins with the BizPlug logo, privacy policy, terms and support contact.",
    notes: [
      "Your plug-in tells ChatGPT who it is: your business's own summary as its description, and your website as its link.",
      "Nothing changes in how it answers customers or handles requests.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: false },
  },
  {
    version: "0.11.0",
    date: "2026-11-17",
    summary: "Every tool states whether it only reads, whether its action can be taken back and whether it reaches outside the business's own data, as ChatGPT's plug-in directory requires.",
    notes: [
      "Each tool of your plug-in now states whether it only reads information or sends something that cannot be taken back. ChatGPT uses this to decide when to ask a customer to confirm.",
      "Sending a request is marked as an action that cannot be undone, so ChatGPT may ask the customer to confirm before it is sent. Nothing else changes.",
    ],
    features: { menuCard: true, cardResults: true, cardNavigation: true, whatsappContact: true, businessLinks: true, quickActions: true, paymentAnswers: true, stripeCheckout: true, listingDetails: true, fullAnnotations: true },
  },
];

export const LATEST_VERSION = PLUGIN_VERSIONS[PLUGIN_VERSIONS.length - 1].version;
/** "16 November 2026", for a version's ISO date. */
export const versionDate = (v: PluginVersion) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${v.date}T00:00:00Z`));
/** Plug-ins published before versions were recorded ran this one. */
export const FIRST_VERSION = PLUGIN_VERSIONS[0].version;

const parts = (v: string) => v.split(".").map((n) => Number(n) || 0);
/** Negative when a is older than b. */
export function compareVersions(a: string, b: string): number {
  const x = parts(a), y = parts(b);
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
}

export const getVersion = (v: string | undefined) => PLUGIN_VERSIONS.find((x) => x.version === v);
/** The behaviour of a version; an unknown or missing version behaves as the current one. */
export const featuresOf = (v: string | undefined): PluginFeatures => (getVersion(v) ?? PLUGIN_VERSIONS[PLUGIN_VERSIONS.length - 1]).features;
/** The versions newer than `v`, oldest first. */
export const versionsAfter = (v: string) => PLUGIN_VERSIONS.filter((x) => compareVersions(x.version, v) > 0);
