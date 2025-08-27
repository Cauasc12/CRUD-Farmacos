document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // Seletores de Elementos
  // ========================
  const body = document.body;
  const tableContainer = document.querySelector('.table-container'); // Adicionado seletor para o container da tabela
  const tableBody = document.getElementById('table-body');
  const searchInput = document.getElementById('search-input');
  const mainTitle = document.getElementById('main-title');
  const themeToggle = document.getElementById('theme-toggle');
  const infoPopover = document.getElementById('info-popover');
  const paginationControls = document.getElementById('pagination-controls');
  
  const formModal = document.getElementById('form-modal');
  const resultModal = document.getElementById('result-modal');
  const filterModal = document.getElementById('filter-modal');
  const chunkModal = document.getElementById('chunk-modal');
  const imageViewerModal = document.getElementById('image-viewer-modal');
  const farmacoForm = document.getElementById('farmaco-form');
  const filterForm = document.getElementById('filter-form');
  const chunkForm = document.getElementById('chunk-form');

  const statTotalItems = document.getElementById('stat-total-items');
  const statTotalValue = document.getElementById('stat-total-value');
  
  // ========================
  // Estado da Aplicação
  // ========================
  let state = {
    allFarmacos: [],
    displayedFarmacos: [],
    sort: { key: 'id', direction: 'asc' },
    pagination: { currentPage: 1, itemsPerPage: 50 },
    activeInfoBtn: null, // NOVO: Guarda a referência do botão do popover ativo
  };

  // ========================
  // Lógica de Tema
  // ========================
  const applyTheme = (theme) => {
      body.classList.toggle('dark-mode', theme === 'dark');
      localStorage.setItem('pharma_theme', theme);
  };
  const handleThemeToggle = () => applyTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');

  // ========================
  // Funções de Renderização
  // ========================
  const renderStats = (farmacos) => {
    statTotalItems.textContent = Farmacia.countFarmacos(farmacos);
    statTotalValue.textContent = Farmacia.calculateEstoqueValue(farmacos).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const renderPagination = () => {
      const { currentPage, itemsPerPage } = state.pagination;
      const totalItems = state.displayedFarmacos.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      paginationControls.innerHTML = '';
      if (totalPages <= 1) return;

      const createButton = (text, page, isDisabled = false, isActive = false) => {
          const btn = document.createElement('button');
          btn.innerHTML = text;
          btn.disabled = isDisabled;
          if (isActive) btn.classList.add('active');
          btn.addEventListener('click', () => {
              state.pagination.currentPage = page;
              render();
          });
          return btn;
      };

      paginationControls.appendChild(createButton('<<', 1, currentPage === 1));
      paginationControls.appendChild(createButton('<', currentPage - 1, currentPage === 1));
      
      const pagesToShow = [];
      if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
      } else {
          pagesToShow.push(1);
          if (currentPage > 3) pagesToShow.push('...');
          if (currentPage > 2) pagesToShow.push(currentPage - 1);
          if (currentPage !== 1 && currentPage !== totalPages) pagesToShow.push(currentPage);
          if (currentPage < totalPages - 1) pagesToShow.push(currentPage + 1);
          if (currentPage < totalPages - 2) pagesToShow.push('...');
          pagesToShow.push(totalPages);
      }
      
      const finalPages = [...new Set(pagesToShow)];

      finalPages.forEach(p => {
          if (p === '...') {
              const span = document.createElement('span');
              span.textContent = '...';
              paginationControls.appendChild(span);
          } else {
              paginationControls.appendChild(createButton(p, p, false, p === currentPage));
          }
      });

      paginationControls.appendChild(createButton('>', currentPage + 1, currentPage === totalPages));
      paginationControls.appendChild(createButton('>>', totalPages, currentPage === totalPages));
  };
  
  const renderTable = () => {
    const { currentPage, itemsPerPage } = state.pagination;
    const sortedFarmacos = Farmacia.sortFarmacos(state.displayedFarmacos, state.sort.key, state.sort.direction);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = sortedFarmacos.slice(startIndex, endIndex);

    tableBody.innerHTML = '';
    if (pageItems.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">Nenhum fármaco encontrado.</td></tr>`;
      return;
    }

    pageItems.forEach(farmaco => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${farmaco.id}</td>
        <td><img class="farmaco-img" src="${farmaco.imagemUrl}" alt="${farmaco.nome}" onerror="this.src='https://placehold.co/50x50/e1e1e1/909090?text=Sem+Img';"></td>
        <td>
            <div class="nome-cell-content">
                <span>${farmaco.nome}</span>
                <button class="info-btn" data-id="${farmaco.id}"><i data-feather="more-horizontal"></i></button>
            </div>
        </td>
        <td>${farmaco.marca}</td>
        <td>${farmaco.dosagem}</td>
        <td>${farmaco.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${farmaco.quantidade}</td>
        <td>
          <button class="action-btn btn-update" data-id="${farmaco.id}"><i data-feather="edit-2"></i></button>
          <button class="action-btn btn-delete" data-id="${farmaco.id}"><i data-feather="trash-2"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
    feather.replace();
  };

  const render = (title = "Estoque de Fármacos") => {
      mainTitle.textContent = title;
      renderTable();
      renderPagination();
      renderStats(state.allFarmacos);
  };

  const updateAllFarmacos = (newFarmacos) => {
      state.allFarmacos = newFarmacos;
      state.displayedFarmacos = newFarmacos;
      state.pagination.currentPage = 1;
      Farmacia.saveFarmacos(state.allFarmacos);
      render();
  };
  
  const openModal = (modalElement) => { modalElement.style.display = 'flex'; };
  const closeModal = (modalElement) => { modalElement.style.display = 'none'; };

  const openFormModal = (mode, farmaco = {}) => {
    farmacoForm.reset();
    farmacoForm.dataset.mode = mode;
    farmacoForm.dataset.id = farmaco.id || '';
    document.getElementById('modal-title').textContent = mode === 'edit' ? 'Editar Fármaco' : 'Adicionar Novo Fármaco';
    
    if (mode === 'edit' && farmaco) {
        document.getElementById('nome').value = farmaco.nome || '';
        document.getElementById('marca').value = farmaco.marca || '';
        document.getElementById('dosagem').value = farmaco.dosagem || '';
        document.getElementById('qtdPorCaixa').value = farmaco.qtdPorCaixa || '';
        document.getElementById('preco').value = farmaco.preco || 0;
        document.getElementById('quantidade').value = farmaco.quantidade || 0;
        document.getElementById('categoria').value = farmaco.categoria || '';
        document.getElementById('imagemUrl').value = farmaco.imagemUrl || '';
    }
    openModal(formModal);
  };
  
  // ========================
  // Handlers
  // ========================
  const handleListAll = () => {
    state.displayedFarmacos = state.allFarmacos;
    state.pagination.currentPage = 1;
    state.pagination.itemsPerPage = 50; 
    render("Estoque de Fármacos");
  };

  const handleAdd = () => openFormModal('add');

  const handleReset = () => {
    if (confirm("Você tem certeza que quer apagar tudo e resetar para o estoque inicial?")) {
      updateAllFarmacos(Farmacia.resetFarmacos());
    }
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
          dosagem: document.getElementById('dosagem').value,
          qtdPorCaixa: document.getElementById('qtdPorCaixa').value,
      };
      if (mode === 'add') {
          farmacoData.id = Farmacia.getNextId(state.allFarmacos);
          updateAllFarmacos(Farmacia.addFarmaco(state.allFarmacos, farmacoData));
      } else if (mode === 'edit') {
          const originalFarmaco = Farmacia.findFarmacoById(state.allFarmacos, id);
          const updatedData = { ...originalFarmaco, ...farmacoData };
          updateAllFarmacos(Farmacia.updateFarmaco(state.allFarmacos, id, updatedData));
      }
      closeModal(formModal);
  };

  const handleSearch = (event) => {
      const searchTerm = event.target.value;
      state.displayedFarmacos = Farmacia.searchFarmacos(state.allFarmacos, searchTerm);
      state.pagination.currentPage = 1;
      render(`Resultados para "${searchTerm}"`);
  };
  
  const populateFilterValues = () => {
      const filterType = document.getElementById('filter-type').value;
      const values = Farmacia.getUniqueValuesByKey(state.allFarmacos, filterType);
      const selectValue = document.getElementById('filter-value');
      selectValue.innerHTML = values.map(v => `<option value="${v}">${v}</option>`).join('');
  };

  filterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const type = document.getElementById('filter-type').value;
      const value = document.getElementById('filter-value').value;
      state.displayedFarmacos = type === 'marca'
          ? state.allFarmacos.filter(f => f.marca === value)
          : state.allFarmacos.filter(f => f.categoria === value);
      state.pagination.currentPage = 1;
      render(`Filtrando por ${type}: ${value}`);
      closeModal(filterModal);
  });

  const handleRemoveDuplicates = () => {
      const originalCount = state.allFarmacos.length;
      const farmacosSemDuplicatas = Farmacia.removeDuplicates(state.allFarmacos);
      const finalCount = farmacosSemDuplicatas.length;
      const removedCount = originalCount - finalCount;
      updateAllFarmacos(farmacosSemDuplicatas);
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
          state.pagination.itemsPerPage = n;
          state.pagination.currentPage = 1;
          render(`Itens Agrupados em Páginas de ${n}`);
          closeModal(chunkModal);
      }
  });

  const handleCheapestFarmaco = () => {
      state.displayedFarmacos = Farmacia.findCheapestOfEachFarmaco(state.allFarmacos);
      state.pagination.currentPage = 1;
      render('Opções Mais Baratas de Cada Fármaco');
  };
  
  const handleSort = (event) => {
      const newKey = event.currentTarget.dataset.sortBy;
      const { key, direction } = state.sort;
      let newDirection = (newKey === key && direction === 'asc') ? 'desc' : 'asc';
      state.sort = { key: newKey, direction: newDirection };
      document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('asc', 'desc'));
      event.currentTarget.classList.add(newDirection);
      render();
  };

  // ========================
  // NOVA LÓGICA DE SCROLL PARA O POPOVER
  // ========================
  const handleTableScroll = () => {
      if (!state.activeInfoBtn || !infoPopover.classList.contains('visible')) {
          return;
      }

      const containerRect = tableContainer.getBoundingClientRect();
      const buttonRect = state.activeInfoBtn.getBoundingClientRect();

      // Verifica se o botão saiu da área visível do container
      if (buttonRect.top < containerRect.top || buttonRect.bottom > containerRect.bottom) {
          infoPopover.classList.remove('visible');
          state.activeInfoBtn = null;
      } else {
          // Mantém o popover fixo ao botão durante a rolagem
          infoPopover.style.left = `${buttonRect.left}px`;
          infoPopover.style.top = `${buttonRect.bottom + 5}px`;
      }
  };

  // ========================
  // Inicialização e Event Listeners Globais
  // ========================
  const main = () => {
    const savedTheme = localStorage.getItem('pharma_theme') || 'light';
    applyTheme(savedTheme);

    const farmacosSalvos = Farmacia.loadFarmacos();
    state.allFarmacos = farmacosSalvos.length > 0 ? farmacosSalvos : Farmacia.resetFarmacos();
    state.displayedFarmacos = state.allFarmacos;
    
    render();

    // Listeners Estáticos
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
    document.getElementById('btn-remove-duplicates').addEventListener('click', handleRemoveDuplicates);
    document.getElementById('btn-chunk').addEventListener('click', () => openModal(chunkModal));
    document.getElementById('btn-cheapest-farmaco').addEventListener('click', handleCheapestFarmaco);
    document.querySelectorAll('.sort-btn').forEach(btn => btn.addEventListener('click', handleSort));

    // Listener de scroll para o popover
    tableContainer.addEventListener('scroll', handleTableScroll);

    // Listener Global para fechar modais e popover
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.info-btn')) {
            infoPopover.classList.remove('visible');
            state.activeInfoBtn = null;
        }
        const modal = e.target.closest('.modal-overlay');
        if (modal && (e.target.dataset.action === 'close-modal' || e.target === modal)) {
            closeModal(modal);
        }
    });

    // Listener Centralizado para Ações na Tabela
    tableBody.addEventListener('click', (e) => {
        const infoBtn = e.target.closest('.info-btn');
        const img = e.target.closest('.farmaco-img');
        const deleteBtn = e.target.closest('.btn-delete');
        const updateBtn = e.target.closest('.btn-update');

        if (infoBtn) {
            const id = Number(infoBtn.dataset.id);
            if (infoPopover.classList.contains('visible') && infoPopover.dataset.id == id) {
                infoPopover.classList.remove('visible');
                state.activeInfoBtn = null;
                return;
            }
            const farmaco = Farmacia.findFarmacoById(state.allFarmacos, id);
            if (farmaco) {
                infoPopover.textContent = farmaco.qtdPorCaixa;
                infoPopover.dataset.id = id;
                const rect = infoBtn.getBoundingClientRect();
                infoPopover.style.left = `${rect.left}px`;
                infoPopover.style.top = `${rect.bottom + 5}px`;
                infoPopover.classList.add('visible');
                state.activeInfoBtn = infoBtn; // Guarda a referência do botão
            }
        } else if (img) {
            document.getElementById('image-viewer-content').src = img.src;
            openModal(imageViewerModal);
        } else if (deleteBtn) {
            const id = Number(deleteBtn.dataset.id);
            if (confirm(`Tem certeza que quer excluir o fármaco com ID ${id}?`)) {
                updateAllFarmacos(Farmacia.deleteFarmaco(state.allFarmacos, id));
            }
        } else if (updateBtn) {
            const id = Number(updateBtn.dataset.id);
            const farmacoToEdit = Farmacia.findFarmacoById(state.allFarmacos, id);
            if (farmacoToEdit) openFormModal('edit', farmacoToEdit);
        }
    });
  };

  main();
});
