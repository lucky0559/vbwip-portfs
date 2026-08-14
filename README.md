# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# vbwip-portfs

## Direct contact email

The contact form posts to the Vercel-compatible `api/contact.js` function and sends through Nodemailer over SMTP. Configure these server-side environment variables in the deployment platform:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-16-character-google-app-password
MAIL_FROM=your-gmail-address@gmail.com
CONTACT_RECIPIENT=benipayovanessa@gmail.com
```

For Gmail, turn on 2-Step Verification and create a Google App Password for this site. Use that 16-character App Password as `SMTP_PASS`, not your regular Gmail password. Use `SMTP_SECURE=true` for port 465. Keep SMTP credentials server-side and never prefix them with `VITE_`.

Incoming inquiries use a branded HTML email with a plain-text fallback and a direct reply action.

For local Vite development, put the same variables in an uncommitted `.env.local` file. The Vite dev server exposes the same `/api/contact` route locally, so the form will not return a 404 during development.

If the form returns a 502, check the SMTP host, port, secure mode, username, password, and sender address. The form and dev-server log now report the relevant SMTP failure category without exposing credentials.
