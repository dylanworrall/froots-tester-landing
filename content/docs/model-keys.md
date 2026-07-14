---
title: Model keys
description: Connect Claude, Codex, or any OpenAI-compatible model — subscriptions, API keys, and where they live.
section: Get Started
order: 2
---

Froots is model-agnostic. You pick the brain, per agent and per task, and you can change your mind at any time. There are two ways to connect one: a **subscription CLI** (no API key at all) or a **raw API key** for any OpenAI-compatible endpoint.

## Subscription engines — no API key

The two recommended engines don't use API keys. They ride on subscriptions you already have:

- **Claude** — uses your Claude subscription through the Claude Code CLI. Install it (`npm install -g @anthropic-ai/claude-code`), run `claude` once, and log in. Froots picks it up from there.
- **Codex** — uses your ChatGPT/Codex subscription through the Codex CLI. Install it (`npm install -g @openai/codex`) and run `codex login`.

There is no in-app model login for these — the CLI holds the session, and Froots drives the CLI. If the setup wizard says "CLI not found", run the install command it shows and hit **Re-check**.

## The Custom engine — bring an API key or go local

The **Custom** engine speaks to any OpenAI-compatible endpoint. During setup (or later) you give it three things:

- **Base URL** — e.g. `http://localhost:11434/v1` for local Ollama, or a cloud endpoint like OpenRouter.
- **Model** — e.g. `llama3.2:3b` or any model id the endpoint serves. A **Discover models** button lists what's live at the endpoint.
- **API key** — optional for local endpoints like Ollama; required for cloud providers.

Supported key providers: **Anthropic**, **OpenAI**, **Google Gemini**, **Mistral**, **Groq**, **xAI**, plus any OpenAI-compatible service (OpenRouter, Together, LM Studio, vLLM). **Ollama** needs no key at all.

## Where to enter and change keys

- **During setup** — the "Give your agent a brain" step lets you pick Claude, Codex, or Custom, and enter endpoint details for Custom.
- **Any time after** — open **Your Assistant → Models**. That screen holds the defaults for new agents and is the place to store API keys: pick a backend, set the model, and paste keys into the API Key field.
- **Per agent** — each agent can override the default. Right-click an agent, or open Your Assistant → Model for that agent. Keys can also be scoped to a single agent with global fallback.

## Where keys are stored

Keys are stored locally, in the app's own database on your machine — never on our servers, and never sent anywhere except directly to the provider you configured. When an agent runs, Froots injects the key into that agent's process as an environment variable (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, and so on), the same way you would in a terminal.

## Mixing models

Nothing forces one brain on everything. A common setup: Claude for long agent runs, a cheap fast model via Groq for triage, and local Ollama for offline or private work. Each agent and each routine carries its own model setting, so the work flows to whichever brain fits.
