const Farmacia = (() => {
  const STORAGE_KEY = "farmacia::farmacos";

  // ========================
  // Persistência
  // ========================
  const loadFarmacos = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveFarmacos = (farmacos) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(farmacos));

  const clearFarmacos = () => localStorage.removeItem(STORAGE_KEY);
    
  const resetFarmacos = () => {
    const farmacos = [
      { id: 1, nome: "Dorflex 10 Comprimidos", preco: 7.50, marca: "Sanofi", categoria: "Analgésico e Relaxante Muscular", principioAtivo: "Dipirona, Orfenadrina, Cafeína", dosagem: "300mg + 35mg + 50mg", quantidade: 85, imagemUrl: "https://sinete.com.br/media/mf_webp/png/media/catalog/product/cache/5b40fce2765566b85b6a8905e9b49538/d/o/dorflex_analg_sico_e_relaxante_muscular_10_comprimidos.webp" },
      { id: 2, nome: "Neosaldina 4 Drágeas", preco: 5.00, marca: "Takeda", categoria: "Analgésico", principioAtivo: "Dipirona, Mucato de Isometepteno, Cafeína", dosagem: "300mg + 30mg + 30mg", quantidade: 120, imagemUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRyADC2uEeMfH0G3SN0-Rsk_LuubD6WV4IVavi0zD6SvSXO2ITRLiwK969xdxhrOh3hVdjR5bsfLHIXNw4Vr5ZpnCJvcEW5SfSzB17DTUDD2Ku9PHNgmr7bmQ" },
      { id: 3, nome: "Tylenol 750mg 20 Comprimidos", preco: 18.90, marca: "Johnson & Johnson", categoria: "Analgésico e Antitérmico", principioAtivo: "Paracetamol", dosagem: "750mg", quantidade: 60, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/tylenol-750mg-com-20-comprimidos-3304345ac5.jpg" },
      { id: 4, nome: "Aspirina Prevent 30 Comprimidos", preco: 25.00, marca: "Bayer", categoria: "Antiagregante Plaquetário", principioAtivo: "Ácido Acetilsalicílico", dosagem: "100mg", quantidade: 45, imagemUrl: "https://sinete.com.br/pub/media/catalog/product/1/5/155548-800-auto.png" },
      { id: 5, nome: "Buscopan Composto 20 Comprimidos", preco: 15.75, marca: "Boehringer Ingelheim", categoria: "Antiespasmódico e Analgésico", principioAtivo: "Butilbrometo de Escopolamina, Dipirona", dosagem: "10mg + 250mg", quantidade: 70, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/buscopan-composto-10250mg-com-20-comprimidos-9dc1a272b4.jpg"},
      { id: 6, nome: "Advil 400mg 8 Cápsulas", preco: 12.50, marca: "Pfizer", categoria: "Anti-inflamatório", principioAtivo: "Ibuprofeno", dosagem: "400mg", quantidade: 95, imagemUrl: "https://io.convertiez.com.br/m/farmaciasheroos/shop/products/images/66184/large/advil-400mg-8caps_60447.jpg" },
      { id: 7, nome: "Loratamed 10mg 12 Comprimidos", preco: 9.90, marca: "Cimed", categoria: "Antialérgico", principioAtivo: "Loratadina", dosagem: "10mg", quantidade: 110, imagemUrl: "https://du3hj28fogfli.cloudfront.net/Custom/Content/Products/45/96/45968_loratamed-comprimido-10mg-caixa-com-12-comprimidos-p7896523202822_m1_637794011985486369.webp" },
      { id: 8, nome: "Dramin B6 10 Comprimidos", preco: 8.00, marca: "Takeda", categoria: "Antiemético", principioAtivo: "Dimenidrinato, Cloridrato de Piridoxina", dosagem: "50mg + 10mg", quantidade: 55, imagemUrl: "https://ortopedistaemsaopaulo.com.br/wp-content/uploads/2022/12/dramin-b6.jpg" },
      { id: 9, nome: "Estomazil 5g 10 Envelopes", preco: 11.20, marca: "Cosmed", categoria: "Antiácido", principioAtivo: "Bicarbonato de Sódio, Carbonato de Sódio, Ácido Cítrico", dosagem: "Variável", quantidade: 150, imagemUrl: "https://www.drogaraia.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F3810831.webp&w=3840&q=40" },
      { id: 10, nome: "Vick Pyrena Sabor Mel e Limão 5 Envelopes", preco: 14.50, marca: "P&G", categoria: "Antigripal", principioAtivo: "Paracetamol", dosagem: "500mg", quantidade: 130, imagemUrl: "https://www.drogaraia.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F7108561.webp&w=3840&q=40" },
      { id: 11, nome: "Resfenol 20 Cápsulas", preco: 10.50, marca: "Kley Hertz", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "400mg + 4mg + 4mg", quantidade: 88, imagemUrl: "https://io.convertiez.com.br/m/drogariaveracruz/shop/products/images/16060/medium/resfenol-20-capsulas_28262.png" },
      { id: 12, nome: "Benegrip 12 Comprimidos", preco: 9.80, marca: "Hypera Pharma", categoria: "Antigripal", principioAtivo: "Dipirona, Maleato de Clorfeniramina, Cafeína", dosagem: "500mg + 2mg + 30mg", quantidade: 92, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/benegrip-com-12-comprimidos-ae4f17b99b.jpg" },
      { id: 13, nome: "Salonpas Adesivo 4 unidades", preco: 8.70, marca: "Hisamitsu", categoria: "Analgésico Tópico", principioAtivo: "Salicilato de Metila, Levomentol, Cânfora", dosagem: "Variável", quantidade: 140, imagemUrl: "https://d2q99nmsismp7k.cloudfront.net/Custom/Content/Products/60/29/60297_salonpas-pq-c-4un-p54247_m1_637813974943390357.webp" },
      { id: 14, nome: "Cimegripe 20 Cápsulas", preco: 7.99, marca: "Cimed", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "400mg + 4mg + 4mg", quantidade: 25, imagemUrl: "https://du3hj28fogfli.cloudfront.net/Custom/Content/Products/45/25/45254_cimegripe-400mg-4mg-4mg-caixa-com-20-capsulas-gelatinosas-duras-p7896523200576_m1_637904718124994390.webp" },
      { id: 15, nome: "Maracugina PI 20 Comprimidos", preco: 19.90, marca: "Hypera Pharma", categoria: "Calmante Natural", principioAtivo: "Passiflora incarnata L.", dosagem: "260mg", quantidade: 65, imagemUrl: "https://hyperapharma.vteximg.com.br/arquivos/ids/162008-1000-1000/7896094918894-20220719-032204--1-.jpg?v=637938606615200000" },
      { id: 16, nome: "Melatonina 0,21mg 30 Comprimidos", preco: 22.00, marca: "Biolab", categoria: "Suplemento para Sono", principioAtivo: "Melatonina", dosagem: "0.21mg", quantidade: 40, imagemUrl: "https://cdn1.staticpanvel.com.br/produtos/15/94892-15.jpg?ims=424x" },
      { id: 17, nome: "Imosec 12 Comprimidos", preco: 16.50, marca: "Johnson & Johnson", categoria: "Antidiarreico", principioAtivo: "Cloridrato de Loperamida", dosagem: "2mg", quantidade: 35, imagemUrl: "https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/91/80/91807_imosec-2mg-c-12-p62345_m1_638287296147723294.webp" },
      { id: 18, nome: "Luftal Gotas 15ml", preco: 13.40, marca: "Reckitt", categoria: "Antiflatulento", principioAtivo: "Simeticona", dosagem: "75mg/mL", quantidade: 78, imagemUrl: "https://images.tcdn.com.br/img/img_prod/1170916/luftal_75mg_ml_gotas_15ml_18878_1_28379f47fcdd5a8d456a40cca19eda24.jpg" },
      { id: 19, nome: "Eno Sal de Fruta 2 Envelopes", preco: 3.50, marca: "GSK", categoria: "Antiácido", principioAtivo: "Bicarbonato de Sódio, Carbonato de Sódio, Ácido Cítrico", dosagem: "Variável", quantidade: 200, imagemUrl: "https://du3hj28fogfli.cloudfront.net/Custom/Content/Products/48/41/48415_sal-de-frutas-eno-2-envelopes-com-5g-de-po-efervescente-de-uso-oral-tradicional-p7896015560027_m2_637764748082683895.webp" },
      { id: 20, nome: "Torsilax 12 Comprimidos", preco: 9.00, marca: "Neo Química", categoria: "Relaxante Muscular e Anti-inflamatório", principioAtivo: "Diclofenaco Sódico, Carisoprodol, Paracetamol, Cafeína", dosagem: "50mg + 125mg + 300mg + 30mg", quantidade: 105, imagemUrl: "https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/15/72/157208_torsilax-c-12-cp-p63196_m1_638318523450346960.webp" },
      { id: 21, nome: "Histamin 2mg/5ml Xarope 100ml", preco: 10.20, marca: "Neo Química", categoria: "Antialérgico", principioAtivo: "Maleato de Dexclorfeniramina", dosagem: "2mg/5mL", quantidade: 58, imagemUrl: "https://drogariaspacheco.vteximg.com.br/arquivos/ids/1375530-1000-1000/156051-Histamin-2mg-5ml-Neo-Quimica-100ml.jpg.jpg?v=638729871860170000" },
      { id: 22, nome: "Decongex Plus Xarope 120ml", preco: 21.00, marca: "Aché", categoria: "Descongestionante", principioAtivo: "Maleato de Bronfeniramina, Cloridrato de Fenilefrina", dosagem: "2mg/5mL + 5mg/5mL", quantidade: 42, imagemUrl: "https://drogariasp.vteximg.com.br/arquivos/ids/1160013-1000-1000/80691---decongex-plus-ache-xarope-120ml_0001_0.png?v=638629700243500000" },
      { id: 23, nome: "Bálsamo Bengué Aerossol 60g", preco: 25.50, marca: "EMS", categoria: "Analgésico Tópico", principioAtivo: "Mentol, Salicilato de Metila, Cânfora", dosagem: "Variável", quantidade: 33, imagemUrl: "https://www.drogariaminasbrasil.com.br/media/webp/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/509324e5e/balsamo-bengue-aerossol-ems-com-60g-85ml_jpg.webp" },
      { id: 24, nome: "Gelo-Bio Aerossol 120ml", preco: 18.00, marca: "União Química", categoria: "Analgésico Tópico", principioAtivo: "Mentol, Cânfora, Salicilato de Metila", dosagem: "Variável", quantidade: 48, imagemUrl: "https://du3hj28fogfli.cloudfront.net/Custom/Content/Products/45/82/45828_gelo-bio-0-0333ml-ml-0-0333g-ml-0-0083g-ml-frasco-aerossol-com-150ml-de-solucao-de-uso-dermatologico-p7896006291749_l1_637787067711110644.webp" },
      { id: 25, nome: "Lactuliv 120ml", preco: 28.00, marca: "Legrand", categoria: "Laxante", principioAtivo: "Lactulose", dosagem: "667mg/mL", quantidade: 62, imagemUrl: "https://drogariasp.vteximg.com.br/arquivos/ids/586217-1000-1000/223328---lactuliv-salada-de-frutas-legrand-pharma-120ml-xarope.jpg?v=638647831857930000" },
      { id: 26, nome: "Naturetti 30 Geleias", preco: 35.00, marca: "Sanofi", categoria: "Laxante Natural", principioAtivo: "Senna alexandrina", dosagem: "Variável", quantidade: 28, imagemUrl: "https://product-data.raiadrogasil.io/images/6841978.webp" },
      { id: 27, nome: "Vitamina C 1g 10 Comprimidos Efervescentes", preco: 11.80, marca: "Cimed", categoria: "Vitamina", principioAtivo: "Ácido Ascórbico", dosagem: "1g", quantidade: 180, imagemUrl: "https://product-data.raiadrogasil.io/images/3472788.webp" },
      { id: 28, nome: "Complexo B 30 Comprimidos", preco: 15.00, marca: "Neo Química", categoria: "Vitamina", principioAtivo: "Vitaminas do Complexo B", dosagem: "Variável", quantidade: 160, imagemUrl: "https://cdn.ultrafarma.com.br/static/produtos/KA11641/large-638659172557198559-KA11641.png" },
      { id: 29, nome: "Strepsils Pastilhas Sabor Mel e Limão 8 unidades", preco: 10.50, marca: "Reckitt", categoria: "Antisséptico Bucal", principioAtivo: "Flurbiprofeno", dosagem: "8.75mg", quantidade: 99, imagemUrl: "https://www.strepsils.com.br/media/052024/STREPSILS-MeleLimao8pastilhas_H1600.jpg" },
      { id: 30, nome: "Flogoral Sabor Menta 12 Pastilhas", preco: 13.90, marca: "Aché", categoria: "Antisséptico e Anti-inflamatório Bucal", principioAtivo: "Cloridrato de Benzidamina", dosagem: "3mg", quantidade: 82, imagemUrl: "https://drogariasp.vteximg.com.br/arquivos/ids/1159995-1000-1000/31593---flogoral-menta-ache-12-pastilhas_0000_Layer-1.png?v=638629694123730000" },
      { id: 31, nome: "Epocler 6 Flaconetes", preco: 12.00, marca: "Hypera Pharma", categoria: "Protetor Hepático", principioAtivo: "Citrato de Colina, Betaína, Metionina", dosagem: "Variável", quantidade: 115, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/epocler-com-6-flaconetes-de-10ml-68c114c81c.jpg" },
      { id: 32, nome: "Engov 6 Comprimidos", preco: 8.50, marca: "Hypera Pharma", categoria: "Analgésico e Antihistamínico", principioAtivo: "Maleato de Mepiramina, Hidróxido de Alumínio, Ácido Acetilsalicílico, Cafeína", dosagem: "15mg + 150mg + 150mg + 50mg", quantidade: 135, imagemUrl: "https://images.tcdn.com.br/img/img_prod/1170916/engov_6_comprimidos_11929_1_5ec01b9594988725d31366155275840d.jpg" },
      { id: 33, nome: "Cataflampro Aerossol 60g", preco: 32.00, marca: "GSK", categoria: "Anti-inflamatório Tópico", principioAtivo: "Diclofenaco Dietilamônio", dosagem: "11.6mg/g", quantidade: 53, imagemUrl: "https://drogariacoop.vtexassets.com/arquivos/ids/158897/7896261005723.jpg?v=638010889395900000" },
      { id: 34, nome: "Neolefrin Xarope 120ml", preco: 14.50, marca: "Neo Química", categoria: "Antigripal", principioAtivo: "Paracetamol, Maleato de Clorfeniramina, Cloridrato de Fenilefrina", dosagem: "40mg/mL + 0.6mg/mL + 0.6mg/mL", quantidade: 68, imagemUrl: "https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/101751e752/neolefrin-xarope-60ml-neo-quimica.jpg" },
      { id: 35, nome: "Alivium 600mg 10 Cápsulas", preco: 19.80, marca: "Cosmed", categoria: "Anti-inflamatório", principioAtivo: "Ibuprofeno", dosagem: "600mg", quantidade: 72, imagemUrl: "https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/579688e92/alivium-600mg-com-10-capsulas-moles.jpg" },
      { id: 36, nome: "Sonrisal 2 Envelopes", preco: 3.80, marca: "GSK", categoria: "Antiácido e Analgésico", principioAtivo: "Ácido Acetilsalicílico, Bicarbonato de Sódio, Ácido Cítrico", dosagem: "Variável", quantidade: 190, imagemUrl: "https://du3hj28fogfli.cloudfront.net/Custom/Content/Products/48/43/48430_sonrisal-blister-com-2-comprimidos-efervescentes-sabor-tradicional-p7896090611607_m1_637764783474801859.webp" },
      { id: 37, nome: "Atroveran Dip 1g 10 Comprimidos", preco: 11.00, marca: "Hypera Pharma", categoria: "Analgésico", principioAtivo: "Dipirona Monoidratada", dosagem: "1g", quantidade: 81, imagemUrl: "https://hyperapharma.vteximg.com.br/arquivos/ids/156464-1000-1000/image-3604c9718de048eca898f8049b0622a5.jpg?v=637716550379600000" },
      { id: 38, nome: "Maxalgina 1g 10 Comprimidos", preco: 8.90, marca: "Natulab", categoria: "Analgésico e Antitérmico", principioAtivo: "Dipirona Monoidratada", dosagem: "1g", quantidade: 94, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/maxalgina-1g-com-10-comprimidos-b047f4216c.jpg" },
      { id: 39, nome: "Ginkomed 80mg 30 Comprimidos", preco: 45.00, marca: "Cimed", categoria: "Vasodilatador", principioAtivo: "Ginkgo Biloba", dosagem: "80mg", quantidade: 22, imagemUrl: "https://paguemenos.vtexassets.com/arquivos/ids/317392/24211-GINKOMED-80MG-COMP-REV-30-COMP-7896523206479.png?v=637630059946470000" },
      { id: 40, nome: "Caladryl Pós-Sol Aerossol 150ml", preco: 38.00, marca: "Johnson & Johnson", categoria: "Pós-Sol", principioAtivo: "Calamina, Cânfora", dosagem: "Variável", quantidade: 18, imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROa1Tosmql0-rXJQ7co6f20X3Os0S1mMsVeA&s" },
      { id: 41, nome: "Nebacetin Pomada 15g", preco: 17.50, marca: "Takeda", categoria: "Antibiótico Tópico", principioAtivo: "Sulfato de Neomicina, Bacitracina Zíncica", dosagem: "5mg/g + 250UI/g", quantidade: 77, imagemUrl: "https://farma22.vtexassets.com/arquivos/ids/188563-800-auto?v=638661528335070000&width=800&height=auto&aspect=true" },
      { id: 42, nome: "Minancora Pomada 30g", preco: 12.90, marca: "Minancora", categoria: "Antisséptico", principioAtivo: "Óxido de Zinco, Cânfora, Cloreto de Benzalcônio", dosagem: "Variável", quantidade: 102, imagemUrl: "https://farma22.vtexassets.com/arquivos/ids/187080/Minancora-Pomada-30g.png?v=638450172193970000" },
      { id: 43, nome: "Nimesulida 100mg 12 Comprimidos", preco: 10.00, marca: "EMS", categoria: "Anti-inflamatório", principioAtivo: "Nimesulida", dosagem: "100mg", quantidade: 125, imagemUrl: "https://d1jgmae0hcnr1i.cloudfront.net/Custom/Content/Products/89/79/89797_nimesulida-100mg-c-12cpr-p64252_m1_638283143491994824.webp" },
      { id: 44, nome: "Tamarine 12 Cápsulas", preco: 25.00, marca: "Hypera Pharma", categoria: "Laxante Fitoterápico", principioAtivo: "Senna alexandrina, Cassia fistula", dosagem: "Variável", quantidade: 38, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/tamarine-12mg-com-20-capsulas-16b8689df9.jpg" },
      { id: 45, nome: "Floratil 200mg 6 Cápsulas", preco: 30.00, marca: "Merck", categoria: "Probiótico", principioAtivo: "Saccharomyces boulardii", dosagem: "200mg", quantidade: 46, imagemUrl: "https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/13504e5c0/floratil-200mg-c-6-capsulas.jpg" },
      { id: 46, nome: "Expec Xarope 120ml", preco: 15.50, marca: "Legrand", categoria: "Expectorante", principioAtivo: "Cloridrato de Oxomemazina, Iodeto de Potássio, Benzoato de Sódio, Guaifenesina", dosagem: "Variável", quantidade: 51, imagemUrl: "https://www.drogarianovaesperanca.com.br/imagens/600x600/expec-xarope-com-120ml-8aa97b49b5.jpg" },
      { id: 47, nome: "Biotônico Fontoura 400ml", preco: 20.00, marca: "Hypera Pharma", categoria: "Suplemento de Ferro", principioAtivo: "Sulfato Ferroso Heptaidratado", dosagem: "Variável", quantidade: 66, imagemUrl: "https://hyperapharma.vteximg.com.br/arquivos/ids/162265-1000-1000/21007.jpg?v=637958258311370000" },
      { id: 48, nome: "Merthiolate 30ml", preco: 9.50, marca: "Cosmed", categoria: "Antisséptico", principioAtivo: "Digliconato de Clorexidina", dosagem: "10mg/mL", quantidade: 89, imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-n6L_pN1IYXNmiOS9nGUkRlgfuEQpk708Qw&s" },
      { id: 49, nome: "Água Oxigenada 10 volumes 100ml", preco: 3.00, marca: "Farmax", categoria: "Antisséptico", principioAtivo: "Peróxido de Hidrogênio", dosagem: "3%", quantidade: 175, imagemUrl: "https://cdn.ultrafarma.com.br/static/produtos/814234/large-636996791392418923-814234.jpg" },
      { id: 50, nome: "Maleato de Dexclorfeniramina Genérico Xarope 120ml", preco: 7.00, marca: "Medley", categoria: "Antialérgico", principioAtivo: "Maleato de Dexclorfeniramina", dosagem: "2mg/5mL", quantidade: 112, imagemUrl: "https://farmaciaindiana.vtexassets.com/arquivos/ids/260112-800-auto?v=637959222353070000&width=800&height=auto&aspect=true" }
    ];
    saveFarmacos(farmacos);
    return farmacos;
  };

  // ========================
  //  CRUD e Lógica de Negócio (Funcional)
  // ========================
  const addFarmaco = (farmacos, newFarmaco) => [...farmacos, newFarmaco];
  
  const updateFarmaco = (farmacos, id, updates) =>
    farmacos.map(farmaco => (farmaco.id === id ? { ...farmaco, ...updates } : farmaco));

  const deleteFarmaco = (farmacos, id) =>
    farmacos.filter(farmaco => farmaco.id !== id);

  const findFarmacoById = ([f, ...r], id) => f === undefined ? null : (f.id === id ? f : findFarmacoById(r, id));
  
  const countFarmacos = ([_, ...r]) => _ === undefined ? 0 : 1 + countFarmacos(r);

  const searchFarmacos = (farmacos, term) => {
      const lowerTerm = term.toLowerCase();
      return farmacos.filter(f => 
          f.nome.toLowerCase().includes(lowerTerm) ||
          f.marca.toLowerCase().includes(lowerTerm) ||
          f.principioAtivo.toLowerCase().includes(lowerTerm)
      );
  };
    
  const calculateEstoqueValue = (farmacos) =>
    farmacos.reduce((total, farmaco) => total + (farmaco.preco * farmaco.quantidade), 0);

  const listFarmacosByMarca = (farmacos, marcaName) =>
    farmacos.filter(farmaco => farmaco.marca === marcaName);

  const listFarmacosByCategoria = (farmacos, categoriaName) =>
    farmacos.filter(farmaco => farmaco.categoria === categoriaName);

  // NOVO: Utilitário para extrair valores únicos de uma chave
  const getUniqueValuesByKey = (farmacos, key) =>
    farmacos.reduce((acc, farmaco) => {
        const value = farmaco[key];
        if (value && !acc.includes(value)) {
            acc.push(value);
        }
        return acc;
    }, []).sort(); // Ordena alfabeticamente

  // ========================
  // Funções Avançadas (Acadêmicas)
  // ========================
  const findCheapestByMarca = (farmacos) => {
    return farmacos.reduce((mapa, farmaco) => {
      const campeaoAtual = mapa[farmaco.marca];
      if (!campeaoAtual || farmaco.preco < campeaoAtual.preco) {
        mapa[farmaco.marca] = farmaco;
      }
      return mapa;
    }, {}); 
  };

  const containsId = ([f, ...r], id) =>
    f === undefined ? false : (f.id === id ? true : containsId(r, id));

  const removeDuplicatesKeepLast = ([f, ...r]) => {
    if (f === undefined) return [];
    const caudaProcessada = removeDuplicatesKeepLast(r);
    return containsId(caudaProcessada, f.id) ? caudaProcessada : [f, ...caudaProcessada];
  };

  const chunkFarmacos = (farmacos, n) => {
    if (!farmacos || farmacos.length === 0) return [];
    const primeiraPagina = farmacos.slice(0, n);
    const restoDosFarmacos = farmacos.slice(n);
    return [primeiraPagina, ...chunkFarmacos(restoDosFarmacos, n)];
  };

  return {
    loadFarmacos, saveFarmacos, clearFarmacos, resetFarmacos,
    addFarmaco, updateFarmaco, deleteFarmaco,
    findFarmacoById, countFarmacos, searchFarmacos, calculateEstoqueValue,
    listFarmacosByMarca, listFarmacosByCategoria, getUniqueValuesByKey,
    findCheapestByMarca, removeDuplicatesKeepLast, chunkFarmacos
  };
})();

