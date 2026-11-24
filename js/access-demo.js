"use strict";

const sampleAccess = [
  {
    id: "AR-01", name: "Maya Chen", application: "Source control",
    role: "Repository maintainer", team: "Platform Engineering",
    context: "Maya is the current service owner. She used elevated access yesterday to approve a production release."
  },
  {
    id: "AR-02", name: "Jordan Patel", application: "Analytics warehouse",
    role: "Sensitive dataset reader", team: "Customer Operations",
    context: "Jordan transferred teams six weeks ago. The new role has no documented need for access to this dataset."
  },
  {
    id: "AR-03", name: "Sam Rivera", application: "Customer support portal",
    role: "Workspace administrator", team: "Support Engineering",
    context: "Sam still supports the application. The work now involves closing tickets, and a standard support role is available."
  }
];

const title = document.getElementById("review-title");
const itemPanel = document.getElementById("review-item");
const progress = document.getElementById("review-progress");
const actions = document.getElementById("review-actions");
const reset = document.getElementById("review-reset");
const evidence = document.getElementById("evidence-list");
const empty = document.getElementById("evidence-empty");
const records = [];

function renderReview(moveFocus = false) {
  const item = sampleAccess[records.length];
  progress.textContent = records.length + " of " + sampleAccess.length + " reviewed";
  title.textContent = item ? item.name : "Review complete";
  actions.hidden = !item;
  reset.hidden = records.length === 0;
  itemPanel.replaceChildren();

  if (item) {
    const fields = document.createElement("dl");
    fields.className = "demo-fields";
    for (const [label, value] of [
      ["Application", item.application], ["Permission", item.role], ["Team", item.team]
    ]) {
      const term = document.createElement("dt");
      term.textContent = label;
      const description = document.createElement("dd");
      description.textContent = value;
      fields.append(term, description);
    }
    const context = document.createElement("p");
    context.className = "demo-context";
    context.textContent = item.context;
    itemPanel.append(fields, context);
  } else {
    const removals = records.filter(record => record.decision === "Remove access").length;
    itemPanel.textContent = removals + " of " + records.length + " permissions flagged for removal.";
  }

  if (moveFocus) title.focus();
}

function recordDecision(decision) {
  const item = sampleAccess[records.length];
  if (!item) return;

  const record = { item, decision, time: new Date() };
  records.push(record);

  const entry = document.createElement("li");
  const summary = document.createElement("strong");
  summary.textContent = item.id + " · " + decision;
  const subject = document.createElement("p");
  subject.textContent = item.name + " · " + item.application + " · " + item.role;
  const reviewer = document.createElement("p");
  const time = document.createElement("time");
  time.dateTime = record.time.toISOString();
  time.textContent = record.time.toISOString().slice(0, 19).replace("T", " ") + " UTC";
  reviewer.append("Demo reviewer · ", time);
  entry.append(summary, subject, reviewer);

  if (decision === "Remove access") {
    const followUp = document.createElement("p");
    followUp.textContent = "Follow-up status: removal requested";
    entry.append(followUp);
  }

  evidence.prepend(entry);
  empty.hidden = true;
  renderReview(true);
}

for (const button of actions.querySelectorAll("button")) {
  button.addEventListener("click", () => recordDecision(button.dataset.decision));
}

reset.addEventListener("click", () => {
  records.length = 0;
  evidence.replaceChildren();
  empty.hidden = false;
  renderReview(true);
});

renderReview();
