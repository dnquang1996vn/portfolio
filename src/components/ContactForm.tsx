"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { contact } from "@/content/portfolio";
import { ArrowUpRight } from "./Icons";
import styles from "./ContactForm.module.css";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Posts to the Resend-backed route; resolves to false on any failure so the form can say so. */
async function send(data: FormData): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        website: data.get("website"),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function ContactForm() {
  const { t } = useSite();
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sentName, setSentName] = useState("");

  const validate = (data: FormData) => {
    const next: Partial<Record<Field, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = t.formRequired;
    if (!email) next.email = t.formRequired;
    else if (!EMAIL.test(email)) next.email = t.formInvalidEmail;
    if (!message) next.message = t.formRequired;
    return { next, name };
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const { next, name } = validate(data);
    setErrors(next);
    const firstError = (["name", "email", "message"] as Field[]).find((f) => next[f]);
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const ok = await send(data);
    if (!ok) {
      setStatus("error");
      return;
    }
    setSentName(name);
    setStatus("sent");
    form.reset();
  };

  const field = (name: Field, label: string, input: (props: FieldProps) => ReactNode) => {
    const inputId = `${id}-${name}`;
    const errId = `${inputId}-err`;
    const err = errors[name];
    return (
      <div className={styles.field}>
        <label htmlFor={inputId}>{label}</label>
        {input({
          id: inputId,
          name,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err ? errId : undefined,
          onInput: () => err && setErrors((prev) => ({ ...prev, [name]: undefined })),
        })}
        {err && <p id={errId} className={styles.error} role="alert">{err}</p>}
      </div>
    );
  };

  return (
    <section data-screen-label="Contact form" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.aside}>
          <h2 className={styles.lead}>{t.contactLeadTitle}</h2>
          <p className={styles.body}>{t.contactLeadBody}</p>
          <h3 className={styles.sub}>{t.preferEmail}</h3>
          <ul className={styles.links}>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a href={contact.phoneHref}>{contact.phone}</a></li>
            <li><a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></li>
          </ul>
          <p className={styles.note}>{t.contactNote}</p>
        </div>

        <div className={`card ${styles.panel}`}>
          {status === "sent" ? (
            <div className={styles.sent} role="status">
              <h2 className={styles.sentTitle}>{t.sentTitle.replace("{name}", sentName)}</h2>
              <p className={styles.body}>{t.sentBody}</p>
              <button type="button" className="btn btn-secondary" onClick={() => setStatus("idle")}>{t.sendAnother}</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
              {/* Honeypot: hidden from people, filled by bots; the API drops anything that sets it. */}
              <div className={styles.trap} aria-hidden="true">
                <label htmlFor={`${id}-website`}>Website</label>
                <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className={styles.row}>
                {field("name", t.formName, (p) => <input {...p} type="text" autoComplete="name" />)}
                {field("email", t.formEmail, (p) => <input {...p} type="email" autoComplete="email" inputMode="email" />)}
              </div>
              {field("message", t.formMessage, (p) => <textarea {...p} rows={7} />)}
              <p className={styles.helper}>{t.formHelper}</p>
              <div className={styles.actions}>
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                  {status === "sending" ? t.sending : t.sendMessage}
                </button>
                {status === "error" && (
                  <p className={styles.error} role="alert">
                    {t.formError} <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  name: Field;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
  onInput: () => void;
}
