const moduleList = document.querySelector('#module-list');
const moduleDetails = document.querySelector('#module-details');

async function loadModules() {
  try {
    const response = await fetch('content/modules.json');
    const modules = await response.json();

    modules.forEach((module, index) => {
      const button = document.createElement('button');
      button.textContent = module.nome;
      button.type = 'button';
      button.classList.toggle('active', index === 0);
      button.addEventListener('click', () => {
        document.querySelectorAll('#module-list button').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        renderModule(module);
      });
      moduleList.appendChild(button);
    });

    renderModule(modules[0]);
  } catch {
    moduleDetails.innerHTML = '<h3>Não foi possível carregar os módulos.</h3>';
  }
}

function renderModule(module) {
  moduleDetails.innerHTML = `
    <h3>${module.nome}</h3>
    <p>${module.objetivo}</p>
    <ul>${module.prioridades.map((item) => `<li>${item}</li>`).join('')}</ul>
    <p><a href="${module.arquivo}">Abrir documentação do módulo →</a></p>
  `;
}

loadModules();
