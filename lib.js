// Chave usada no localStorage para salvar os livros
const STORAGE_KEY = "farmacia::farmacos"

// ========================
// Persistência (salvar, carregar, limpar os dados)
// ========================

// Carrega a lista de farmacos do localStorage
// Se não existir nada salvo, retorna um array vazio
const loadFarmacos = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
// Salva a lista de farmacos no localStorage (convertendo para texto JSON)
const saveFarmacos = farmacos =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(farmacos))

// Remove todos os farmacos do localStorage
const clearFarmacos = () => {
  localStorage.removeItem(STORAGE_KEY)
  console.log("Farmácia Limpa.")
}

// Restaura uma lista inicial de livros (pré-cadastrados)
const resetFarmacos = () => {
    const farmacos = [
        { id: 1, nome: "Dorflex 10 Comprimidos", preco: 7.50, marca: "Sanofi", categoria: "Analgésico e Relaxante Muscular", principioAtivo: "Dipirona, Orfenadrina, Cafeína", dosagem: "300mg + 35mg + 50mg" },
        { id: 2, nome: "Neosaldina 4 Drágeas", preco: 5.00, marca: "Takeda", categoria: "Analgésico", principioAtivo: "Dipirona, Mucato de Isometepteno, Cafeína", dosagem: "300mg + 30mg + 30mg" },
        { id: 3, nome: "Tylenol 750mg 20 Comprimidos", preco: 18.90, marca: "Johnson & Johnson", categoria: "Analgésico e Antitérmico", principioAtivo: "Paracetamol", dosagem: "750mg" },
        { id: 4, nome: "Aspirina Prevent 30 Comprimidos", preco: 25.00, marca: "Bayer", categoria: "Antiagregante Plaquetário", principioAtivo: "Ácido Acetilsalicílico", dosagem: "100mg" },
        { id: 5, nome: "Buscopan Composto 20 Comprimidos", preco: 15.75, marca: "Boehringer Ingelheim", categoria: "Antiespasmódico e Analgésico", principioAtivo: "Butilbrometo de Escopolamina, Dipirona", dosagem: "10mg + 250mg" },
        { id: 6, nome: "Advil 400mg 8 Cápsulas", preco: 12.50, marca: "Pfizer", categoria: "Anti-inflamatório", principioAtivo: "Ibuprofeno", dosagem: "400mg" },
        { id: 7, nome: "Loratamed 10mg 12 Comprimidos", preco: 9.90, marca: "Cimed", categoria: "Antialérgico", principioAtivo: "Loratadina", dosagem: "10mg" },
        { id: 8, nome: "Dramin B6 10 Comprimidos", preco: 8.00, marca: "Takeda", categoria: "Antiemético", principioAtivo: "Dimenidrinato, Cloridrato de Piridoxina", dosagem: "50mg + 10mg" },
        { id: 9, nome: "Estomazil 5g 10 Envelopes", preco: 11.20, marca: "Cosmed", categoria: "Antiácido", principioAtivo: "Bicarbonato de Sódio, Carbonato de Sódio, Ácido Cítrico", dosagem: "Variável" },
        { id: 10, nome: "Vick Pyrena Sabor Mel e Limão 5 Envelopes", preco: 14.50, marca: "P&G", categoria: "Antigripal", principioAtivo: "Paracetamol", dosagem: "500mg" },
        { id: 11, nome: "Resfenol 20 Cápsulas", preco: 10.50, marca: "Kley Hertz", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "400mg + 4mg + 4mg" },
        { id: 12, nome: "Benegrip 12 Comprimidos", preco: 9.80, marca: "Hypera Pharma", categoria: "Antigripal", principioAtivo: "Dipirona, Maleato de Clorfeniramina, Cafeína", dosagem: "500mg + 2mg + 30mg" },
        { id: 13, nome: "Salonpas Adesivo 4 unidades", preco: 8.70, marca: "Hisamitsu", categoria: "Analgésico Tópico", principioAtivo: "Salicilato de Metila, Levomentol, Cânfora", dosagem: "Variável" },
        { id: 14, nome: "Cimegripe 20 Cápsulas", preco: 7.99, marca: "Cimed", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "400mg + 4mg + 4mg" },
        { id: 15, nome: "Maracugina PI 20 Comprimidos", preco: 19.90, marca: "Hypera Pharma", categoria: "Calmante Natural", principioAtivo: "Passiflora incarnata L.", dosagem: "260mg" },
        { id: 16, nome: "Melatonina 0,21mg 30 Comprimidos", preco: 22.00, marca: "Biolab", categoria: "Suplemento para Sono", principioAtivo: "Melatonina", dosagem: "0.21mg" },
        { id: 17, nome: "Imosec 12 Comprimidos", preco: 16.50, marca: "Johnson & Johnson", categoria: "Antidiarreico", principioAtivo: "Cloridrato de Loperamida", dosagem: "2mg" },
        { id: 18, nome: "Luftal Gotas 15ml", preco: 13.40, marca: "Reckitt", categoria: "Antiflatulento", principioAtivo: "Simeticona", dosagem: "75mg/mL" },
        { id: 19, nome: "Eno Sal de Fruta 2 Envelopes", preco: 3.50, marca: "GSK", categoria: "Antiácido", principioAtivo: "Bicarbonato de Sódio, Carbonato de Sódio, Ácido Cítrico", dosagem: "Variável" },
        { id: 20, nome: "Torsilax 12 Comprimidos", preco: 9.00, marca: "Neo Química", categoria: "Relaxante Muscular e Anti-inflamatório", principioAtivo: "Diclofenaco Sódico, Carisoprodol, Paracetamol, Cafeína", dosagem: "50mg + 125mg + 300mg + 30mg" },
        { id: 21, nome: "Histamin 2mg/5ml Xarope 100ml", preco: 10.20, marca: "Neo Química", categoria: "Antialérgico", principioAtivo: "Maleato de Dexclorfeniramina", dosagem: "2mg/5mL" },
        { id: 22, nome: "Decongex Plus Xarope 120ml", preco: 21.00, marca: "Aché", categoria: "Descongestionante", principioAtivo: "Maleato de Bronfeniramina, Cloridrato de Fenilefrina", dosagem: "2mg/5mL + 5mg/5mL" },
        { id: 23, nome: "Bálsamo Bengué Aerossol 60g", preco: 25.50, marca: "EMS", categoria: "Analgésico Tópico", principioAtivo: "Mentol, Salicilato de Metila, Cânfora", dosagem: "Variável" },
        { id: 24, nome: "Gelo-Bio Aerossol 120ml", preco: 18.00, marca: "União Química", categoria: "Analgésico Tópico", principioAtivo: "Mentol, Cânfora, Salicilato de Metila", dosagem: "Variável" },
        { id: 25, nome: "Lactuliv 120ml", preco: 28.00, marca: "Legrand", categoria: "Laxante", principioAtivo: "Lactulose", dosagem: "667mg/mL" },
        { id: 26, nome: "Naturetti 30 Geleias", preco: 35.00, marca: "Sanofi", categoria: "Laxante Natural", principioAtivo: "Senna alexandrina", dosagem: "Variável" },
        { id: 27, nome: "Vitamina C 1g 10 Comprimidos Efervescentes", preco: 11.80, marca: "Cimed", categoria: "Vitamina", principioAtivo: "Ácido Ascórbico", dosagem: "1g" },
        { id: 28, nome: "Complexo B 30 Comprimidos", preco: 15.00, marca: "Neo Química", categoria: "Vitamina", principioAtivo: "Vitaminas do Complexo B", dosagem: "Variável" },
        { id: 29, nome: "Strepsils Pastilhas Sabor Mel e Limão 8 unidades", preco: 10.50, marca: "Reckitt", categoria: "Antisséptico Bucal", principioAtivo: "Flurbiprofeno", dosagem: "8.75mg" },
        { id: 30, nome: "Flogoral Sabor Menta 12 Pastilhas", preco: 13.90, marca: "Aché", categoria: "Antisséptico e Anti-inflamatório Bucal", principioAtivo: "Cloridrato de Benzidamina", dosagem: "3mg" },
        { id: 31, nome: "Epocler 6 Flaconetes", preco: 12.00, marca: "Hypera Pharma", categoria: "Protetor Hepático", principioAtivo: "Citrato de Colina, Betaína, Metionina", dosagem: "Variável" },
        { id: 32, nome: "Engov 6 Comprimidos", preco: 8.50, marca: "Hypera Pharma", categoria: "Analgésico e Antihistamínico", principioAtivo: "Maleato de Mepiramina, Hidróxido de Alumínio, Ácido Acetilsalicílico, Cafeína", dosagem: "15mg + 150mg + 150mg + 50mg" },
        { id: 33, nome: "Cataflampro Aerossol 60g", preco: 32.00, marca: "GSK", categoria: "Anti-inflamatório Tópico", principioAtivo: "Diclofenaco Dietilamônio", dosagem: "11.6mg/g" },
        { id: 34, nome: "Neolefrin Xarope 120ml", preco: 14.50, marca: "Neo Química", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "40mg/mL + 0.6mg/mL + 0.6mg/mL" },
        { id: 35, nome: "Alivium 600mg 10 Cápsulas", preco: 19.80, marca: "Cosmed", categoria: "Anti-inflamatório", principioAtivo: "Ibuprofeno", dosagem: "600mg" },
        { id: 36, nome: "Sonrisal 2 Envelopes", preco: 3.80, marca: "GSK", categoria: "Antiácido e Analgésico", principioAtivo: "Ácido Acetilsalicílico, Bicarbonato de Sódio, Ácido Cítrico", dosagem: "Variável" },
        { id: 37, nome: "Atroveran Dip 1g 10 Comprimidos", preco: 11.00, marca: "Hypera Pharma", categoria: "Analgésico", principioAtivo: "Dipirona Monoidratada", dosagem: "1g" },
        { id: 38, nome: "Maxalgina 1g 10 Comprimidos", preco: 8.90, marca: "Natulab", categoria: "Analgésico e Antitérmico", principioAtivo: "Dipirona Monoidratada", dosagem: "1g" },
        { id: 39, nome: "Ginkomed 80mg 30 Comprimidos", preco: 45.00, marca: "Cimed", categoria: "Vasodilatador", principioAtivo: "Ginkgo Biloba", dosagem: "80mg" },
        { id: 40, nome: "Caladryl Pós-Sol Aerossol 150ml", preco: 38.00, marca: "Johnson & Johnson", categoria: "Pós-Sol", principioAtivo: "Calamina, Cânfora", dosagem: "Variável" },
        { id: 41, nome: "Nebacetin Pomada 15g", preco: 17.50, marca: "Takeda", categoria: "Antibiótico Tópico", principioAtivo: "Sulfato de Neomicina, Bacitracina Zíncica", dosagem: "5mg/g + 250UI/g" },
        { id: 42, nome: "Minancora Pomada 30g", preco: 12.90, marca: "Minancora", categoria: "Antisséptico", principioAtivo: "Óxido de Zinco, Cânfora, Cloreto de Benzalcônio", dosagem: "Variável" },
        { id: 43, nome: "Nimesulida 100mg 12 Comprimidos", preco: 10.00, marca: "EMS", categoria: "Anti-inflamatório", principioAtivo: "Nimesulida", dosagem: "100mg" },
        { id: 44, nome: "Tamarine 12 Cápsulas", preco: 25.00, marca: "Hypera Pharma", categoria: "Laxante Fitoterápico", principioAtivo: "Senna alexandrina, Cassia fistula", dosagem: "Variável" },
        { id: 45, nome: "Floratil 200mg 6 Cápsulas", preco: 30.00, marca: "Merck", categoria: "Probiótico", principioAtivo: "Saccharomyces boulardii", dosagem: "200mg" },
        { id: 46, nome: "Expec Xarope 120ml", preco: 15.50, marca: "Legrand", categoria: "Expectorante", principioAtivo: "Cloridrato de Oxomemazina, Iodeto de Potássio, Benzoato de Sódio, Guaifenesina", dosagem: "Variável" },
        { id: 47, nome: "Biotônico Fontoura 400ml", preco: 20.00, marca: "Hypera Pharma", categoria: "Suplemento de Ferro", principioAtivo: "Sulfato Ferroso Heptaidratado", dosagem: "Variável" },
        { id: 48, nome: "Merthiolate 30ml", preco: 9.50, marca: "Cosmed", categoria: "Antisséptico", principioAtivo: "Digliconato de Clorexidina", dosagem: "10mg/mL" },
        { id: 49, nome: "Água Oxigenada 10 volumes 100ml", preco: 3.00, marca: "Farmax", categoria: "Antisséptico", principioAtivo: "Peróxido de Hidrogênio", dosagem: "3%" },
        { id: 50, nome: "Maleato de Dexclorfeniramina Genérico Xarope 120ml", preco: 7.00, marca: "Medley", categoria: "Antialérgico", principioAtivo: "Maleato de Dexclorfeniramina", dosagem: "2mg/5mL" }
    ];
    saveFarmacos(farmacos);
    console.log("Fármacos iniciais salvos.");
    return farmacos;
  };

// ========================
//  CRUD funcional
// ========================

// Adiciona um novo farmmaco (retorna um novo array)
const addFarmaco = (farmacos, newFarmaco) => [...farmacos, newFarmaco];

// Atualiza um farmaco existente (caso encontre o id)
  const updateFarmaco = (farmacos, id, updates) =>
    farmacos.map(farmaco => (farmaco.id === id ? { ...farmaco, ...updates } : farmaco));

// Remove um farmaco pelo id
const deleteFarmaco = (farmacos, id) =>
  farmacos.filter(farmaco => farmaco.id !== id);

//Encontra o fármaco mais barato de cada marca.
const findCheapestByMarca = (farmacos) => {
  return farmacos.reduce((mapa, farmaco) => {
    const campeaoAtual = mapa[farmaco.marca];

    // Se é o primeiro da marca ou se é mais barato, vira o novo campeão.
    if (!campeaoAtual || farmaco.preco < campeaoAtual.preco) {
      mapa[farmaco.marca] = farmaco;
    }

    return mapa;
  }, {}); 
};


  // ========================
  // Listagem e formatação
  // ========================

// Lista os livros em formato de texto simples
const listFarmacos = farmacos =>
  farmacos.map(farmaco =>
      `${farmaco.id} - "${farmaco.nome}" (${farmaco.marca}, R$ ${farmaco.preco.toFixed(2)})`
  ).join('\n');
// Lista apenas os livros de um autor específico
const listFarmacosByMarca = (farmacos, marcaName) =>
  farmacos.filter(farmaco => farmaco.marca === marcaName);
  
//Filtra os farmacos por categoria
const listFarmacosByCategoria = (farmacos, categoriaName) =>
  farmacos.filter(farmaco => farmaco.categoria === categoriaName);

//Lista os farmacos por marca
const countFarmacosByMarca = (farmacos) =>
  farmacos.reduce((acc, farmaco) => {
    acc[farmaco.marca] = (acc[farmaco.marca] || 0) + 1;
    return acc;
  }, {});
// Permite formatar a lista de livros de forma flexível
// Recebe uma função "formatFn" que define como cada livro deve aparecer
const formatFarmacos = (farmacos, formatFn) =>
  farmacos.map((farmacos, index) => formatFn(farmacos, index)).join('\n')

//Formato completo
const fullFormatFarmaco = farmaco =>
  `ID: ${farmaco.id}\nNome: ${farmaco.nome}\nMarca: ${farmaco.marca}\nPreço: R$ ${farmaco.preco.toFixed(2)}\nCategoria: ${farmaco.categoria}\nPrincípio Ativo: ${farmaco.principioAtivo}\nDosagem: ${farmaco.dosagem}`;

  // ========================
  // Funções Recursivas
  // ========================

//Acha o farmaco por id
const findFarmacoById = ([primeiroFarmaco, ...restoDaLista], id) => {
  if (primeiroFarmaco === undefined) return null;
  return (primeiroFarmaco.id === id) ? primeiroFarmaco : findFarmacoById(restoDaLista, id);
  };
//Contar quantos fármacos existem na lista
const countFarmacos = ([primeiroFarmaco, ...restoDaLista]) => {
  if (primeiroFarmaco === undefined) return 0;
  return 1 + countFarmacos(restoDaLista);
  };

//Verifica se uma marca específica está presente na lista de marcas
const containsMarca = ([primeiraMarca, ...restoDasMarcas], marcaName) => {
  if (primeiraMarca === undefined) return false;
  return (primeiraMarca === marcaName) ? true : containsMarca(restoDasMarcas, marcaName);
  };

//Retornar uma lista de marcas únicas presentes nos fármacos
const getUniqueMarcas = ([primeiroFarmaco, ...restoDaLista]) => {
  if (primeiroFarmaco === undefined) return [];
  const marcasUnicasDoResto = getUniqueMarcas(restoDaLista);
  const marcaAtual = primeiroFarmaco.marca;
  if (containsMarca(marcasUnicasDoResto, marcaAtual)) {
    return marcasUnicasDoResto;
  } else {
    return [marcaAtual, ...marcasUnicasDoResto];
  }
};
//Verificar se existe algum fármaco com o id fornecido
const containsId = ([primeiroFarmaco, ...restoDosFarmacos], id) =>
  primeiroFarmaco === undefined ? false
  : (primeiroFarmaco.id === id ? true : containsId(restoDosFarmacos, id));

//Remover fármacos com id duplicado, mantendo o último que aparece.
const removeDuplicatesKeepLast = ([primeiroFarmaco, ...restoDaLista]) => {
  if (primeiroFarmaco === undefined) return [];
  const caudaProcessada = removeDuplicatesKeepLast(restoDaLista);
  const jaExisteDepois = containsId(caudaProcessada, primeiroFarmaco.id);
  return jaExisteDepois ? caudaProcessada : [primeiroFarmaco, ...caudaProcessada];
};

//Quebrar a lista em páginas de n fármacos cada.
const chunkFarmacos = (farmacos, n) => {
  const [primeiroFarmaco] = farmacos;
  if (primeiroFarmaco === undefined) return [];
  const primeiraPagina = farmacos.slice(0, n);
  const restoDosFarmacos = farmacos.slice(n);
  return [primeiraPagina, ...chunkFarmacos(restoDosFarmacos, n)];
};    

//Coletar fármacos do início da lista enquanto a marca for a mesma - Para quando encontra uma marca diferente.
const takeWhileMarca = ([primeiroFarmaco, ...restoDaLista], marcaName) => {
  if (primeiroFarmaco === undefined || primeiroFarmaco.marca !== marcaName) return [];
  return [primeiroFarmaco, ...takeWhileMarca(restoDaLista, marcaName)];
};

//Ignorar os primeiros fármacos que têm a marca informada - Retorna o restante da lista a partir do primeiro com marca diferente
const dropWhileMarca = (farmacos, marcaName) => {
  const [primeiroFarmaco, ...restoDaLista] = farmacos;
  if (primeiroFarmaco === undefined || primeiroFarmaco.marca !== marcaName) return farmacos;
  return dropWhileMarca(restoDaLista, marcaName);
};

//Agrupar fármacos consecutivos pela mesma marca
const groupConsecutiveByMarca = (farmacos) => {
  const [primeiroFarmaco] = farmacos;
  if (primeiroFarmaco === undefined) return [];
  const marcaDoGrupo = primeiroFarmaco.marca;
  const primeiroGrupo = takeWhileMarca(farmacos, marcaDoGrupo);
  const restoDosFarmacos = dropWhileMarca(farmacos, marcaDoGrupo);
  return [primeiroGrupo, ...groupConsecutiveByMarca(restoDosFarmacos)];
};