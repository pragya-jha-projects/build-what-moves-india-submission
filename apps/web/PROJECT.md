# JanSeva

> A citizen-first companion for navigating Indian government services.

## Hackathon

Build What Moves India

## Problem

Government services are increasingly available online, but citizens still
have to figure out which services apply to their situation, understand
bureaucratic terminology, gather the right information and documents, and
navigate multiple government portals independently.

The problem is not simply access to digital government services. It is the
complexity of navigating them.

## Solution

JanSeva is a citizen-first layer around existing government services.

Instead of starting with a government department or form, the citizen starts
with a life event.

For example:

- "I moved to a new address."
- "I started my first job."

JanSeva identifies relevant government services, explains what the citizen
needs to do, guides them through the required information, and provides
contextual assistance while they use the official government portal.

Government portals remain the system of record. JanSeva is the guidance layer.

## MVP

### Life Events

1. Moving to a new address
2. Starting first formal employment

### Initial Services

- EPFO / Provident Fund
- Income Tax
- Aadhaar
- Voter services
- Driving licence

## Core Capabilities

- Life-event based service discovery
- Guided workflows
- Eligibility / decision questions
- Citizen information profile
- Document checklists
- Contextual assistance alongside government portals
- Copy-to-clipboard assistance
- Direct handoff to official government services

## Privacy Principles

- Minimize collection of personal information
- Keep sensitive citizen information local wherever possible
- Do not create a centralized citizen-data store for the MVP
- Government portals remain responsible for authentication and submission
- The citizen remains in control of final submission

## Technical Principles

- No dependency on ML or predictive models
- No large data-processing pipeline
- Government APIs are not required for the MVP
- Service workflows should be configuration-driven where practical
- The browser companion should support a small number of government portals
  well rather than attempting to support every portal

## Current Flagship Journey

Starting first job → EPFO → guided journey → official EPFO portal →
JanSeva companion

## Success Criteria

A user should be able to:

1. Describe a life event.
2. See relevant government services.
3. Select a service.
4. Understand what they need before starting.
5. Complete a guided preparation workflow.
6. Open the official government portal.
7. Use JanSeva alongside the portal to find/copy relevant information.
8. Remain in control of the actual government submission.
