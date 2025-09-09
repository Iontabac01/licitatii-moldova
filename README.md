# Licitații Moldova - Platformă de Licitații Online

Platformă națională pentru licitații publice și private din Republica Moldova, construită cu Next.js și React.

## 🚀 Funcționalități

- **Pagina principală** cu listă de licitații și filtrare avansată
- **Pagina de detalii** pentru fiecare licitație cu posibilitatea de a face oferte
- **Formular pentru adăugarea** licitațiilor noi
- **Sistem de autentificare** simplu (demo cu conturi mock)
- **Design responsive** optimizat pentru mobile și desktop
- **Mock data** realistă cu conținut în română
- **API placeholder** pentru imagini
- **Pregătit pentru deployment** pe Vercel

## 🛠️ Tehnologii folosite

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Autentificare**: Context API cu localStorage
- **Build**: Turbopack pentru dezvoltare rapidă
- **Linting**: ESLint + TypeScript

## 📋 Cerințe de sistem

- Node.js 18+ 
- npm sau yarn
- Git

## 🏃‍♂️ Instalare și rulare locală

### 1. Clonați repository-ul

```bash
git clone https://github.com/Iontabac01/licitatii-moldova.git
cd licitatii-moldova
```

### 2. Instalați dependențele

```bash
npm install
```

### 3. Rulați aplicația în modul dezvoltare

```bash
npm run dev
```

Aplicația va fi disponibilă la: [http://localhost:3000](http://localhost:3000)

### 4. Build pentru producție

```bash
npm run build
npm start
```

## 🎯 Cum să folosiți aplicația

### Navigare

- **Pagina principală** (`/`): Vizualizați toate licitațiile cu opțiuni de filtrare
- **Detalii licitație** (`/auction/[id]`): Vedeți detalii complete și faceți oferte
- **Adăugă licitație** (`/add-auction`): Creați licitații noi (necesită autentificare)
- **Autentificare** (`/login`): Conectați-vă cu conturile demo

### Conturi demo disponibile

**Administrator:**
- Email: `admin@moldova.md`
- Parolă: `password123`

**Utilizator obișnuit:**
- Email: `user@moldova.md`
- Parolă: `password123`

### Funcționalități principale

1. **Filtrare licitații**: După status (active, în curând, închise) și categorie
2. **Vizualizare detalii**: Informații complete, imagini, istoric oferte
3. **Plasare oferte**: Pentru utilizatorii autentificați la licitațiile active
4. **Adăugare licitații**: Formular complet cu validare
5. **Autentificare**: Sistem simplu cu conturi demo

## 🚀 Deploy pe Vercel

### Opțiunea 1: Deploy direct din GitHub

1. Creați cont pe [Vercel](https://vercel.com)
2. Conectați repository-ul GitHub
3. Selectați `licitatii-moldova` din lista de repository-uri
4. Lăsați setările default și click pe "Deploy"

### Opțiunea 2: Deploy cu Vercel CLI

```bash
# Instalați Vercel CLI
npm i -g vercel

# Deploy
vercel

# Pentru prima dată, urmăriți instrucțiunile interactive
# Pentru deployuri ulterioare, folosiți:
vercel --prod
```

### Setări pentru Vercel

Aplicația este configurată să funcționeze fără setări suplimentare pe Vercel:

- **Framework**: Next.js (detectat automat)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## 📁 Structura proiectului

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Pagina principală
│   ├── layout.tsx               # Layout general
│   ├── globals.css              # Stiluri globale
│   ├── auction/[id]/page.tsx    # Detalii licitație
│   ├── add-auction/page.tsx     # Formular adăugare
│   ├── login/page.tsx           # Pagina de autentificare
│   └── api/placeholder/         # API pentru imagini placeholder
├── components/                  # Componente reutilizabile
│   ├── Layout.tsx              # Layout cu header/footer
│   ├── Header.tsx              # Header cu navigare
│   ├── Footer.tsx              # Footer cu links
│   └── AuctionCard.tsx         # Card pentru licitație
└── lib/                        # Utilități și date
    ├── types.ts                # Tipuri TypeScript
    ├── mockData.ts             # Date mock pentru demo
    └── auth.tsx                # Context pentru autentificare
```

## 🔧 Personalizare și extindere

### Adăugarea unui backend propriu

1. **Înlocuiți mock data** din `src/lib/mockData.ts` cu apeluri API reale
2. **Actualizați funcțiile de autentificare** din `src/lib/auth.tsx`
3. **Modificați formularele** să trimită date către API-ul vostru
4. **Adăugați variabile de mediu** pentru URL-urile API

### Exemple de variabile de mediu

Creați fișier `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.vostra.md
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Adăugarea de noi funcționalități

- **Plăți online**: Integrați cu Moldova Agroindbank, Ecomm, sau alte gateway-uri
- **Notificări**: Email sau SMS pentru oferte noi
- **Upload imagini**: Cloudinary, AWS S3, sau alte servicii
- **Chat live**: Pentru comunicarea între participanți
- **Rapoarte**: Export PDF pentru licitații

## 🔍 Categorii disponibile

- Terenuri
- Echipamente
- Construcții  
- Servicii
- Transport
- Imobiliare
- Altele

## 📍 Locații suportate

- Chișinău
- Bălți
- Orhei
- Comrat
- Soroca
- Cahul
- Ungheni
- Căușeni
- Strășeni
- Național
- Altele

## 🤝 Contribuție

1. Fork proiectul
2. Creați o branch pentru feature (`git checkout -b feature/nouă-funcționalitate`)
3. Commit modificările (`git commit -m 'Adăugă nouă funcționalitate'`)
4. Push branch-ul (`git push origin feature/nouă-funcționalitate`)
5. Deschideți un Pull Request

## 📄 Licență

Acest proiect este licențiat sub MIT License - vezi fișierul [LICENSE](LICENSE) pentru detalii.

## 📞 Contact

Pentru întrebări sau suport:
- Email: info@licitatii.md
- GitHub Issues: [Deschide un issue](https://github.com/Iontabac01/licitatii-moldova/issues)

## 🙏 Mulțumiri

Dezvoltat pentru modernizarea procesului de licitații din Republica Moldova.
