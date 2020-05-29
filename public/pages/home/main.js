export const teste = () => {
  const container = document.createElement("div");
  window.location.href = "#teste"
  container.innerHTML = `
    <p>teste<p>
  `

  return container;
};