# TAREAS PENDIENTES — VentasChat

Dominio: **VentasChat.com**
Stack: Next.js 16 · NextAuth · SQLite (better-sqlite3) · OpenAI · TypeScript

---

## CRITICO — Requerido antes del lanzamiento

- [ ] **Configurar variables de entorno de produccion**
  - Generar `NEXTAUTH_SECRET` real (string aleatorio de 32+ caracteres)
  - Definir `NEXTAUTH_URL=https://ventaschat.com`
  - Agregar `OPENAI_API_KEY` con clave real de OpenAI
  - Mover `DATABASE_URL` al `.env` (actualmente esta hardcodeado en `lib/db.ts`)

- [ ] **Crear logos con branding VentasChat**
  - Los logos actuales en `/public/brand/` dicen "VentaFlow"
  - Disenar nuevos logos: `ventaschat-logo.png`, `ventaschat-logo-nobg.png`
  - Actualizar referencia en `components/logo.tsx` (`src="/brand/ventaschat-logo.png"`)

- [ ] **Apuntar dominio al hosting**
  - Configurar DNS de VentasChat.com al servidor de despliegue
  - Configurar certificado SSL

- [ ] **Elegir e implementar plataforma de hosting**
  - Opciones recomendadas: Vercel (mas simple) o Railway (mas control)
  - SQLite no escala en Vercel (filesystem efimero) → considerar migrar a Turso, PlanetScale o Neon para produccion

---

## ALTA PRIORIDAD — Necesario para monetizar

- [ ] **Integrar pasarela de pago**
  - Opciones para LATAM: Wompi (Colombia), MercadoPago, PayU, Stripe
  - Implementar en `app/dashboard/billing/page.tsx` (actualmente es placeholder estatico)
  - Flujo: seleccionar plan → checkout → credito de creditos en base de datos
  - Webhook para confirmar pagos y actualizar `credits` del usuario

- [ ] **Sistema de creditos funcional**
  - Ya existe logica basica (3 creditos gratis, descuento por analisis)
  - Falta: recargar creditos via pago
  - Falta: bloquear analisis cuando `credits === 0` con mensaje claro
  - Falta: pagina de confirmacion de compra de creditos

- [ ] **Configurar OpenAI en produccion**
  - Actualmente usa fallback hardcodeado si no hay API key
  - Revisar y ajustar prompts en `lib/prompt.ts` para calidad de produccion
  - Definir modelo definitivo (actualmente `gpt-4.1-mini` en `.env`)

---

## MEDIA PRIORIDAD — Mejora la experiencia

- [ ] **Pagina de configuracion de usuario** (`app/dashboard/settings/page.tsx`)
  - Actualmente solo muestra datos
  - Agregar: cambio de contrasena
  - Agregar: cambio de email
  - Agregar: eliminar cuenta

- [ ] **Historial con busqueda y filtros** (`app/dashboard/history/page.tsx`)
  - Agregar campo de busqueda por texto
  - Filtrar por contexto (Ventas / Trabajo / Personal)
  - Paginacion si hay muchos analisis

- [ ] **Rate limiting en API**
  - Agregar limite de peticiones por usuario en `app/api/analyze/route.ts`
  - Evitar abusos de la API de OpenAI

- [ ] **Pagina de error 404 personalizada**
  - `app/not-found.tsx` existe pero revisar diseno

- [ ] **Exportar analisis**
  - Boton para descargar analisis individual como PDF o JSON
  - Util para vendedores que quieren guardar o compartir resultados

- [ ] **Onboarding para usuario nuevo**
  - Al registrarse, mostrar tutorial rapido de como usar el analizador
  - Puede ser un modal o una pagina dedicada `/dashboard/welcome`

---

## BAJA PRIORIDAD — Crecimiento futuro

- [ ] **Panel de administrador**
  - Ver todos los usuarios registrados
  - Ver consumo de creditos por usuario
  - Ajustar creditos manualmente

- [ ] **Analytics de uso**
  - Integrar Plausible o PostHog (privacidad amigable)
  - Rastrear: registros, analisis realizados, tasa de conversion a pago

- [ ] **Notificaciones por email**
  - Email de bienvenida al registrarse
  - Alerta cuando quedan pocos creditos
  - Opcion: resumen semanal de analisis
  - Integrar: Resend, SendGrid o Mailgun

- [ ] **Soporte para equipos (multi-usuario)**
  - Workspace compartido para agencias o equipos de ventas
  - Roles: admin del equipo / miembro

- [ ] **Integraciones directas**
  - Webhook de WhatsApp Business API para analizar sin copiar/pegar
  - Extension de Chrome para Instagram DM o Telegram Web

- [ ] **SEO y landing page**
  - Agregar meta tags OG para redes sociales
  - Sitemap.xml
  - Optimizar textos para busquedas en espanol (LATAM)

---

## DEUDA TECNICA

- [ ] **Base de datos para produccion**
  - SQLite local no funciona bien en hosting sin filesystem persistente (Vercel)
  - Migrar a: Turso (SQLite en la nube), Neon (Postgres), o PlanetScale
  - Si se migra a Postgres, considerar usar Prisma (el schema ya existe en git history)

- [ ] **Validacion de archivos subidos**
  - El formulario acepta archivos `.txt`
  - Agregar limite de tamano maximo y validacion de contenido

- [ ] **Tests**
  - No hay tests escritos
  - Al menos: tests de API routes (`/api/analyze`, `/api/signup`)
  - Opcional: tests E2E con Playwright para el flujo principal

- [ ] **Manejo de errores en cliente**
  - Mejorar mensajes de error en formularios
  - Agregar toast notifications para feedback inmediato

---

## COMPLETADO

- [x] Estructura base del proyecto (Next.js App Router)
- [x] Autenticacion con NextAuth (credenciales)
- [x] Registro e inicio de sesion
- [x] Landing page completa
- [x] Pagina de precios (estatica)
- [x] Dashboard principal con estadisticas
- [x] Formulario de analisis de conversaciones
- [x] Integracion con OpenAI + fallback sin API key
- [x] Resultados de analisis estructurados (score, intencion, tono, respuestas sugeridas)
- [x] Historial de analisis por usuario
- [x] Vista detalle de analisis
- [x] Sistema de creditos basico (3 gratis al registrarse)
- [x] Dark mode / Light mode
- [x] Branding renombrado a VentasChat
- [x] Logos nuevos (logo-black.png / logo-white.png con modo oscuro/claro)
- [x] Limpieza de archivos innecesarios (prisma/, demo.tsx)
- [x] Migracion de base de datos a Neon Postgres (para Vercel)
- [x] Integracion Wompi: checkout + webhook verificado con firma
- [x] Integracion MercadoPago: checkout + webhook con verificacion via API
- [x] Billing page con precios reales en COP y botones de pago funcionales
- [x] Pagina de exito post-pago (/dashboard/billing/success)
- [x] Schema SQL listo en scripts/setup-db.sql
