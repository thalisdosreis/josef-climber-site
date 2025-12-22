import { useState, useRef, useEffect } from "react";

const PALETTE = {
  bg: '#E8FFFB',
  aqua1: '#CFFCF3',
  aqua2: '#9FEFE6',
  accent: '#2BAF9A',
  text: '#064E46'
}

export default function Home() {
  const [page, setPage] = useState('home')
  const [logo, setLogo] = useState('logo.png.png')
 const [search, setSearch] = useState("")


  return (
    <div style={{ background: PALETTE.bg, color: PALETTE.text, minHeight: '100vh' }}>
      <Header onNav={setPage} logo={logo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-9 lg:px-9 py-8">
{page === 'home' && <HomePage setPage={setPage} search={search} setSearch={setSearch} />}
{page === 'gallery' && <GalleryPage />}
{page === 'listings' && <ListingsPage search={search} />}
      </main>

      <Footer />
    </div>
  )
}

function Header({ onNav, logo }) {
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-30">
      <div className="
        max-w-7xl mx-auto px-2 py-4 
        flex flex-col gap-3
        md:flex-row md:items-center md:justify-between
      ">

        {/* Logo + Titulo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png.png" alt="Josef Climber" className="h-16 object-contain" />
         
          <div>
            <div className="font-bold text-lg">Josef Climber | Ajuda Imobiliária</div>
            <div className="text-xs text-gray-600">Porque a Vida é uma caixa de Surpresas!</div>
          </div>
        </div>

        {/* NAV – MOBILE mais baixo, DESKTOP igual */}
      <nav className="flex items-center gap-4 mt-2 md:mt-0">
  <button className="text-sm" onClick={() => onNav('home')}>Início</button>
  <button className="text-sm" onClick={() => onNav('gallery')}>Destaques</button>
  <button className="text-sm" onClick={() => onNav('listings')}>Imóveis</button>

  {/* Botão verde — aparece em TODOS */}
  <a 
    href="https://wa.me/5592982039977?text=Ol%C3%A1%2C%20estou%20vindo%20do%20Site%2C%20tudo%20bem%20%3F"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 bg-emerald-500 text-white rounded"
  >
    Contato
  </a>

  {/* Botão azul — apenas CELULAR */}
  <a
    href="https://wa.me/5592982039977?text=Ol%C3%A1%2C%20tenho%20um%20im%C3%B3vel%20para%20cadastrar!"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 rounded bg-blue-600 text-white text-sm md:hidden"
  >
    Quero cadastrar meu imóvel
  </a>
</nav>


      </div>
    </header>
  )
}

function HomePage({ setPage, search, setSearch }) {
  const [openImage, setOpenImage] = useState(null);

  // filtra conforme pesquisa (título ou location)
  const query = (search || "").trim().toLowerCase();
  const filtered = query
    ? sampleListings.filter(l =>
        (l.title || "").toLowerCase().includes(query) ||
        (l.location || "").toLowerCase().includes(query)
      )
    : sampleListings;

  return (
    <section>
      <Hero search={search} setSearch={setSearch} />

      <section className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ gap: '3mm' }}>
          <Card
            title="Nossos Imóveis"
            text="Veja Todos os nossos Apartamentos, Casas e Lotes disponíveis para Venda ou Locação."
            onClick={() => setPage('listings')}
          />

          <Card
            title="Quer Vender ou Alugar o Seu Imóvel ?"
            text="Entre em contato conosco para receber ajuda no seu negócio."
            onClick={() => {
              window.open(
                "https://wa.me/5592982039977?text=Ol%C3%A1%20estou%20com%20im%C3%B3vel%20dispon%C3%ADvel%20para%20venda%2Floca%C3%A7%C3%A3o%2C%20poderia%20me%20ajudar%20!%3F",
                "_blank"
              );
            }}
          />
          <Card
            title="Atendimento"
            text="Fale conosco pelo WhatsApp para suporte imediato."
            onClick={() => {
              window.open("https://wa.me/5592982039977", "_blank");
            }}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Imóveis em destaque</h2>
        <p className="text-sm text-gray-600 mt-1">Últimas ofertas selecionadas para você.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 3).map(l => (
            <SmallListing key={l.id} l={l} setOpenImage={setOpenImage} />
          ))}
        </div>

        {openImage && (
          <div
            onClick={() => setOpenImage(null)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          >
            <img src={openImage} alt="Imagem ampliada" className="max-h-[90%] max-w-[90%] rounded" />
          </div>
        )}
      </section>
    </section>
  )
}


function Hero({ search, setSearch }) {
  return (
    <section className="rounded-xl p-8" style={{ background: `linear-gradient(90deg, ${PALETTE.aqua1}, ${PALETTE.aqua2})` }}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold">Encontre seu próximo imóvel com Josef Climber</h1>
        <p className="mt-2 text-gray-700">Transparência, segurança e atendimento local em Manaus.</p>

        <div className="mt-4 flex gap-3">
          <input
            aria-label="Pesquisar"
            className="flex-1 rounded px-3 py-2 border"
            placeholder="Cidade, bairro ou referência"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Buscar</button>
        </div>
      </div>
    </section>
  )
}

function Card({ title, text, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-xl blue cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600 mt-2">{text}</p>
    </div>
  )
}

function SmallListing({ l }) {
  return (
    <article className="bg-white rounded-xl shadow overflow-hidden p-3 flex flex-col h-full">
      
      {/* Fotos clicáveis */}
      <ClickableCarousel images={l.images} height={490} />

      {/* Informações */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{l.title}</h3>
          <div className="text-emerald-600 font-semibold">{l.price}</div>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {l.location} • {l.area}
        </p>

        <div className="mt-3 flex flex-col gap-3 text-xs text-gray-700">

          <div className="flex items-center gap-4">
           <InfoIcon 
  icon={l.isCommercial ? "🧱" : "🛏"} 
  label={l.beds} 
/>

            <InfoIcon icon="🛁" label={l.baths} />
            {l.garage != null && <InfoIcon icon="🚗" label={l.garage} />}
          </div>

          {/* Botão de interesse - IGUAL ao ListingCard */}
          <a
            href={`https://wa.me/5592982039977?text=${encodeURIComponent(
              `Olá, estou interessado neste imóvel: ${l.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold"
          >
            Estou Interessado
          </a>

          {/* Ver no Maps */}
          {l.mapLink && (
            <a
              href={l.mapLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center text-emerald-700 font-golden"
            >
              Ver no Maps
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Gallery Page
function GalleryPage() {
  const largeImages = galleryImages.large
  const smallSets = [galleryImages.small, galleryImages.small, galleryImages.small]

  return (
    <section>
      <h2 className="text-2xl font-semibold">Destaques</h2>
      <p className="text-sm text-gray-600 mt-1">Imóveis em destaque. Atualização realizada a cada 15 dias.</p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ gap: '3mm' }}>
        <div className="lg:col-span-2">
          <AutoCarousel images={largeImages} height={420} />
        </div>

        <div className="flex flex-col gap-3">
          {smallSets.map((set, idx) => (
            <HoverCarousel key={idx} images={set} height={130} />
          ))}
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">Nossos imóveis destaque disponíveis para Visita !</div>
    </section>
  )
}

function AutoCarousel({ images = [], height = 300 }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length)
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [images.length])

  if (!images.length) return <div className="bg-gray-100" style={{ height }} />

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow" style={{ height }}>
      {images.map((src, i) => (
        <img key={i} src={src} alt={`slide-${i}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i===index ? 'opacity-100' : 'opacity-0'}`} />
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i===index ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  )
}

function HoverCarousel({ images = [], height = 120 }) {
  const [index, setIndex] = useState(0)

  // Autoplay automático igual ao carrossel grande
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, 3000); // troca a cada 3s

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return <div className="bg-gray-100 rounded-xl" style={{ height }} />

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white shadow"
      style={{ height }}
      onMouseEnter={() => { }}
    >
      {/* Imagens */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`hslide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Controle via mouse (continua funcionando) */}
      <div
        className="absolute inset-0"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const pct = (e.clientX - rect.left) / rect.width
          const newIndex = Math.floor(pct * images.length)
          setIndex(Math.min(images.length - 1, Math.max(0, newIndex)))
        }}
      />

      {/* Indicadores */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
          ></span>
        ))}
      </div>
    </div>
  )
}

// Listings Page
function ListingsPage({ search }) {
  const query = (search || "").trim().toLowerCase();
  const filtered = query
    ? sampleListings.filter(l =>
        (l.title || "").toLowerCase().includes(query) ||
        (l.location || "").toLowerCase().includes(query)
      )
    : sampleListings;

  return (
    <section>
      <h2 className="text-2xl font-semibold">Todos os Imóveis</h2>
      <p className="text-sm text-gray-600 mt-1">Clique nas fotos para navegar.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  )
}

function ListingCard({ listing }) {
  return (
    <article className="bg-white rounded-xl shadow overflow-hidden p-3 flex flex-col">
      
      {/* Carrossel */}
      <ClickableCarousel images={listing.images} height={180} />

      <div className="mt-3">
        
        {/* Título e preço */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{listing.title}</h3>
          <div className="text-emerald-600 font-semibold">{listing.price}</div>
        </div>

        {/* Localização + área */}
        <p className="text-sm text-gray-600 mt-1">
          {listing.location} • {listing.area}
        </p>

        {/* Ícones e botões */}
        <div className="mt-3 flex flex-col gap-3 text-xs text-gray-700">

          <div className="flex items-center gap-4">
            <InfoIcon 
  label={`${listing.beds}`} 
  icon={listing.isCommercial ? "🧱" : "🛏"} 
/>
            <InfoIcon label={`${listing.baths}`} icon="🛁" />
            {listing.garage != null && (
              <InfoIcon label={listing.garage} icon="🚗" />
            )}
          </div>

          {/* Botão Estou Interessado */}
          <a
            href={`https://wa.me/5592982039977?text=${encodeURIComponent(
              `Olá, estou interessado neste imóvel: ${listing.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold"
          >
            Estou Interessado
          </a>

          {/* Ver no Maps */}
          {listing.mapLink && (
            <a
              href={listing.mapLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center text-emerald-700 font-semibold"
            >
              Ver no Maps
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ClickableCarousel({ images = [], height = 160 }) {
  const [index, setIndex] = useState(0)

  if (!images.length) return <div className="bg-gray-100 rounded" style={{ height }}></div>

  return (
    <div className="relative overflow-hidden rounded" style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={images[index]}
        alt={`c-${index}`}
        className="max-w-full max-h-full object-contain rounded"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />

      <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
        <button onClick={() => setIndex(i => (i-1+images.length)%images.length)} className="pointer-events-auto ml-2 bg-white/60 rounded-full p-1">◀️</button>
        <button onClick={() => setIndex(i => (i+1)%images.length)} className="pointer-events-auto mr-2 bg-white/60 rounded-full p-1">▶️</button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_,i)=> (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i===index ? 'bg-white' : 'bg-white/50'}`}></button>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-12 bg-white/70 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="font-bold">Josef Climber — Imobiliária</div>
          <div className="text-sm text-gray-600 mt-2">Endereço: Rua Salvador, 120 Adrianóplis - Manaus, AM</div>
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Josef Climber. Todos os direitos reservados.</div>
         <div className="text-sm text-gray-600"> {new Date().getFullYear()} CNPJ:10.595.887/0001-61</div>
 </div>
          <div className="flex flex-col md:items-end gap-2">
          <div className="text-sm">Acesse:</div>

          <div className="flex gap-3">
            <a href="https://wa.me/5592982039977?text=Ol%C3%A1%2C%20estou%20vindo%20do%20Site%2C%20tudo%20bem%20%3F" target="_blank" rel="noreferrer">WhatsApp</a>

            <a href="https://www.instagram.com/josefclimberajudaimobiliaria" target="_blank" rel="noreferrer">Instagram</a>

            <a href="https://www.facebook.com/pages/Vitor-Rodrigo-Sans-Corretor-de-Im%C3%B3veis-CRECI-2878/615552188566178" target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
function InfoIcon({ icon, label }) {
  if (!label || label === "undefined") return null;

  return (
    <div className="flex items-center gap-1 text-gray-700 text-xs">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}


const sampleListings = [
  {
    id: 1,
    title: "Casa para locação na AV. Leonardo Malcher - Centro de Manaus",
    price: "R$1.500",
    area: "60 m²",
    beds: 2,
    baths: 1,
    garage: 0,
    location: "AV. Leonardo Malcher - Centro de Manaus",
    mapLink: "https://maps.app.goo.gl/5pt7mrHnN3bCDnct8",
    images: ["/malcher1.jpg.jpg"]
  },
  {
    id: 3,
    title: "Vende-se Terreno no Bairro Novo Aleixo",
    price: "R$280.000,00",
    area: "521M²",
    location: "Novo Aleixo  - Manaus AM",
    mapLink: "https://www.google.com/maps/@-3.0578195,-59.9826645,3a,90y,274.74h,86.69t/data=!3m7!1e1!3m5!1sMKaqZBxBirVVgZehhem1zA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D3.3066027565429152%26panoid%3DMKaqZBxBirVVgZehhem1zA%26yaw%3D274.7421574089246!7i16384!8i8192",
    images: [
     "/lened.jpg",
      "/lene.jpeg",
      "/lene1.jpeg"
    ]
  },

  {
    id: 3,
    title: "Vende-se Cobertura Duplex no condomínio Ocean Parque no bairro Dom Pedro",
    price: "R$1.500.000,00",
    area: "435,20M²",
    beds: 4,
    baths: 3,
    garage: 2,
    location: "Dom Pedro - Manaus AM",
    mapLink: "https://maps.app.goo.gl/WUG6a6SNebbM7CPM9",
    images: [
  "/ocean.jpg",
  "/ocean1.jpg",
  "/ocean2.jpg",
  "/ocean3.jpg",
  "/ocean4.jpg",
  "/ocean5.jpg",
  "/ocean6.jpg",
  "/ocean7.jpg",
  "/ocean8.jpg",
  "/ocean9.jpg",
  "/ocean1.jpg.jpg",
  "/ocean2.jpg.jpg"
]

  },

  {
    id: 4,
    title: "Vende-se Apartamento no condomínio fechado Parque dos Ingleses",
    price: "R$350.00,00",
    area: "66,50M²",
    beds: 3,
    baths: 2,
    garage: 1,
    location: "Chapada — Manaus AM",
    mapLink: "https://maps.app.goo.gl/fjStm8qkCTAENzc6",
    images: [
      "/ingles1.jpg",
      "/ingles2.jpg",
      "/ingles3.jpg",
      "/ingles5.jpg",
      "/ingles6.jpg",
      "/ingles7.jpg",
      "/ingles8.jpg",
      "/ingles9.jpg",
      "/ingles10.jpg",
      "/ingleses1.jpg.jpg",
      "/ingleses2.jpg.jpg"
    ]
  },

  {
    id: 5,
    title: "Vende-se Apartamento no condomínio Reserva Morada no Bairro Aleixo",
    price: "R$530.00,00",
    area: "A consultar",
    beds: 2,
    baths: 2,
    garage: 1,
    location: "Aleixo - Manaus AM",
    mapLink: "https://maps.app.goo.gl/vdhax4rwS521m5179",
    images: [
    "reserva.avif",
    "/reserva1.jpg.jpg"
    ]
  },

  {
    id: 6,
    title: "Aluga-se Apartamendo No Residencial Eldorado na Chapada",
    price: "R$1.300,00",
    area: "55M²",
    beds: 2,
    baths: 1,
    garage: 1,
    location: "Chapada - Manaus AM",
    mapLink: "https://maps.app.goo.gl/dUnwbEtpRpeL63db6",
    images: [
      "/eldorado1.jpg.jpg"
    ]
  },

  {
    id: 7,
    title: "Vende-se apartamento no condomínio Weekend",
    price: "R$600.00,00",
    area: "?",
    beds: 3,
    baths: 2,
    garage: 2,
    location: " - Manaus AM",
    mapLink: "https://maps.app.goo.gl/GD3eHLfqbLoRoWtH6",
    images: [
      "/fim.jpeg",
      "/fim1.jpg",
      "/fim2.jpg",
      "/fim3.jpg",
      "/fim4.jpg",
      "/fim5.jpeg", 
      "/weekend1.jpg",
      "/weekend2.jpg"
    ]
  },

  {
    id: 6,
    title: "Vende-se Cobertura Duplex no Life Flores",
    price: "R$700.000,00",
    area: "136M²",
    beds: 4,
    baths: 3,
    garage: 2,
    location: "Flores - Manaus AM",
    mapLink: "https://maps.app.goo.gl/yHVqSxdrgvKpDXFs9",
    images: [
      "/lifeflores1.jpg",
      "/lifeflores2.jpg",
      "/lifeflores3.jpg",
      "/lifeflores4.jpg",
      "/lifeflores5.jpg",
      "/lifeflores6.jpg",
      "/lifeflores7.jpg",
      "/lifeflores.jpg"
    ]
  },

  {
    id: 6,
    title: "Vende-se Cobertura no condomínio Bellagio",
    price: "R$1.500.000,00",
    area: "150M²",
    beds: 3,
    baths: 4,
    garage: 2,
    location: "Adrianópolis - Manaus AM",
    mapLink: "https://maps.app.goo.gl/3PpEHNpJBNzu5TCHA",
    images: [
    "/belaggio.jpg",
    "/bellagio1.jpg",
    "/bellagio2.jpg",
    "/bellagio3.jpg",
    "/bellagio4.jpg",
    "/bellagio5.jpg",
    "/bellagio6.jpg",
    "bellagio7.jpg",
    "/bellagio8.jpg",
    "/bellagio9.jpg",
    "/bellagio10.jpg",
    "/bellagio11.jpg",
    "/bellagio12.jpg",
    "/bellagio13.jpg",
    "/bellagio14.jpg",
    "/bellagio15.jpg",
    "/bellagio16.jpg", 
    "/bellagio.jpg"
    ]
  },

  {
    id: 6,
    title: "Vende-se Aparatamento no Condomínio Estilo Golf",
    price: "R$335.000,00",
    area: "",
    beds: 2,
    baths: 2,
    garage: 1,
    location: "Novo Aleixo - Manaus AM",
    mapLink: "https://maps.app.goo.gl/RCMzp1TMzoULgPkw7",
    images: [
    "/gollf.jpg",
    "/golf1.jpg",
    "/golf2.jpg",
    "/golf3.jpg",
    "/golf4.jpg",
    "/golf5.jpg",
    "/golf6.jpg", 
    "/golf.jpg"
    ],
    videos: [
      "/golf.mp4"
    ]
  },

  {
    id: 6,
    title: "Vende-se Apartamento no Condomínio Joan Miró",
    price: "R$550.000,00",
    area: "",
    beds: 2,
    baths: 2,
    garage: 1,
    location: "Adrianópolis - Manaus AM",
    mapLink: "https://maps.app.goo.gl/dcqqLPYDgaSQpe5i9",
    images: [
   "/joan.jpg",
   "/joan1.jpg",
   "/joan2.jpg",
   "/joan3.jpg",
   "/joan4.jpg",
   "/joan5.jpg",   
   "/miró.jpg"
    ]
  },
  {
    id: 6,
    title: "Vende-se Apartamento no Condomínio Parque Alvorada",
    price: "Valor a Negociar",
    area: "M²",
    beds: 2,
    baths: 2,
    garage: 1,
    location: "Alvorada - Manaus AM",
    mapLink: "https://maps.app.goo.gl/AnaySUaxWshfwRMp6",
    images: [
    "/alv.jpg",
    "/alv1.jpg",
    "/alv2.jpg",
    "/alv3.jpg",
    "/alv4.jpg",
    "/alv5.jpg",  
    "/alvorada.jpg"
    ]
  },
 {
  id: 6,
  title: "Aluga-se parte superior de Pédio na AV. Carvalho Leal",
  isCommercial: true,
    price: "R$2.400,00",
    area: "135M²",
    beds: 3,
    baths: 2,
    garage: 1,
    location: "Cachoeirinha - Manaus AM",
    mapLink: "https://www.google.com/maps/place/Cart%C3%B3rio+Justiniano+do+5%C2%BA+Of%C3%ADcio+de+Notas/@-3.1240263,-60.0060972,3a,75y,287.56h,85.14t/data=!3m7!1e1!3m5!1sGT5L7okR3lhphGJrGhmfHg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D4.859910487035009%26panoid%3DGT5L7okR3lhphGJrGhmfHg%26yaw%3D287.55875837933326!7i16384!8i8192!4m14!1m7!3m6!1s0x926c05d51be7377f:0xbed52d1c2816c549!2sOdonto+Excellence+Cachoeirinha+%7C+Dentista!8m2!3d-3.1243061!4d-60.0062656!16s%2Fg%2F11xff3snxq!3m5!1s0x926c0572642fc9ff:0xef85e50c940f0cce!8m2!3d-3.1237844!4d-60.0059734!16s%2Fg%2F1tdmwpsv",
    images: [
      "/cachoeirinha.jpg"
    ]
  },
  {
    id: 6,
    title: "Vende-se Casa Duplex no Condomínio Forest Hill",
    price: "R$1.200.000,00",
    area: "250M²",
    beds: 4,
    baths: 4,
    garage: 4,
    location: "Terra Nova - Manaus AM",
    mapLink: "https://maps.app.goo.gl/S9V7paRnGwjUifZj9",
    images: [
      "/hill.jpg",
      "/hilll2.jpg",
      "/hill3.jpg",
      "/hill4.jpg",
      "/hill5.jpg",
      "/hill6.jpg",
      "/hill7.jpg",
      "/hill8.jpg",
      "/hill9.jpg",
      "/hill10.jpg",
      "/hill11.jpg",
      "/hilll.jpg"
    ]
  },
  {
    id: 6,
    title: "Vende-se Casa no Jardim Oriente",
    price: "R$350.000,00",
    area: "",
    beds: 2,
    baths: 1,
    garage: 2,
    location: "Parque 10 - Manaus AM",
    mapLink: "https://www.google.com/maps/@-3.0746917,-59.9947316,3a,75y,303.87h,88.62t/data=!3m7!1e1!3m5!1sYS7bghi5NnFgpyJ6P1zPBA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D1.3835403874373071%26panoid%3DYS7bghi5NnFgpyJ6P1zPBA%26yaw%3D303.8716854600824!7i16384!8i8192",
    images: [
    "/p10.jpg",
    "/p101.jpg",
    "/p102.jpg",
    "/p103.jpg",
    "/p104.jpg",
    "/p105.jpg",
    "/p106.jpg",
    "/p107.jpg",
    "/hyd.png"
    ]
  },
{
    id: 6,
    title: "Vende-se Casa no Residencial Princesa do Rio Nilo",
    price: "R$250.000,00",
    area: "",
    beds: 2,
    baths: 2,
    garage: 2,
    location: "Flores - Manaus AM",
    mapLink: "https://maps.app.goo.gl/VdmNYK9TMQVKgz5N8",
    images: [
    "/nilo.png",
    "/nilo1.jpeg",
    "/nilo2.jpeg",
    "/nilo3.jpeg",
    "/nilo4.jpeg",  
    "/nilo.jpg"
    ]
  },
 {
  id: 6,
  title: "Vende-se ou Aluga-se Ponto Comercial no Vieira Alves",
  isCommercial: true,
    price: "R$12.000,00 ou R$2.000.000,00",
    area: "",
    beds: 8,
    baths: 3,
    garage: 2,
    location: "Vieira Alves - Manaus AM",
    images: [
      "/vieira.jpg"
    ]
  },
  {
  id: 6,
  title: "Vende-se ou Aluga-se Ponto Comercial no Vieira Alves",
  isCommercial: true,
    price: "R$300.000,00",
    area: "",
    beds: 3,
    baths: 1,
    garage: 1,
    location: "Adrianópolis - Manaus AM",
    mapLink: "https://maps.app.goo.gl/SynNaneXVBNbU1JS6",
    images: [
    "/102.jpeg",
    "/1021.jpeg",
    "/1022.jpeg",
    "/1023.jpeg",
    "/1024.jpeg",   
    "/vbc.jpeg"
    ]
  },
  {
  id: 6,
  title: "Vende-se ou Aluga-se Sala Comercial no Vieiralves Business Center",
  isCommercial: true,
    price: "R$6.000,00 ou R$700.000,00",
    area: "",
    beds: 3,
    baths: 3,
    garage: 2,
    location: "Adrianópolis - Manaus AM",
    mapLink: "https://maps.app.goo.gl/SynNaneXVBNbU1JS6",
    images: [
      "/201201vbc.jpg"
    ]
  },
  {
    id: 6,
    title: "Aluga-se Apartamento Totalmente Mobiliado no Condomínio Ideal Torquato",
    price: "R$1.800,00",
    area: "53M²",
    beds: 3,
    baths: 1,
    garage: 1,
    location: "Tarumã - Manaus AM",
    mapLink: "https://maps.app.goo.gl/qgYBMJpdUBrxuxz37",
    images: [
    "/lu.jpg",
    "lu1.jpg",
    "lu2.jpg",
    "lu3.jpg",
    "lu4.jpg",
    "lu5.jpg",
    "lu6.jpg", 
    "/trqt.jpg"
    ]
  },

  {
    id: 6,
    title: "Aluga-se Casa no Bairro Da Paz",
    price: "R$1.800,00",
    area: "",
    beds: 2,
    baths: 2,
    garage: 1,
    location: "Bairro Da Paz - Manaus AM",
    mapLink: "https://www.google.com/maps/place/Beco+Henoch+Reis+-+Da+Paz,+Manaus+-+AM,+69048-000/@-3.0647591,-60.0321322,3a,90y,58.47h,87.82t/data=!3m7!1e1!3m5!1sv-oi9BuZp78PjBKa-jXVfg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D2.1844274139551487%26panoid%3Dv-oi9BuZp78PjBKa-jXVfg%26yaw%3D58.46815393617504!7i16384!8i8192!4m6!3m5!1s0x926c108147726eb7:0x813f3ad580d8046b!8m2!3d-3.0650074!4d-60.0306966!16s%2Fg%2F11cmkrkfw2?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
    images: [
      "/mário.jpg"
    ]
  },
  {
    id: 6,
    title: "Vende-se Casa no bairro do Tarumã",
    price: "R$1.500.000,00",
    area: "",
    beds: 7,
    baths: 6,
    garage: 2,
    location: "Tarumã - Manaus AM",
    mapLink: "https://www.google.com/maps/place/R.+Praia+do+Cumbuco+-+Tarum%C3%A3,+Manaus+-+AM,+69041-365/@-3.0051454,-60.0450173,3a,90y,214.25h,104.95t/data=!3m7!1e1!3m5!1sSPXW7Cq4-qtRuyHDPCL2nw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-14.949102931450568%26panoid%3DSPXW7Cq4-qtRuyHDPCL2nw%26yaw%3D214.24709367069912!7i16384!8i8192!4m15!1m8!3m7!1s0x926c177235555d27:0x5eb8b1ac9243b672!2sR.+Praia+do+Cumbuco+-+Tarum%C3%A3,+Manaus+-+AM,+69041-365!3b1!8m2!3d-3.0052877!4d-60.044543!16s%2Fg%2F1ymtxwh4_!3m5!1s0x926c177235555d27:0x5eb8b1ac9243b672!8m2!3d-3.0052877!4d-60.044543!16s%2Fg%2F1ymtxwh4_",
    images: [
      "/1M.jpeg",
      "/tarumã.jpeg",
      "/tarumã1.jpeg",
      "/tarumã2.jpeg",
      "/tarumã3.jpeg",
      "/tarumã4.jpeg",
      "/tarumã5.jpeg",
      "/tarumã6.jpg",
      "/tarumã7.jpeg",
      "/1Mt.jpg"
    ]
  },
{
    id: 6,
    title: "Vende-se Casa no Rio Preto da Eva",
    price: "R$150.000,00",
    area: "280M²",
    beds: 2,
    baths: 1,
    garage: 1,
    location: "El-Shadai - Rio Preto da Eva AM",
    mapLink: "https://maps.app.goo.gl/21k74Qmh6B5Bgf5L7",
    images: [
      "/apacerido1.0.jpeg",
      "/aparecido.jpeg",
      "/aparecido1.jpeg",
      "/aparecido2.jpg"
    ]
  },
{
  id: 6,
  title: "Aluga-se Ponto Comercial na Ciddade de Deus",
  isCommercial: true,
    price: "R$5.000,00",
    area: "320M²",
    beds: 7,
    baths: 3,
    garage: 1,
    location: "Cidade de Deus - Manaus AM",
    mapLink: "https://maps.app.goo.gl/YAF88qmtJWTanuvJ6",
    images: [
      "/mário.jpeg",
      "/mário1.jpeg",
      "/mário2.jpeg",
      "/mário4.jpeg",
      "/mário5.jpg"
    ]
  }
];

const galleryImages = {
  large: [
    '/lifeflores1.jpg',
    '/lifeflores4.jpg',
    '/lifeflores7.jpg'
  ],
  small: [
    '/1M.jpeg',
    '/forest.jpg',
    '/golfia.jpg'
  ]
}

