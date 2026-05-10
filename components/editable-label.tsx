"use client";

import { useEffect, useRef, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

export function EditableLabel({
  analysisId,
  initialLabel,
  fallback,
  className,
  size = "card",
}: {
  analysisId: string;
  initialLabel: string | null;
  fallback: string;
  className?: string;
  size?: "card" | "page";
}) {
  const [label, setLabel] = useState<string | null>(initialLabel);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialLabel ?? "");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  async function save() {
    const trimmed = draft.trim();
    if (trimmed === (label ?? "")) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/analysis/${analysisId}/label`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        setLabel(data.label || null);
      }
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  function cancel() {
    setDraft(label ?? "");
    setEditing(false);
  }

  const display = label || fallback;
  const isPage = size === "page";

  if (editing) {
    return (
      <div className={`editable-label-edit ${isPage ? "editable-label-page" : ""} ${className ?? ""}`}>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          placeholder="Nombre del cliente o sesión..."
          maxLength={80}
          disabled={saving}
        />
        <button
          type="button"
          className="editable-label-btn editable-label-save"
          onClick={save}
          disabled={saving}
          aria-label="Guardar"
        >
          <Check size={14} />
        </button>
        <button
          type="button"
          className="editable-label-btn editable-label-cancel"
          onClick={cancel}
          disabled={saving}
          aria-label="Cancelar"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className={`editable-label ${isPage ? "editable-label-page" : ""} ${className ?? ""}`}>
      <span className={label ? "editable-label-text" : "editable-label-text editable-label-fallback"}>
        {display}
      </span>
      <button
        type="button"
        className="editable-label-edit-btn"
        onClick={() => setEditing(true)}
        aria-label="Renombrar"
        title="Renombrar"
      >
        <Pencil size={isPage ? 16 : 13} />
      </button>
    </div>
  );
}
