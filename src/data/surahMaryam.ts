export interface WordBreakdown {
  word: string;
  transliteration: string;
  meaning: string;
  root?: string;
}

export interface Ayah {
  number: number;
  arabic: string;
  transliteration: string;
  translation: string;
  clearQuranTranslation?: string;
  tafsir: string;
  spiritualReflection: string;
  keywords: string[];
  words: WordBreakdown[];
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  style: string;
  audioFolder: string;
}

export const RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري راشد العفاسي',
    style: 'Murattal',
    audioFolder: 'Alafasy_128kbps',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    style: 'Mujawwad',
    audioFolder: 'Abdul_Basit_Mujawwad_128kbps',
  },
  {
    id: 'husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    style: 'Murattal with Tajweed',
    audioFolder: 'Husary_128kbps',
  },
  {
    id: 'minshawi',
    name: 'Mohamed Siddiq Al-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    style: 'Murattal',
    audioFolder: 'Minshawy_Murattal_128kbps',
  },
];

export const SURAH_MARYAM_INFO = {
  number: 19,
  nameArabic: 'سورة مريم',
  nameEnglish: 'Surah Maryam (Mary)',
  revelationPlace: 'Makkah',
  totalVerses: 98,
  juz: 16,
  theme: 'Divine mercy, miracles of prayer, stories of Zakariya, Maryam, Isa, and Ibrahim',
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahMeaning: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
};

export const SURAH_MARYAM_VERSES: Ayah[] = [
  {
    number: 1,
    arabic: 'كٓهيعٓصٓ',
    transliteration: "Kāf-Hā-Yā-'Ayn-Sād",
    translation: "Kaf-Ha-Ya-'Ayn-Sad.",
    clearQuranTranslation: "Kâf-Hã-Yã-’Aĩn-Sãd.",
    tafsir: "These are among the Muqatta'at (disjointed mystic letters) with which 29 Surahs of the Qur'an begin. Only Allah knows their full ultimate reality, though classical scholars note they demonstrate the miracle of the Qur'an: composed of the very Arabic alphabet people spoke, yet unmatched in majesty and divine eloquence.",
    spiritualReflection: "The disjointed letters immediately quiet our noisy human minds, inviting humble contemplation of Allah's unsearchable wisdom and the transcendent nature of revelation.",
    keywords: ['Disjointed Letters', 'Muqatta\'at', 'Eloquence', 'Miracle'],
    words: [
      { word: 'كٓهيعٓصٓ', transliteration: "Kāf-Hā-Yā-'Ayn-Sād", meaning: 'Mystic letters known to Allah' }
    ]
  },
  {
    number: 2,
    arabic: 'ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ',
    transliteration: "Dhikru rahmati Rabbika 'abdahū Zakariyyā",
    translation: "[This is] a mention of the mercy of your Lord to His servant Zechariah.",
    clearQuranTranslation: "This is a reminder of your Lord’s mercy to His servant Zachariah.",
    tafsir: "Allah consoles the Prophet Muhammad (ﷺ) by recounting how Divine Mercy enveloped His beloved servant Zakariya (peace be upon him) in his hour of utmost physical weakness and old age.",
    spiritualReflection: "Mercy (Rahmah) is paired here directly with 'His servant' ('Abduhu) — servitude to Allah is not subjugation, but the very portal through which infinite divine mercy enters our lives.",
    keywords: ['Mercy', 'Dhikr', 'Servitude', 'Zakariya'],
    words: [
      { word: 'ذِكْرُ', transliteration: 'Dhikru', meaning: 'A mention / reminder', root: 'ذ-ك-ر' },
      { word: 'رَحْمَتِ', transliteration: 'Rahmati', meaning: 'Mercy of', root: 'ر-ح-م' },
      { word: 'رَبِّكَ', transliteration: 'Rabbika', meaning: 'Your Lord', root: 'ر-ب-ب' },
      { word: 'عَبْدَهُۥ', transliteration: "'Abdahū", meaning: 'His servant', root: 'ع-ب-د' },
      { word: 'زَكَرِيَّآ', transliteration: 'Zakariyyā', meaning: 'Zechariah' }
    ]
  },
  {
    number: 3,
    arabic: 'إِذْ نَادَىٰ رَبَّهُۥ نِدَآءً خَفِيًّا',
    transliteration: "Idh nādā Rabbahū nidā'an khafiyyā",
    translation: "When he called upon his Lord with a private, secret call.",
    clearQuranTranslation: "When he cried out to his Lord secretly.",
    tafsir: "Zakariya whispered his supplication in the stillness of the sanctuary at night, away from the gaze and hearing of all humans, to preserve absolute sincere devotion (Ikhlas) and because he was asking for something humans deemed impossible.",
    spiritualReflection: "The most powerful prayers are often whispered in the silent depths of the heart. You do not need to raise your voice for the One who knows the flutter of a heartbeat before it beats.",
    keywords: ['Secret Du\'a', 'Whisper', 'Sincerity', 'Intimacy with Allah'],
    words: [
      { word: 'إِذْ', transliteration: 'Idh', meaning: 'When' },
      { word: 'نَادَىٰ', transliteration: 'Nādā', meaning: 'He called upon / cried out', root: 'ن-د-و' },
      { word: 'رَبَّهُۥ', transliteration: 'Rabbahū', meaning: 'His Lord', root: 'ر-ب-ب' },
      { word: 'نِدَآءً', transliteration: "Nidā'an", meaning: 'A call / supplication', root: 'ن-د-و' },
      { word: 'خَفِيًّا', transliteration: 'Khafiyyā', meaning: 'Secret / hidden / whispered', root: 'خ-ف-ي' }
    ]
  },
  {
    number: 4,
    arabic: 'قَالَ رَبِّ إِنِّى وَهَنَ ٱلْعَظْمُ مِنِّى وَٱشْتَعَلَ ٱلرَّأْسُ شَيْبًا وَلَمْ أَكُنۢ بِدُعَآئِكَ رَبِّ شَقِيًّا',
    transliteration: "Qāla Rabbi innī wahana al-'azmu minnī wash-ta'ala ar-ra'su shayban wa lam akun bi-du'ā'ika Rabbi shaqiyyā",
    translation: "He said, 'My Lord, indeed my bones have weakened, and my head has blossomed with white hair, and never have I been in my supplication to You, my Lord, unblessed.'",
    clearQuranTranslation: "saying, 'My Lord! Indeed, my bones have weakened, and my head has flared up with grey hair, and never have I been in my prayer to You, my Lord, disappointed.'",
    tafsir: "Zakariya articulates his utter human vulnerability: bones are the strongest foundation of the body, yet even they have grown brittle. His hair shining like a flame with silver grey is a stunning metaphor for aging. Yet he draws courage from his lifelong history with Allah: 'You have never once failed me, O my Lord!'",
    spiritualReflection: "Vulnerability before the Divine is strength. When making du'a, recount your past moments of divine grace — let your past answered prayers serve as anchors of hope for your present trials.",
    keywords: ['Vulnerability', 'Weakness', 'Hope', 'Gratitude', 'Unfailing Du\'a'],
    words: [
      { word: 'قَالَ', transliteration: 'Qāla', meaning: 'He said', root: 'ق-و-ل' },
      { word: 'رَبِّ', transliteration: 'Rabbi', meaning: 'My Lord', root: 'ر-ب-ب' },
      { word: 'إِنِّى', transliteration: 'Innī', meaning: 'Indeed I' },
      { word: 'وَهَنَ', transliteration: 'Wahana', meaning: 'Weakened / enfeebled', root: 'و-ه-ن' },
      { word: 'ٱلْعَظْمُ', transliteration: "Al-'Azmu", meaning: 'The bone', root: 'ع-ظ-م' },
      { word: 'مِنِّى', transliteration: 'Minnī', meaning: 'From me' },
      { word: 'وَٱشْتَعَلَ', transliteration: "Wash-ta'ala", meaning: 'And sparked / flared up like fire', root: 'ش-ع-ل' },
      { word: 'ٱلرَّأْسُ', transliteration: "Ar-Ra'su", meaning: 'The head', root: 'ر-أ-س' },
      { word: 'شَيْبًا', transliteration: 'Shayban', meaning: 'With greyness / white hair', root: 'ش-ي-ب' },
      { word: 'وَلَمْ أَكُنۢ', transliteration: 'Wa lam akun', meaning: 'And never have I been' },
      { word: 'بِدُعَآئِكَ', transliteration: "Bi-du'ā'ika", meaning: 'In supplication to You', root: 'د-ع-و' },
      { word: 'شَقِيًّا', transliteration: 'Shaqiyyā', meaning: 'Unblessed / wretched / disappointed', root: 'ش-ق-ي' }
    ]
  },
  {
    number: 5,
    arabic: 'وَإِنِّى خِفْتُ ٱلْمَوَٰلِىَ مِن وَرَآءِى وَكَانَتِ ٱمْرَأَتِى عَاقِرًا فَهَبْ لِى مِن لَّدُنكَ وَلِيًّا',
    transliteration: "Wa innī khiftu al-mawāliya min warā'ī wa kānat imra'atī 'āqiran fahab lī min ladunka waliyyā",
    translation: "'And indeed, I fear the successors after me, and my wife has been barren, so grant me from Yourself an heir.'",
    clearQuranTranslation: "'And I fear my kinsmen after me, since my wife is barren. So grant me from Yourself an heir.'",
    tafsir: "Zakariya's concern was not for worldly inheritance or wealth, but for the continuity of the covenant of prophethood, spiritual leadership, and guidance of the Children of Israel. Despite biological impossibility (an aged man and a lifelong barren wife), he turned to Allah's sovereign giving: 'Fahab lī min ladunka' (bestow upon me from Your very presence).",
    spiritualReflection: "When seeking blessings, align your personal desires with a higher spiritual purpose. Zakariya asked for a child not for ego, but to protect the legacy of guidance and devotion.",
    keywords: ['Legacy', 'Spiritual Heir', 'Faith over Biology', 'Pure Intention'],
    words: [
      { word: 'وَإِنِّى خِفْتُ', transliteration: 'Wa innī khiftu', meaning: 'And indeed I fear', root: 'خ-و-ف' },
      { word: 'ٱلْمَوَٰلِىَ', transliteration: 'Al-mawāliya', meaning: 'The successors / relatives', root: 'و-ل-ي' },
      { word: 'مِن وَرَآءِى', transliteration: "Min warā'ī", meaning: 'After me / behind me' },
      { word: 'وَكَانَتِ ٱمْرَأَتِى', transliteration: "Wa kānat imra'atī", meaning: 'And my wife has been' },
      { word: 'عَاقِرًا', transliteration: "'Āqiran", meaning: 'Barren / unable to bear children', root: 'ع-ق-ر' },
      { word: 'فَهَبْ لِى', transliteration: 'Fahab lī', meaning: 'So grant me as a gift', root: 'و-ه-ب' },
      { word: 'مِن لَّدُنكَ', transliteration: 'Min ladunka', meaning: 'From Yourself / from Your divine presence' },
      { word: 'وَلِيًّا', transliteration: 'Waliyyā', meaning: 'An heir / protector / guardian', root: 'و-ل-ي' }
    ]
  },
  {
    number: 6,
    arabic: 'يَرِثُنِى وَيَرِثُ مِنْ ءَالِ يَعْقُوبَ ۖ وَٱجْعَلْهُ رَبِّ رَضِيًّا',
    transliteration: "Yarithunī wa yarithu min āli Ya'qūba waj'alhu Rabbi radiyyā",
    translation: "'Who will inherit me and inherit from the family of Jacob, and make him, my Lord, pleasing [to You].'",
    clearQuranTranslation: "'who will inherit me and inherit from the family of Jacob, and make him, my Lord, pleasing [to You].'",
    tafsir: "The inheritance mentioned here is the inheritance of divine knowledge, righteousness, and spiritual wisdom passed down from Prophet Ya'qub (Jacob). Zakariya crowns his request with the highest character quality: 'Radiyya' — one whose deeds and heart are pleasing to Allah and pleasing to people.",
    spiritualReflection: "The greatest gift parents can leave the world is not real estate or status, but character, wisdom, and a pleasing soul that illuminates the community.",
    keywords: ['Inheritance of Knowledge', 'Pleasing Soul', 'Radiyya', 'Righteous Lineage'],
    words: [
      { word: 'يَرِثُنِى', transliteration: 'Yarithunī', meaning: 'He will inherit me', root: 'و-ر-ث' },
      { word: 'وَيَرِثُ', transliteration: 'Wa yarithu', meaning: 'And inherit', root: 'و-ر-ث' },
      { word: 'مِنْ ءَالِ', transliteration: 'Min āli', meaning: 'From the family/house of' },
      { word: 'يَعْقُوبَ', transliteration: "Ya'qūb", meaning: 'Jacob' },
      { word: 'وَٱجْعَلْهُ', transliteration: "Waj'alhu", meaning: 'And make him', root: 'ج-ع-ل' },
      { word: 'رَبِّ', transliteration: 'Rabbi', meaning: 'My Lord', root: 'ر-ب-ب' },
      { word: 'رَضِيًّا', transliteration: 'Radiyyā', meaning: 'Pleasing / content / approved', root: 'ر-ض-ي' }
    ]
  },
  {
    number: 7,
    arabic: 'يَـٰزَكَرِيَّآ إِنَّا نُبَشِّرُكَ بِغُلَـٰمٍ ٱسْمُهُۥ يَحْيَىٰ لَمْ نَجْعَل لَّهُۥ مِن قَبْلُ سَمِيًّا',
    transliteration: "Yā Zakariyyā innā nubash-shiruka bi-ghulāmin ismuhū Yahyā lam naj'al lahū min qablu samiyyā",
    translation: "[He was told], 'O Zechariah, indeed We give you good tidings of a boy whose name will be John (Yahya). We have not assigned to any before him this name.'",
    clearQuranTranslation: "[Allah said], 'O Zachariah! Indeed, We bring you good news of a son whose name will be John—a name We have not given to anyone before.'",
    tafsir: "Allah answers instantly from the Heavens! Not only is the prayer granted, but Allah Himself names the child: 'Yahyā' (cognate with the Arabic root meaning 'he lives' — alive with faith and piety). Allah bestowed upon him an unprecedented name and pure destiny.",
    spiritualReflection: "When Allah answers a believer's prayer, the divine bounty often exceeds every imagination. You asked for an heir; Allah sends a prophet, names him Himself, and blesses his legacy forever.",
    keywords: ['Good Tidings', 'Basharah', 'Yahya', 'Unique Divine Name'],
    words: [
      { word: 'يَـٰزَكَرِيَّآ', transliteration: 'Yā Zakariyyā', meaning: 'O Zechariah!' },
      { word: 'إِنَّا نُبَشِّرُكَ', transliteration: 'Innā nubash-shiruka', meaning: 'Indeed We give you good news', root: 'ب-ش-ر' },
      { word: 'بِغُلَـٰمٍ', transliteration: 'Bi-ghulām', meaning: 'Of a boy / youth', root: 'غ-ل-م' },
      { word: 'ٱسْمُهُۥ', transliteration: 'Ismuhū', meaning: 'His name is', root: 'س-م-و' },
      { word: 'يَحْيَىٰ', transliteration: 'Yahyā', meaning: 'John (He shall live)', root: 'ح-ي-ي' },
      { word: 'لَمْ نَجْعَل', transliteration: 'Lam naj\'al', meaning: 'We have not made', root: 'ج-ع-ل' },
      { word: 'لَّهُۥ مِن قَبْلُ', transliteration: 'Lahū min qablu', meaning: 'For him before' },
      { word: 'سَمِيًّا', transliteration: 'Samiyyā', meaning: 'Namesake / peer / equal', root: 'س-م-و' }
    ]
  },
  {
    number: 8,
    arabic: 'قَالَ رَبِّ أَنَّىٰ يَكُونُ لِى غُلَـٰمٌ وَكَانَتِ ٱمْرَأَتِى عَاقِرًا وَقَدْ بَلَغْتُ مِنَ ٱلْكِبَرِ عِتِيًّا',
    transliteration: "Qāla Rabbi annā yakūnu lī ghulāmun wa kānat imra'atī 'āqiran wa qad balaghtu mina al-kibari 'itiyyā",
    translation: "He said, 'My Lord, how will I have a boy when my wife has been barren and I have reached extreme old age?'",
    clearQuranTranslation: "Zachariah asked, 'My Lord! How can I have a son when my wife is barren, and I have become extremely old?'",
    tafsir: "This was not spoken out of doubt, but out of ecstatic astonishment, yearning for the details of how the divine miracle would manifest. 'Itiyya' signifies the dried-out withered wood of extreme old age, when bones harden and fertility naturally ceases.",
    spiritualReflection: "Human reason assesses probabilities; faith rests upon the Creator of natural laws. It is natural to feel awe when Allah's generosity eclipses earthly limits.",
    keywords: ['Awe', 'Wonder', 'Divine Overcoming of Limits', 'Itiyya'],
    words: [
      { word: 'قَالَ', transliteration: 'Qāla', meaning: 'He said', root: 'ق-و-ل' },
      { word: 'رَبِّ أَنَّىٰ', transliteration: 'Rabbi annā', meaning: 'My Lord, how?' },
      { word: 'يَكُونُ لِى', transliteration: 'Yakūnu lī', meaning: 'Can there be for me', root: 'ك-و-ن' },
      { word: 'غُلَـٰمٌ', transliteration: 'Ghulām', meaning: 'A boy', root: 'غ-ل-م' },
      { word: 'وَكَانَتِ ٱمْرَأَتِى', transliteration: "Wa kānat imra'atī", meaning: 'And my wife has been' },
      { word: 'عَاقِرًا', transliteration: "'Āqiran", meaning: 'Barren', root: 'ع-ق-ر' },
      { word: 'وَقَدْ بَلَغْتُ', transliteration: 'Wa qad balaghtu', meaning: 'And I have reached', root: 'ب-ل-غ' },
      { word: 'مِنَ ٱلْكِبَرِ', transliteration: 'Mina al-kibari', meaning: 'Of old age', root: 'ك-ب-ر' },
      { word: 'عِتِيًّا', transliteration: "'Itiyyā", meaning: 'Extreme dryness / advanced age', root: 'ع-ت-و' }
    ]
  },
  {
    number: 9,
    arabic: 'قَالَ كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَىَّ هَيِّنٌ وَقَدْ خَلَقْتُكَ مِن قَبْلُ وَلَمْ تَكُ شَيْـًٔا',
    transliteration: "Qāla kadhālika qāla Rabbuka huwa 'alayya hayyinun wa qad khalaqtuka min qablu wa lam taku shay'ā",
    translation: "[An angel] said, 'Thus [it will be]; your Lord says, 'It is easy for Me, for I created you before, when you were nothing.''",
    clearQuranTranslation: "An angel replied, 'So will it be! Your Lord says, 'It is easy for Me, just as I created you before, when you were nothing!''",
    tafsir: "The angelic messenger reminds him of Allah's majestic omnipotence. 'Huwa 'alayya hayyin' (It is effortless for Me). If Allah brought Zakariya himself into existence out of pure nothingness ('adam), how could reviving fertility in an existing human body be difficult?",
    spiritualReflection: "'Huwa 'alayya hayyin' — let this verse echo in your heart whenever an obstacle seems insurmountable. What is impossible for humans is effortless for the One who commanded the universe into being with 'Kun' (Be!).",
    keywords: ['Effortless for Allah', 'Omnipotence', 'Creation from Nothing', 'Comfort in Hardship'],
    words: [
      { word: 'قَالَ', transliteration: 'Qāla', meaning: 'He [the angel] said', root: 'ق-و-ل' },
      { word: 'كَذَٰلِكَ', transliteration: 'Kadhālik', meaning: 'Thus it will be' },
      { word: 'قَالَ رَبُّكَ', transliteration: 'Qāla Rabbuk', meaning: 'Your Lord said', root: 'ق-و-ل' },
      { word: 'هُوَ عَلَىَّ', transliteration: "Huwa 'alayya", meaning: 'It is upon Me' },
      { word: 'هَيِّنٌ', transliteration: 'Hayyin', meaning: 'Easy / effortless', root: 'ه-و-ن' },
      { word: 'وَقَدْ خَلَقْتُكَ', transliteration: 'Wa qad khalaqtuk', meaning: 'And I already created you', root: 'خ-ل-ق' },
      { word: 'مِن قَبْلُ', transliteration: 'Min qablu', meaning: 'Before' },
      { word: 'وَلَمْ تَكُ', transliteration: 'Wa lam taku', meaning: 'While you were not', root: 'ك-و-ن' },
      { word: 'شَيْـًٔا', transliteration: "Shay'ā", meaning: 'Anything at all', root: 'ش-ي-أ' }
    ]
  },
  {
    number: 10,
    arabic: 'قَالَ رَبِّ ٱجْعَل لِّىٓ ءَايَةً ۚ قَالَ ءَايَتُكَ أَلَّا تُكَلِّمَ ٱلنَّاسَ ثَلَـٰثَ لَيَالٍ سَوِيًّا',
    transliteration: "Qāla Rabbi-j'al lī āyatan qāla āyatuka allā tukallima an-nāsa thalātha layālin sawiyyā",
    translation: "[Zechariah] said, 'My Lord, make for me a sign.' He said, 'Your sign is that you will not speak to the people for three nights, [being] in sound health.'",
    clearQuranTranslation: "Zachariah said, 'My Lord! Grant me a sign.' He said, 'Your sign is that you will not speak to people for three consecutive nights, while being healthy.'",
    tafsir: "Zakariya sought a sign so he could immediately immerse himself in thanksgiving the moment conception occurred. Allah gave him a miraculous sign: his tongue would be physically unable to speak normal human speech to people, yet remain completely free and fluent to remember and glorify Allah, despite having no illness or impediment ('Sawiyya' = sound in health).",
    spiritualReflection: "The sacred discipline of silence: when profound miracles occur, our words with people quiet down so our souls can speak exclusively with our Creator.",
    keywords: ['Sign', 'Miraculous Silence', 'Remembrance', 'Sound Health'],
    words: [
      { word: 'قَالَ', transliteration: 'Qāla', meaning: 'He said', root: 'ق-و-ل' },
      { word: 'رَبِّ ٱجْعَل لِّىٓ', transliteration: "Rabbi-j'al lī", meaning: 'My Lord make for me', root: 'ج-ع-ل' },
      { word: 'ءَايَةً', transliteration: 'Āyah', meaning: 'A sign / token', root: 'أ-ي-ي' },
      { word: 'قَالَ ءَايَتُكَ', transliteration: 'Qāla āyatuk', meaning: 'He said: your sign is' },
      { word: 'أَلَّا تُكَلِّمَ', transliteration: 'Allā tukallim', meaning: 'That you will not speak to', root: 'ك-ل-م' },
      { word: 'ٱلنَّاسَ', transliteration: 'An-nās', meaning: 'The people', root: 'أ-ن-س' },
      { word: 'ثَلَـٰثَ لَيَالٍ', transliteration: 'Thalātha layālin', meaning: 'Three nights', root: 'ل-ي-ل' },
      { word: 'سَوِيًّا', transliteration: 'Sawiyyā', meaning: 'In sound health / consecutively', root: 'س-و-ي' }
    ]
  },
  {
    number: 11,
    arabic: 'فَخَرَجَ عَلَىٰ قَوْمِهِۦ مِنَ ٱلْمِحْرَابِ فَأَوْحَىٰٓ إِلَيْهِمْ أَن سَبِّحُوا۟ بُكْرَةً وَعَشِيًّا',
    transliteration: "Fakharaja 'alā qawmihī mina al-mihrābi fa'awhā ilayhim an sabbihū bukratan wa 'ashiyyā",
    translation: "So he came out to his people from the prayer chamber and signaled to them to glorify [Allah] in the morning and the evening.",
    clearQuranTranslation: "So he came out to his people from the sanctuary, signaling to them to glorify Allah morning and evening.",
    tafsir: "Filled with radiant joy from his private communion in the Mihrab (sanctuary prayer sanctuary), Zakariya emerged and communicated through gesture or writing, leading his community toward what is most beloved to Allah: unceasing Tasbih (glorification) at the dawn and evening hours.",
    spiritualReflection: "When Allah graces you with a miracle, your natural instinct should be to invite your community into collective praise and glorification of the Almighty.",
    keywords: ['Mihrab', 'Sanctuary', 'Tasbih', 'Morning and Evening'],
    words: [
      { word: 'فَخَرَجَ', transliteration: 'Fakharaja', meaning: 'So he came out', root: 'خ-ر-ج' },
      { word: 'عَلَىٰ قَوْمِهِۦ', transliteration: "'Alā qawmihī", meaning: 'To his people', root: 'ق-و-م' },
      { word: 'مِنَ ٱلْمِحْرَابِ', transliteration: 'Mina al-mihrāb', meaning: 'From the sanctuary / prayer chamber', root: 'ح-ر-ب' },
      { word: 'فَأَوْحَىٰٓ إِلَيْهِمْ', transliteration: "Fa'awhā ilayhim", meaning: 'And signaled / inspired them', root: 'و-ح-ي' },
      { word: 'أَن سَبِّحُوا۟', transliteration: 'An sabbihū', meaning: 'To glorify [Allah]', root: 'س-ب-ح' },
      { word: 'بُكْرَةً', transliteration: 'Bukratan', meaning: 'Morning / dawn', root: 'ب-ك-ر' },
      { word: 'وَعَشِيًّا', transliteration: "Wa 'ashiyyā", meaning: 'And evening', root: 'ع-ش-و' }
    ]
  },
  {
    number: 12,
    arabic: 'يَـٰيَحْيَىٰ خُذِ ٱلْكِتَـٰبَ بِقُوَّةٍ ۖ وَءَاتَيْنَـٰهُ ٱلْحُكْمَ صَبِيًّا',
    transliteration: "Yā Yahyā khudh al-kitāba bi-quwwatin wa ātaynāhu al-hukma sabiyyā",
    translation: "[Allah said], 'O John, take the Scripture with determination.' And We gave him judgement while yet a boy.",
    clearQuranTranslation: "[Allah said], 'O John! Hold firmly to the Scripture.' And We granted him wisdom while yet a child.",
    tafsir: "When Yahya grew, Allah addressed him to hold to the Torah and divine guidance with unwavering conviction, resolute will, and action. Even in his childhood, Allah granted him profound spiritual discernment, wisdom, and understanding beyond his years.",
    spiritualReflection: "Faith requires both intellectual clarity and emotional resolve ('bi-quwwatin' - with wholehearted strength). Wisdom is not merely a product of physical aging, but a divine bestowal upon a receptive soul.",
    keywords: ['Firmness', 'The Scripture', 'Wisdom in Youth', 'Piety'],
    words: [
      { word: 'يَـٰيَحْيَىٰ', transliteration: 'Yā Yahyā', meaning: 'O John!' },
      { word: 'خُذِ ٱلْكِتَـٰبَ', transliteration: 'Khudh al-kitāb', meaning: 'Take the Scripture', root: 'أ-خ-ذ' },
      { word: 'بِقُوَّةٍ', transliteration: 'Bi-quwwah', meaning: 'With strength and determination', root: 'ق-و-ي' },
      { word: 'وَءَاتَيْنَـٰهُ', transliteration: 'Wa ātaynāhu', meaning: 'And We gave him', root: 'أ-ت-ي' },
      { word: 'ٱلْحُكْمَ', transliteration: 'Al-hukm', meaning: 'Wisdom / judgment / understanding', root: 'ح-ك-م' },
      { word: 'صَبِيًّا', transliteration: 'Sabiyyā', meaning: 'As a child / boy', root: 'ص-ب-و' }
    ]
  },
  {
    number: 13,
    arabic: 'وَحَنَانًا مِّن لَّدُنَّا وَزَكَىٰةً ۖ وَكَانَ تَقِيًّا',
    transliteration: "Wa hanānan min ladunnā wa zakātan wa kāna taqiyyā",
    translation: "And affection from Us and purity, and he was devout.",
    clearQuranTranslation: "as well as compassion and purity from Us. And he was God-fearing,",
    tafsir: "Allah endowed Yahya with profound empathy and tenderness ('Hananan') toward all creatures, inner moral cleanliness ('Zakatan'), and deep awe and mindfulness of Allah ('Taqiyya').",
    spiritualReflection: "True strength in leadership is balanced with deep gentleness and compassion. Yahya combined firm adherence to the Book with tender mercy towards all people.",
    keywords: ['Compassion', 'Hanan', 'Purity', 'Taqwa'],
    words: [
      { word: 'وَحَنَانًا', transliteration: 'Wa hanānan', meaning: 'And compassion / tenderness', root: 'ح-ن-ن' },
      { word: 'مِّن لَّدُنَّا', transliteration: 'Min ladunnā', meaning: 'From Our presence' },
      { word: 'وَزَكَىٰةً', transliteration: 'Wa zakātan', meaning: 'And purity / righteousness', root: 'ز-ك-و' },
      { word: 'وَكَانَ تَقِيًّا', transliteration: 'Wa kāna taqiyyā', meaning: 'And he was God-fearing / pious', root: 'و-ق-ي' }
    ]
  },
  {
    number: 14,
    arabic: 'وَبَرًّۢا بِوَٰلِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا',
    transliteration: "Wa barran bi-wālidayhi wa lam yakun jabbāran 'asiyyā",
    translation: "And dutiful to his parents, and he was not a disobedient tyrant.",
    clearQuranTranslation: "and dutiful to his parents. He was never arrogant or rebellious.",
    tafsir: "Despite his status as a prophet and scholar, he treated his aged parents with exquisite reverence, gentleness, and honor, completely free of arrogance or rebellious defiance.",
    spiritualReflection: "One of the greatest hallmarks of genuine spirituality is how we honor our aging parents. No degree of public acclaim excuses callousness at home.",
    keywords: ['Honoring Parents', 'Birr', 'Humility', 'Gentleness'],
    words: [
      { word: 'وَبَرًّۢا', transliteration: 'Wa barran', meaning: 'And dutiful / devoted', root: 'ب-ر-ر' },
      { word: 'بِوَٰلِدَيْهِ', transliteration: 'Bi-wālidayh', meaning: 'To his parents', root: 'و-ل-د' },
      { word: 'وَلَمْ يَكُن', transliteration: 'Wa lam yakun', meaning: 'And he was not' },
      { word: 'جَبَّارًا', transliteration: 'Jabbāran', meaning: 'A tyrant / arrogant bully', root: 'ج-ب-ر' },
      { word: 'عَصِيًّا', transliteration: "'Asiyyā", meaning: 'Disobedient / rebellious', root: 'ع-ص-ي' }
    ]
  },
  {
    number: 15,
    arabic: 'وَسَلَـٰمٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا',
    transliteration: "Wa salāmun 'alayhi yawma wulida wa yawma yamūtu wa yawma yub'athu hayyā",
    translation: "And peace be upon him the day he was born and the day he dies and the day he is raised alive.",
    clearQuranTranslation: "Peace be upon him the day he was born, the day he dies, and the day he is raised back to life!",
    tafsir: "Sufyan ibn Uyaynah observed: The most desolate and vulnerable moments for any human being are three: the day he leaves the womb into an unfamiliar world, the day he departs this life to face the grave, and the day he is resurrected in the awe of the Day of Judgment. Allah secured Yahya with divine peace in all three critical transitions.",
    spiritualReflection: "Divine peace (Salam) covers the believer across eternity — at birth, at the moment of departure from this world, and at the glorious dawn of resurrection.",
    keywords: ['Peace', 'Salam', 'The Three Critical Days', 'Eternity'],
    words: [
      { word: 'وَسَلَـٰمٌ', transliteration: 'Wa salām', meaning: 'And peace / safety', root: 'س-ل-م' },
      { word: 'عَلَيْهِ', transliteration: "'Alayh", meaning: 'Upon him' },
      { word: 'يَوْمَ وُلِدَ', transliteration: 'Yawma wulid', meaning: 'The day he was born', root: 'و-ل-د' },
      { word: 'وَيَوْمَ يَمُوتُ', transliteration: 'Wa yawma yamūt', meaning: 'And the day he dies', root: 'م-و-ت' },
      { word: 'وَيَوْمَ يُبْعَثُ', transliteration: "Wa yawma yub'ath", meaning: 'And the day he is resurrected', root: 'ب-ع-ث' },
      { word: 'حَيًّا', transliteration: 'Hayyā', meaning: 'Alive', root: 'ح-ي-ي' }
    ]
  }
];

export const THEMATIC_SECTIONS = [
  {
    id: 'zakariya',
    title: 'The Prayer of Zakariya (Verses 1-11)',
    arabicTitle: 'دعاء زكريا وبشارة يحيى',
    versesRange: '1 - 11',
    description: 'The secret heartfelt prayer of Zakariya in old age, the blessing of Yahya, and the divine assurance "It is easy for Me".',
    color: 'emerald',
  },
  {
    id: 'yahya',
    title: 'The Qualities of Yahya (Verses 12-15)',
    arabicTitle: 'صفات يحيى عليه السلام',
    versesRange: '12 - 15',
    description: 'Wisdom in youth, compassion, devotion to parents, and peace upon his birth, death, and resurrection.',
    color: 'amber',
  },
  {
    id: 'maryam',
    title: 'Maryam and the Birth of Isa (Verses 16-36)',
    arabicTitle: 'مريم عليها السلام وميلاد عيسى',
    versesRange: '16 - 36',
    description: 'Maryam’s secluded devotion, the angelic visitation, the birth beneath the date palm, and baby Isa speaking in the cradle.',
    color: 'cyan',
  },
  {
    id: 'ibrahim',
    title: 'Ibrahim and his Father (Verses 41-50)',
    arabicTitle: 'دعوة إبراهيم لأبيه',
    versesRange: '41 - 50',
    description: 'Ibrahim’s tender and polite debate with his idol-worshipping father with words of gentle wisdom ("O my father").',
    color: 'purple',
  }
];

export const SUGGESTED_VOICE_TOPICS = [
  {
    title: "Secret Du'a of Zakariya",
    query: "Why did Prophet Zakariya make a secret prayer (nidā'an khafiyyā), and what can we learn from his humility?",
    verseRef: "Verse 3"
  },
  {
    title: "'It is easy for Me' (Huwa 'Alayya Hayyin)",
    query: "Explain verse 9 'Huwa 'alayya hayyin' and how it brings comfort when life feels impossible.",
    verseRef: "Verse 9"
  },
  {
    title: "Meaning of Kaf-Ha-Ya-'Ayn-Sad",
    query: "What is the wisdom behind the opening letters Kaf-Ha-Ya-'Ayn-Sad of Surah Maryam?",
    verseRef: "Verse 1"
  },
  {
    title: "The Sign of 3 Nights Silence",
    query: "Why was Zakariya's sign three nights of silence while physically healthy (sawiyya)?",
    verseRef: "Verse 10"
  },
  {
    title: "The Naming of Yahya",
    query: "Why was the name Yahya unique, and what does it signify about life, faith, and revival?",
    verseRef: "Verse 7"
  },
  {
    title: "Practice Recitation Feedback",
    query: "I'd like to recite verse 4 to you. Can you listen, reflect on its meaning, and encourage me?",
    verseRef: "Verse 4"
  }
];
