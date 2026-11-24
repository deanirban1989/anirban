begin;

create table if not exists public.site_articles (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  topic text not null check (topic in ('Security', 'Investing', 'Building')),
  summary text not null,
  body text[] not null check (cardinality(body) > 0),
  sort_order integer not null default 100,
  published boolean not null default false
);

alter table public.site_articles enable row level security;
revoke all on table public.site_articles from public, anon, authenticated;
grant select on table public.site_articles to anon, authenticated;

drop policy if exists "Read published site articles" on public.site_articles;
create policy "Read published site articles" on public.site_articles
  for select to anon, authenticated using (published);

insert into public.site_articles (slug, title, topic, summary, body, sort_order, published)
values
(
  'why-access-reviews-still-take-so-long',
  'Why access reviews still take so long',
  'Security',
  'A faster review starts with giving application owners the context to make a decision.',
  array[
    'An access review looks like a yes-or-no question: does this person still need this permission? The work around that question takes the time. Someone pulls the entitlement list, matches it to employee records, finds an owner, and works out what each role actually allows. Owners often get a spreadsheet with just an email address and a role name.',
    'I start by putting the relevant facts in front of the person making the decision. What application is this? What can this role do? Is the person still on the team? When was the permission last used, if that data exists? The review owner can then spend time on the ambiguous cases, where their knowledge matters most.',
    'The decision still needs a follow-up. A removal decision should create a task for the team that can revoke the permission. The review record should distinguish the request from verified removal and retain the reviewer, their decision, and the time it was made.',
    'I’d measure three things: the time owners spend reviewing, the proportion of removals verified by the due date, and whether an auditor can reconstruct a decision from the evidence. The demo on this site shows what the decision and evidence can look like.'
  ], 10, true
),
(
  'what-i-look-for-in-a-cybersecurity-startup',
  'What I look for in a cybersecurity startup',
  'Investing',
  'Start with the buyer, the urgency of the problem, and what it takes to deploy.',
  array[
    'When I evaluate a cybersecurity startup, I start with the person expected to buy it. Who feels the pain? Who owns the budget? Who has to connect it to production? Those can be three different people, and each has a reason to support or stall the purchase.',
    'I look for a problem the team is already paying to solve. That could be a tool, a consultant, or hours of engineering time spent on manual work. A buyer who can describe the current cost can usually explain the value of replacing it.',
    'Then I look at deployment. If a vendor needs privileged access, five integrations, and weeks of work before a buyer sees a result, the first win has to justify that effort. A product that can demonstrate value with one application or one workflow has an easier path to a second deployment.',
    'I also ask what happens after the first success. Do users come back because the product owns a recurring workflow? Can its evidence support another team or another audit? The quality of that second use tells me more than the breadth of the launch deck.'
  ], 20, true
),
(
  'what-building-grcos-taught-me',
  'What building grcOS taught me about security workflows',
  'Building',
  'A product decision about when to close a security follow-up and what evidence to retain.',
  array[
    'One decision in building grcOS was how to represent a security action that someone has requested but another team still has to carry out. In an access review, the owner can decide to remove access in seconds. The application administrator may need longer to make the change, and an auditor needs evidence of both events.',
    'I treat the review decision and the follow-up as separate records. The decision captures who reviewed the permission and what they decided. The follow-up captures who owns the removal, whether it is complete, and what verifies completion.',
    'That adds a little more structure to the workflow, but it gives each person a clear job. The reviewer can finish their part without waiting on a second team. The administrator can work through their queue. The person running the review can see which removals still need verification.',
    'I use the same principle when thinking about risks, exceptions, and audit findings. Record the decision once, give the action to someone who can complete it, and close it when there is evidence. The interface should make those handoffs visible.'
  ], 30, true
)
on conflict (slug) do nothing;

commit;
