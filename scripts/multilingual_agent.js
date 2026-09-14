// scripts/multilingual_agent.js
// Master Multilingual Voice Agent & Mathematical Language Engine for Maths Universe
// Supports all 13 official languages with Natural Language Understanding,
// Speech Synthesis, Speech Recognition, Intent Recognition, Child-Friendly Pedagogy,
// Dynamic Zero-Reload UI Synchronization, and Visual Action Triggers.

export const SUPPORTED_LANGUAGES = [
  { code: 'auto', label: 'Auto Detect', native: 'Auto Detect', flag: '🌐' },
  { code: 'en-IN', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta-IN', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te-IN', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml-IN', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn-IN', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr-IN', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu-IN', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa-IN', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur-IN', label: 'Urdu', native: 'اردو', flag: '🇮🇳' },
  { code: 'or-IN', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
];

export const MATH_VOCABULARY = {
  radius: {
    en: 'Radius',
    hi: 'Radius (त्रिज्या)',
    ta: 'Radius (ஆரம்)',
    te: 'Radius (వ్యాసార్థం)',
    ml: 'Radius (ആരം)',
    kn: 'Radius (ತ್ರಿಜ್ಯ)',
    bn: 'Radius (ব্যাসার্ধ)',
    mr: 'Radius (त्रिज्या)',
    gu: 'Radius (ત્રિજ્યા)',
    pa: 'Radius (ਅਰਧ-ਵਿਆਸ)',
    ur: 'Radius (رداس)',
    or: 'Radius (ବ୍ୟାସାର୍ଦ୍ଧ)'
  },
  diameter: {
    en: 'Diameter',
    hi: 'Diameter (व्यास)',
    ta: 'Diameter (விட்டம்)',
    te: 'Diameter (వ్యాసం)',
    ml: 'Diameter (വ്യാസം)',
    kn: 'Diameter (ವ್ಯಾಸ)',
    bn: 'Diameter (ব্যাস)',
    mr: 'Diameter (व्यास)',
    gu: 'Diameter (વ્યાસ)',
    pa: 'Diameter (ਵਿਆਸ)',
    ur: 'Diameter (قطر)',
    or: 'Diameter (ବ୍ୟାସ)'
  },
  circumference: {
    en: 'Circumference',
    hi: 'Circumference (परिधि)',
    ta: 'Circumference (சுற்றளவு)',
    te: 'Circumference (పరిధి)',
    ml: 'Circumference (പരിധി)',
    kn: 'Circumference (ಪರಿಧಿ)',
    bn: 'Circumference (পরিধি)',
    mr: 'Circumference (परिघ)',
    gu: 'Circumference (પરિઘ)',
    pa: 'Circumference (ਘੇਰਾ)',
    ur: 'Circumference (محیط)',
    or: 'Circumference (ପରିଧି)'
  },
  area: {
    en: 'Area',
    hi: 'Area (क्षेत्रफल)',
    ta: 'Area (பரப்பளவு)',
    te: 'Area (వైశాల్యం)',
    ml: 'Area (വിസ്തീർണ്ണം)',
    kn: 'Area (ವಿಸ್ತೀರ್ಣ)',
    bn: 'Area (ক্ষেত্রফল)',
    mr: 'Area (क्षेत्रफळ)',
    gu: 'Area (ક્ષેત્રફળ)',
    pa: 'Area (ਖੇਤਰਫਲ)',
    ur: 'Area (رقبہ)',
    or: 'Area (କ୍ଷେତ୍ରଫଳ)'
  },
  perimeter: {
    en: 'Perimeter',
    hi: 'Perimeter (परिमाप)',
    ta: 'Perimeter (சுற்றளவு)',
    te: 'Perimeter (చుట్టుకొలత)',
    ml: 'Perimeter (ചുറ്റളവ്)',
    kn: 'Perimeter (ಸುತ್ತಳತೆ)',
    bn: 'Perimeter (পরিসীমা)',
    mr: 'Perimeter (परिमिती)',
    gu: 'Perimeter (પરિમિતિ)',
    pa: 'Perimeter (ਘੇਰਾ)',
    ur: 'Perimeter (محیط)',
    or: 'Perimeter (ପରିସୀମା)'
  },
  triangle: {
    en: 'Triangle',
    hi: 'Triangle (त्रिभुज)',
    ta: 'Triangle (முக்கோணம்)',
    te: 'Triangle (త్రిభుజం)',
    ml: 'Triangle (ത്രികോണം)',
    kn: 'Triangle (ತ್ರಿಕೋನ)',
    bn: 'Triangle (ত্রিভুজ)',
    mr: 'Triangle (त्रिकोण)',
    gu: 'Triangle (ત્રિકોણ)',
    pa: 'Triangle (ਤਿਕੋਣ)',
    ur: 'Triangle (مثلث)',
    or: 'Triangle (ତ୍ରିଭୁଜ)'
  },
  hypotenuse: {
    en: 'Hypotenuse',
    hi: 'Hypotenuse (कर्ण)',
    ta: 'Hypotenuse (கர்ணம்)',
    te: 'Hypotenuse (కర్ణం)',
    ml: 'Hypotenuse (കർണ്ണം)',
    kn: 'Hypotenuse (ಕರ್ಣ)',
    bn: 'Hypotenuse (অতিভুজ)',
    mr: 'Hypotenuse (कर्ण)',
    gu: 'Hypotenuse (કર્ણ)',
    pa: 'Hypotenuse (ਕਰਣ)',
    ur: 'Hypotenuse (وتر)',
    or: 'Hypotenuse (କର୍ଣ୍ଣ)'
  },
  angle: {
    en: 'Angle',
    hi: 'Angle (कोण)',
    ta: 'Angle (கோணம்)',
    te: 'Angle (కోణం)',
    ml: 'Angle (കോൺ)',
    kn: 'Angle (ಕೋನ)',
    bn: 'Angle (কোণ)',
    mr: 'Angle (कोण)',
    gu: 'Angle (ખૂણો)',
    pa: 'Angle (ਕੋਣ)',
    ur: 'Angle (زاویہ)',
    or: 'Angle (କୋଣ)'
  },
  equation: {
    en: 'Equation',
    hi: 'Equation (समीकरण)',
    ta: 'Equation (சமன்பாடு)',
    te: 'Equation (సమీకరణం)',
    ml: 'Equation (സമവാക്യം)',
    kn: 'Equation (ಸಮೀಕರಣ)',
    bn: 'Equation (সমীকরণ)',
    mr: 'Equation (समीकरण)',
    gu: 'Equation (સમીકરણ)',
    pa: 'Equation (ਸਮੀਕਰਨ)',
    ur: 'Equation (مساوات)',
    or: 'Equation (ସମୀକରଣ)'
  },
  proof: {
    en: 'Proof',
    hi: 'Proof (प्रमाण)',
    ta: 'Proof (நிரூபணம்)',
    te: 'Proof (నిరూపణ)',
    ml: 'Proof (തെളിവ്)',
    kn: 'Proof (ಸಾಬೀತು)',
    bn: 'Proof (প্রমাণ)',
    mr: 'Proof (सिद्धता)',
    gu: 'Proof (સાબિતી)',
    pa: 'Proof (ਸਬੂਤ)',
    ur: 'Proof (ثبوت)',
    or: 'Proof (ପ୍ରମାଣ)'
  }
};

export const UI_TRANSLATIONS = {
  langLabel: {
    en: 'LANGUAGE',
    hi: 'भाषा',
    ta: 'மொழி',
    te: 'భాష',
    ml: 'ഭാഷ',
    kn: 'ಭಾಷೆ',
    bn: 'ভাষা',
    mr: 'भाषा',
    gu: 'ભાષા',
    pa: 'ਭਾਸ਼ਾ',
    ur: 'زبان',
    or: 'ଭାଷା'
  },
  askGuideBtn: {
    en: '🎤 Ask Maths Guide',
    hi: '🎤 मैथ्स गाइड से पूछें',
    ta: '🎤 கணித வழிகாட்டியைக் கேளுங்கள்',
    te: '🎤 మ్యాథ్స్ గైడ్‌ను అడగండి',
    ml: '🎤 മാത്സ് ഗൈഡിനോട് ചോദിക്കൂ',
    kn: '🎤 ಗಣಿತ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ',
    bn: '🎤 ম্যাথস গাইডকে জিজ্ঞাসা করো',
    mr: '🎤 मॅथ्स गाईडला विचारा',
    gu: '🎤 મેથ્સ ગાઈડને પૂછો',
    pa: '🎤 ਗਣਿਤ ਗਾਈਡ ਨੂੰ ਪੁੱਛੋ',
    ur: '🎤 ریاضی گائیڈ سے پوچھیں',
    or: '🎤 ଗଣିତ ଗାଇଡକୁ ପଚାରନ୍ତୁ'
  },
  studentNotes: {
    en: '📖 Student Notes',
    hi: '📖 छात्र नोट्स',
    ta: '📖 மாணவர் குறிப்புகள்',
    te: '📖 విద్యార్థి నోట్స్',
    ml: '📖 വിദ്യാർത്ഥി കുറിപ്പുകൾ',
    kn: '📖 ವಿದ್ಯಾರ್ಥಿ ಟಿಪ್ಪಣಿಗಳು',
    bn: '📖 ছাত্র নোট',
    mr: '📖 विद्यार्थी नोट्स',
    gu: '📖 વિદ્યાર્થી નોંધ',
    pa: '📖 ਵਿਦਿਆਰਥੀ ਨੋਟਸ',
    ur: '📖 طالب علم کے نوٹس',
    or: '📖 ଛାତ୍ର ଟିପ୍ପଣୀ'
  },
  help: {
    en: '? Help',
    hi: '? सहायता',
    ta: '? உதவி',
    te: '? సహాయం',
    ml: '? സഹായം',
    kn: '? ಸಹಾಯ',
    bn: '? সাহায্য',
    mr: '? मदत',
    gu: '? મદદ',
    pa: '? ਮਦਦ',
    ur: '? مدد',
    or: '? ସାହାଯ୍ୟ'
  },
  mastered: {
    en: 'Mastered',
    hi: 'प्रवीण',
    ta: 'தேர்ச்சி',
    te: 'ప్రావీణ్యం',
    ml: 'പ്രാവീണ്യം',
    kn: 'ಪರಿಣಿತಿ',
    bn: 'পারদর্শী',
    mr: 'पारंगत',
    gu: 'પ્રવીણ',
    pa: 'ਮਾਹਿਰ',
    ur: 'ماہر',
    or: 'ଦକ୍ଷ'
  },
  mission: {
    en: 'MISSION',
    hi: 'लक्ष्य / मिशन',
    ta: 'பணி / நோக்கம்',
    te: 'లక్ష్యం',
    ml: 'ദൗത്യം',
    kn: 'ಗುರಿ',
    bn: 'মিশন',
    mr: 'ध्येय',
    gu: 'મિશન',
    pa: 'ਮਿਸ਼ਨ',
    ur: 'مشن',
    or: 'ଲକ୍ଷ୍ୟ'
  },
  analogy: {
    en: '💡 ANALOGY:',
    hi: '💡 सादृश्य:',
    ta: '💡 ஒப்புமை:',
    te: '💡 సారూప్యత:',
    ml: '💡 സാദൃശ്യം:',
    kn: '💡 ಸಾದೃಶ್ಯ:',
    bn: '💡 সাদৃশ্য:',
    mr: '💡 सादृश्य:',
    gu: '💡 ઉપમા:',
    pa: '💡 ਸਮਾਨਤਾ:',
    ur: '💡 تشبیہ:',
    or: '💡 ଉପମା:'
  },
  teacherVoice: {
    en: 'TEACHER VOICE',
    hi: 'शिक्षक की आवाज़',
    ta: 'ஆசிரியர் குரல்',
    te: 'ఉపాధ్యాయుడి స్వరం',
    ml: 'അധ്യാപകന്റെ ശബ്ദം',
    kn: 'ಶಿಕ್ಷಕರ ಧ್ವನಿ',
    bn: 'শিক্ষকের কণ্ঠ',
    mr: 'शिक्षकांचा आवाज',
    gu: 'શિક્ષકનો અવાજ',
    pa: 'ਅਧਿਆਪਕ ਦੀ ਆਵਾਜ਼',
    ur: 'استاد کی آواز',
    or: 'ଶିକ୍ଷକଙ୍କ ସ୍ୱର'
  },
  listen: {
    en: '🔊 Listen',
    hi: '🔊 सुनें',
    ta: '🔊 கேளுங்கள்',
    te: '🔊 వినండి',
    ml: '🔊 കേൾക്കൂ',
    kn: '🔊 ಕೇಳಿ',
    bn: '🔊 শুনুন',
    mr: '🔊 ऐका',
    gu: '🔊 સાંભળો',
    pa: '🔊 ਸੁਣੋ',
    ur: '🔊 سنیں',
    or: '🔊 ଶୁଣନ୍ତୁ'
  },
  speaking: {
    en: '🔊 Speaking...',
    hi: '🔊 बोल रहा है...',
    ta: '🔊 பேசுகிறது...',
    te: '🔊 మాట్లాడుతోంది...',
    ml: '🔊 സംസാരിക്കുന്നു...',
    kn: '🔊 ಮಾತನಾಡುತ್ತಿದೆ...',
    bn: '🔊 বলছে...',
    mr: '🔊 बोलत आहे...',
    gu: '🔊 બોલે છે...',
    pa: '🔊 ਬੋਲ ਰਿਹਾ ਹੈ...',
    ur: '🔊 بول رہا ہے...',
    or: '🔊 କହୁଛି...'
  },
  dragToScrub: {
    en: '↔ Drag to Scrub',
    hi: '↔ आगे-पीछे करने के लिए खींचें',
    ta: '↔ நகர்த்த இழுக்கவும்',
    te: '↔ స్క్రబ్ చేయడానికి లాగండి',
    ml: '↔ സ്ക്രബ് ചെയ്യാൻ വലിക്കുക',
    kn: '↔ ಸ್ಕ್ರಬ್ ಮಾಡಲು ಎಳೆಯಿರಿ',
    bn: '↔ স্ক্রাব করতে টানুন',
    mr: '↔ स्क्रोल करण्यासाठी ड्रॅग करा',
    gu: '↔ સ્ક્રોલ કરવા ખેંચો',
    pa: '↔ ਸਕ੍ਰੌਲ ਕਰਨ ਲਈ ਖਿੱਚੋ',
    ur: '↔ آگے پیچھے کرنے کے لیے گھسیٹیں',
    or: '↔ ସ୍କ୍ରବ୍ କରିବାକୁ ଟାଣନ୍ତୁ'
  },
  stage1: {
    en: 'Stage 1: Initial Setup',
    hi: 'चरण 1: प्रारंभिक स्थिति',
    ta: 'நிலை 1: தொடக்க நிலை',
    te: 'దశ 1: ప్రారంభ అమరిక',
    ml: 'ഘട്ടം 1: പ്രാരംഭ ഘട്ടം',
    kn: 'ಹಂತ 1: ಆರಂಭಿಕ ಸೆಟಪ್',
    bn: 'ধাপ ১: প্রাথমিক অবস্থা',
    mr: 'पायरी १: प्रारंभिक स्थिती',
    gu: 'તબક્કો ૧: પ્રારંભિક સ્થિતિ',
    pa: 'ਪੜਾਅ 1: ਸ਼ੁਰੂਆਤੀ ਸਥਿਤੀ',
    ur: 'مرحلہ 1: ابتدائی ترتیب',
    or: 'ପର୍ଯ୍ୟାୟ ୧: ପ୍ରାରମ୍ଭିକ ସ୍ଥିତି'
  },
  stage2: {
    en: 'Stage 2: Transformation',
    hi: 'चरण 2: रूपांतरण',
    ta: 'நிலை 2: மாற்றம் / மறுசீரமைப்பு',
    te: 'దశ 2: రూపాంతరం',
    ml: 'ഘട്ടം 2: രൂപാന്തരീകരണം',
    kn: 'ಹಂತ 2: ರೂಪಾಂತರ',
    bn: 'ধাপ ২: রূপান্তর',
    mr: 'पायरी २: रूपांतर',
    gu: 'તબક્કો ૨: રૂપાંતરણ',
    pa: 'ਪੜਾਅ 2: ਰੂਪਾਂਤਰਨ',
    ur: 'مرحلہ 2: تبدیلی',
    or: 'ପର୍ଯ୍ୟାୟ ୨: ରୂପାନ୍ତର'
  },
  stage3: {
    en: 'Stage 3: Verified Invariant',
    hi: 'चरण 3: सिद्ध नियम',
    ta: 'நிலை 3: நிரூபிக்கப்பட்ட மாறிலி',
    te: 'దశ 3: ధృవీకరించిన నియమం',
    ml: 'ഘട്ടം 3: തെളിയിക്കപ്പെട്ട സ്ഥിരാങ്കം',
    kn: 'ಹಂತ 3: ಸಾಬೀತಾದ ನಿಯಮ',
    bn: 'ধাপ ৩: প্রমাণিত ধ্রুবক',
    mr: 'पायरी ३: सिद्ध नियम',
    gu: 'તબક્કો ૩: સાબિત નિયમ',
    pa: 'ਪੜਾਅ 3: ਸਾਬਤ ਨਿਯਮ',
    ur: 'مرحلہ 3: تصدیق شدہ مستقل',
    or: 'ପର୍ଯ୍ୟାୟ ୩: ପ୍ରମାଣିତ ଅପରିବର୍ତ୍ତନୀୟ'
  },
  play: {
    en: 'Play',
    hi: 'चलाएं',
    ta: 'இயக்கு',
    te: 'ప్లే',
    ml: 'പ്ലേ ചെയ്യൂ',
    kn: 'ಪ್ಲೇ',
    bn: 'চালাও',
    mr: 'सुरू करा',
    gu: 'ચલાવો',
    pa: 'ਚਲਾਓ',
    ur: 'چلائیں',
    or: 'ଚଲାନ୍ତୁ'
  },
  pause: {
    en: 'Pause',
    hi: 'रोकें',
    ta: 'நிறுத்து',
    te: 'పాజ్',
    ml: 'നിർത്തൂ',
    kn: 'ವಿರಾಮ',
    bn: 'থামাও',
    mr: 'थांबवा',
    gu: 'અટકાવો',
    pa: 'ਰੋਕੋ',
    ur: 'روکیں',
    or: 'ଅଟକାନ୍ତୁ'
  },
  loop: {
    en: '🔁 Loop',
    hi: '🔁 दोहराव',
    ta: '🔁 தொடர் சுழற்சி',
    te: '🔁 లూప్',
    ml: '🔁 ലൂപ്പ്',
    kn: '🔁 ಲೂಪ್',
    bn: '🔁 লুপ',
    mr: '🔁 लूप',
    gu: '🔁 લૂપ',
    pa: '🔁 ਲੂਪ',
    ur: '🔁 لوپ',
    or: '🔁 ଲୁପ୍'
  },
  voiceToggleOn: {
    en: '🗣️ Voice: ON',
    hi: '🗣️ आवाज़: चालू',
    ta: '🗣️ குரல்: இயக்கத்தில்',
    te: '🗣️ స్వరం: ఆన్',
    ml: '🗣️ ശബ്ദം: ഓൺ',
    kn: '🗣️ ಧ್ವನಿ: ಆನ್',
    bn: '🗣️ কণ্ঠ: চালু',
    mr: '🗣️ आवाज: चालू',
    gu: '🗣️ અવાજ: ચાલુ',
    pa: '🗣️ ਆਵਾਜ਼: ਚਾਲੂ',
    ur: '🗣️ آواز: آن',
    or: '🗣️ ସ୍ୱର: ଅନ୍'
  },
  voiceToggleOff: {
    en: '🗣️ Voice: OFF',
    hi: '🗣️ आवाज़: बंद',
    ta: '🗣️ குரல்: நிறுத்தப்பட்டது',
    te: '🗣️ స్వరం: ఆఫ్',
    ml: '🗣️ ശബ്ദം: ഓഫ്',
    kn: '🗣️ ಧ್ವನಿ: ಆಫ್',
    bn: '🗣️ কণ্ঠ: বন্ধ',
    mr: '🗣️ आवाज: बंद',
    gu: '🗣️ અવાજ: બંધ',
    pa: '🗣️ ਆਵਾਜ਼: ਬੰਦ',
    ur: '🗣️ آواز: آف',
    or: '🗣️ ସ୍ୱର: ଅଫ୍'
  },
  ghost: {
    en: 'Ghost outlines',
    hi: 'काल्पनिक रूपरेखा',
    ta: 'நிழல் கோடுகள்',
    te: 'రూపరేఖలు',
    ml: 'ഔട്ട്ലൈനുകൾ',
    kn: 'ರೂಪರೇಖೆಗಳು',
    bn: 'রূপরেখা',
    mr: 'बाह्यरेखा',
    gu: 'બાહ્યરેખા',
    pa: 'ਰੂਪਰੇਖਾ',
    ur: 'خاکہ',
    or: 'ରୂପରେଖା'
  },
  snap: {
    en: 'Snap guides',
    hi: 'स्नैप गाइड',
    ta: 'சீரமைப்பு வழிகாட்டிகள்',
    te: 'స్నాప్ గైడ్లు',
    ml: 'സ്നാപ്പ് ഗൈഡുകൾ',
    kn: 'ಸ್ನ್ಯಾಪ್ ಮಾರ್ಗದರ್ಶಿಗಳು',
    bn: 'স্ন্যাপ গাইড',
    mr: 'स्नॅप मार्गदर्शक',
    gu: 'સ્નેપ ગાઇડ',
    pa: 'ਸਨੈਪ ਗਾਈਡ',
    ur: 'سنیپ گائیڈ',
    or: 'ସ୍ନାପ୍ ଗାଇଡ୍'
  },
  areaLock: {
    en: 'Equal-area lock',
    hi: 'समान क्षेत्रफल लॉक',
    ta: 'சம பரப்பு பூட்டு',
    te: 'సమాన వైశాల్య లాక్',
    ml: 'തുല്യ വിസ്തീർണ്ണ ലോക്ക്',
    kn: 'ಸಮಾನ ವಿಸ್ತೀರ್ಣ ಲಾಕ್',
    bn: 'সমান ক্ষেত্রফল লক',
    mr: 'समान क्षेत्रफळ लॉक',
    gu: 'સમાન ક્ષેત્રફળ લૉક',
    pa: 'ਬਰਾਬਰ ਖੇਤਰਫਲ ਲਾਕ',
    ur: 'برابر رقبہ لاک',
    or: 'ସମାନ କ୍ଷେତ୍ରଫଳ ଲକ୍'
  },
  inspector: {
    en: '🔬 X-Ray',
    hi: '🔬 एक्स-रे',
    ta: '🔬 எக்ஸ்ரே',
    te: '🔬 ఎక్స్-రే',
    ml: '🔬 എക്സ്-റേ',
    kn: '🔬 ಎಕ್ಸ್-ರೇ',
    bn: '🔬 এক্স-রে',
    mr: '🔬 क्ष-किरण',
    gu: '🔬 એક્સ-રે',
    pa: '🔬 ਐਕਸ-ਰੇ',
    ur: '🔬 ایکس رے',
    or: '🔬 ଏକ୍ସ-ରେ'
  },
  reset: {
    en: '↺ Reset',
    hi: '↺ रीसेट',
    ta: '↺ மீட்டமை',
    te: '↺ రీసెట్',
    ml: '↺ റീസെറ്റ്',
    kn: '↺ ಮರುಹೊಂದಿಸಿ',
    bn: '↺ রিসেট',
    mr: '↺ रीसेट',
    gu: '↺ રીસેટ',
    pa: '↺ ਰੀਸੈਟ',
    ur: '↺ دوبارہ ترتیب دیں',
    or: '↺ ରିସେଟ୍'
  },
  whyItWorks: {
    en: 'Why It Works',
    hi: 'यह कैसे काम करता है?',
    ta: 'இது எவ்வாறு செயல்படுகிறது?',
    te: 'ఇది ఎందుకు పనిచేస్తుంది?',
    ml: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു?',
    kn: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
    bn: 'এটি কীভাবে কাজ করে?',
    mr: 'हे कसे कार्य करते?',
    gu: 'આ કેવી રીતે કાર્ય કરે છે?',
    pa: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?',
    ur: 'یہ کیسے کام کرتا ہے؟',
    or: 'ଏହା କିପରି କାମ କରେ?'
  },
  predTitle: {
    en: 'PREDICTION CHALLENGE',
    hi: 'भविष्यवाणी चुनौती',
    ta: 'கணிப்பு சவால்',
    te: 'అంచనా సవాలు',
    ml: 'പ്രവചന വെല്ലുവിളി',
    kn: 'ಮುನ್ಸೂಚನೆ ಸವಾಲು',
    bn: 'ভবিষ্যদ্বাণী চ্যালেঞ্জ',
    mr: 'अंदाज आव्हान',
    gu: 'અનુમાન પડકાર',
    pa: 'ਭਵਿੱਖਬਾਣੀ ਚੁਣੌਤੀ',
    ur: 'پیشین گوئی چیلنج',
    or: 'ଭବିଷ୍ୟବାଣୀ ଚ୍ୟାଲେଞ୍ଜ'
  },
  correctFeedback: {
    en: 'Correct! Outstanding discovery! ⭐',
    hi: 'बिलकुल सही! शानदार खोज! ⭐',
    ta: 'சரி! அருமையான கண்டுபிடிப்பு! ⭐',
    te: 'సరియైనది! అద్భుతమైన ఆవిష్కరణ! ⭐',
    ml: 'ശരിയാണ്! മികച്ച കണ്ടെത്തൽ! ⭐',
    kn: 'ಸರಿ! ಅದ್ಭುತ ಆವಿಷ್ಕಾರ! ⭐',
    bn: 'সঠিক! দারুণ আবিষ্কার! ⭐',
    mr: 'बरोबर! उत्तम शोध! ⭐',
    gu: 'સાચું! અદ્ભુત શોધ! ⭐',
    pa: 'ਸਹੀ! ਸ਼ਾਨਦਾਰ ਖੋਜ! ⭐',
    ur: 'درست! شاندار دریافت! ⭐',
    or: 'ସଠିକ୍! ଚମତ୍କାର ଆବିଷ୍କାର! ⭐'
  },
  wrongFeedback: {
    en: "Almost! Let's look at this part again.",
    hi: 'लगभग! आइए इस हिस्से को फिर से देखें।',
    ta: 'கிட்டத்தட்ட சரி! இந்த பகுதியை மீண்டும் பார்ப்போம்.',
    te: 'దాదాపు దగ్గరగా వచ్చారు! ఈ భాగాన్ని మళ్ళీ చూద్దాం.',
    ml: 'ഏതാണ്ട് ശരിയായി! ഈ ഭാഗം വീണ്ടും നോക്കാം.',
    kn: 'ಬಹುತೇಕ ಸರಿ! ಈ ಭಾಗವನ್ನು ಮತ್ತೆ ನೋಡೋಣ.',
    bn: 'প্রায় কাছাকাছি! আসুন এই অংশটি আবার দেখি।',
    mr: 'जवळजवळ बरोबर! चला हा भाग पुन्हा पाहूया.',
    gu: 'લગભગ સાચું! ચાલો આ ભાગ ફરી જોઈએ.',
    pa: 'ਲਗਭਗ ਨੇੜੇ! ਆਓ ਇਸ ਹਿੱਸੇ ਨੂੰ ਦੁਬਾਰਾ ਵੇਖੀਏ।',
    ur: 'تقریباً درست! آئیے اس حصے کو دوبارہ دیکھتے ہیں۔',
    or: 'ପ୍ରାୟ ପାଖାପାଖି! ଆସନ୍ତୁ ଏହି ଅଂଶକୁ ପୁଣି ଥରେ ଦେଖିବା।'
  },
  allStagesCompleted: {
    en: 'All 3 Stages Completed! ✨',
    hi: 'सभी 3 चरण पूर्ण! ✨',
    ta: 'அனைத்து 3 நிலைகளும் நிறைவடைந்தன! ✨',
    te: 'అన్ని 3 దశలు పూర్తయ్యాయి! ✨',
    ml: 'എല്ലാ 3 ഘട്ടങ്ങളും പൂർത്തിയായി! ✨',
    kn: 'ಎಲ್ಲಾ 3 ಹಂತಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ! ✨',
    bn: 'সব ৩টি ধাপ সম্পন্ন! ✨',
    mr: 'सर्व ३ पायऱ्या पूर्ण! ✨',
    gu: 'બધા ૩ તબક્કા પૂર્ણ! ✨',
    pa: 'ਸਾਰੇ 3 ਪੜਾਅ ਮੁਕੰਮਲ! ✨',
    ur: 'تمام 3 مراحل مکمل! ✨',
    or: 'ସମସ୍ତ ୩ ପର୍ଯ୍ୟାୟ ସମାପ୍ତ! ✨'
  },
  micUnavailable: {
    en: 'Voice input is unavailable in this browser. You can type your question.',
    hi: 'इस ब्राउज़र में वॉयस इनपुट उपलब्ध नहीं है। आप अपना प्रश्न टाइप कर सकते हैं।',
    ta: 'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. உங்கள் கேள்வியை தட்டச்சு செய்யலாம்.',
    te: 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. మీరు మీ ప్రశ్నను టైప్ చేయవచ్చు.',
    ml: 'ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് ലഭ്യമല്ല. നിങ്ങൾക്ക് ചോദ്യം ടൈപ്പ് ചെയ്യാം.',
    kn: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಬಹುದು.',
    bn: 'এই ব্রাউজারে ভয়েস ইনপুট অনুপলব্ধ। আপনি প্রশ্ন টাইপ করতে পারেন।',
    mr: 'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. आपण आपला प्रश्न टाइप करू शकता.',
    gu: 'આ બ્રાઉઝરમાં વૉઇસ ઇનપુટ ઉપલબ્ધ નથી. તમે તમારો પ્રશ્ન ટાઇપ કરી શકો છો.',
    pa: 'ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਇਨਪੁਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਤੁਸੀਂ ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰ ਸਕਦੇ ਹੋ।',
    ur: 'اس براؤزر میں صوتی ان پٹ دستیاب نہیں ہے۔ آپ اپنا سوال ٹائپ کر سکتے ہیں۔',
    or: 'ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଇନପୁଟ୍ ଉପଲବ୍ଧ ନାହିଁ। ଆପଣ ନିଜ ପ୍ରଶ୍ନ ଟାଇପ୍ କରିପାରିବେ।'
  }
};

// Natural Language Intent Engine Definitions
export const INTENT_PATTERNS = [
  {
    intent: 'EXPLAIN_CONCEPT',
    keywords: [
      'explain', 'describe', 'tell me', 'how does', 'what is', 'teach',
      'விளக்கு', 'விளக்குங்கள்', 'விளக்க', 'சொல்லுங்கள்', 'இது என்ன', 'சொல்லித்தா',
      'समझाओ', 'बताओ', 'यह क्या है', 'समझा दीजिए', 'सिखाओ', 'एक्सप्लेन',
      'వివరించండి', 'చెప్పండి', 'ఇది ఏమిటి', 'నేర్పించండి',
      'വിശദീകരിക്കൂ', 'പറഞ്ഞു തരൂ', 'എന്താണ്',
      'ವಿವರಿಸಿ', 'ಹೇಳಿ', 'ಇದು ಏನು',
      'বোঝাও', 'ব্যাখ্যা', 'এটা কি',
      'समजावून सांगा', 'हे काय आहे',
      'સમજાવો', 'આ શું છે',
      'ਸਮਝਾਓ', 'ਇਹ ਕੀ ਹੈ',
      'سمجھائیں', 'بتائیں', 'یہ کیا ہے',
      'ବୁଝାନ୍ତୁ', 'ଏହା କଣ'
    ]
  },
  {
    intent: 'WHY_CONCEPT',
    keywords: [
      'why', 'reason', 'why is this', 'why does', 'how come',
      'ஏன்', 'எதனால்', 'எதற்காக', 'காரணம்',
      'क्यों', 'ऐसा क्यों', 'क्यों हो रहा', 'वजह क्या है',
      'ఎందుకు', 'కారణం',
      'എന്തുകൊണ്ട്', 'എന്തുകൊണ്ടാണ്',
      'ಏಕೆ', 'ಯಾಕೆ',
      'কেন', 'কারণ',
      'का', 'कशासाठी',
      'શા માટે', 'કેમ',
      'ਕਿਉਂ',
      'کیوں', 'وجہ کیا ہے',
      'କାହିଁକି'
    ]
  },
  {
    intent: 'CHANGE_SPEED_SLOW',
    keywords: [
      'slower', 'slow down', 'too fast', 'make it slow', 'speak slow',
      'மெதுவாக', 'மெதுவாக்கு', 'வேகம் குறை', 'பொறுமையாக',
      'धीरे', 'धीरे करो', 'धीमी गति', 'कम करो',
      'నెమ్మదిగా', 'స్పీడ్ తగ్గించు',
      'പതുക്കെ', 'വേഗത കുറയ്ക്കൂ',
      'ನಿಧಾನವಾಗಿ',
      'আস্তে', 'ধীরে',
      'हळू', 'हळू करा',
      'ધીમે', 'ધીમું કરો',
      'ਹੌਲੀ', 'ਹੌਲੀ ਕਰੋ',
      'آہستہ', 'رفتار کم',
      'ଧୀରେ'
    ]
  },
  {
    intent: 'CHANGE_SPEED_FAST',
    keywords: [
      'faster', 'speed up', 'speed', 'quick', 'hurry',
      'வேகமாக', 'வேகப்படுத்து', 'சீக்கிரம்',
      'तेज़', 'जल्दी', 'स्पीड बढ़ाओ',
      'వేగంగా', 'స్పీడ్ పెంచు',
      'വേഗത്തിൽ',
      'ವೇಗವಾಗಿ',
      'তাড়াতাড়ি', 'দ্রুত',
      'जलद', 'वेग वाढवा',
      'ઝડપી',
      'ਤੇਜ਼',
      'تیز', 'جلدی',
      'ଦ୍ରୁତ'
    ]
  },
  {
    intent: 'SHOW_FORMULA',
    keywords: [
      'formula', 'equation', 'rule', 'math expression',
      'சூத்திரம்', 'சமன்பாடு', 'விதி',
      'सूत्र', 'फॉर्मूला', 'समीकरण',
      'సూత్రం', 'ఫార్ములా', 'సమీకరణం',
      'സമവാക്യം', 'ഫോർമുല',
      'ಸೂತ್ರ', 'ಫಾರ್ಮುಲಾ',
      'সূত্র', 'সমীকরণ',
      'सूत्र दाखवा',
      'સૂત્ર',
      'ਸੂਤਰ',
      'فارمولا', 'مساوات',
      'ସୂତ୍ର'
    ]
  },
  {
    intent: 'GIVE_HINT',
    keywords: [
      'hint', 'clue', 'help me', 'give hint',
      'ஹிண்ட்', 'குறிப்பு', 'உதவி',
      'हिंट', 'इशारा', 'सुझाव', 'मदद',
      'సూచన', 'హింట్',
      'സൂചന', 'സഹായം',
      'ಸುಳಿವು', 'ಸಹಾಯ',
      'ইঙ্গিত', 'হিন্ট',
      'संकेत', 'मदत करा',
      'સંકેત', 'મદદ',
      'ਇਸ਼ਾਰਾ', 'ਮਦਦ',
      'اشارہ', 'مدد',
      'ସୂଚନା'
    ]
  },
  {
    intent: 'START_CHALLENGE',
    keywords: [
      'challenge', 'predict', 'prediction', 'quiz', 'test',
      'சவால்', 'கணிப்பு', 'தேர்வு',
      'चुनौती', 'अनुमान', 'टेस्ट', 'क्विज़',
      'సవాలు', 'అంచనా',
      'വെല്ലുവിളി', 'പ്രവചനം',
      'ಸವಾಲು', 'ಮುನ್ಸೂಚನೆ',
      'চ্যালেঞ্জ', 'ভবিষ্যদ্বাণী',
      'आव्हान', 'अंदाज',
      'પડકાર', 'અનુમાન',
      'ਚੁਣੌਤੀ', 'ਅੰਦਾਜ਼ਾ',
      'چیلنج', 'امتحان',
      'ଚ୍ୟାଲେଞ୍ଜ'
    ]
  },
  {
    intent: 'PLAY_RESUME',
    keywords: [
      'play', 'start', 'run', 'animate', 'continue', 'resume',
      'இயக்கு', 'தொடங்கு', 'நடத்து',
      'चलाओ', 'शुरू करो', 'प्ले', 'आरंभ',
      'ప్లే', 'ప్రారంభించు',
      'തുടങ്ങൂ', 'പ്ലേ',
      'ಪ್ರಾರಂಭಿಸಿ', 'ಪ್ಲೇ',
      'চালাও', 'শুরু করো',
      'सुरू करा',
      'શરૂ કરો',
      'ਚਲਾਓ', 'ਸ਼ੁਰੂ ਕਰੋ',
      'چلائیں', 'شروع کریں',
      'ଚଲାନ୍ତୁ'
    ]
  },
  {
    intent: 'PAUSE_STOP',
    keywords: [
      'pause', 'stop', 'freeze', 'hold', 'halt',
      'நிறுத்து', 'பாஸ்', 'தடைசெய்',
      'रोको', 'पॉज़', 'ठहरो',
      'ఆపు', 'పాజ్',
      'നിർത്തൂ',
      'ನಿಲ್ಲಿಸಿ',
      'থামাও',
      'थांबवा',
      'રોકો',
      'ਰੋਕੋ',
      'روکیں',
      'ଅଟକାନ୍ତୁ'
    ]
  },
  {
    intent: 'RESET_VIEW',
    keywords: [
      'reset', 'restart', 'start over', 'initial', 'beginning',
      'மீட்டமை', 'மறுபடி அமை', 'முதலில் இருந்து',
      'रीसेट', 'फिर से शुरू', 'शुरुआत',
      'రీసెట్', 'మొదటినుంచి',
      'റീസെറ്റ്',
      'ಮರುಹೊಂದಿಸಿ',
      'রিসেট',
      'पुन्हा सुरू करा',
      'રીસેટ',
      'ਰੀਸੈਟ',
      'دوبارہ ترتیب دیں',
      'ରିସେଟ୍'
    ]
  },
  {
    intent: 'STEP_FORWARD',
    keywords: [
      'next step', 'step forward', 'forward', 'advance',
      'அடுத்த படி', 'முன்னேறு',
      'अगला कदम', 'आगे बढ़ो', 'आगे',
      'తదుపరి అడుగు', 'ముందుకు',
      'അടുത്ത ഘട്ടം', 'മുമ്പോട്ട്',
      'ಮುಂದಿನ ಹೆಜ್ಜೆ', 'ಮುಂದೆ',
      'পরের ধাপ', 'এগিয়ে যাও',
      'पुढील पायरी', 'पुढे',
      'આગળનું પગલું', 'આગળ',
      'ਅਗਲਾ ਕਦਮ', 'ਅੱਗੇ',
      'اگلا قدم', 'آگے',
      'ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ'
    ]
  },
  {
    intent: 'STEP_BACKWARD',
    keywords: [
      'previous step', 'step back', 'backward', 'back',
      'முந்தைய படி', 'பின்னே போ',
      'पिछला कदम', 'पीछे जाओ', 'पीछे',
      'మునుపటి అడుగు', 'వెనుకకు',
      'മുമ്പത്തെ ഘട്ടം', 'പുറകോട്ട്',
      'ಹಿಂದಿನ ಹೆಜ್ಜೆ', 'ಹಿಂದೆ',
      'আগের ধাপ', 'পিছিয়ে যাও',
      'मागील पायरी', 'मागे',
      'પાછળનું પગલું', 'પાછળ',
      'ਪਿਛਲਾ ਕਦਮ', 'ਪਿੱਛੇ',
      'پچھلا قدم', 'پیچھے',
      'ପୂର୍ବ ପଦକ୍ଷେପ'
    ]
  },
  {
    intent: 'NEXT_LESSON',
    keywords: [
      'next lesson', 'next proof', 'next topic',
      'அடுத்த பாடம்', 'அடுத்த தலைப்பு',
      'अगला पाठ', 'अगला अध्याय',
      'తదుపరి పాఠం',
      'അടുത്ത പാഠം',
      'ಮುಂದಿನ ಪಾಠ',
      'পরের পাঠ',
      'पुढील धडा',
      'આગળનો પાઠ',
      'ਅਗਲਾ ਪਾਠ',
      'اگلا سبق',
      'ପରବର୍ତ୍ତୀ ପାଠ'
    ]
  },
  {
    intent: 'PREV_LESSON',
    keywords: [
      'previous lesson', 'prior lesson',
      'முந்தைய பாடம்',
      'पिछला पाठ',
      'మునుపటి పాఠం',
      'മുമ്പത്തെ പാഠം',
      'ಹಿಂದಿನ ಪಾಠ',
      'আগের পাঠ',
      'मागील धडा',
      'પાછળનો પાઠ',
      'ਪਿਛਲਾ ਪਾਠ',
      'پچھلا سبق',
      'ପୂର୍ବ ପାଠ'
    ]
  },
  {
    intent: 'REPEAT',
    keywords: [
      'repeat', 'say again', 'once more', 'again', 'pardon',
      'மறுபடியும்', 'மீண்டும்', 'இன்னொரு முறை',
      'फिर से बोलो', 'दोबारा बताओ', 'एक बार फिर',
      'మళ్ళీ చెప్పండి', 'మరోసారి',
      'ഒരിക്കൽ കൂടി',
      'ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ',
      'আবার বলো',
      'पुन्हा सांगा',
      'ફરીથી કહો',
      'ਦੁਬਾਰਾ ਦੱਸੋ',
      'دوبارہ بولیں',
      'ପୁଣି କୁହନ୍ତୁ'
    ]
  },
  {
    intent: 'CHANGE_VARIABLE_INCREASE',
    keywords: [
      'make it bigger', 'increase', 'larger', 'bigger', 'grow', 'raise',
      'பெரிதாக்கு', 'அதிகரி', 'பெரியது',
      'बड़ा करो', 'बढ़ाओ', 'अधिक करो',
      'పెద్దది చేయండి', 'పెంచు',
      'വലുതാക്കൂ', 'കൂട്ടൂ',
      'ದೊಡ್ಡದು ಮಾಡಿ', 'ಹೆಚ್ಚಿಸಿ',
      'বড় করো', 'বাResourceাও',
      'मोठे करा', 'वाढवा',
      'મોટું કરો', 'વધારો',
      'ਵੱਡਾ ਕਰੋ', 'ਵਧਾਓ',
      'بڑا کریں', 'بڑھائیں',
      'ବଡ଼ କରନ୍ତୁ'
    ]
  },
  {
    intent: 'CHANGE_VARIABLE_DECREASE',
    keywords: [
      'make it smaller', 'decrease', 'smaller', 'shrink', 'lower', 'reduce',
      'சிறிதாக்கு', 'குறை', 'சிறியது',
      'छोटा करो', 'घटाओ', 'कम करो',
      'చిన్నది చేయండి', 'తగ్గించు',
      'ചെറുതാക്കൂ', 'കുറയ്ക്കൂ',
      'ಸಣ್ಣದು ಮಾಡಿ', 'ಕಡಿಮೆ ಮಾಡಿ',
      'ছোট করো', 'কমাও',
      'लहान करा', 'कमी करा',
      'નાનું કરો', 'ઘટાડો',
      'ਛੋਟਾ ਕਰੋ', 'ਘਟਾਓ',
      'چھوٹا کریں', 'کم کریں',
      'ଛୋଟ କରନ୍ତୁ'
    ]
  },
  {
    intent: 'TOGGLE_INSPECTOR',
    keywords: [
      'x-ray', 'xray', 'labels', 'measurements', 'show labels', 'hide labels',
      'எக்ஸ்ரே', 'லேபிள்கள்', 'அளவுகள்',
      'एक्स-रे', 'लेबल', 'माप',
      'ఎక్స్-రే', 'లేబుల్స్',
      'എക്സ്-റേ', 'അളവുകൾ',
      'ಎಕ್ಸ್-ರೇ', 'ಅಳತೆಗಳು',
      'এক্স-রে', 'পরিমাপ',
      'क्ष-किरण',
      'એક્સ-રે',
      'ਐਕਸ-ਰੇ',
      'ایکس رے',
      'ଏକ୍ସ-ରେ'
    ]
  }
];

// Helper to detect language from text input or transcript (Script Ranges & Keywords)
export function detectLanguageFromText(text) {
  if (!text) return 'en-IN';
  const str = text.trim();

  // Unicode Script checks
  if (/[\u0B80-\u0BFF]/.test(str)) return 'ta-IN'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(str)) return 'te-IN'; // Telugu
  if (/[\u0D00-\u0D7F]/.test(str)) return 'ml-IN'; // Malayalam
  if (/[\u0C80-\u0CFF]/.test(str)) return 'kn-IN'; // Kannada
  if (/[\u0980-\u09FF]/.test(str)) return 'bn-IN'; // Bengali
  if (/[\u0A80-\u0AFF]/.test(str)) return 'gu-IN'; // Gujarati
  if (/[\u0A00-\u0A7F]/.test(str)) return 'pa-IN'; // Punjabi
  if (/[\u0600-\u06FF]/.test(str)) return 'ur-IN'; // Urdu
  if (/[\u0B00-\u0B7F]/.test(str)) return 'or-IN'; // Odia

  // Devanagari could be Hindi or Marathi: check Marathi-specific words
  if (/[\u0900-\u097F]/.test(str)) {
    if (/सांगा|आहे|करा|काय|धडा/.test(str)) return 'mr-IN';
    return 'hi-IN';
  }

  // Romanized transliteration heuristics (Tanglish, Hinglish)
  const lower = str.toLowerCase();
  if (/pannu|solli|irukku|puriy|enna|inga|adutha|konjam/.test(lower)) return 'ta-IN';
  if (/karo|batao|kyu|kaise|samjhao|bada|chhota|agla/.test(lower)) return 'hi-IN';
  if (/cheppu|enti|ela|chudandi|cheyyi/.test(lower)) return 'te-IN';

  return 'en-IN';
}

// Convert Language code to two-letter base (e.g., 'ta-IN' -> 'ta')
export function getLangBase(code) {
  if (!code || code === 'auto') return 'en';
  return code.split('-')[0] || 'en';
}

// Global Language Manager Class to orchestrate everything
export class MultilingualAgentManager {
  constructor() {
    this.storageKey = 'mathsUniverseLanguage';
    this.rateKey = 'mathsUniverseSpeechRate';
    this.levelKey = 'mathsUniverseExplanationLevel';
    this.modeKey = 'mathsUniverseResponseMode';

    this.currentLanguage = localStorage.getItem(this.storageKey) || 'auto';
    this.resolvedLanguage = this.currentLanguage === 'auto' ? 'en-IN' : this.currentLanguage;
    this.speechRate = localStorage.getItem(this.rateKey) || 'normal'; // slow, normal, fast
    this.explanationLevel = localStorage.getItem(this.levelKey) || 'simple'; // simple, step, detailed, example
    this.responseMode = localStorage.getItem(this.modeKey) || 'visual_voice_text'; // visual_voice_text, voice_text, text_only
    this.isListening = false;
    this.recognition = null;
    this.lastSpokenText = '';
    this.currentLessonContext = null;

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
      } catch (e) {
        console.warn('SpeechRecognition init error:', e);
      }
    }
  }

  setLanguage(newLangCode, skipSave = false) {
    this.currentLanguage = newLangCode;
    this.resolvedLanguage = newLangCode === 'auto' ? 'en-IN' : newLangCode;
    if (!skipSave) {
      localStorage.setItem(this.storageKey, newLangCode);
    }

    // Update Speech Recognition lang
    if (this.recognition) {
      this.recognition.lang = this.resolvedLanguage;
    }

    // Broadcast change event
    window.dispatchEvent(new CustomEvent('mathsLanguageChanged', {
      detail: { language: this.currentLanguage, resolved: this.resolvedLanguage }
    }));

    return this.resolvedLanguage;
  }

  setSpeechRate(rate) {
    this.speechRate = rate;
    localStorage.setItem(this.rateKey, rate);
  }

  setExplanationLevel(level) {
    this.explanationLevel = level;
    localStorage.setItem(this.levelKey, level);
  }

  setResponseMode(mode) {
    this.responseMode = mode;
    localStorage.setItem(this.modeKey, mode);
  }

  getNumericSpeechRate() {
    if (this.speechRate === 'slow') return 0.8;
    if (this.speechRate === 'fast') return 1.25;
    return 1.0;
  }

  // Find best available speech synthesis voice for language
  getBestVoice(langCode) {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const base = getLangBase(langCode);
    const code = langCode.toLowerCase().replace('_', '-');

    // 1. Exact match (e.g., 'ta-in')
    let match = voices.find(v => v.lang.toLowerCase().replace('_', '-') === code);
    if (match) return match;

    // 2. Base match (e.g., starts with 'ta')
    match = voices.find(v => v.lang.toLowerCase().startsWith(base));
    if (match) return match;

    // 3. Name contains language name (e.g. 'Tamil', 'Hindi')
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    if (langObj) {
      match = voices.find(v => v.name.toLowerCase().includes(langObj.label.toLowerCase()) || v.name.includes(langObj.native));
      if (match) return match;
    }

    // Fallback: standard English or default voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0];
  }

  speakText(text, langCode = null, onEnd = null) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel(); // Stop any pending speech

    const targetLang = langCode || this.resolvedLanguage;
    this.lastSpokenText = text;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.getNumericSpeechRate();
    utterance.pitch = 1.05; // Friendly, warm child-friendly tone

    const voice = this.getBestVoice(targetLang);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = targetLang;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  repeatLastSpoken() {
    if (this.lastSpokenText) {
      this.speakText(this.lastSpokenText);
    }
  }

  // Parse natural student utterance into normalized intent
  parseIntent(userInput) {
    if (!userInput) return { intent: 'UNKNOWN', query: '' };
    const query = userInput.trim();
    const lower = query.toLowerCase();

    // Auto language detection if active
    let lang = this.currentLanguage;
    if (lang === 'auto') {
      lang = detectLanguageFromText(query);
      this.resolvedLanguage = lang;
    }

    for (const item of INTENT_PATTERNS) {
      for (const kw of item.keywords) {
        if (lower.includes(kw.toLowerCase())) {
          return {
            intent: item.intent,
            language: lang,
            matchedKeyword: kw,
            query: query
          };
        }
      }
    }

    // Default intent
    return {
      intent: 'EXPLAIN_CONCEPT',
      language: lang,
      query: query
    };
  }
}
