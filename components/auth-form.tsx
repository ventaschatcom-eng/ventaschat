"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    setError("");
    setPending(true);

    try {
      if (mode === "signup") {
        const signupResponse = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const signupData = await signupResponse.json();

        if (!signupResponse.ok) {
          setError(signupData.error || "No pudimos crear tu cuenta en este momento.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña inválidos.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="auth-form card" action={handleSubmit}>
      <div className="section-heading">
        <h1>{mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}</h1>
        <p>
          {mode === "login"
            ? "Inicia sesión para analizar conversaciones y entender qué está frenando tus cierres."
            : "Empieza con 3 análisis gratis y descubre qué te ayuda a cerrar más ventas."}
        </p>
      </div>

      <label className="field">
        <span>Email</span>
        <input type="email" name="email" placeholder="tu@empresa.com" required />
      </label>

      <label className="field">
        <span>Contraseña</span>
        <input type="password" name="password" placeholder="Mínimo 8 caracteres" required />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? "Espera un momento..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </button>
    </form>
  );
}
