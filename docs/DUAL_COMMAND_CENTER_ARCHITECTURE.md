# Dual Command Center Architecture

## Decision

Avans Agency OS and the owner's personal ventures must be treated as two separate operating systems, not as workspaces inside the same product.

### System A — Avans Agency OS

Scope:
- agency clients;
- agency leads and proposals;
- account management;
- creative production;
- web/development work;
- paid media;
- reporting;
- agency operations, finance and QA.

Command center:
- Agency Director as orchestrator;
- specialist agents grouped by agency department;
- agency-only task queue, approvals, context and integrations.

Data boundary:
- no GastroPilot;
- no Sin Equipaje;
- no Nexodg personal operations;
- no personal-project memory is injected into agency agent context.

### System B — Personal Ventures Command Center

Scope:
- GastroPilot;
- Sin Equipaje;
- Nexodg and future owned ventures;
- personal product development;
- owned-media/content operations;
- infrastructure and automation for owned projects.

Command center:
- Founder / Chief of Staff orchestrator;
- Product, Dev, Growth, Content, Finance, Research and QA agents;
- project switcher is valid here because every project belongs to the same owner scope.

Data boundary:
- no agency client records;
- no agency commercial data;
- no agency inbox or approvals;
- no agency connector credentials unless explicitly shared through a controlled integration.

## Infrastructure rule

The two systems should have:
- separate deployments;
- separate environment variables and secrets;
- separate auth/organization scopes;
- separate persistence;
- separate audit logs;
- separate agent memory/context;
- separate connector permissions.

They may reuse the same architectural patterns and selected shared code, but they must never share tenant data implicitly.

## Current repository

`avans-agency-os` remains System A only.

The current `Agents Office` branch was corrected so personal ventures are no longer presented as Avans Agency workspaces.

## Personal system

Create as an independent repository/project when provisioning is available. Working name: `personal-ventures-os` until a final product name is chosen.

Initial portfolio:
- GastroPilot;
- Sin Equipaje;
- Nexodg.

The personal Command Center should visually share the Avans operating model where useful, but use a Founder/Portfolio mental model rather than an agency/client mental model.
