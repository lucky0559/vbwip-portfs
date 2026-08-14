function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function buildContactEmail({ name, email, message, receivedAt }) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)
  const safeReceivedAt = escapeHtml(receivedAt)
  const subject = `Portfolio inquiry from ${name}`
  const replySubject = encodeURIComponent(`Re: ${subject}`)
  const replyHref = `mailto:${encodeURI(email)}?subject=${replySubject}`

  const text = `NEW PORTFOLIO INQUIRY

From: ${name}
Reply to: ${email}
Received: ${receivedAt}

MESSAGE
${message}

Reply directly: ${email}`

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;background:#e9dfd4;color:#201e1b;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#e9dfd4;">
      <tr>
        <td align="center" style="padding:28px 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#fbf8f4;">
            <tr>
              <td style="padding:28px 32px;background:#201e1b;color:#f3eee7;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1;letter-spacing:0.18em;">
                  VAB<span style="color:#a6603f;">.</span>
                </div>
                <div style="margin-top:16px;color:#d5b19b;font-size:10px;font-weight:700;letter-spacing:0.18em;line-height:1.2;text-transform:uppercase;">
                  Portfolio inquiry
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:42px 32px 44px;">
                <div style="color:#a6603f;font-size:10px;font-weight:700;letter-spacing:0.16em;line-height:1.2;text-transform:uppercase;">
                  A new conversation has arrived
                </div>
                <h1 style="margin:18px 0 14px;color:#201e1b;font-family:Georgia,'Times New Roman',serif;font-size:38px;font-weight:400;line-height:1.04;letter-spacing:-0.035em;">
                  New portfolio inquiry
                </h1>
                <p style="margin:0;color:#5e5750;font-size:15px;line-height:1.65;">
                  Someone reached out through the Vanessa Benipayo portfolio.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;margin-top:34px;border-top:1px solid #d8cec2;">
                  <tr>
                    <td style="width:34%;padding:14px 12px 14px 0;border-bottom:1px solid #d8cec2;color:#a6603f;font-size:10px;font-weight:700;letter-spacing:0.14em;line-height:1.3;text-transform:uppercase;vertical-align:top;">From</td>
                    <td style="padding:14px 0;border-bottom:1px solid #d8cec2;color:#201e1b;font-size:15px;line-height:1.5;vertical-align:top;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:14px 12px 14px 0;border-bottom:1px solid #d8cec2;color:#a6603f;font-size:10px;font-weight:700;letter-spacing:0.14em;line-height:1.3;text-transform:uppercase;vertical-align:top;">Reply to</td>
                    <td style="padding:14px 0;border-bottom:1px solid #d8cec2;color:#201e1b;font-size:15px;line-height:1.5;vertical-align:top;word-break:break-word;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:14px 12px 14px 0;border-bottom:1px solid #d8cec2;color:#a6603f;font-size:10px;font-weight:700;letter-spacing:0.14em;line-height:1.3;text-transform:uppercase;vertical-align:top;">Received</td>
                    <td style="padding:14px 0;border-bottom:1px solid #d8cec2;color:#201e1b;font-size:15px;line-height:1.5;vertical-align:top;">${safeReceivedAt}</td>
                  </tr>
                </table>

                <div style="margin-top:34px;color:#a6603f;font-size:10px;font-weight:700;letter-spacing:0.16em;line-height:1.2;text-transform:uppercase;">
                  Message
                </div>
                <div style="margin-top:12px;padding:20px 0;border-top:1px solid #a6603f;border-bottom:1px solid #d8cec2;color:#201e1b;font-size:16px;line-height:1.7;white-space:pre-wrap;">
                  ${safeMessage}
                </div>

                <a href="${escapeHtml(replyHref)}" style="display:inline-block;margin-top:32px;padding:15px 20px;background:#201e1b;color:#f3eee7;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:0.14em;line-height:1.2;text-transform:uppercase;">
                  Reply to ${safeName} <span style="color:#d5b19b;">&#8599;</span>
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px;background:#e9dfd4;color:#5e5750;font-size:11px;line-height:1.6;">
                Vanessa Benipayo<br>
                Architecture, documentation, and visual thinking<br>
                Malolos, Bulacan, Philippines
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  return { subject, html, text }
}
