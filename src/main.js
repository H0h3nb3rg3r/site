import "./style.css";
import { salvarContato } from "./contatos.js";

document.getElementById("ano").textContent = new Date().getFullYear();

const form = document.getElementById("form-contato");
const status = document.getElementById("status");
const botao = form.querySelector("button[type=submit]");

const regras = {
  nome: (v) => (v.trim().length >= 3 ? "" : "Informe seu nome completo."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Informe um e-mail válido."),
  telefone: (v) => (!v || v.replace(/\D/g, "").length >= 10 ? "" : "Use DDD + número, com 10 ou 11 dígitos."),
  assunto: (v) => (v ? "" : "Escolha o tipo de projeto."),
  mensagem: (v) => (v.trim().length >= 10 ? "" : "Escreva pelo menos 10 caracteres."),
  aceite: (v) => (v ? "" : "Marque para continuar."),
};

function validar(dados) {
  let valido = true;
  for (const campo in regras) {
    const msg = regras[campo](dados[campo]);
    form.querySelector(`[data-erro="${campo}"]`).textContent = msg;
    if (msg) valido = false;
  }
  return valido;
}

function mostrarStatus(texto, tipo = "") {
  status.textContent = texto;
  status.className = tipo;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  mostrarStatus("");

  const f = new FormData(form);
  const dados = {
    nome: f.get("nome").trim(),
    email: f.get("email").trim(),
    telefone: f.get("telefone").trim(),
    assunto: f.get("assunto"),
    mensagem: f.get("mensagem").trim(),
    aceite: form.elements.aceite.checked,
  };

  if (!validar(dados)) {
    const primeiro = form.querySelector(".erro:not(:empty)");
    if (primeiro) primeiro.parentElement.querySelector("input,select,textarea").focus();
    return;
  }

  botao.disabled = true;
  mostrarStatus("Enviando...");

  
  try {
    await salvarContato(dados);
    form.reset();
    mostrarStatus("Pedido enviado. Entraremos em contato em até 2 dias úteis.", "ok");
  } catch (erro) {
    console.error("Erro ao salvar contato:", erro);
    const msg = erro.message === "tempo-esgotado"
      ? "O envio demorou demais. Verifique sua conexão e tente de novo."
      : "Não foi possível enviar agora. Tente novamente em instantes.";
    mostrarStatus(msg, "falha");
  } finally {
    botao.disabled = false;
  }
});