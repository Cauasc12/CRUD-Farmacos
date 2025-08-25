document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // Seletores de Elementos
  // ========================
  const body = document.body;
  const tableBody = document.getElementById('table-body');
  const searchInput = document.getElementById('search-input');
  const mainTitle = document.getElementById('main-title');
  const themeToggle = document.getElementById('theme-toggle');
  
  // Modais
  const formModal = document.getElementById('form-modal');
  const resultModal = document.getElementById('result-modal');
  const filterModal = document.getElementById('filter-modal');
  const chunkModal = document.getElementById('chunk-modal');

  // Formulários
  const farmacoForm = document.getElementById('farmaco-form');
  const filterForm = document.getElementById('filter-form');
  const chunkForm = document.getElementById('chunk-form');

  // Estatísticas
  const statTotalItems = document.getElementById('stat-total-items');
  const statTotalValue = document.getElementById('stat-total-value');
  
  let currentFarmacos = [];

  // ========================
  // LÓGICA DE TEMA (NOVO)
  // ========================
  const applyTheme = (theme) => {
      if (theme === 'dark') {
          body.classList.add('dark-mode');
      } else {
          body.classList.remove('dark-mode');
      }
      localStorage.setItem('pharma_theme', theme);
  };

  const handleThemeToggle = () => {
      const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      applyTheme(currentTheme);
  };

  // ========================
  // Funções de Renderização
  // ========================
  const renderStats = (farmacos) => {
    statTotalItems.textContent = Farmacia.countFarmacos(farmacos);
    statTotalValue.textContent = Farmacia.calculateEstoqueValue(farmacos).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  const renderTable = (farmacos, title = "Estoque de Fármacos") => {
    mainTitle.textContent = title;
    tableBody.innerHTML = '';
    if (Farmacia.countFarmacos(farmacos) === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Nenhum fármaco encontrado.</td></tr>`;
      return;
    }
    farmacos.forEach(farmaco => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${farmaco.id}</td>
        <td><img class="farmaco-img" src="${farmaco.imagemUrl}" alt="${farmaco.nome}" onerror="this.src='https://placehold.co/50x50/e1e1e1/909090?text=Sem+Img';"></td>
        <td>${farmaco.nome}</td>
        <td>${farmaco.marca}</td>
        <td>${farmaco.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${farmaco.quantidade}</td>
        <td>
          <button class="action-btn btn-update" data-id="${farmaco.id}"><i data-feather="edit-2"></i></button>
          <button class="action-btn btn-delete" data-id="${farmaco.id}"><i data-feather="trash-2"></i></button>
        </td>
      `;
      tr.querySelector('.btn-delete').addEventListener('click', handleDelete);
      tr.querySelector('.btn-update').addEventListener('click', handleUpdate);
      tableBody.appendChild(tr);
    });
    feather.replace();
  };

  // ========================
  // Gerenciamento de Estado e Modais
  // ========================
  const updateState = (newFarmacos) => {
      currentFarmacos = newFarmacos;
      Farmacia.saveFarmacos(currentFarmacos);
      renderTable(currentFarmacos);
      renderStats(currentFarmacos);
  };
  
  const openModal = (modalElement) => { modalElement.style.display = 'flex'; };
  const closeModal = (modalElement) => { modalElement.style.display = 'none'; };

  const openFormModal = (mode, farmaco = null) => {
    farmacoForm.reset();
    farmacoForm.dataset.mode = mode;
    farmacoForm.dataset.id = farmaco ? farmaco.id : '';
    document.getElementById('modal-title').textContent = mode === 'edit' ? 'Editar Fármaco' : 'Adicionar Novo Fármaco';
    if (mode === 'edit' && farmaco) {
        Object.keys(farmaco).forEach(key => {
            const input = document.getElementById(key);
            if (input) input.value = farmaco[key];
        });
    }
    openModal(formModal);
  };

  const openResultModal = (title, contentHTML) => {
      document.getElementById('result-modal-title').textContent = title;
      const contentDiv = document.getElementById('result-modal-content');
      contentDiv.innerHTML = '';
      contentDiv.appendChild(contentHTML);
      openModal(resultModal);
  };

  // ========================
  // Handlers
  // ========================
  const handleListAll = () => renderTable(currentFarmacos);
  const handleAdd = () => openFormModal('add');

  const handleReset = () => {
    if (confirm("Você tem certeza que quer apagar tudo e resetar para o estoque inicial?")) {
      updateState(Farmacia.resetFarmacos());
    }
  };

  const handleDelete = (event) => {
    const id = Number(event.currentTarget.dataset.id);
    if (confirm(`Tem certeza que quer excluir o fármaco com ID ${id}?`)) {
        updateState(Farmacia.deleteFarmaco(currentFarmacos, id));
    }
  };
  
  const handleUpdate = (event) => {
    const id = Number(event.currentTarget.dataset.id);
    const farmacoToEdit = Farmacia.findFarmacoById(currentFarmacos, id);
    if (farmacoToEdit) openFormModal('edit', farmacoToEdit);
  };
  
  const handleFormSubmit = (event) => {
      event.preventDefault();
      const mode = farmacoForm.dataset.mode;
      const id = Number(farmacoForm.dataset.id);
      const farmacoData = {
          nome: document.getElementById('nome').value,
          marca: document.getElementById('marca').value,
          preco: parseFloat(document.getElementById('preco').value),
          quantidade: parseInt(document.getElementById('quantidade').value),
          categoria: document.getElementById('categoria').value,
          imagemUrl: document.getElementById('imagemUrl').value,
      };
      if (mode === 'add') {
          farmacoData.id = Date.now();
          updateState(Farmacia.addFarmaco(currentFarmacos, farmacoData));
      } else if (mode === 'edit') {
          const originalFarmaco = Farmacia.findFarmacoById(currentFarmacos, id);
          const updatedData = { ...originalFarmaco, ...farmacoData };
          updateState(Farmacia.updateFarmaco(currentFarmacos, id, updatedData));
      }
      closeModal(formModal);
  };

  const handleSearch = (event) => {
      const searchTerm = event.target.value;
      renderTable(Farmacia.searchFarmacos(currentFarmacos, searchTerm), `Resultados para "${searchTerm}"`);
  };
  
  // ========================
  // Handlers de Filtros e Funções Avançadas
  // ========================
  const populateFilterValues = () => {
      const filterType = document.getElementById('filter-type').value;
      const values = Farmacia.getUniqueValuesByKey(currentFarmacos, filterType);
      const selectValue = document.getElementById('filter-value');
      selectValue.innerHTML = '';
      values.forEach(value => {
          const option = document.createElement('option');
          option.value = value;
          option.textContent = value;
          selectValue.appendChild(option);
      });
  };

  filterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const type = document.getElementById('filter-type').value;
      const value = document.getElementById('filter-value').value;
      const result = type === 'marca'
          ? Farmacia.listFarmacosByMarca(currentFarmacos, value)
          : Farmacia.listFarmacosByCategoria(currentFarmacos, value);
      renderTable(result, `Filtrando por ${type}: ${value}`);
      closeModal(filterModal);
  });

  const handleRemoveDuplicates = () => {
      const originalCount = Farmacia.countFarmacos(currentFarmacos);
      const farmacosSemDuplicatas = Farmacia.removeDuplicatesKeepLast(currentFarmacos);
      const finalCount = Farmacia.countFarmacos(farmacosSemDuplicatas);
      const removedCount = originalCount - finalCount;
      updateState(farmacosSemDuplicatas);

      const container = document.createElement('div');
      container.className = 'duplicates-result';
      container.innerHTML = `
          <div class="stat-item original"><span>${originalCount}</span><p>Itens Originais</p></div>
          <div class="stat-item removed"><span>${removedCount}</span><p>Duplicatas Removidas</p></div>
          <div class="stat-item final"><span>${finalCount}</span><p>Itens Finais</p></div>
      `;
      openResultModal('Remover Duplicatas', container);
  };

  chunkForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const n = parseInt(document.getElementById('chunk-size').value);
      if (n > 0) {
          const paginas = Farmacia.chunkFarmacos(currentFarmacos, n);
          const container = document.createElement('div');
          container.className = 'chunk-result';
          paginas.forEach((pagina, index) => {
              const pageDiv = document.createElement('div');
              pageDiv.className = 'page';
              pageDiv.innerHTML = `<div class="page-header">Página ${index + 1} (${pagina.length} itens)</div>`;
              const contentDiv = document.createElement('div');
              contentDiv.className = 'page-content';
              pagina.forEach(farmaco => {
                  const item = document.createElement('p');
                  item.textContent = `- ${farmaco.nome}`;
                  contentDiv.appendChild(item);
              });
              pageDiv.appendChild(contentDiv);
              container.appendChild(pageDiv);
          });
          openResultModal(`Fármacos Agrupados em ${paginas.length} Páginas`, container);
          closeModal(chunkModal);
      }
  });

  const handleCheapestByMarca = () => {
      const resultado = Farmacia.findCheapestByMarca(currentFarmacos);
      const container = document.createElement('div');
      Object.values(resultado).forEach(farmaco => {
          const card = document.createElement('div');
          card.className = 'result-card';
          card.innerHTML = `
              <img src="${farmaco.imagemUrl}" alt="${farmaco.nome}" onerror="this.src='https://placehold.co/60x60/e1e1e1/909090?text=Sem+Img';">
              <div class="result-card-info">
                  <h5>${farmaco.marca}</h5>
                  <p>${farmaco.nome}</p>
                  <p class="price">${farmaco.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
          `;
          container.appendChild(card);
      });
      openResultModal('Fármaco Mais Barato por Marca', container);
  };

  // ========================
  // Inicialização
  // ========================
  const main = () => {
    // Aplica o tema salvo antes de qualquer outra coisa
    const savedTheme = localStorage.getItem('pharma_theme') || 'light';
    applyTheme(savedTheme);

    const farmacosSalvos = Farmacia.loadFarmacos();
    currentFarmacos = (Farmacia.countFarmacos(farmacosSalvos) === 0)
      ? Farmacia.resetFarmacos()
      : farmacosSalvos;
    updateState(currentFarmacos);

    // Conexão dos botões
    themeToggle.addEventListener('click', handleThemeToggle);
    document.getElementById('btn-list-all').addEventListener('click', handleListAll);
    document.getElementById('btn-reset').addEventListener('click', handleReset);
    document.getElementById('btn-add').addEventListener('click', handleAdd);
    document.getElementById('btn-open-filter-modal').addEventListener('click', () => {
        populateFilterValues();
        openModal(filterModal);
    });
    document.getElementById('filter-type').addEventListener('change', populateFilterValues);
    searchInput.addEventListener('input', handleSearch);
    farmacoForm.addEventListener('submit', handleFormSubmit);
    
    // Funções Avançadas
    document.getElementById('btn-remove-duplicates').addEventListener('click', handleRemoveDuplicates);
    document.getElementById('btn-chunk').addEventListener('click', () => openModal(chunkModal));
    document.getElementById('btn-cheapest-by-marca').addEventListener('click', handleCheapestByMarca);

    // Fechar modais
    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.currentTarget.closest('.modal-overlay').style.display = 'none';
        });
    });
  };

  main();
});

