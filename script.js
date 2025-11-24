async function sendMessage(text) {
  renderMessage("...", "ai");
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: text }] })
    });
    const data = await resp.json();
    console.log("Ответ от прокси:", data);  // <-- сюда вставь

    let answer = "";
    if (data.choices && data.choices[0]?.message?.content) {
      answer = data.choices[0].message.content;
    } else {
      answer = "Ошибка: непонятный ответ от сервера";
    }

    lastAI = answer;
    chatHistory.push({ role: "ai", text: answer });
    saveHistory();

    chatEl.removeChild(chatEl.lastChild);
    renderMessage(answer, "ai");
  } catch (e) {
    console.error(e);
    chatEl.removeChild(chatEl.lastChild);
    renderMessage("Ошибка сервера", "ai");
  }
}
