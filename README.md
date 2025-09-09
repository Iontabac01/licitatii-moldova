# Licitații Moldova - Platforma Online de Licitații

Platforma națională pentru licitații publice transparente și eficiente din Republica Moldova.

## 🌟 Caracteristici

- **Pagină principală** cu licitații active și sistem de filtrare
- **Pagini individuale** pentru fiecare licitație cu detalii complete
- **Formular de adăugare** pentru publicarea de noi licitații
- **Design responsiv** pentru desktop și mobile
- **Interfață în limba română** adaptată pentru utilizatorii din Moldova
- **Sistem de filtrare avansată** după categorie, status și căutare text

## 📁 Structura Proiectului

```
/
├── index.html              # Pagina principală cu lista de licitații
├── licitatie.html          # Pagina cu detaliile unei licitații
├── adauga-licitatie.html   # Formularul pentru adăugarea licitațiilor
├── styles.css              # Stiluri principale
├── auction-details.css     # Stiluri pentru pagina de detalii
├── form.css                # Stiluri pentru formular
├── script.js               # Funcționalitatea paginii principale
├── auction-details.js      # Funcționalitatea paginii de detalii
├── form.js                 # Funcționalitatea formularului
└── README.md               # Documentația proiectului
```

## 🚀 Cum să utilizezi

### Instalare și Rulare Locală

1. Clonează repository-ul:
```bash
git clone https://github.com/Iontabac01/licitatii-moldova.git
cd licitatii-moldova
```

2. Deschide într-un server web local:
```bash
# Cu Python 3
python3 -m http.server 8000

# Cu Python 2
python -m SimpleHTTPServer 8000

# Cu Node.js (npx)
npx serve .
```

3. Accesează `http://localhost:8000` în browser

### Utilizare

- **Vizualizare licitații**: Navighează pe pagina principală pentru a vedea toate licitațiile active
- **Filtrare**: Folosește filtrele pentru a găsi licitații specifice după categorie, status sau text
- **Detalii licitație**: Fă clic pe o licitație pentru a vedea informații complete
- **Adăugare licitație**: Folosește formularul pentru a publica o nouă licitație

## 🎨 Design și UX

- **Interfață modernă** cu design clean și profesional
- **Culori** inspirate din identitatea națională a Moldovei
- **Tipografie** clara și ușor de citit
- **Navigare intuitivă** cu breadcrumbs și meniuri consistente
- **Animații subtile** pentru o experiență plăcută

## 📱 Responsivitate

Platforma este complet responsivă și funcționează perfect pe:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (până la 767px)

## 🛠️ Tehnologii Utilizate

- **HTML5** - Structura semantică
- **CSS3** - Stilizare avansată cu CSS Grid și Flexbox
- **JavaScript ES6** - Funcționalitate interactivă
- **Font Inter** - Tipografie modernă
- **Design System** - Variabile CSS pentru consistență

## 📊 Funcționalități Principale

### Pagina Principală
- Lista de licitații cu informații esențiale
- Sistem de filtrare după categorie și status
- Căutare în timp real după text
- Statistici generale (număr licitații, participanți, etc.)
- Paginare cu "Încarcă mai multe"

### Pagina de Detalii
- Informații complete despre licitație
- Cronologia procesului de licitație
- Lista de cerințe și documente
- Informații de contact
- Buton de participare

### Formularul de Adăugare
- Validare completă a datelor
- Editor text îmbogățit pentru descrieri
- Gestionarea fișierelor anexate
- Salvare automată ca ciornă
- Setări avansate pentru licitații

## 🔮 Dezvoltări Viitoare

- **Backend integration** cu baza de date
- **Sistem de autentificare** pentru utilizatori
- **Notificări în timp real** pentru actualizări
- **API REST** pentru integrări externe
- **Dashboard administrativ** pentru gestionare
- **Sistem de plăți** pentru taxe de participare
- **Generare rapoarte** PDF pentru licitații

## 📝 Licență

© 2024 Licitații Moldova. Toate drepturile rezervate.

## 🤝 Contribuții

Pentru contribuții și sugestii, vă rugăm să deschideți un issue sau să faceți un pull request.

---

*Dezvoltat cu ❤️ pentru transparența licitațiilor publice din Republica Moldova*
