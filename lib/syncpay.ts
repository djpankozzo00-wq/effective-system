const BASE = process.env.SYNCPAY_BASE_URL ?? "https://api.syncpayments.com.br/api/partner/v1";

type CashInInput = {
  amountCts: number;
  description: string;
  externalReference: string;
  payer: { name: string; cpf: string; email: string; phone: string };
};

function authHeaders() {
  const token = process.env.SYNCPAY_TOKEN;
  if (!token) throw new Error("SYNCPAY_TOKEN não configurado.");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" };
}

function webhookUrl() {
  const app = process.env.APP_URL;
  const secret = process.env.SYNCPAY_WEBHOOK_SECRET;
  if (!app || !secret) throw new Error("APP_URL e SYNCPAY_WEBHOOK_SECRET precisam estar configurados.");
  return `${app.replace(/\\/$/, "")}/api/webhooks/syncpay/${secret}`;
}

export async function createCashIn(input: CashInInput) {
  const res = await fetch(`${BASE}/cash-in`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      amount: input.amountCts / 100,
      description: input.description,
      externalreference: input.externalReference,
      webhook_url: webhookUrl(),
      client: input.payer,
    }),
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || typeof json?.pix_code !== "string" || !json?.identifier) {
    throw new Error(`SyncPay cash-in falhou (${res.status}).`);
  }
  return { pixCode: json.pix_code as string, identifier: String(json.identifier) };
}

export async function createCashOut(input: {
  amountCts: number; pixKey: string; pixType: "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "EVP";
  name: string; document: string;
}) {
  const res = await fetch(`${BASE}/cash-out`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      amount: input.amountCts / 100, pixKey: input.pixKey, pixType: input.pixType,
      beneficiaryName: input.name, beneficiaryDocument: input.document, postbackUrl: webhookUrl(),
    }),
    cache: "no-store",
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}