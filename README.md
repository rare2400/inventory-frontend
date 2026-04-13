# Lagersystem Frontend-applikation

En Single page applikation (SPA) byggd med React och TypeScript som kommunicerar med ett REST API för att hantera CRUD-operationer. Applikationen hanterar visning av produkter, sökning, filtrering och en skyddad admindel för produkthantering.  
Användare kan registreras och logga in för att komma åt admin-delen.

## Länkar
Publicerad applikation: [https://inventory-frontend-caxa.onrender.com ](https://inventory-frontend-caxa.onrender.com)      
API: [https://labb3-backend.onrender.com/api/products](https://labb3-backend.onrender.com/api/products)    
API repository: [https://github.com/rare2400/labb3-backend.git](https://github.com/rare2400/labb3-backend.git)


## Teknikstack
- React
- React Router
- TypeScript
- Vite
- CSS

## Installation

1. **Klona repot:**
```bash
git clone https://github.com/rare2400/inventory-frontend.git
```

2. **Installera beroenden:**
```bash
   npm install
```

3. **Starta utvecklingsservern:**
```bash
   npm run dev
```

## Funktionalitet
- Visning av produkter med sökning och filtrering per kategori
- Dynamiska routes för enskilda produkter
- Registrera ny användare
- Logga in och komma till ett administeringsgränssnitt
- JWT-autentisering med lagring i localStorage
- Skyddade adminroutes med automatisk redirect vid utloggning
- Dynamiskt formulär för att lägga till eller uppdatera en produkt
- Ta bort en produkt
- Laddnings- och felmeddelanden vid API-anrop
- Responsiv design för både desktop och mobil

## Projektstruktur
```
src/
├── api/              # Fetch-funktioner för API-anrop
├── components/
│   ├── layout/       # LayoutPage, AdminLayout, Header, Footer
│   ├── pages/
│   │   ├── public/   # Home, ProductPage, LoginPage, Register
│   │   └── admin/    # Admin, ProductForm
│   └── ui/           # ProductCard
├── context/          # AuthContext — global autentiseringsstate
├── types/            # TypeScript-interfaces
└── router.tsx        # Applikationens routes
```

## Sidor
| Sida             | URL                       | Skyddad | Beskrivning                             |
|------------------|---------------------------|---------|-----------------------------------------|
| Hem              | `/`                       | Nej     | Produktlista med sökning och filtrering |
| Produkt          | `/products/:id`           | Nej     | Detaljvy för enskild produkt            |
| Logga in         | `/login`                  | Nej     | Inloggningsformulär                     |
| Registrera       | `/register`               | Nej     | Registreringsformulär                   |
| Admin            | `/admin`                  | Ja      | Produkthantering                        |
| Ny produkt       | `/admin/products/new`     | Ja      | Formulär för ny produkt                 |
| Redigera produkt | `/admin/products/:id/edit`| Ja      | Formulär för redigering                 |


## Formulärvalidering
**Felmeddleanden vid:**
- Tomma obligatoriska fält
- Ogiltiga värden (t.ex. negativt pris eller lagersaldo)
- Lösenord som inte matchar vid registrering
- Felaktiga inloggningsuppgifter

## Skapad av
Skapad som en del av en skoluppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz      
[rare2400@student.miun.se](rare2400@student.miun.se)      
2026-03-26
