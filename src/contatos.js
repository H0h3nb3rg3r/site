import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

const COLECAO = "contatos";
const TEMPO_LIMITE_MS = 10000;

/** Salva um contato na coleção "contatos" do Firestore. */
export async function salvarContato(dados) {
  const envio = addDoc(collection(db, COLECAO), {
    ...dados,
    criadoEm: serverTimestamp(),
  });

  // addDoc só conclui com confirmação do servidor; sem internet ficaria pendente.
  const limite = new Promise((_, rejeitar) =>
    setTimeout(() => rejeitar(new Error("tempo-esgotado")), TEMPO_LIMITE_MS)
  );

  return Promise.race([envio, limite]);
}