const FAQS = [
  {
    q: "Do we need IT staff or technical knowledge?",
    a: "No. If your staff can use Excel, they can use SchoolLens. The platform is designed for non-technical school employees. Origin3 handles all technical setup during your pilot.",
  },
  {
    q: "Is our data secure and private?",
    a: "Yes. Every school's data is completely isolated — no other school can access your files. SchoolLens is DepEd data privacy compliant with full access logs. A data privacy agreement is included in your pilot MOU.",
  },
  {
    q: "What file formats does SchoolLens accept?",
    a: "SchoolLens accepts .xlsx, .xls, .csv, and .ods files. It handles BEIS exports, SIMS reports, and multi-row header forms common in Philippine schools — no reformatting required.",
  },
  {
    q: "How do we pay after the pilot? Will it need BAC bidding?",
    a: "Plans are priced to fit within your MOOE or school budget — no public bidding required for most schools. We'll walk you through all options on your demo call and help with documentation.",
  },
  {
    q: "What happens to our data after the pilot?",
    a: "If you subscribe, everything carries over — your cleaned datasets, dashboards, and chat history. If you don't continue, your data is returned to you and deleted from our systems within 30 days.",
  },
  {
    q: "Can multiple teachers and staff use SchoolLens at the same time?",
    a: "Yes. The principal sees all data. Department heads and subject coordinators see their own sections. Registrar staff upload only. Roles and permissions are fully configurable.",
  },
];

export default function SlFAQ() {
  return (
    <section id="faq" className="py-24 px-[5%]" style={{ background: "var(--white)" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3 reveal" style={{ color: "var(--sl)" }}>
          FAQ
        </div>
        <h2
          className="font-extrabold leading-[1.15] tracking-[-1px] mb-12 reveal"
          style={{
            fontFamily: "var(--font-sora, Sora, sans-serif)",
            fontSize: "clamp(28px, 3.5vw, 42px)",
            color: "var(--sl-dark)",
          }}
        >
          Common questions<br />from{" "}
          <em className="not-italic" style={{ color: "var(--sl)" }}>school administrators.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="reveal sl-card-hover rounded-xl px-6 py-5"
              style={{ border: "1px solid var(--sl-border)", transition: "border-color 0.2s" }}
            >
              <div className="text-sm font-semibold mb-2" style={{ color: "var(--sl-dark)" }}>
                {f.q}
              </div>
              <div className="text-[13px] leading-[1.65]" style={{ color: "var(--sl-muted)" }}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
