/*
 * Site Maison Safran : le composant de la maquette (classe Component, conçue dans le canevas Design)
 * piloté ici par petite-vue. Les textes FR/AR et les infos de l’entreprise sont dans facts(), copyFr() et copyAr().
 */
class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }
}

class Component extends DCLogic {
  constructor(...args) {
    super(...args);
    this.state = { lang: null, menu: false, gal: 'all', slide: 0, faq: 0, sent: false, err: false, form: this.blankForm() };
  }

  blankForm() {
    return { name: '', phone: '', type: '', date: '', guests: '', budget: '', msg: '' };
  }

  // Informations de l’entreprise (valeurs fictives de démonstration) : remplacer par les vraies.
  facts() {
    return {
      brand: 'Maison Safran',
      city: { fr: 'Marrakech', ar: 'مراكش' },
      phone: '+212 6 00 00 00 00',
      wa: '212600000000',
      email: 'contact@maisonsafran.ma',
      handle: 'maisonsafran',
      address: { fr: '[Adresse de l’atelier]', ar: '[عنوان المشغل]' },
      years: '12',
      events: '1\u00a0200',
      guests: '180\u00a0000',
      rating: '4,9',
      reviews: '120',
      price: { essentiel: '350', prestige: '550', royal: '850' },
      minGuests: '30',
      radius: '100',
      tastingMax: '4',
      deposit: '30',
      balanceDays: '7'
    };
  }

  copyFr(F) {
    const city = F.city.fr;
    const n = ' ';
    return {
      sep: n + ': ',
      tagline: 'Traiteur · ' + city,
      langLabel: 'Choisir la langue',
      navAria: 'Navigation principale',
      nav: [
        { id: 'prestations', label: 'Prestations' },
        { id: 'formules', label: 'Formules' },
        { id: 'galerie', label: 'Galerie' },
        { id: 'deroule', label: 'Déroulé' },
        { id: 'avis', label: 'Avis' },
        { id: 'faq', label: 'FAQ' }
      ],
      cta: 'Demander un devis',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      waFloat: 'Nous écrire sur WhatsApp',
      waHello: 'Bonjour ' + F.brand + ', je souhaiterais des informations pour un événement.',
      hero: {
        eyebrow: 'Traiteur événementiel à ' + city,
        h1a: 'L’art de recevoir,',
        h1b: 'à la marocaine',
        lead: 'Mariages, fiançailles, réceptions privées et événements d’entreprise' + n + ': une cuisine marocaine de tradition, revisitée avec finesse et servie avec l’élégance que mérite chacun de vos invités.',
        wa: 'Nous contacter sur WhatsApp',
        points: ['Dégustation avant validation', 'Menus sur mesure', 'Service clé en main']
      },
      stats: ['années d’expérience', 'événements réalisés', 'invités servis', 'note moyenne de nos clients'],
      services: {
        eyebrow: 'Nos prestations',
        title: 'Une table pour chaque occasion',
        intro: 'Du dîner intime au grand mariage, nous composons une cuisine et un service à la mesure de votre événement, dans le lieu de votre choix.',
        items: [
          { type: 'mariage', tone: 'saffron', title: 'Mariages', text: 'Du henné à la grande soirée, nous orchestrons chaque temps fort' + n + ': cocktail d’accueil, dîner servi à l’assiette ou buffet royal, pièce montée et cérémonie du thé.', cta: 'Préparer mon mariage', photo: 'Réception de mariage en plein air, sous les palmiers' },
          { type: 'entreprise', tone: 'charcoal', title: 'Événements d’entreprise', text: 'Séminaires, lancements, soirées de gala ou déjeuners d’affaires' + n + ': une prestation discrète et parfaitement minutée, du cocktail dînatoire au dîner assis.', cta: 'Organiser un événement', photo: 'Buffet de bouchées pour un événement d’entreprise' },
          { type: 'privee', tone: 'olive', title: 'Réceptions privées', text: 'Fiançailles, anniversaires, baptêmes ou ftour du Ramadan' + n + ': une cuisine généreuse et un service attentionné, à domicile ou dans le lieu de votre choix.', cta: 'Recevoir chez moi', photo: 'Table dressée en terrasse au coucher du soleil' },
          { type: 'autre', tone: 'rose', title: 'Pâtisseries & sucré', text: 'Cornes de gazelle, ghriba et chebakia, mais aussi entremets, macarons et pièces montées' + n + ': un buffet sucré qui célèbre les deux rives de la Méditerranée.', cta: 'Composer mon buffet sucré', photo: 'Plateau de pâtisseries marocaines traditionnelles' }
        ]
      },
      plans: {
        eyebrow: 'Menus & formules',
        title: 'Trois façons de recevoir',
        intro: 'Chaque formule est une base de travail' + n + ': nous l’ajustons à votre nombre d’invités, à votre lieu et à vos envies lors de la dégustation.',
        from: 'à partir de',
        unit: 'DH',
        per: '/ personne',
        featured: 'Notre coup de cœur',
        cta: 'Demander un devis',
        note: 'Tarifs indicatifs par personne, établis pour un minimum de ' + F.minGuests + ' invités, hors location de salle. Chaque devis est détaillé et sans engagement.',
        items: [
          { key: 'essentiel', name: 'Essentiel', desc: 'Le meilleur de la cuisine marocaine, pour des réceptions conviviales et généreuses.', head: 'Ce qui est inclus', incl: ['Accueil avec jus frais et bouchées salées', 'Assortiment de salades marocaines', 'Tajine au choix' + n + ': poulet aux citrons confits ou kefta', 'Fruits de saison, pâtisseries maison et thé à la menthe', 'Service, vaisselle et nappage'] },
          { key: 'prestige', name: 'Prestige', desc: 'Notre formule signature pour les mariages et les grandes réceptions.', head: 'Tout l’Essentiel, plus', incl: ['Cocktail dînatoire de 8 pièces salées et sucrées', 'Pastilla poulet-amandes en entrée chaude', 'Méchoui d’agneau et tajine de veau aux pruneaux', 'Buffet de pâtisseries marocaines et françaises', 'Maître d’hôtel et cérémonie du thé en tenue'] },
          { key: 'royal', name: 'Royal', desc: 'Une expérience d’exception, pensée dans ses moindres détails.', head: 'Tout le Prestige, plus', incl: ['Ateliers live' + n + ': msemen, grillades et bar à jus', 'Pastillas aux fruits de mer et au pigeon', 'Méchoui entier découpé devant vos invités', 'Pièce montée ou wedding cake sur mesure', 'Vaisselle dorée, chandeliers et coordinateur dédié'] }
        ]
      },
      gallery: {
        eyebrow: 'Galerie',
        title: 'Nos tables en images',
        intro: 'Plats signature, buffets, décoration et service' + n + ': un aperçu de ce que nous préparons pour vos invités.',
        filterLabel: 'Filtrer la galerie',
        filters: { all: 'Tout', plats: 'Plats', buffets: 'Buffets', deco: 'Décoration', service: 'Service' },
        insta: 'Suivre sur Instagram',
        items: ['Tajine servi sur table en zellige', 'Salades marocaines et tajines', 'Table d’honneur, fleurs et cristal', 'Service du thé à la menthe', 'Bouchées du cocktail dînatoire', 'Agneau rôti et ses accompagnements', 'Chemin de table, verdure et bougies', 'Découpe à la minute devant les invités', 'Kefta grillée et légumes du marché', 'Buffet de desserts']
      },
      steps: {
        eyebrow: 'Comment ça marche',
        title: 'De la première conversation au jour J',
        intro: 'Un accompagnement simple et attentif, en quatre étapes.',
        cta: 'Commencer par un message',
        items: [
          { n: '01', title: 'Prise de contact', text: 'Vous nous parlez de votre événement' + n + ': date, lieu, nombre d’invités, envies. Nous revenons vers vous rapidement avec une première proposition.' },
          { n: '02', title: 'Dégustation', text: 'Nous vous recevons dans notre atelier pour goûter les plats pressentis, autour d’un thé. Le moment idéal pour affiner chaque saveur.' },
          { n: '03', title: 'Personnalisation du menu', text: 'Menu, déroulé du service, vaisselle, décoration de table' + n + ': nous ajustons chaque détail et vous remettons le devis définitif.' },
          { n: '04', title: 'Le jour J', text: 'Notre équipe arrive en amont, dresse, cuisine et sert. Vous profitez de vos invités, nous veillons à tout le reste.' }
        ]
      },
      testi: {
        eyebrow: 'Témoignages',
        title: 'Ils nous ont confié leurs plus beaux moments',
        summary: 'Note moyenne ' + F.rating + '/5 · ' + F.reviews + ' avis clients',
        prev: 'Avis précédent',
        next: 'Avis suivant',
        goto: 'Afficher l’avis',
        items: [
          { tone: 'saffron', quote: 'Nos invités parlent encore de la pastilla et du méchoui. L’équipe a tout pris en main, du cocktail jusqu’au thé de fin de soirée, avec une discrétion remarquable. Nous avons vraiment pu profiter de notre mariage.', name: '[Prénom & Prénom]', event: 'Mariage · [lieu, mois année]' },
          { tone: 'charcoal', quote: 'Pour notre soirée clients, il fallait conjuguer élégance et timing serré. Le cocktail dînatoire était à la fois raffiné et généreux, et le service d’une ponctualité parfaite.', name: '[Prénom N.], [Entreprise]', event: 'Soirée d’entreprise' },
          { tone: 'olive', quote: 'La dégustation nous a permis d’ajuster chaque plat aux goûts de nos deux familles. Le jour J, la table était magnifique et tout s’est déroulé exactement comme prévu.', name: '[Prénom N.]', event: 'Fiançailles' },
          { tone: 'rose', quote: 'Un buffet sucré superbe pour les soixante ans de ma mère' + n + ': cornes de gazelle, chebakia et un entremets à la pistache dont tout le monde a redemandé la recette.', name: '[Prénom N.]', event: 'Anniversaire' }
        ]
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions fréquentes',
        intro: 'Les réponses aux questions que l’on nous pose le plus souvent. Pour tout le reste, nous sommes à un message près.',
        asideTitle: 'Une autre question' + n + '?',
        asideText: 'Écrivez-nous sur WhatsApp' + n + ': nous vous répondons personnellement.',
        asideCta: 'Poser ma question',
        items: [
          { q: 'Quelle zone desservez-vous' + n + '?', a: 'Nous intervenons à ' + city + ' et dans un rayon de ' + F.radius + ' km, et partout au Maroc sur demande. Les éventuels frais de déplacement sont indiqués clairement dans le devis.' },
          { q: 'Y a-t-il un nombre minimum d’invités' + n + '?', a: 'Nos formules sont pensées à partir de ' + F.minGuests + ' invités. Pour une réception plus intime, nous composons volontiers un menu sur mesure' + n + ': parlons-en.' },
          { q: 'Peut-on organiser une dégustation' + n + '?', a: 'Oui. Une fois la date et la formule pressenties, nous vous recevons pour une dégustation dans notre atelier, jusqu’à ' + F.tastingMax + ' personnes. Elle est [offerte / déduite de la facture] en cas de signature.' },
          { q: 'Quel acompte faut-il verser pour réserver' + n + '?', a: 'La date est bloquée à réception d’un acompte de ' + F.deposit + n + '% du montant du devis' + n + '; le solde est réglé ' + F.balanceDays + ' jours avant l’événement. Les modalités de paiement sont précisées dans le devis.' },
          { q: 'Le service et la vaisselle sont-ils inclus' + n + '?', a: 'Oui' + n + ': toutes nos formules comprennent le personnel de service, la vaisselle, les couverts, la verrerie et le nappage. Mobilier, décoration florale et éclairage peuvent être ajoutés en option.' },
          { q: 'Pouvez-vous adapter le menu à des régimes particuliers' + n + '?', a: 'Bien sûr' + n + ': végétarien, sans gluten, allergies ou menu enfant. Tous nos plats sont préparés à partir de produits frais et de saison.' },
          { q: 'Combien de temps à l’avance faut-il réserver' + n + '?', a: 'Pour un mariage, nous conseillons de nous contacter 6 à 12 mois à l’avance, surtout en haute saison. Pour un événement d’entreprise ou une réception privée, quelques semaines suffisent souvent.' }
        ]
      },
      quote: {
        eyebrow: 'Demande de devis',
        title: 'Parlons de votre événement',
        intro: 'Quelques informations suffisent pour vous préparer une proposition sur mesure. Vous préférez échanger de vive voix' + n + '? Appelez-nous ou écrivez-nous sur WhatsApp.',
        tel: 'Téléphone',
        wa: 'WhatsApp',
        waV: 'Réponse rapide par message',
        mail: 'E-mail',
        visit: 'Dégustations',
        visitV: 'Sur rendez-vous à notre atelier',
        assure: ['Une réponse personnalisée', 'Un devis détaillé et sans engagement', 'Une dégustation avant validation']
      },
      form: {
        name: 'Nom complet', namePh: 'Prénom et nom',
        phone: 'Téléphone', phonePh: '06 00 00 00 00',
        type: 'Type d’événement', date: 'Date de l’événement', guests: 'Nombre d’invités', budget: 'Budget approximatif',
        msg: 'Votre message', msgPh: 'Lieu, ambiance souhaitée, plats incontournables, régimes particuliers…',
        choose: 'Choisir…',
        types: { mariage: 'Mariage', fiancailles: 'Fiançailles', entreprise: 'Événement d’entreprise', anniversaire: 'Anniversaire', privee: 'Réception privée', autre: 'Autre' },
        guestsOpts: { g1: 'Moins de 50', g2: '50 à 100', g3: '100 à 200', g4: '200 à 400', g5: 'Plus de 400' },
        budgets: { b1: 'Moins de 30 000 DH', b2: '30 000 à 60 000 DH', b3: '60 000 à 120 000 DH', b4: 'Plus de 120 000 DH', b5: 'Je ne sais pas encore' },
        submit: 'Envoyer ma demande',
        consent: 'En envoyant ce formulaire, vous acceptez d’être recontacté(e) par téléphone ou WhatsApp.',
        error: 'Merci d’indiquer votre nom, votre téléphone et le type d’événement.',
        or: 'Vous préférez aller plus vite' + n + '?',
        orLink: 'Écrire sur WhatsApp',
        okTitle: 'Merci, votre demande est bien partie.',
        okText: 'Nous revenons vers vous très vite pour en parler. Pour gagner du temps, vous pouvez aussi nous envoyer ce récapitulatif sur WhatsApp.',
        okWa: 'Envoyer le récapitulatif sur WhatsApp',
        again: 'Faire une nouvelle demande',
        about: 'Prestation souhaitée' + n + ':',
        aboutPlan: 'Formule souhaitée' + n + ':',
        waIntro: 'Bonjour ' + F.brand + ', je souhaite recevoir un devis.'
      },
      footer: {
        claim: 'Recevoir est un art. Nous en avons fait notre métier.',
        about: 'Traiteur haut de gamme à ' + city + n + ': cuisine marocaine revisitée, buffets, cocktails dînatoires et pâtisseries pour vos mariages et réceptions.',
        address: 'Adresse',
        country: 'Maroc',
        hours: 'Horaires',
        hoursList: ['Lundi – samedi' + n + ': 9h00 – 19h00', 'Dimanche' + n + ': sur rendez-vous', 'Dégustations sur réservation'],
        contact: 'Contact',
        follow: 'Suivez-nous',
        map: 'Carte Google Maps',
        mapLink: 'Itinéraire',
        rights: '© 2026 ' + F.brand + ' · Traiteur à ' + city,
        legal: 'Mentions légales',
        privacy: 'Confidentialité',
        photos: 'Photos : Unsplash'
      }
    };
  }

  copyAr(F) {
    const city = F.city.ar;
    return {
      sep: ': ',
      tagline: 'ممون حفلات · ' + city,
      langLabel: 'اختيار اللغة',
      navAria: 'القائمة الرئيسية',
      nav: [
        { id: 'prestations', label: 'الخدمات' },
        { id: 'formules', label: 'الباقات' },
        { id: 'galerie', label: 'المعرض' },
        { id: 'deroule', label: 'المراحل' },
        { id: 'avis', label: 'الآراء' },
        { id: 'faq', label: 'الأسئلة' }
      ],
      cta: 'اطلب عرض سعر',
      menuOpen: 'فتح القائمة',
      menuClose: 'إغلاق القائمة',
      waFloat: 'راسلونا على واتساب',
      waHello: 'السلام عليكم ' + F.brand + '، أرغب في الحصول على معلومات حول مناسبة.',
      hero: {
        eyebrow: 'ممون حفلات ومناسبات في ' + city,
        h1a: 'فنّ الضيافة،',
        h1b: 'على الطريقة المغربية',
        lead: 'أعراس وخطوبات وحفلات خاصة ومناسبات الشركات: مطبخ مغربي أصيل بلمسة عصرية راقية، يُقدَّم بالأناقة التي يستحقها كل ضيف من ضيوفكم.',
        wa: 'راسلونا على واتساب',
        points: ['تذوّق قبل المصادقة', 'قوائم على المقاس', 'خدمة متكاملة']
      },
      stats: ['سنة من الخبرة', 'مناسبة أنجزناها', 'ضيف خدمناه', 'متوسط تقييم زبنائنا'],
      services: {
        eyebrow: 'خدماتنا',
        title: 'مائدة لكل مناسبة',
        intro: 'من العشاء العائلي الحميم إلى حفل الزفاف الكبير، نُعدّ لكم مطبخاً وخدمة على مقاس مناسبتكم، في المكان الذي تختارونه.',
        items: [
          { type: 'mariage', tone: 'saffron', title: 'الأعراس', text: 'من ليلة الحناء إلى الحفل الكبير، ننظّم كل لحظة مميّزة: كوكتيل الاستقبال، عشاء مقدَّم في الأطباق أو بوفيه ملكي، كعكة الزفاف وطقوس الشاي.', cta: 'تحضير عرسي', photo: 'حفل زفاف في الهواء الطلق تحت أشجار النخيل' },
          { type: 'entreprise', tone: 'charcoal', title: 'مناسبات الشركات', text: 'ندوات، إطلاق منتجات، حفلات سنوية أو غداء أعمال: خدمة راقية ودقيقة في توقيتها، من الكوكتيل إلى العشاء الجالس.', cta: 'تنظيم مناسبة', photo: 'بوفيه مقبلات لمناسبة شركة' },
          { type: 'privee', tone: 'olive', title: 'الحفلات الخاصة', text: 'خطوبة، عيد ميلاد، عقيقة أو إفطار رمضاني: مطبخ سخيّ وخدمة بعناية، في بيتكم أو في المكان الذي تختارونه.', cta: 'استقبال ضيوفي', photo: 'مائدة على السطح عند غروب الشمس' },
          { type: 'autre', tone: 'rose', title: 'الحلويات والمائدة الحلوة', text: 'كعب غزال وغريبة وشباكية، وأيضاً حلويات فرنسية وماكرون وكعكات على المقاس: مائدة حلوة تحتفي بضفّتي المتوسط.', cta: 'تكوين مائدتي الحلوة', photo: 'صينية حلويات مغربية تقليدية' }
        ]
      },
      plans: {
        eyebrow: 'القوائم والباقات',
        title: 'ثلاث طرق للاستقبال',
        intro: 'كل باقة نقطة انطلاق: نكيّفها حسب عدد ضيوفكم ومكان الحفل ورغباتكم خلال جلسة التذوّق.',
        from: 'ابتداءً من',
        unit: 'درهم',
        per: '/ للشخص',
        featured: 'اختيارنا المفضّل',
        cta: 'اطلب عرض سعر',
        note: 'أسعار تقريبية للشخص الواحد، محسوبة على أساس ' + F.minGuests + ' ضيفاً على الأقل، دون احتساب كراء القاعة. كل عرض سعر مفصّل ودون أي التزام.',
        items: [
          { key: 'essentiel', name: 'الأساسية', desc: 'أفضل ما في المطبخ المغربي، لاستقبالات ودّية وسخيّة.', head: 'ما تشمله', incl: ['استقبال بالعصائر الطازجة والمملّحات', 'تشكيلة من السلطات المغربية', 'طاجين حسب الاختيار: دجاج بالحامض المرقد أو كفتة', 'فواكه الموسم وحلويات منزلية وشاي بالنعناع', 'الخدمة والأواني والمفارش'] },
          { key: 'prestige', name: 'المتميّزة', desc: 'باقتنا المميّزة للأعراس والاستقبالات الكبرى.', head: 'كل ما في الأساسية، مع', incl: ['كوكتيل من 8 قطع مالحة وحلوة', 'بسطيلة الدجاج واللوز كطبق ساخن', 'مشوي الخروف وطاجين العجل بالبرقوق', 'بوفيه حلويات مغربية وفرنسية', 'رئيس خدمة وطقوس الشاي بلباس تقليدي'] },
          { key: 'royal', name: 'الملكية', desc: 'تجربة استثنائية، مدروسة في أدقّ تفاصيلها.', head: 'كل ما في المتميّزة، مع', incl: ['ورشات مباشرة: مسمن ومشويات وركن العصائر', 'بسطيلة فواكه البحر وبسطيلة الحمام', 'خروف مشوي كامل يُقطَّع أمام ضيوفكم', 'كعكة زفاف أو قطعة مركّبة على المقاس', 'أوانٍ مذهّبة وشمعدانات ومنسّق خاص'] }
        ]
      },
      gallery: {
        eyebrow: 'المعرض',
        title: 'موائدنا بالصور',
        intro: 'أطباق مميّزة، بوفيهات، ديكور وخدمة: لمحة عمّا نُعدّه لضيوفكم.',
        filterLabel: 'تصفية المعرض',
        filters: { all: 'الكل', plats: 'الأطباق', buffets: 'البوفيهات', deco: 'الديكور', service: 'الخدمة' },
        insta: 'تابعونا على إنستغرام',
        items: ['طاجين يُقدَّم على مائدة من الزليج', 'سلطات مغربية وطواجن', 'مائدة الشرف بالورود والكريستال', 'تقديم الشاي بالنعناع', 'لقيمات الكوكتيل', 'لحم خروف مشوي ومرافقاته', 'زينة المائدة بالخضرة والشموع', 'التقطيع أمام الضيوف', 'كفتة مشوية وخضر السوق', 'بوفيه الحلويات']
      },
      steps: {
        eyebrow: 'كيف نعمل',
        title: 'من أول محادثة إلى يوم الحفل',
        intro: 'مرافقة بسيطة ودقيقة، في أربع مراحل.',
        cta: 'ابدأوا برسالة',
        items: [
          { n: '01', title: 'التواصل', text: 'حدّثونا عن مناسبتكم: التاريخ والمكان وعدد الضيوف ورغباتكم. نعود إليكم باقتراح أوّلي في أقرب وقت.' },
          { n: '02', title: 'التذوّق', text: 'نستقبلكم في مشغلنا لتذوّق الأطباق المقترحة على كأس شاي. إنها اللحظة المناسبة لضبط كل نكهة.' },
          { n: '03', title: 'تخصيص القائمة', text: 'القائمة وسير الخدمة والأواني وزينة الموائد: نضبط كل تفصيل ونسلّمكم عرض السعر النهائي.' },
          { n: '04', title: 'يوم الحفل', text: 'يصل فريقنا مبكراً، يُعدّ الموائد ويطبخ ويقدّم. استمتعوا بضيوفكم، ونحن نتكفّل بالباقي.' }
        ]
      },
      testi: {
        eyebrow: 'آراء زبنائنا',
        title: 'وثقوا بنا في أجمل لحظاتهم',
        summary: 'متوسط التقييم ' + F.rating + '/5 · ' + F.reviews + ' رأياً من زبنائنا',
        prev: 'الرأي السابق',
        next: 'الرأي التالي',
        goto: 'عرض الرأي',
        items: [
          { tone: 'saffron', quote: 'ما زال ضيوفنا يتحدثون عن البسطيلة والمشوي. تكفّل الفريق بكل شيء، من الكوكتيل إلى شاي آخر السهرة، بلباقة لافتة. استمتعنا حقاً بعرسنا.', name: '[الاسم والاسم]', event: 'حفل زفاف · [المكان، الشهر والسنة]' },
          { tone: 'charcoal', quote: 'في حفلنا مع زبنائنا، كان علينا الجمع بين الأناقة والتوقيت الدقيق. جاء الكوكتيل راقياً وسخيّاً في آن واحد، والخدمة منضبطة تماماً.', name: '[الاسم]، [الشركة]', event: 'حفل شركة' },
          { tone: 'olive', quote: 'سمحت لنا جلسة التذوّق بضبط كل طبق على ذوق العائلتين. ويوم الحفل، كانت المائدة رائعة وجرى كل شيء كما اتفقنا تماماً.', name: '[الاسم]', event: 'خطوبة' },
          { tone: 'rose', quote: 'مائدة حلوة رائعة لعيد ميلاد والدتي الستين: كعب غزال وشباكية وحلوى بالفستق طلب الجميع وصفتها.', name: '[الاسم]', event: 'عيد ميلاد' }
        ]
      },
      faq: {
        eyebrow: 'الأسئلة الشائعة',
        title: 'أسئلة تتكرّر كثيراً',
        intro: 'أجوبة عن الأسئلة التي تُطرح علينا غالباً. ولأي سؤال آخر، نحن على بُعد رسالة.',
        asideTitle: 'سؤال آخر؟',
        asideText: 'راسلونا على واتساب، وسنجيبكم شخصياً.',
        asideCta: 'اطرح سؤالك',
        items: [
          { q: 'ما هي المناطق التي تشتغلون فيها؟', a: 'نشتغل في ' + city + ' وضواحيها في حدود ' + F.radius + ' كلم، وفي باقي مدن المغرب حسب الطلب. تُذكر مصاريف التنقّل، إن وُجدت، بوضوح في عرض السعر.' },
          { q: 'هل هناك حدّ أدنى لعدد الضيوف؟', a: 'باقاتنا مصمَّمة ابتداءً من ' + F.minGuests + ' ضيفاً. وللاستقبالات الأصغر، نُعدّ بكل سرور قائمة على المقاس: تواصلوا معنا.' },
          { q: 'هل يمكن تذوّق الأطباق قبل الحجز؟', a: 'نعم. بعد تحديد التاريخ والباقة المبدئية، نستقبلكم لجلسة تذوّق في مشغلنا، لـ' + F.tastingMax + ' أشخاص كحدّ أقصى. وتكون [مجانية / مخصومة من الفاتورة] عند التوقيع.' },
          { q: 'ما قيمة العربون المطلوب للحجز؟', a: 'يُحجز التاريخ عند التوصّل بعربون قدره ' + F.deposit + '٪ من مبلغ عرض السعر، ويُسدَّد الباقي قبل الحفل بـ' + F.balanceDays + ' أيام. طرق الأداء موضّحة في عرض السعر.' },
          { q: 'هل الخدمة والأواني مشمولة؟', a: 'نعم، تشمل جميع باقاتنا طاقم الخدمة والأواني وأدوات المائدة والكؤوس والمفارش. ويمكن إضافة الأثاث والزينة بالورود والإضاءة كخيارات إضافية.' },
          { q: 'هل يمكن تكييف القائمة مع أنظمة غذائية خاصة؟', a: 'بالتأكيد: نباتي، خالٍ من الغلوتين، حساسية غذائية أو قائمة للأطفال. كل أطباقنا محضّرة بمنتجات طازجة وموسمية.' },
          { q: 'متى يجب الحجز مسبقاً؟', a: 'بالنسبة للأعراس، ننصح بالتواصل معنا قبل 6 إلى 12 شهراً، خاصة في موسم الذروة. أما مناسبات الشركات والحفلات الخاصة، فبضعة أسابيع تكفي غالباً.' }
        ]
      },
      quote: {
        eyebrow: 'طلب عرض سعر',
        title: 'حدّثونا عن مناسبتكم',
        intro: 'بضع معلومات تكفي لنُعدّ لكم اقتراحاً على المقاس. تفضّلون الحديث مباشرة؟ اتصلوا بنا أو راسلونا على واتساب.',
        tel: 'الهاتف',
        wa: 'واتساب',
        waV: 'ردّ سريع عبر الرسائل',
        mail: 'البريد الإلكتروني',
        visit: 'جلسات التذوّق',
        visitV: 'بموعد مسبق في مشغلنا',
        assure: ['ردّ شخصي على طلبكم', 'عرض سعر مفصّل ودون التزام', 'جلسة تذوّق قبل المصادقة']
      },
      form: {
        name: 'الاسم الكامل', namePh: 'الاسم والنسب',
        phone: 'الهاتف', phonePh: '06 00 00 00 00',
        type: 'نوع المناسبة', date: 'تاريخ المناسبة', guests: 'عدد الضيوف', budget: 'الميزانية التقريبية',
        msg: 'رسالتكم', msgPh: 'المكان، الأجواء المرغوبة، الأطباق الأساسية، أنظمة غذائية خاصة…',
        choose: 'اختر…',
        types: { mariage: 'حفل زفاف', fiancailles: 'خطوبة', entreprise: 'مناسبة شركة', anniversaire: 'عيد ميلاد', privee: 'حفل خاص', autre: 'أخرى' },
        guestsOpts: { g1: 'أقل من 50', g2: 'من 50 إلى 100', g3: 'من 100 إلى 200', g4: 'من 200 إلى 400', g5: 'أكثر من 400' },
        budgets: { b1: 'أقل من 30 000 درهم', b2: 'من 30 000 إلى 60 000 درهم', b3: 'من 60 000 إلى 120 000 درهم', b4: 'أكثر من 120 000 درهم', b5: 'لم أحدّد بعد' },
        submit: 'أرسل طلبي',
        consent: 'بإرسال هذا النموذج، توافقون على أن نتواصل معكم عبر الهاتف أو واتساب.',
        error: 'المرجو إدخال الاسم ورقم الهاتف ونوع المناسبة.',
        or: 'تفضّلون السرعة؟',
        orLink: 'راسلونا على واتساب',
        okTitle: 'شكراً، لقد توصّلنا بطلبكم.',
        okText: 'سنعود إليكم قريباً جداً للحديث عنه. ولربح الوقت، يمكنكم أيضاً إرسال هذا الملخّص عبر واتساب.',
        okWa: 'إرسال الملخّص عبر واتساب',
        again: 'تقديم طلب جديد',
        about: 'الخدمة المطلوبة:',
        aboutPlan: 'الباقة المطلوبة:',
        waIntro: 'السلام عليكم ' + F.brand + '، أرغب في الحصول على عرض سعر.'
      },
      footer: {
        claim: 'الضيافة فنّ، وقد جعلنا منه مهنتنا.',
        about: 'ممون حفلات راقٍ في ' + city + ': مطبخ مغربي بلمسة عصرية، بوفيهات، كوكتيلات وحلويات لأعراسكم واستقبالاتكم.',
        address: 'العنوان',
        country: 'المغرب',
        hours: 'أوقات العمل',
        hoursList: ['من الإثنين إلى السبت: 9:00 – 19:00', 'الأحد: بموعد مسبق', 'جلسات التذوّق بالحجز'],
        contact: 'اتصلوا بنا',
        follow: 'تابعونا',
        map: 'خريطة Google Maps',
        mapLink: 'المسار',
        rights: '© 2026 ' + F.brand + ' · ممون حفلات في ' + city,
        legal: 'الإشعار القانوني',
        privacy: 'سياسة الخصوصية',
        photos: 'الصور: Unsplash'
      }
    };
  }

  renderVals() {
    const F = this.facts();
    const st = this.state;
    const lang = st.lang || this.props.startLang || 'fr';
    const ar = lang === 'ar';
    const t = ar ? this.copyAr(F) : this.copyFr(F);
    const city = F.city[lang];

    const TONES = {
      saffron: ['#CF9F58', '#8A5A27'],
      honey: ['#D8B172', '#9C7136'],
      terracotta: ['#BC6E45', '#77361F'],
      clay: ['#A45A3B', '#5A2B1A'],
      olive: ['#8C9470', '#4A5238'],
      pistachio: ['#ABAA79', '#666840'],
      aubergine: ['#7D5856', '#3A2728'],
      rose: ['#C99A88', '#8B5847'],
      sand: ['#D6C29E', '#A18559'],
      charcoal: ['#5C524A', '#26211D']
    };
    const tone = (k) => 'linear-gradient(155deg, ' + TONES[k][0] + ' 0%, ' + TONES[k][1] + ' 100%)';
    const wa = (text) => 'https://wa.me/' + F.wa + '?text=' + encodeURIComponent(text);
    const prefill = (type, line) => () => this.setState((s) => ({
      menu: false,
      sent: false,
      form: Object.assign({}, s.form, { type: type || s.form.type, msg: s.form.msg ? s.form.msg : line })
    }));

    const stats = [
      { n: F.years, suf: '', l: t.stats[0], stars: false },
      { n: F.events, suf: '+', l: t.stats[1], stars: false },
      { n: F.guests, suf: '+', l: t.stats[2], stars: false },
      { n: F.rating, suf: '/5', l: t.stats[3], stars: true }
    ];

    const svc = {};
    ['mariage', 'entreprise', 'privee', 'sucre'].forEach((key, i) => {
      const s = t.services.items[i];
      svc[key] = Object.assign({}, s, { pick: prefill(s.type, t.form.about + ' ' + s.title) });
    });

    const plans = t.plans.items.map((p, i) => {
      const feat = i === 1;
      return Object.assign({}, p, {
        price: F.price[p.key],
        featured: feat,
        cls: feat ? 'ms-plan-feat' : '',
        bg: feat ? '#1F1C19' : '#FFFDF8',
        fg: feat ? '#F3ECE0' : '#26231F',
        muted: feat ? '#BDB3A3' : '#5B544B',
        line: feat ? 'rgba(243,236,224,.16)' : '#E6D9C3',
        border: feat ? '#1F1C19' : '#E6D9C3',
        shadow: feat ? '0 40px 80px -40px rgba(31,28,25,.55)' : 'none',
        gold: feat ? '#D1AE74' : '#84622E',
        btnBg: feat ? '#A9512F' : 'transparent',
        btnFg: feat ? '#FBF7F0' : '#26231F',
        btnBorder: feat ? '#A9512F' : '#26231F',
        pick: prefill('', t.form.aboutPlan + ' ' + p.name)
      });
    });

    // Catégorie de chaque photo de la galerie (g1 … g10, dans l’ordre du balisage)
    const GAL_CATS = ['plats', 'buffets', 'deco', 'service', 'buffets', 'plats', 'deco', 'service', 'plats', 'buffets'];
    const gal = {};
    GAL_CATS.forEach((cat, i) => {
      gal['g' + (i + 1)] = { cap: t.gallery.items[i], show: st.gal === 'all' || st.gal === cat };
    });
    const galFilters = ['all', 'plats', 'buffets', 'deco', 'service'].map((k) => {
      const on = st.gal === k;
      return {
        label: t.gallery.filters[k],
        pressed: on ? 'true' : 'false',
        bg: on ? '#26231F' : 'transparent',
        fg: on ? '#FBF7F0' : '#26231F',
        border: on ? '#26231F' : '#CDBA9A',
        pick: () => this.setState({ gal: k })
      };
    });

    const count = t.testi.items.length;
    const idx = ((st.slide % count) + count) % count;
    const cur = t.testi.items[idx];
    const slide = Object.assign({}, cur, { bg: tone(cur.tone) });
    const dots = t.testi.items.map((_, i) => ({
      label: t.testi.goto + ' ' + (i + 1),
      current: i === idx ? 'true' : 'false',
      w: i === idx ? '28px' : '8px',
      bg: i === idx ? '#A9512F' : '#CDBA9A',
      go: () => this.setState({ slide: i })
    }));

    const faqs = t.faq.items.map((f, i) => {
      const open = st.faq === i;
      return {
        q: f.q,
        a: f.a,
        open: open,
        closed: !open,
        expanded: open ? 'true' : 'false',
        bid: 'ms-faq-q' + i,
        pid: 'ms-faq-a' + i,
        toggle: () => this.setState((s) => ({ faq: s.faq === i ? -1 : i }))
      };
    });

    const form = st.form;
    const pickLabel = (dict, k) => (k && dict[k]) || '';
    let dateLabel = form.date;
    if (form.date) {
      try {
        dateLabel = new Date(form.date + 'T12:00:00').toLocaleDateString(ar ? 'ar-MA' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) {
        dateLabel = form.date;
      }
    }
    const recap = [
      { k: t.form.type, v: pickLabel(t.form.types, form.type) },
      { k: t.form.date, v: dateLabel },
      { k: t.form.guests, v: pickLabel(t.form.guestsOpts, form.guests) },
      { k: t.form.budget, v: pickLabel(t.form.budgets, form.budget) }
    ].filter((r) => r.v);
    const waLines = [t.form.waIntro, '']
      .concat([
        { k: t.form.name, v: form.name },
        { k: t.form.phone, v: form.phone }
      ].concat(recap).concat([{ k: t.form.msg, v: form.msg }])
        .filter((r) => r.v)
        .map((r) => '• ' + r.k + t.sep + r.v));

    return {
      t: t,
      lang: lang,
      dir: ar ? 'rtl' : 'ltr',
      brand: F.brand,
      city: city,
      phone: F.phone,
      email: F.email,
      handle: F.handle,
      address: F.address[lang],
      telHref: 'tel:+' + F.wa,
      mailHref: 'mailto:' + F.email,
      waHello: wa(t.waHello),
      waQuote: wa(waLines.join('\n')),
      instaUrl: 'https://www.instagram.com/' + F.handle + '/',
      fbUrl: 'https://www.facebook.com/' + F.handle,
      ttUrl: 'https://www.tiktok.com/@' + F.handle,
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(F.brand + ' ' + F.city.fr),

      isFr: ar ? 'false' : 'true',
      isAr: ar ? 'true' : 'false',
      frBg: ar ? 'transparent' : '#A9512F',
      frFg: ar ? 'inherit' : '#FBF7F0',
      arBg: ar ? '#A9512F' : 'transparent',
      arFg: ar ? '#FBF7F0' : 'inherit',
      setFr: () => this.setState({ lang: 'fr', menu: false }),
      setAr: () => this.setState({ lang: 'ar', menu: false }),

      menuOpen: st.menu,
      menuClosed: !st.menu,
      menuExpanded: st.menu ? 'true' : 'false',
      menuLabel: st.menu ? t.menuClose : t.menuOpen,
      headClass: st.menu ? 'ms-head ms-head-open' : 'ms-head',
      toggleMenu: () => this.setState((s) => ({ menu: !s.menu })),
      closeMenu: () => this.setState({ menu: false }),

      stats: stats,
      svc: svc,
      plans: plans,
      gal: gal,
      galFilters: galFilters,
      slide: slide,
      dots: dots,
      prevSlide: () => this.setState((s) => ({ slide: s.slide - 1 })),
      nextSlide: () => this.setState((s) => ({ slide: s.slide + 1 })),
      faqs: faqs,

      form: form,
      recap: recap,
      sent: st.sent,
      notSent: !st.sent,
      err: st.err,
      onField: (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState((s) => ({ err: false, form: Object.assign({}, s.form, { [name]: value }) }));
      },
      submit: (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const f = this.state.form;
        if (!f.name.trim() || !f.phone.trim() || !f.type) {
          this.setState({ err: true });
          return;
        }
        this.setState({ sent: true, err: false });
      },
      resetForm: () => this.setState({ sent: false, err: false, form: this.blankForm() })
    };
  }
}

(function () {
  const comp = new Component({ startLang: 'fr' });
  const store = PetiteVue.reactive({ ver: 0 });
  let cache = { ver: -1, vals: null };
  const vals = () => {
    const ver = store.ver;
    if (cache.ver !== ver) cache = { ver: ver, vals: comp.renderVals() };
    return cache.vals;
  };
  const syncDocument = () => {
    const v = vals();
    document.documentElement.lang = v.lang;
    document.documentElement.dir = v.dir;
  };
  comp.setState = function (patch) {
    const next = typeof patch === 'function' ? patch(this.state) : patch;
    this.state = Object.assign({}, this.state, next);
    store.ver += 1;
    syncDocument();
  };
  const scope = {};
  Object.keys(vals()).forEach((key) => {
    // petite-vue rebinds function values at mount: the setter ignores it, the getter always serves the fresh value.
    Object.defineProperty(scope, key, { enumerable: true, get: () => vals()[key], set: () => {} });
  });
  syncDocument();
  PetiteVue.createApp(scope).mount('#app');
})();
