/*
 * Site Traiteur Radi : le composant de la maquette (classe Component, conçue dans le canevas Design)
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
    this.state = { lang: null, menu: false, gal: 'all', galMore: false, slide: 0, faq: 0, sent: false, err: false, form: this.blankForm() };
  }

  blankForm() {
    return { name: '', phone: '', type: '', date: '', guests: '', budget: '', msg: '' };
  }

  // Informations de l’entreprise (valeurs fictives de démonstration) : remplacer par les vraies.
  facts() {
    return {
      brand: 'Traiteur Radi',
      city: { fr: 'Casablanca', ar: 'الدار البيضاء' },
      phone: '+212 6 00 00 00 00',
      wa: '212600000000',
      email: 'contact@traiteurradi.ma',
      handle: 'traiteurradi',
      address: { fr: '[Adresse de l’atelier]', ar: '[عنوان المشغل]' },
      years: '12',
      events: '1\u00a0200',
      guests: '180\u00a0000',
      rating: '4,9',
      reviews: '120',
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
      tagline: 'Réceptions · ' + city,
      langLabel: 'Choisir la langue',
      navAria: 'Navigation principale',
      nav: [
        { id: 'prestations', label: 'Prestations' },
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
      gallery: {
        eyebrow: 'Galerie',
        title: 'Nos créations',
        intro: 'Bouchées raffinées, pastillas, plats de fête, buffets et décoration de table' + n + ': un aperçu de nos réceptions.',
        filterLabel: 'Filtrer la galerie',
        filters: { all: 'Tout', bouchees: 'Bouchées', pastillas: 'Pastillas', plats: 'Plats', buffets: 'Buffets & desserts', deco: 'Décoration' },
        insta: 'Suivre sur Instagram',
        more: 'Voir toutes les photos',
        items: ['Déclinaison foie gras à la mangue', 'Épaules d’agneau, daghmira, fruits confits et amandes', 'Céviché de dorade, sauce yuzu', 'Bouchées sur croquant au sésame noir et groseille', 'Tarte au bœuf, cheddar et crème d’herbes', 'Plateaux de fruits de mer en buffet', 'Pièce montée blanche aux roses', 'Pastillas au poulet et aux fruits de mer', 'Pastilla aux fruits de mer et langouste', 'Agneau rôti aux fruits secs et poires pochées', 'Poisson entier aux fruits de mer', 'Buffet froid' + n + ': roulés, sushis et salades', 'Pastillas fruits de mer et poulet aux noix', 'Pastilla au poulet et amandes', 'Pastillas et agneau aux poires', 'Buffet cocktail' + n + ': kebbé, sushis et feuilletés', 'Tajine d’agneau aux poires et fruits secs', 'Poulet aux citrons confits et noix de cajou', 'Plateau de fruits sculptés', 'Mignardises et macarons', 'Buffet de fruits frais', 'Petits fours sur présentoirs', 'Table d’honneur et scène des mariés', 'Salle dressée, tables rondes', 'Table d’honneur, roses rouges et chandeliers', 'Coin des mariés fleuri', 'Allée de lanternes marocaines', 'Table ronde dressée dans un riad', 'Art de la table, vaisselle dorée', 'Centre de table, roses blanches', 'Table ronde en blanc et or', 'Table impériale, roses pêche et bougies', 'Table en plein air, fleurs blanches et chandeliers']
      },
      steps: {
        eyebrow: 'Comment ça marche',
        title: 'De la première conversation au jour J',
        intro: 'Un accompagnement simple et attentif, en trois étapes.',
        cta: 'Commencer par un message',
        items: [
          { n: '01', title: 'Prise de contact', text: 'Vous nous parlez de votre événement' + n + ': date, lieu, nombre d’invités, envies. Nous revenons vers vous rapidement avec une première proposition.' },
          { n: '02', title: 'Personnalisation du menu', text: 'Menu, déroulé du service, vaisselle, décoration de table' + n + ': nous ajustons chaque détail et vous remettons le devis définitif.' },
          { n: '03', title: 'Le jour J', text: 'Notre équipe arrive en amont, dresse, cuisine et sert. Vous profitez de vos invités, nous veillons à tout le reste.' }
        ]
      },
      testi: {
        eyebrow: 'Témoignages',
        title: 'Ils nous ont confié leurs plus beaux moments',
        summary: 'Note moyenne ' + F.rating + '/5 · ' + F.reviews + ' avis clients',
        prev: 'Avis précédent',
        next: 'Avis suivant',
        goto: 'Afficher l’avis',
        note: 'Témoignages d’exemple' + n + ': site en cours de construction.',
        items: [
          { tone: 'saffron', quote: 'Nos invités parlent encore de la pastilla et du méchoui. L’équipe a tout pris en main, du cocktail jusqu’au thé de fin de soirée, avec une discrétion remarquable. Nous avons vraiment pu profiter de notre mariage.', name: 'Salma & Youssef B.', event: 'Mariage · Casablanca' },
          { tone: 'charcoal', quote: 'Pour notre soirée clients, il fallait conjuguer élégance et timing serré. Le cocktail dînatoire était à la fois raffiné et généreux, et le service d’une ponctualité parfaite.', name: 'Karim T., directeur marketing', event: 'Soirée d’entreprise' },
          { tone: 'olive', quote: 'La dégustation nous a permis d’ajuster chaque plat aux goûts de nos deux familles. Le jour J, la table était magnifique et tout s’est déroulé exactement comme prévu.', name: 'Imane E.', event: 'Fiançailles' },
          { tone: 'rose', quote: 'Un buffet sucré superbe pour les soixante ans de ma mère' + n + ': cornes de gazelle, chebakia et un entremets à la pistache dont tout le monde a redemandé la recette.', name: 'Nadia L.', event: 'Anniversaire' }
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
          { q: 'Y a-t-il un nombre minimum d’invités' + n + '?', a: 'Nos menus sont pensés à partir de ' + F.minGuests + ' invités. Pour une réception plus intime, nous composons volontiers un menu sur mesure' + n + ': parlons-en.' },
          { q: 'Peut-on organiser une dégustation' + n + '?', a: 'Oui. Une fois la date et le menu pressentis, nous vous recevons pour une dégustation dans notre atelier, jusqu’à ' + F.tastingMax + ' personnes. Elle est [offerte / déduite de la facture] en cas de signature.' },
          { q: 'Quel acompte faut-il verser pour réserver' + n + '?', a: 'La date est bloquée à réception d’un acompte de ' + F.deposit + n + '% du montant du devis' + n + '; le solde est réglé ' + F.balanceDays + ' jours avant l’événement. Les modalités de paiement sont précisées dans le devis.' },
          { q: 'Le service et la vaisselle sont-ils inclus' + n + '?', a: 'Oui' + n + ': toutes nos prestations comprennent le personnel de service, la vaisselle, les couverts, la verrerie et le nappage. Mobilier, décoration florale et éclairage peuvent être ajoutés en option.' },
          { q: 'Pouvez-vous adapter le menu à des régimes particuliers' + n + '?', a: 'Bien sûr' + n + ': végétarien, sans gluten, allergies ou menu enfant. Tous nos plats sont préparés à partir de produits frais et de saison.' },
          { q: 'Combien de temps à l’avance faut-il réserver' + n + '?', a: 'Pour un mariage, nous conseillons de nous contacter 6 à 12 mois à l’avance, surtout en haute saison. Pour un événement d’entreprise ou une réception privée, quelques semaines suffisent souvent.' }
        ]
      },
      quote: {
        eyebrow: 'Demande de devis',
        title: 'Parlons de votre événement',
        intro: 'Quelques informations suffisent pour vous préparer une proposition sur mesure. Vous préférez échanger de vive voix' + n + '? Appelez-nous ou écrivez-nous sur WhatsApp.'
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
        rights: '© 2026 ' + F.brand + ' · ' + city,
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
      tagline: 'حفلات ومناسبات · ' + city,
      langLabel: 'اختيار اللغة',
      navAria: 'القائمة الرئيسية',
      nav: [
        { id: 'prestations', label: 'الخدمات' },
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
      gallery: {
        eyebrow: 'المعرض',
        title: 'إبداعاتنا',
        intro: 'لقيمات راقية، بسطيلة، أطباق الأفراح، بوفيهات وتزيين الموائد: لمحة عن حفلاتنا.',
        filterLabel: 'تصفية المعرض',
        filters: { all: 'الكل', bouchees: 'اللقيمات', pastillas: 'البسطيلة', plats: 'الأطباق', buffets: 'البوفيهات والحلويات', deco: 'الديكور' },
        insta: 'تابعونا على إنستغرام',
        more: 'عرض كل الصور',
        items: ['فوا غرا بالمانغو', 'كتف الخروف بالدغميرة والفواكه المعسّلة واللوز', 'سيفيتشي الدنيس بصلصة اليوزو', 'لقيمات على مقرمش السمسم الأسود مع الكشمش', 'تارت باللحم البقري والشيدر وكريمة الأعشاب', 'أطباق فواكه البحر في البوفيه', 'كعكة زفاف بيضاء بالورود', 'بسطيلة الدجاج وبسطيلة فواكه البحر', 'بسطيلة فواكه البحر باللانغوست', 'خروف محمّر بالفواكه الجافة والإجاص المسلوق', 'سمك كامل بفواكه البحر', 'بوفيه بارد: لفائف وسوشي وسلطات', 'بسطيلة فواكه البحر وبسطيلة الدجاج بالجوز', 'بسطيلة الدجاج باللوز', 'بسطيلة وخروف بالإجاص', 'بوفيه كوكتيل: كبة وسوشي ومورقات', 'طاجين الخروف بالإجاص والفواكه الجافة', 'دجاج بالحامض المرقد والكاجو', 'طبق فواكه منحوتة', 'حلويات صغيرة وماكرون', 'بوفيه الفواكه الطازجة', 'حلويات صغيرة على حاملات', 'مائدة الشرف ومنصة العروسين', 'قاعة مجهّزة بموائد دائرية', 'مائدة الشرف بالورود الحمراء والشمعدانات', 'ركن العروسين المزيّن بالورود', 'ممر الفوانيس المغربية', 'مائدة دائرية في رياض', 'فن المائدة بأوانٍ مذهّبة', 'زينة المائدة بالورود البيضاء', 'مائدة دائرية بالأبيض والذهبي', 'مائدة طويلة بالورود الخوخية والشموع', 'مائدة في الهواء الطلق بالورود البيضاء والشمعدانات']
      },
      steps: {
        eyebrow: 'كيف نعمل',
        title: 'من أول محادثة إلى يوم الحفل',
        intro: 'مرافقة بسيطة ودقيقة، في ثلاث مراحل.',
        cta: 'ابدأوا برسالة',
        items: [
          { n: '01', title: 'التواصل', text: 'حدّثونا عن مناسبتكم: التاريخ والمكان وعدد الضيوف ورغباتكم. نعود إليكم باقتراح أوّلي في أقرب وقت.' },
          { n: '02', title: 'تخصيص القائمة', text: 'القائمة وسير الخدمة والأواني وزينة الموائد: نضبط كل تفصيل ونسلّمكم عرض السعر النهائي.' },
          { n: '03', title: 'يوم الحفل', text: 'يصل فريقنا مبكراً، يُعدّ الموائد ويطبخ ويقدّم. استمتعوا بضيوفكم، ونحن نتكفّل بالباقي.' }
        ]
      },
      testi: {
        eyebrow: 'آراء زبنائنا',
        title: 'وثقوا بنا في أجمل لحظاتهم',
        summary: 'متوسط التقييم ' + F.rating + '/5 · ' + F.reviews + ' رأياً من زبنائنا',
        prev: 'الرأي السابق',
        next: 'الرأي التالي',
        goto: 'عرض الرأي',
        note: 'آراء على سبيل المثال: الموقع قيد الإنشاء.',
        items: [
          { tone: 'saffron', quote: 'ما زال ضيوفنا يتحدثون عن البسطيلة والمشوي. تكفّل الفريق بكل شيء، من الكوكتيل إلى شاي آخر السهرة، بلباقة لافتة. استمتعنا حقاً بعرسنا.', name: 'سلمى ويوسف ب.', event: 'حفل زفاف · الدار البيضاء' },
          { tone: 'charcoal', quote: 'في حفلنا مع زبنائنا، كان علينا الجمع بين الأناقة والتوقيت الدقيق. جاء الكوكتيل راقياً وسخيّاً في آن واحد، والخدمة منضبطة تماماً.', name: 'كريم ت.، مدير التسويق', event: 'حفل شركة' },
          { tone: 'olive', quote: 'سمحت لنا جلسة التذوّق بضبط كل طبق على ذوق العائلتين. ويوم الحفل، كانت المائدة رائعة وجرى كل شيء كما اتفقنا تماماً.', name: 'إيمان إ.', event: 'خطوبة' },
          { tone: 'rose', quote: 'مائدة حلوة رائعة لعيد ميلاد والدتي الستين: كعب غزال وشباكية وحلوى بالفستق طلب الجميع وصفتها.', name: 'نادية ل.', event: 'عيد ميلاد' }
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
          { q: 'هل هناك حدّ أدنى لعدد الضيوف؟', a: 'قوائمنا مصمَّمة ابتداءً من ' + F.minGuests + ' ضيفاً. وللاستقبالات الأصغر، نُعدّ بكل سرور قائمة على المقاس: تواصلوا معنا.' },
          { q: 'هل يمكن تذوّق الأطباق قبل الحجز؟', a: 'نعم. بعد تحديد التاريخ والقائمة المبدئية، نستقبلكم لجلسة تذوّق في مشغلنا، لـ' + F.tastingMax + ' أشخاص كحدّ أقصى. وتكون [مجانية / مخصومة من الفاتورة] عند التوقيع.' },
          { q: 'ما قيمة العربون المطلوب للحجز؟', a: 'يُحجز التاريخ عند التوصّل بعربون قدره ' + F.deposit + '٪ من مبلغ عرض السعر، ويُسدَّد الباقي قبل الحفل بـ' + F.balanceDays + ' أيام. طرق الأداء موضّحة في عرض السعر.' },
          { q: 'هل الخدمة والأواني مشمولة؟', a: 'نعم، تشمل جميع خدماتنا طاقم الخدمة والأواني وأدوات المائدة والكؤوس والمفارش. ويمكن إضافة الأثاث والزينة بالورود والإضاءة كخيارات إضافية.' },
          { q: 'هل يمكن تكييف القائمة مع أنظمة غذائية خاصة؟', a: 'بالتأكيد: نباتي، خالٍ من الغلوتين، حساسية غذائية أو قائمة للأطفال. كل أطباقنا محضّرة بمنتجات طازجة وموسمية.' },
          { q: 'متى يجب الحجز مسبقاً؟', a: 'بالنسبة للأعراس، ننصح بالتواصل معنا قبل 6 إلى 12 شهراً، خاصة في موسم الذروة. أما مناسبات الشركات والحفلات الخاصة، فبضعة أسابيع تكفي غالباً.' }
        ]
      },
      quote: {
        eyebrow: 'طلب عرض سعر',
        title: 'حدّثونا عن مناسبتكم',
        intro: 'بضع معلومات تكفي لنُعدّ لكم اقتراحاً على المقاس. تفضّلون الحديث مباشرة؟ اتصلوا بنا أو راسلونا على واتساب.'
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

    // Photos de la galerie dans l’ordre d’affichage (g1 … g33) ; photo = numéro de la légende dans gallery.items
    const GAL = [{ photo: 32, cat: 'deco' }, { photo: 1, cat: 'bouchees' }, { photo: 8, cat: 'pastillas' }, { photo: 27, cat: 'deco' }, { photo: 2, cat: 'plats' }, { photo: 21, cat: 'buffets' }, { photo: 33, cat: 'deco' }, { photo: 7, cat: 'buffets' }, { photo: 3, cat: 'bouchees' }, { photo: 25, cat: 'deco' }, { photo: 4, cat: 'bouchees' }, { photo: 5, cat: 'bouchees' }, { photo: 6, cat: 'buffets' }, { photo: 26, cat: 'deco' }, { photo: 9, cat: 'pastillas' }, { photo: 10, cat: 'plats' }, { photo: 28, cat: 'deco' }, { photo: 11, cat: 'plats' }, { photo: 12, cat: 'buffets' }, { photo: 22, cat: 'buffets' }, { photo: 13, cat: 'pastillas' }, { photo: 29, cat: 'deco' }, { photo: 14, cat: 'pastillas' }, { photo: 15, cat: 'pastillas' }, { photo: 23, cat: 'deco' }, { photo: 16, cat: 'buffets' }, { photo: 17, cat: 'plats' }, { photo: 30, cat: 'deco' }, { photo: 18, cat: 'plats' }, { photo: 19, cat: 'buffets' }, { photo: 20, cat: 'buffets' }, { photo: 24, cat: 'deco' }, { photo: 31, cat: 'deco' }];
    const GAL_PREVIEW = 8;
    const galMatches = GAL.map((g) => st.gal === 'all' || st.gal === g.cat);
    const galTotal = galMatches.filter(Boolean).length;
    const galLimit = st.galMore ? galTotal : GAL_PREVIEW;
    let galShown = 0;
    const gal = {};
    GAL.forEach((g, i) => {
      const show = galMatches[i] && galShown < galLimit;
      if (show) galShown += 1;
      gal['g' + (i + 1)] = { cap: t.gallery.items[g.photo - 1], show: show };
    });
    const galFilters = ['all', 'bouchees', 'pastillas', 'plats', 'buffets', 'deco'].map((k) => {
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
      gal: gal,
      galCanMore: galTotal > galShown,
      galMoreLabel: t.gallery.more + ' (' + galTotal + ')',
      showMore: () => this.setState({ galMore: true }),
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
