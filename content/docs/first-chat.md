---
title: Your first chat
description: The first-launch setup, step by step, and how to start talking to your agent.
section: Get Started
order: 3
---

The first time Froots opens, it runs a short setup inside the main window. Here's what each step does, and what happens right after.

## The setup

1. **Welcome** — "Your people, your agents, and your work — one place, running on your computer, owned by you." Click **Get started** and Froots creates your identity key on this machine. Already have a key from another computer? Choose **Use an existing key instead** and paste it.
2. **Back up your key** — the key is your account. There's no email, no password, and no copy on a server, so saving it is the only way to get the account back. You can skip this and do it later in Settings → Profile, but don't put it off.
3. **Choose your default harness** — pick the agent CLI your agents run on: Claude Code, Codex, Gemini CLI, and any others on your machine. A green dot means it's installed. If it isn't, the step shows how to set it up and a **Check again** button. Details in [Agent runtimes](/docs/model-keys).
4. **Your profile** — your name and picture. This is how people and agents see you.
5. **Meet your agent** — your first agent gets a random name. Keep it, roll a new one, or type your own, then pick what it should help with: Assistant, Writer, Researcher, Coder, or Productivity.
6. **Connect your accounts** — optionally connect **Google** (mail and calendar) and **GitHub** (pull request review and pushing from the Dev tab). Both are skippable and live in Settings → Accounts.
7. **Default browser** *(macOS)* — optionally make Froots your default browser, so links open inside Froots where your agents can see them. Skippable.
8. **Done** — "*Your agent* is ready." Click **Start using Froots**.

## Starting the conversation

After setup you land in the main window. The sidebar is your **Inbox**: anything waiting on you, with a dot for anything unread. Swipe sideways for **Pinned**. A few ways in:

- Click your agent's face in the sidebar, or press **⌘J** to open your first agent.
- Press **⌘K** to find anything.
- Press the global hotkey, **⌘⇧Space** by default, from anywhere. It brings Froots forward with the chat focused.

Ask for something small first: *summarize this folder*, *draft a note about X*, *check what's on my calendar tomorrow*. Watching a small task end to end is the fastest way to get a feel for what the agent can do.

When the agent offers a suggested reply, it shows as faint text in the message box. **Tab** fills it in, **Enter** sends it. You can reply to, forward, or react to any message.

## Friends and groups

People and agents share the same chats. To add a friend, open **Profiles**, click **Add friend**, and paste their key (it starts with `npub`). They get a friend request, and you're friends once they accept. Your own key is in the same menu, so you can send it to someone.

To start a group, select a mix of friends and agents in Profiles and start a group. Agents in a group answer when you **@mention** them.

## What you'll see during a run

Froots shows the run as it happens: tool calls, file edits, and steps stream into the chat as the agent works. In a one-on-one chat with your agent, the picker in the top-right shows which harness and model it's on. Click it to switch. If a turn fails, the chat says why and offers **Retry**.

Once small tasks feel trustworthy, hand over bigger ones, or schedule them to run on their own with [Routines](/docs/routines).
