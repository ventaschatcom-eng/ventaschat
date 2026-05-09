import { clsx } from "clsx";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export type ConversationMessage = {
  author: string;
  text: string;
};

export function parseConversationText(text: string): ConversationMessage[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const messages: ConversationMessage[] = [];

  for (const line of lines) {
    const match = line.match(/^(?:\[[^\]]+\]\s*)?([^:]{1,40}):\s+(.+)$/);

    if (match) {
      messages.push({
        author: match[1].trim(),
        text: match[2].trim(),
      });
      continue;
    }

    const lastMessage = messages[messages.length - 1];

    if (lastMessage) {
      lastMessage.text = `${lastMessage.text} ${line}`.trim();
    } else {
      messages.push({
        author: "Conversación",
        text: line,
      });
    }
  }

  return messages;
}

export function appendConversationMessage(
  conversationText: string,
  author: string,
  message: string,
) {
  const nextLine = `${author}: ${message.trim()}`;
  return conversationText.trim() ? `${conversationText.trim()}\n${nextLine}` : nextLine;
}
