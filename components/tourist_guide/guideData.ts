export interface TouristAttraction {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Cultura & Historia' | 'Naturaleza & Relax' | 'Experiencias' | 'Gastronomía' | 'Zacatlán';
  description: string;
  tips?: string[];
  badge?: string;
  image: string;
  secondaryImage?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export const ATTRACTIONS_DATA: TouristAttraction[] = [
  {
    id: "bienvenida-y-clima",
    title: "Ubicación & Clima",
    subtitle: "Chignahuapan: 'Sobre las nueve aguas'",
    category: "Cultura & Historia",
    badge: "Info General",
    description: "Chignahuapan proviene del náhuatl: chicnahui (nueve), atl (agua) y pan (sobre/en), lo que significa 'sobre las nueve aguas' o 'donde abunda el agua'. Fue establecida en 1527 como Santiago Chiqunahuitle. Es la puerta a la hermosa Sierra Norte del estado de Puebla, colindando al norte con Zacatlán. El clima en esta región es semifrío y subhúmedo con lluvias en verano. La temperatura media anual oscila entre los 5°C y 24°C.",
    tips: [
      "Temperatura promedio: 13°C. Se recomienda usar ropa abrigadora.",
      "Reserva con anticipación de octubre a enero debido a la alta ocupación hotelera.",
      "La neblina y la lluvia ligera son constantes; te recomendamos cargar impermeable y paraguas.",
      "Para actividades al aire libre, la mejor época es de marzo a mayo (zapatos cómodos, bloqueador solar y gorra)."
    ],
    image: "/basilica.webp"
  },
  {
    id: "kiosko-mudejar",
    title: "Kiosko Estilo Mudéjar",
    subtitle: "¡Estilo que deslumbra!",
    category: "Cultura & Historia",
    badge: "2 min a pie",
    description: "Inicia su construcción a principios de 1871, terminándose en noviembre del mismo año. El motivo de su construcción fue crear un espacio adecuado para las presentaciones y celebraciones de 'El Cuerpo Filarmónico'. Es el único kiosko en el país que cuenta con una fuente debajo de su plataforma principal.",
    image: "/tourist_guide/kiosko.webp"
  },
  {
    id: "palacio-municipal-y-mural",
    title: "Palacio Municipal y Mural Cosmogónico",
    subtitle: "Arte e historia en el centro",
    category: "Cultura & Historia",
    badge: "En el Centro Histórico",
    description: "El 15 de Mayo de 1882 se colocó la primera piedra para iniciar la construcción del Palacio Municipal. La obra concluyó en 1910 mediante aportaciones de diez centavos de los ciudadanos. En la entrada al palacio se encuentra un par de murales que cuentan todo lo que es Chignahuapan, desde la leyenda prehispánica que narra su fundación hasta la tradicional danza de los Santiagueros.",
    image: "/tourist_guide/mural_cos.webp"
  },
  {
    id: "casa-del-ajolote",
    title: "Casa del Ajolote",
    subtitle: "Conservación y educación ecológica",
    category: "Naturaleza & Relax",
    badge: "Ideal para familias",
    description: "Ubicada en el centro de Chignahuapan, la Casa del Ajolote es un espacio único dedicado a la conservación y educación sobre una de las especies más fascinantes y emblemáticas de México: el ajolote.",
    image: "/tourist_guide/axolote.webp",
    secondaryImage: "/tourist_guide/casa_axolote.webp"
  },
  {
    id: "laguna-de-chignahuapan",
    title: "Laguna de Chignahuapan",
    subtitle: "Una espada relajante",
    category: "Naturaleza & Relax",
    badge: "12 min a pie / 3 min auto",
    description: "La Laguna de Chignahuapan es uno de los sitios más emblemáticos y tranquilos de la región. Rodeada por un paisaje natural que invita al descanso y la contemplación. Tiene una conexión especial con las tradiciones locales, ya que en ciertas épocas del año se realizan eventos culturales y recreativos en sus alrededores.",
    image: "/tourist_guide/laguna1.webp",
    secondaryImage: "/tourist_guide/laguna2.webp"
  },
  {
    id: "cascadas-quetzalapan",
    title: "Cascadas de Quetzalapan",
    subtitle: "Salto de agua y aventura",
    category: "Naturaleza & Relax",
    badge: "15 min de Chignahuapan",
    description: "Ubicadas a solo 15 minutos de Chignahuapan, son un impresionante atractivo natural que combina belleza, tranquilidad y aventura. Con una altura de más de 200 metros, el salto de agua crea un espectáculo visual y sonoro inigualable. El lugar cuenta con senderos y miradores para disfrutar de diferentes perspectivas.",
    tips: [
      "Ofrece actividades como tirolesa, puentes colgantes y espacios ideales para día de campo."
    ],
    image: "/tourist_guide/cascada_quet.webp",
    secondaryImage: "/tourist_guide/cascada_quet2.webp"
  },
  {
    id: "cascadas-tuliman-brisas",
    title: "Cascadas Tulimán y Las Brisas",
    subtitle: "Ecoturismo en su máxima expresión",
    category: "Naturaleza & Relax",
    badge: "Parque Ecoturístico",
    description: "Cascadas de Tulimán: Dividido en tres partes con bajada hacia cabañas y cascada (3.15 m de altura), puentes colgantes y área de tirolesa, rapel y tiro con arco. Cascadas Las Brisas: Parque ecoturístico con vista a la segunda cascada más alta de México (350 m de altura) con senderismo, tiro con arco y escalada en árbol.",
    image: "/tourist_guide/cascada_tuliman.webp",
    secondaryImage: "/tourist_guide/cascada_tuliman2.webp"
  },
  {
    id: "paseo-de-las-catrinas",
    title: "Paseo de las Catrinas",
    subtitle: "Homenaje al Día de Muertos",
    category: "Experiencias",
    badge: "Recorrido artístico",
    description: "Es un recorrido cultural y artístico ubicado en Chignahuapan que rinde homenaje a una de las tradiciones más icónicas de México: el Día de Muertos. Este pintoresco lugar destaca por sus coloridos murales y esculturas que reflejan la riqueza cultural y artística de la región.",
    image: "/tourist_guide/paseo_catrinas.webp",
  },
  {
    id: "reloj-monumental",
    title: "Reloj Monumental",
    subtitle: "Nunca es tarde para conocer Chignahuapan",
    category: "Cultura & Historia",
    badge: "Frente a la Laguna",
    description: "Se encuentra ubicado a la orilla de la Laguna de Chignahuapan, en un entorno que combina naturaleza, cultura y tranquilidad. Este imponente reloj es un símbolo del pueblo, destacando por su diseño y su ubicación estratégica frente al agua.",
    image: "/tourist_guide/reloj.webp",
  },
  {
    id: "parroquia-santiago-apostol",
    title: "Parroquia de Santiago Apóstol",
    subtitle: "Joya del barroco indígena",
    category: "Cultura & Historia",
    badge: "5 min a pie",
    description: "Construida por los franciscanos en el siglo XVIII. Destaca por su sorprendente fachada muestra del estilo barroco indígena que se caracteriza por la profusión de imágenes y decoración con motivos fitomorfos, sosteniendo cuernos de la abundancia.",
    image: "/tourist_guide/santiago.webp",
  },
  {
    id: "basilica-inmaculada-concepcion",
    title: "Basílica de la Inmaculada Concepción",
    subtitle: "Tesoro arquitectónico y espiritual",
    category: "Cultura & Historia",
    badge: "Imperdible",
    description: "Uno de los mayores tesoros de Chignahuapan. Este majestuoso recinto dedicado a la Virgen María destaca por albergar una de las esculturas religiosas bajo techo más grandes de América Latina, con una altura de más de 12 metros, tallada en madera de cedro.",
    image: "/basilica.webp"
  },
  {
    id: "santuario-del-honguito",
    title: "Santuario del Honguito",
    subtitle: "Curiosidad espiritual y fe viva",
    category: "Cultura & Historia",
    badge: "Ixtlahuaca",
    description: "Es considerado peculiar porque alberga en su interior un minúsculo hongo natural petrificado hallado en 1880, en cuya superficie se pueden apreciar diversas imágenes religiosas, entre las que destaca la de Cristo crucificado.",
    image: "/tourist_guide/santuario_honguito.webp",
  },
  {
    id: "esferas-artesanias-dulces",
    title: "Esferas, Artesanías y Dulces Típicos",
    subtitle: "El pueblo de la eterna Navidad",
    category: "Experiencias",
    badge: "Tradición Local",
    description: "Chignahuapan es famoso por su riqueza artesanal, destacándose las esferas navideñas de vidrio soplado decoradas a mano y sus dulces típicos. Estas creaciones reflejan la tradición, creatividad y destreza de los artesanos locales.",
    image: "/tourist_guide/esfera.webp",
  },
  {
    id: "gastronomia-chignahuapan",
    title: "Gastronomía Local",
    subtitle: "Si de comer rico se trata...",
    category: "Gastronomía",
    badge: "Sabores de la Sierra",
    description: "Chignahuapan se pinta solo con su gran variedad de platillos como barbacoa, chicharrón prensado, mole poblano, tlacoyo o conejo, además del tradicional pan de queso e higo.",
    tips: [
      "Los dulces de Chignahuapan son otra expresión de la tradición local con sabores que evocan las raíces del pueblo."
    ],
    image: "/tourist_guide/gastronomia.webp",
  },
  {
    id: "zacatlan-plaza-municipal",
    title: "Zacatlán: Plaza Principal y Palacio Municipal",
    subtitle: "Pueblo Mágico vecino",
    category: "Zacatlán",
    badge: "Pueblo Vecino",
    description: "Plaza Principal: Bello lugar de encuentro donde destaca su monumental reloj de cinco metros de diámetro adornado con coloridas flores. Palacio Municipal: Edificio con un sobrio estilo neoclásico de fines del siglo XIX.",
    image: "/tourist_guide/reloj_zacatlan.webp",
  },
  {
    id: "zacatlan-mirador-vitromurales",
    title: "Mirador de Cristal y Vitromurales",
    subtitle: "Vistas y arte urbano",
    category: "Zacatlán",
    badge: "Imperdible en Zacatlán",
    description: "Mirador de Cristal: A 300 m del zócalo sobre el Paseo de la Barranca, permite disfrutar de la Barranca de los Jilgueros y la cascada de Las Tres Marías. Vitromurales: 100 m de longitud compuestos por 12 grandes mosaicos en forma de manzana con piezas de cristal, talavera y espejos.",
    image: "/tourist_guide/mirador.webp",
  },
  {
    id: "zacatlan-museo-reloj-valle",
    title: "Museo del Reloj y Valle de Piedras Encimadas",
    subtitle: "Historia del tiempo y naturaleza",
    category: "Zacatlán",
    badge: "Atractivos Únicos",
    description: "Museo del Reloj: Zacatlán es cuna de relojes monumentales; el museo exhibe la historia de la medición del tiempo y ofrece show de autómatas los sábados a las 21:00 hrs. Valle de Piedras Encimadas: Parque ecoturístico de 2000 hectáreas con formaciones rocosas únicas a 25 km de Zacatlán.",
    image: "/tourist_guide/museo_reloj.webp",
  },
  {
    id: "zacatlan-parroquia-san-pedro",
    title: "Parroquia de San Pedro y San Pablo",
    subtitle: "Arquitectura histórica",
    category: "Zacatlán",
    badge: "5 min del centro",
    description: "Data del siglo XVII con fachada estilo barroco sobrio y altar blanco laminado en oro. Frente a ella se ubica el Conjunto Conventual construido entre 1562 y 1567, siendo la construcción monumental más antigua del estado.",
    image: "/tourist_guide/parroquia_sanpedro.webp",
  },
  {
    id: "zacatlan-ex-convento-franciscano",
    title: "Ex Convento Templo Franciscano",
    subtitle: "El convento en funciones más antiguo de América",
    category: "Zacatlán",
    badge: "Centro de Zacatlán",
    description: "Construido entre 1562 y 1567, es el convento en funciones más antiguo de América. En el año 1585 fue uno de los 60 conventos con que contó la provincia franciscana del Santo Evangelio de México.",
    image: "/tourist_guide/convento_franciscano.webp",
  },
  {
    id: "zacatlan-productos-artesanales",
    title: "Productos Artesanales: Sidras, Vinos y Licores",
    subtitle: "Zacatlán de las Manzanas",
    category: "Zacatlán",
    badge: "Tradición Vinícola",
    description: "Incomparables sidras, vinos de frutas (manzana, huiquiño, durazno, membrillo) y cremas de licores (café, coco, amareto). La industria de la sidra elabora más de un millón de botellas al año procesando más de 10,000 toneladas de manzanas.",
    tips: [
      "Puedes llevarte una buena dotación de las mejores sidras del país."
    ],
    image: "/tourist_guide/vinos.webp",
  },
  {
    id: "zacatlan-gastronomia",
    title: "Gastronomía de Zacatlán",
    subtitle: "Antojitos y el famoso Pan de Queso",
    category: "Gastronomía",
    badge: "Gastronomía Vecina",
    description: "Oferta de antojitos como sopes, tlacoyos, chalupas y variedad de tamales (mole, frijol, rajas y dulces). Es imprescindible probar su prestigiado pan relleno de queso y requesón, muy típico durante Día de Muertos.",
    image: "/tourist_guide/gastronomia_zacatlan.webp",
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "semana-santa",
    title: "Semana Santa",
    date: "ABRIL",
    description: "Actividades religiosas tradicionales.",
    image: "/basilica.webp"
  },
  {
    id: "festival-barbacoa-pulque",
    title: "Festival de la Barbacoa y el Pulque",
    date: "25 JUNIO",
    description: "Se celebra con una procesión que incluye fuegos pirotécnicos desde el Santuario del Honguito hasta la Parroquia de Santiago Apóstol.",
    image: "/basilica.webp"
  },
  {
    id: "aniversario-pueblo-magico",
    title: "Aniversario de Pueblo Mágico",
    date: "30 OCTUBRE",
    description: "Celebración especial del nombramiento de Chignahuapan.",
    image: "/basilica.webp"
  },
  {
    id: "club-pesca-deportiva",
    title: "Club de Pesca Deportiva Chignahuapan",
    date: "NOVIEMBRE",
    description: "Organiza cada año el Torneo Nacional de Trucha en la Laguna de Chignahuapan.",
    image: "/basilica.webp"
  },
  {
    id: "festival-luz-y-vida",
    title: "Festival de la Luz y la Vida",
    date: "1 NOVIEMBRE",
    description: "Evento sin igual con marcha de antorchas desde el centro hasta la Laguna, donde se coloca una pirámide flotante con luces fluorescentes.",
    image: "/basilica.webp"
  },
  {
    id: "feria-nacional-arbol-esfera",
    title: "Feria Nacional del Árbol y la Esfera",
    date: "ÚLT. SEM. NOVIEMBRE / PRIM. SEM. DICIEMBRE",
    description: "Una de las festividades más esperadas, con juegos mecánicos, artistas conocidos y venta artesanal.",
    image: "/basilica.webp"
  },
  {
    id: "dia-virgen-inmaculada",
    title: "Día de la Virgen Inmaculada Concepción",
    date: "08 DICIEMBRE",
    description: "Celebración patronal en honor a la Virgen de la Inmaculada Concepción.",
    image: "/basilica.webp"
  }
];