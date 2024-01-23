import "server-only";

import { cookies } from "next/headers";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { SessionCookieOptions, getAuth } from "firebase-admin/auth";

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert({
        "type": "service_account",
        "project_id": "web-spiqyp",
        "private_key_id": "ec830908f93e66f57d879e9724d82ec485547dbf",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDV7hBuZisSsual\nzMfNk0cp8rbgj/v5IIE4hPCgfe/+/NI8ZMIqPm7ziU9HU/x2ZYQtrQ+PB8OAkNh6\nqb8sg1rT/gqua1GCjsjQEO2HCrYoIj8aeFQZQCEwdewtJKWAiOj9KktT3ZF6GUSY\nf9BEIfA+GLn3dlm4H1b5isxwBn5sVVF4IHRkAKCqtw/mEJSIp0Mg/MMJYpp/1Dm9\nC0mjgBRS1o8phRhSkqBYZmsQmp+HI7mZHUuGcThoR6mdwt1NUpBWFRYsc2z6V31j\n9yrYelCv/EM3ClFiimX1OtcJ/qlSlS2lcwG0pG/W6TxeRo1TbbVEzHp7HPu6Z5yf\noZeUs37nAgMBAAECggEAB+kPo9AUqP0DLlT40Q8wbcqocdFL00BycXE+UeZA6OrW\n/fNegqALC5JOONL63jM5b1RGOQG5Ju3e3gTyKWaKBetk4GIzgg0JkTgEWx6i8a+i\nfwtoAK8FtdGxHqeLlHR7jlucAXPgnI/b9iTzwdvcvaRoa/rCV96WIWVn0yn0+XMf\ni3IrOX7X6jK5ZDFcdu2+aczlhwsIf4CncBb8Vn2UPkdsyOI4wgCOJH3oorhHNsoV\nGE2crTzkhHlK3IdD6JjXWdf2J4V9CPXv1bFgRzkIY3temmmMt5YtdMCYz5vqveQ/\nwHrtqYdBKYGZHWXGdYcyYkIF+O+kso46SpMCDWmXMQKBgQDrUGABr07Pcwlycs7W\nwASiMyXOZaD1LMPTgQqB3FhSIcJn/3Q86Z728Qd4VuQoflorskTyXjbO+9cy1buE\n03gRgYzbeSw4UPCKvZNfuGcOFrfEJ/rzzkV5QF5SiVXVKrRDsg60xEM9JDXPTROO\n/P1ipP1G30TSLA48ApCrYj77QwKBgQDovHPA2BylX2bPNxqDysvlyKgxbI2mLvRX\nObRkmjtmgvMCuKS4UGAIXmvboS2iKdI6nfMTxIzEIRpnGF8xDT9H91Myy/cSdR0O\nk/N3ZTyAKt1QCXrtnztOkkbESYJWvx7JMiPqb0L7i1KYNC1x6RpXZoJ7n8IoVnlC\n8yF6Id9JjQKBgQCQSGAVqGAyYt7QBgU9N8+fhK0RuM7QhfosnVrL9UdSVNDW45Nq\nJfUKhQ+Hgf+ztIWldVFBKvOARnrU+KhZ8TAVy9GKYOn0Pey/pS3P60mFIfjblYgS\nJdADYKx0/zBZ3C1btLm/rPdtbd5wlVoAuq7C5VdHNW8FT24K7ae27i6f8QKBgCqD\n4pFj6Te8icdoxYs1zLGZSkBdGDM3eKNGg1GtaxR673Gb0VtqM2DT/tgMRY3OHf1f\nRTxjN2PMuEoFBb6sMNcwsx4gbG4OvtQe6ubws3CmY+9vC+nEoMzlo8/PreOy3ija\n4/y7fnz9IoVzYqngb1NwAn4a3RkJUvWL/J2W+ncxAoGAPtyq7cWf/+Ja8bp3rSD8\nVIEjwQ3jj1vGvBV1O7tjZT+HuHhaLDD2yew7CeDPdDVesz5rAhUtWWOnTfGpXGvc\nL1qIsal/9eM7AWEGb/SLvi7PXT4M0F1PyeRwwpK0eRAkDm2qN9yX3un9NvFbNcLZ\nvEokx4+gkzeVDnrVDcMl7b0=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-amp3u@web-spiqyp.iam.gserviceaccount.com",
        "client_id": "109845316338206744613",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-amp3u%40web-spiqyp.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      ),
    },
    "firebase-admin-app"
  );
export const auth = getAuth(firebaseApp);

export async function isUserAuthenticated(session: string | undefined = undefined) {
  const _session = session ?? (await getSession());
  if (!_session) return false;

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true));
    return !isRevoked;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!(await isUserAuthenticated(session))) {
    return null;
  }

  const decodedIdToken = await auth.verifySessionCookie(session!);
  const currentUser = await auth.getUser(decodedIdToken.uid);

  return currentUser;
}

async function getSession() {
  try {
    return cookies().get("__session")?.value;
  } catch (error) {
    return undefined;
  }
}

export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
  return auth.createSessionCookie(idToken, sessionCookieOptions);
}

export async function revokeAllSessions(session: string) {
  const decodedIdToken = await auth.verifySessionCookie(session);

  return await auth.revokeRefreshTokens(decodedIdToken.sub);
}