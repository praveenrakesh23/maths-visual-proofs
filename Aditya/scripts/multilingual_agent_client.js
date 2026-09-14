// scripts/multilingual_agent_client.js
// Universal Multilingual Voice Agent & Mathematical Language Engine for Maths Universe

(function() {
  'use strict';

  // 1. Language Definitions
  const SUPPORTED_LANGUAGES = [
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
    { code: 'or-IN', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
  ];

  // 2. Protected Mathematical Vocabulary
  const MATH_TERMS = {
    radius: {
      'en': 'Radius', 'hi': 'Radius (त्रिज्या)', 'ta': 'Radius (ஆரம்)', 'te': 'Radius (వ్యాసార్థం)',
      'ml': 'Radius (ആരം)', 'kn': 'Radius (ತ್ರಿಜ್ಯ)', 'bn': 'Radius (ব্যাসার্ধ)', 'mr': 'Radius (त्रिज्या)',
      'gu': 'Radius (ત્રિજ્યા)', 'pa': 'Radius (ਅਰਧ-ਵਿਆਸ)', 'ur': 'Radius (رداس)', 'or': 'Radius (ବ୍ୟାସାର୍ଦ୍ଧ)'
    },
    diameter: {
      'en': 'Diameter', 'hi': 'Diameter (व्यास)', 'ta': 'Diameter (விட்டம்)', 'te': 'Diameter (వ్యాసం)',
      'ml': 'Diameter (വ്യാസം)', 'kn': 'Diameter (ವ್ಯಾಸ)', 'bn': 'Diameter (ব্যাস)', 'mr': 'Diameter (व्यास)',
      'gu': 'Diameter (વ્યાસ)', 'pa': 'Diameter (ਵਿਆਸ)', 'ur': 'Diameter (قطر)', 'or': 'Diameter (ବ୍ୟାସ)'
    },
    area: {
      'en': 'Area', 'hi': 'Area (क्षेत्रफल)', 'ta': 'Area (பரப்பளவு)', 'te': 'Area (వైశాల్యం)',
      'ml': 'Area (വിസ്തീർണ്ണം)', 'kn': 'Area (ವಿಸ್ತೀರ್ಣ)', 'bn': 'Area (ক্ষেত্রফল)', 'mr': 'Area (क्षेत्रफळ)',
      'gu': 'Area (ક્ષેત્રફળ)', 'pa': 'Area (ਖੇਤਰਫਲ)', 'ur': 'Area (رقبہ)', 'or': 'Area (କ୍ଷେତ୍ରଫଳ)'
    },
    perimeter: {
      'en': 'Perimeter', 'hi': 'Perimeter (परिमाप)', 'ta': 'Perimeter (சுற்றளவு)', 'te': 'Perimeter (చుట్టుకొలత)',
      'ml': 'Perimeter (ചുറ്റളവ്)', 'kn': 'Perimeter (ಸುತ್ತಳತೆ)', 'bn': 'Perimeter (পরিসীমা)', 'mr': 'Perimeter (परिमिती)',
      'gu': 'Perimeter (પરિમિતિ)', 'pa': 'Perimeter (ਘੇਰਾ)', 'ur': 'Perimeter (محیط)', 'or': 'Perimeter (ପରିସୀମା)'
    },
    hypotenuse: {
      'en': 'Hypotenuse', 'hi': 'Hypotenuse (कर्ण)', 'ta': 'Hypotenuse (கர்ணம்)', 'te': 'Hypotenuse (కర్ణం)',
      'ml': 'Hypotenuse (കർണ്ണം)', 'kn': 'Hypotenuse (ಕರ್ಣ)', 'bn': 'Hypotenuse (অতিভুজ)', 'mr': 'Hypotenuse (कर्ण)',
      'gu': 'Hypotenuse (કર્ણ)', 'pa': 'Hypotenuse (ਕਰਣ)', 'ur': 'Hypotenuse (وتر)', 'or': 'Hypotenuse (କର୍ଣ୍ଣ)'
    },
    triangle: {
      'en': 'Triangle', 'hi': 'Triangle (त्रिभुज)', 'ta': 'Triangle (முக்கோணம்)', 'te': 'Triangle (త్రిభుజం)',
      'ml': 'Triangle (ത്രികോണം)', 'kn': 'Triangle (ತ್ರಿಕೋನ)', 'bn': 'Triangle (ত্রিভুজ)', 'mr': 'Triangle (त्रिकोण)',
      'gu': 'Triangle (ત્રિકોણ)', 'pa': 'Triangle (ਤਿਕੋਣ)', 'ur': 'Triangle (مثلث)', 'or': 'Triangle (ତ୍ରିଭୁଜ)'
    },
    angle: {
      'en': 'Angle', 'hi': 'Angle (कोण)', 'ta': 'Angle (கோணம்)', 'te': 'Angle (కోణం)',
      'ml': 'Angle (കോൺ)', 'kn': 'Angle (ಕೋನ)', 'bn': 'Angle (কোণ)', 'mr': 'Angle (कोण)',
      'gu': 'Angle (ખૂણો)', 'pa': 'Angle (ਕੋਣ)', 'ur': 'Angle (زاویہ)', 'or': 'Angle (କୋଣ)'
    },
    equation: {
      'en': 'Equation', 'hi': 'Equation (समीकरण)', 'ta': 'Equation (சமன்பாடு)', 'te': 'Equation (సమీకరణం)',
      'ml': 'Equation (സമവാക്യം)', 'kn': 'Equation (ಸಮೀಕರಣ)', 'bn': 'Equation (সমীকরণ)', 'mr': 'Equation (समीकरण)',
      'gu': 'Equation (સમીકરણ)', 'pa': 'Equation (ਸਮੀਕਰਨ)', 'ur': 'Equation (مساوات)', 'or': 'Equation (ସମୀକରଣ)'
    },
    proof: {
      'en': 'Proof', 'hi': 'Proof (प्रमाण)', 'ta': 'Proof (நிரூபணம்)', 'te': 'Proof (నిరూపణ)',
      'ml': 'Proof (തെളിവ്)', 'kn': 'Proof (ಸಾಬೀತು)', 'bn': 'Proof (প্রমাণ)', 'mr': 'Proof (सिद्धता)',
      'gu': 'Proof (સાબિતી)', 'pa': 'Proof (ਸਬੂਤ)', 'ur': 'Proof (ثبوت)', 'or': 'Proof (ପ୍ରମାଣ)'
    }
  };

  // 3. UI Dictionary for Complete Translation without Reload
  const UI_TEXT = {
    langLabel: {
      'en': 'LANGUAGE', 'hi': 'भाषा', 'ta': 'மொழி', 'te': 'భాష',
      'ml': 'ഭാഷ', 'kn': 'ಭಾಷೆ', 'bn': 'ভাষা', 'mr': 'भाषा',
      'gu': 'ભાષા', 'pa': 'ਭਾਸ਼ਾ', 'ur': 'زبان', 'or': 'ଭାଷା'
    },
    askGuide: {
      'en': '🎤 Ask Maths Guide', 'hi': '🎤 मैथ्स गाइड से पूछें', 'ta': '🎤 கணித வழிகாட்டி',
      'te': '🎤 మ్యాథ్స్ గైడ్', 'ml': '🎤 മാത്സ് ഗൈഡ്', 'kn': '🎤 ಗಣಿತ ಮಾರ್ಗದರ್ಶಿ',
      'bn': '🎤 ম্যাথস গাইড', 'mr': '🎤 मॅथ्स गाईड', 'gu': '🎤 મેથ્સ ગાઈડ',
      'pa': '🎤 ਗਣਿਤ ਗਾਈਡ', 'ur': '🎤 ریاضی گائیڈ', 'or': '🎤 ଗଣିତ ଗାଇଡ୍'
    },
    studentNotes: {
      'en': '📖 Student Notes', 'hi': '📖 छात्र नोट्स', 'ta': '📖 மாணவர் குறிப்புகள்',
      'te': '📖 విద్యార్థి నోట్స్', 'ml': '📖 വിദ്യാർത്ഥി കുറിപ്പുകൾ', 'kn': '📖 ವಿದ್ಯಾರ್ಥಿ ಟಿಪ್ಪಣಿಗಳು',
      'bn': '📖 ছাত্র নোট', 'mr': '📖 विद्यार्थी नोट्स', 'gu': '📖 વિદ્યાર્થી નોંધ',
      'pa': '📖 ਵਿਦਿਆਰਥੀ ਨੋਟਸ', 'ur': '📖 طالب علم نوٹس', 'or': '📖 ଛାତ୍ର ଟିପ୍ପଣୀ'
    },
    help: {
      'en': '? Help', 'hi': '? सहायता', 'ta': '? உதவி', 'te': '? సహాయం',
      'ml': '? സഹായം', 'kn': '? ಸಹಾಯ', 'bn': '? সাহায্য', 'mr': '? मदत',
      'gu': '? મદદ', 'pa': '? ਮਦਦ', 'ur': '? مدد', 'or': '? ସାହାଯ୍ୟ'
    },
    mastered: {
      'en': 'Mastered', 'hi': 'प्रवीण', 'ta': 'தேர்ச்சி', 'te': 'ప్రావీణ్యం',
      'ml': 'പ്രാവീണ്യം', 'kn': 'ಪರಿಣಿತಿ', 'bn': 'পারদর্শী', 'mr': 'पारंगत',
      'gu': 'પ્રવીણ', 'pa': 'ਮਾਹਿਰ', 'ur': 'ماہر', 'or': 'ଦକ୍ଷ'
    },
    mission: {
      'en': 'MISSION', 'hi': 'मिशन', 'ta': 'பணி', 'te': 'లక్ష్యం',
      'ml': 'ദൗത്യം', 'kn': 'ಗುರಿ', 'bn': 'মিশন', 'mr': 'ध्येय',
      'gu': 'મિશન', 'pa': 'ਮਿਸ਼ਨ', 'ur': 'مشن', 'or': 'ଲକ୍ଷ୍ୟ'
    },
    analogy: {
      'en': '💡 ANALOGY:', 'hi': '💡 सादृश्य:', 'ta': '💡 ஒப்புமை:', 'te': '💡 సారూప్యత:',
      'ml': '💡 സാദൃശ്യം:', 'kn': '💡 ಸಾದೃಶ್ಯ:', 'bn': '💡 সাদৃশ্য:', 'mr': '💡 सादृश्य:',
      'gu': '💡 ઉપમા:', 'pa': '💡 ਸਮਾਨਤਾ:', 'ur': '💡 تشبیہ:', 'or': '💡 ଉପମା:'
    },
    teacherVoice: {
      'en': 'TEACHER VOICE', 'hi': 'शिक्षक की आवाज़', 'ta': 'ஆசிரியர் குரல்', 'te': 'ఉపాధ్యాయుడి స్వరం',
      'ml': 'അധ്യാപകന്റെ ശബ്ദം', 'kn': 'ಶಿಕ್ಷಕರ ಧ್ವನಿ', 'bn': 'শিক্ষকের কণ্ঠ', 'mr': 'शिक्षकांचा आवाज',
      'gu': 'શિક્ષકનો અવાજ', 'pa': 'ਅਧਿਆਪਕ ਦੀ ਆਵਾਜ਼', 'ur': 'استاد کی آواز', 'or': 'ଶିକ୍ଷକଙ୍କ ସ୍ୱର'
    },
    listen: {
      'en': '🔊 Listen', 'hi': '🔊 सुनें', 'ta': '🔊 கேளுங்கள்', 'te': '🔊 వినండి',
      'ml': '🔊 കേൾക്കൂ', 'kn': '🔊 ಕೇಳಿ', 'bn': '🔊 শুনুন', 'mr': '🔊 ऐका',
      'gu': '🔊 સાંભળો', 'pa': '🔊 ਸੁਣੋ', 'ur': '🔊 سنیں', 'or': '🔊 ଶୁଣନ୍ତୁ'
    },
    dragHint: {
      'en': '↔ Drag to Scrub', 'hi': '↔ आगे-पीछे करने के लिए खींचें', 'ta': '↔ நகர்த்த இழுக்கவும்',
      'te': '↔ స్క్రబ్ చేయడానికి లాగండి', 'ml': '↔ സ്ക്രബ് ചെയ്യാൻ വലിക്കുക', 'kn': '↔ ಎಳೆಯಿರಿ',
      'bn': '↔ স্ক্রাব করতে টানুন', 'mr': '↔ ड्रॅग करा', 'gu': '↔ ખેંચો',
      'pa': '↔ ਸਕ੍ਰੌਲ ਕਰਨ ਲਈ ਖਿੱਚੋ', 'ur': '↔ آگے پیچھے کریں', 'or': '↔ ସ୍କ୍ରବ୍ କରିବାକୁ ଟାଣନ୍ତୁ'
    },
    play: {
      'en': 'Play', 'hi': 'चलाएं', 'ta': 'இயக்கு', 'te': 'ప్లే',
      'ml': 'പ്ലേ', 'kn': 'ಪ್ಲೇ', 'bn': 'চালাও', 'mr': 'सुरू करा',
      'gu': 'ચલાવો', 'pa': 'ਚਲਾਓ', 'ur': 'چلائیں', 'or': 'ଚଲାନ୍ତୁ'
    },
    pause: {
      'en': 'Pause', 'hi': 'रोकें', 'ta': 'நிறுத்து', 'te': 'పాజ్',
      'ml': 'നിർത്തൂ', 'kn': 'ವಿರಾಮ', 'bn': 'থামাও', 'mr': 'थांबवा',
      'gu': 'અટકાવો', 'pa': 'ਰੋਕੋ', 'ur': 'روکیں', 'or': 'ଅଟକାନ୍ତୁ'
    },
    loop: {
      'en': '🔁 Loop', 'hi': '🔁 लूप', 'ta': '🔁 சுழற்சி', 'te': '🔁 లూప్',
      'ml': '🔁 ലൂപ്പ്', 'kn': '🔁 ಲೂಪ್', 'bn': '🔁 লুপ', 'mr': '🔁 लूप',
      'gu': '🔁 લૂપ', 'pa': '🔁 ਲੂਪ', 'ur': '🔁 لوپ', 'or': '🔁 ଲୁପ୍'
    },
    ghost: {
      'en': 'Ghost outlines', 'hi': 'काल्पनिक रूपरेखा', 'ta': 'நிழல் கோடுகள்', 'te': 'రూపరేఖలు',
      'ml': 'ഔട്ട്ലൈനുകൾ', 'kn': 'ರೂಪರೇಖೆಗಳು', 'bn': 'রূপরেখা', 'mr': 'बाह्यरेखा',
      'gu': 'બાહ્યરેખા', 'pa': 'ਰੂਪਰੇਖਾ', 'ur': 'خاکہ', 'or': 'ରୂପରେଖା'
    },
    snap: {
      'en': 'Snap guides', 'hi': 'स्नैप गाइड', 'ta': 'சீரமைப்பு வழிகாட்டிகள்', 'te': 'స్నాప్ గైడ్లు',
      'ml': 'സ്നാപ്പ് ഗൈഡുകൾ', 'kn': 'ಸ್ನ್ಯಾಪ್ ಮಾರ್ಗದರ್ಶಿಗಳು', 'bn': 'স্ন্যাপ গাইড', 'mr': 'स्नॅप मार्गदर्शक',
      'gu': 'સ્નેપ ગાઇડ', 'pa': 'ਸਨੈਪ ਗਾਈਡ', 'ur': 'سنیپ گائیڈ', 'or': 'ସ୍ନାପ୍ ଗାଇଡ୍'
    },
    areaLock: {
      'en': 'Equal-area lock', 'hi': 'समान क्षेत्रफल लॉक', 'ta': 'சம பரப்பு பூட்டு', 'te': 'సమాన వైశాల్య లాక్',
      'ml': 'തുല്യ വിസ്തീർണ്ണ ലോക്ക്', 'kn': 'ಸಮಾನ ವಿಸ್ತೀರ್ಣ ಲಾಕ್', 'bn': 'সমান ক্ষেত্রফল লক', 'mr': 'समान क्षेत्रफळ लॉक',
      'gu': 'સમાન ક્ષેત્રફળ લૉક', 'pa': 'ਬਰਾਬਰ ਖੇਤਰਫਲ ਲਾਕ', 'ur': 'برابر رقبہ لاک', 'or': 'ସମାନ କ୍ଷେତ୍ରଫଳ ଲକ୍'
    },
    inspector: {
      'en': '🔬 X-Ray', 'hi': '🔬 एक्स-रे', 'ta': '🔬 எக்ஸ்ரே', 'te': '🔬 ఎక్స్-రే',
      'ml': '🔬 എക്സ്-റേ', 'kn': '🔬 ಎಕ್ಸ್-ರೇ', 'bn': '🔬 এক্স-রে', 'mr': '🔬 क्ष-किरण',
      'gu': '🔬 એક્સ-રે', 'pa': '🔬 ਐਕਸ-ਰੇ', 'ur': '🔬 ایکس رے', 'or': '🔬 ଏକ୍ସ-ରେ'
    },
    reset: {
      'en': '↺ Reset', 'hi': '↺ रीसेट', 'ta': '↺ மீட்டமை', 'te': '↺ రీసెట్',
      'ml': '↺ റീസെറ്റ്', 'kn': '↺ ಮರುಹೊಂದಿಸಿ', 'bn': '↺ রিসেট', 'mr': '↺ रीसेट',
      'gu': '↺ રીસેટ', 'pa': '↺ ਰੀਸੈਟ', 'ur': '↺ دوبارہ ترتيب', 'or': '↺ ରିସେଟ୍'
    },
    whyItWorks: {
      'en': 'Why It Works', 'hi': 'यह कैसे काम करता है?', 'ta': 'இது எவ்வாறு செயல்படுகிறது?',
      'te': 'ఇది ఎందుకు పనిచేస్తుంది?', 'ml': 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു?', 'kn': 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
      'bn': 'এটি কীভাবে কাজ করে?', 'mr': 'हे कसे कार्य करते?', 'gu': 'આ કેવી રીતે કાર્ય કરે છે?',
      'pa': 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?', 'ur': 'یہ کیسے کام کرتا ہے؟', 'or': 'ଏହା କିପରି କାମ କରେ?'
    },
    prediction: {
      'en': 'PREDICTION CHALLENGE', 'hi': 'भविष्यवाणी चुनौती', 'ta': 'கணிப்பு சவால்', 'te': 'అంచనా సవాలు',
      'ml': 'പ്രവചന വെല്ലുവിളി', 'kn': 'ಮುನ್ಸೂಚನೆ ಸವಾಲು', 'bn': 'ভবিষ্যদ্বাণী চ্যালেঞ্জ', 'mr': 'अंदाज आव्हान',
      'gu': 'અનુમાન પડકાર', 'pa': 'ਭਵਿੱਖਬਾਣੀ ਚੁਣੌਤੀ', 'ur': 'پیشین گوئی چیلنج', 'or': 'ଭବିଷ୍ୟବାଣୀ ଚ୍ୟାଲେଞ୍ଜ'
    },
    wrongFeedback: {
      'en': "Almost! Let's look at this part again.",
      'hi': 'लगभग! आइए इस हिस्से को फिर से देखें।',
      'ta': 'கிட்டத்தட்ட சரி! இந்த பகுதியை மீண்டும் பார்ப்போம்.',
      'te': 'దాదాపు దగ్గరగా వచ్చారు! ఈ భాగాన్ని మళ్ళీ చూద్దాం.',
      'ml': 'ഏതാണ്ട് ശരിയായി! ഈ ഭാഗം വീണ്ടും നോക്കാം.',
      'kn': 'ಬಹುತೇಕ ಸರಿ! ಈ ಭಾಗವನ್ನು ಮತ್ತೆ ನೋಡೋಣ.',
      'bn': 'প্রায় কাছাকাছি! আসুন এই অংশটি আবার দেখি।',
      'mr': 'जवळजवळ बरोबर! चला हा भाग पुन्हा पाहूया.',
      'gu': 'લગભગ સાચું! ચાલો આ ભાગ ફરી જોઈએ.',
      'pa': 'ਲਗਭਗ ਨੇੜੇ! ਆਓ ਇਸ ਹਿੱਸੇ ਨੂੰ ਦੁਬਾਰਾ ਵੇਖੀਏ।',
      'ur': 'تقریباً درست! آئیے اس حصے کو دوبارہ دیکھتے ہیں۔',
      'or': 'ପ୍ରାୟ ପାଖାପାଖି! ଆସନ୍ତୁ ଏହି ଅଂଶକୁ ପୁଣି ଥରେ ଦେଖିବା।'
    },
    correctFeedback: {
      'en': 'Correct! Outstanding discovery! ⭐',
      'hi': 'बिलकुल सही! शानदार खोज! ⭐',
      'ta': 'சரி! அருமையான கண்டுபிடிப்பு! ⭐',
      'te': 'సరియైనది! అద్భుతమైన ఆవిష్కరణ! ⭐',
      'ml': 'ശരിയാണ്! മികച്ച കണ്ടെത്തൽ! ⭐',
      'kn': 'ಸರಿ! ಅದ್ಭುತ ಆವಿಷ್ಕಾರ! ⭐',
      'bn': 'সঠিক! দারুণ আবিষ্কার! ⭐',
      'mr': 'बरोबर! उत्तम शोध! ⭐',
      'gu': 'સાચું! અદ્ભુત શોધ! ⭐',
      'pa': 'ਸਹੀ! ਸ਼ਾਨਦਾਰ ਖੋਜ! ⭐',
      'ur': 'درست! شاندار دریافت! ⭐',
      'or': 'ସଠିକ୍! ଚମତ୍କାର ଆବିଷ୍କାର! ⭐'
    },
    allStagesCompleted: {
      'en': 'All 3 Stages Completed! ✨',
      'hi': 'सभी 3 चरण पूर्ण! ✨',
      'ta': 'அனைத்து 3 நிலைகளும் நிறைவடைந்தன! ✨',
      'te': 'అన్ని 3 దశలు పూర్తయ్యాయి! ✨',
      'ml': 'എല്ലാ 3 ഘട്ടങ്ങളും പൂർത്തിയായി! ✨',
      'kn': 'ಎಲ್ಲಾ 3 ಹಂತಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ! ✨',
      'bn': 'সব ৩টি ধাপ সম্পন্ন! ✨',
      'mr': 'सर्व ३ पायऱ्या पूर्ण! ✨',
      'gu': 'બધા ૩ તબક્કા પૂર્ણ! ✨',
      'pa': 'ਸਾਰੇ 3 ਪੜਾਅ ਮੁਕੰਮਲ! ✨',
      'ur': 'تمام 3 مراحل مکمل! ✨',
      'or': 'ସମସ୍ତ ୩ ପର୍ଯ୍ୟାୟ ସମାପ୍ତ! ✨'
    },
    voiceUnavailable: {
      'en': 'Voice input is unavailable in this browser. You can type your question.',
      'hi': 'इस ब्राउज़र में वॉयस इनपुट उपलब्ध नहीं है। आप अपना प्रश्न टाइप कर सकते हैं।',
      'ta': 'இந்த உலாவியில் குரல் உள்ளீடு கிடைக்கவில்லை. உங்கள் கேள்வியை தட்டச்சு செய்யலாம்.',
      'te': 'ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. మీరు మీ ప్రశ్నను టైప్ చేయవచ్చు.',
      'ml': 'ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് ലഭ്യമല്ല. നിങ്ങൾക്ക് ചോദ്യം ടൈപ്പ് ചെയ്യാം.',
      'kn': 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಬಹುದು.',
      'bn': 'এই ব্রাউজারে ভয়েস ইনপুট অনুপলব্ধ। আপনি প্রশ্ন টাইপ করতে পারেন।',
      'mr': 'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. आपण प्रश्न टाइप करू शकता.',
      'gu': 'આ બ્રાઉઝરમાં વૉઇસ ઇનપુટ ઉપલબ્ધ નથી. તમે પ્રશ્ન ટાઇપ કરી શકો છો.',
      'pa': 'ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਵੌਇਸ ਇਨਪੁਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਤੁਸੀਂ ਸਵਾਲ ਟਾਈਪ ਕਰ ਸਕਦੇ ਹੋ।',
      'ur': 'اس براؤزر میں صوتی ان پٹ دستیاب نہیں ہے۔ آپ اپنا سوال ٹائپ کر سکتے ہیں۔',
      'or': 'ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଇନପୁଟ୍ ଉପଲବ୍ଧ ନାହିଁ। ଆପଣ ନିଜ ପ୍ରଶ୍ନ ଟାଇପ୍ କରିପାରିବେ।'
    }
  };

  // Helper to extract language base
  function getLangBase(code) {
    if (!code || code === 'auto') return 'en';
    return code.split('-')[0] || 'en';
  }

  // 4. Master Language & Agent Manager
  class MathsLanguageManager {
    constructor() {
      this.storageKey = 'mathsUniverseLanguage';
      this.rateKey = 'mathsUniverseSpeechRate';
      this.levelKey = 'mathsUniverseExplanationLevel';
      this.modeKey = 'mathsUniverseResponseMode';

      this.currentLanguage = localStorage.getItem(this.storageKey) || 'auto';
      this.resolvedLanguage = this.resolveLanguage(this.currentLanguage);
      this.speechRate = localStorage.getItem(this.rateKey) || 'normal'; // 'slow', 'normal', 'fast'
      this.explanationLevel = localStorage.getItem(this.levelKey) || 'simple'; // 'simple', 'step', 'detailed', 'example'
      this.responseMode = localStorage.getItem(this.modeKey) || 'visual_voice_text';

      this.isListening = false;
      this.recognition = null;
      this.lastSpokenText = '';
      this.lastSpokenLang = 'en-IN';

      this.initSpeech();
    }

    resolveLanguage(langCode) {
      if (!langCode || langCode === 'auto') {
        // Try browser language or default to en-IN
        const navLang = (navigator.language || 'en-IN').toLowerCase();
        if (navLang.startsWith('ta')) return 'ta-IN';
        if (navLang.startsWith('hi')) return 'hi-IN';
        if (navLang.startsWith('te')) return 'te-IN';
        if (navLang.startsWith('ml')) return 'ml-IN';
        if (navLang.startsWith('kn')) return 'kn-IN';
        if (navLang.startsWith('bn')) return 'bn-IN';
        if (navLang.startsWith('mr')) return 'mr-IN';
        if (navLang.startsWith('gu')) return 'gu-IN';
        if (navLang.startsWith('pa')) return 'pa-IN';
        if (navLang.startsWith('ur')) return 'ur-IN';
        if (navLang.startsWith('or')) return 'or-IN';
        return 'en-IN';
      }
      return langCode;
    }

    setLanguage(langCode, skipSave = false) {
      this.currentLanguage = langCode;
      this.resolvedLanguage = this.resolveLanguage(langCode);
      if (!skipSave) {
        localStorage.setItem(this.storageKey, langCode);
      }

      if (this.recognition) {
        this.recognition.lang = this.resolvedLanguage;
      }

      // Update UI across page
      this.updateAllUI(this.resolvedLanguage);

      // Trigger event
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

    getText(key, lang = null) {
      const target = lang || this.resolvedLanguage;
      const base = getLangBase(target);
      const dict = UI_TEXT[key];
      if (!dict) return '';
      return dict[base] || dict['en'] || '';
    }

    initSpeech() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        try {
          this.recognition = new SpeechRec();
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
          this.recognition.maxAlternatives = 1;
          this.recognition.lang = this.resolvedLanguage;

          this.recognition.onstart = () => {
            this.isListening = true;
            this.updateGuideMicUI(true);
          };

          this.recognition.onend = () => {
            this.isListening = false;
            this.updateGuideMicUI(false);
          };

          this.recognition.onerror = (e) => {
            this.isListening = false;
            this.updateGuideMicUI(false);
            console.warn('Speech error:', e.error);
          };

          this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              this.handleStudentInput(transcript, true);
            }
          };
        } catch (e) {
          console.warn('Recognition setup failed:', e);
        }
      }
    }

    getBestVoice(langCode) {
      if (!('speechSynthesis' in window)) return null;
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return null;

      const base = getLangBase(langCode);
      const code = langCode.toLowerCase().replace('_', '-');

      // 1. Exact match
      let match = voices.find(v => v.lang.toLowerCase().replace('_', '-') === code);
      if (match) return match;

      // 2. Base match
      match = voices.find(v => v.lang.toLowerCase().startsWith(base));
      if (match) return match;

      // 3. Name contains language name
      const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
      if (langObj) {
        match = voices.find(v => v.name.toLowerCase().includes(langObj.label.toLowerCase()) || v.name.includes(langObj.native));
        if (match) return match;
      }

      // Default fallback
      return voices.find(v => v.lang.startsWith('en')) || voices[0];
    }

    speak(text, lang = null, onEnd = null) {
      if (!('speechSynthesis' in window) || !text) return;
      window.speechSynthesis.cancel();

      const targetLang = lang || this.resolvedLanguage;
      this.lastSpokenText = text;
      this.lastSpokenLang = targetLang;

      const utterance = new SpeechSynthesisUtterance(text);
      let rate = 1.0;
      if (this.speechRate === 'slow') rate = 0.8;
      else if (this.speechRate === 'fast') rate = 1.25;

      utterance.rate = rate;
      utterance.pitch = 1.05; // Friendly, warm child-appropriate tone

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

    repeatLast() {
      if (this.lastSpokenText) {
        this.speak(this.lastSpokenText, this.lastSpokenLang);
      }
    }

    // NLU Intent Parser
    detectLanguage(text) {
      if (!text) return 'en-IN';
      const str = text.trim();
      if (/[\u0B80-\u0BFF]/.test(str)) return 'ta-IN'; // Tamil
      if (/[\u0C00-\u0C7F]/.test(str)) return 'te-IN'; // Telugu
      if (/[\u0D00-\u0D7F]/.test(str)) return 'ml-IN'; // Malayalam
      if (/[\u0C80-\u0CFF]/.test(str)) return 'kn-IN'; // Kannada
      if (/[\u0980-\u09FF]/.test(str)) return 'bn-IN'; // Bengali
      if (/[\u0A80-\u0AFF]/.test(str)) return 'gu-IN'; // Gujarati
      if (/[\u0A00-\u0A7F]/.test(str)) return 'pa-IN'; // Punjabi
      if (/[\u0600-\u06FF]/.test(str)) return 'ur-IN'; // Urdu
      if (/[\u0B00-\u0B7F]/.test(str)) return 'or-IN'; // Odia
      if (/[\u0900-\u097F]/.test(str)) {
        if (/सांगा|आहे|करा|काय|धडा/.test(str)) return 'mr-IN';
        return 'hi-IN';
      }
      const lower = str.toLowerCase();
      if (/pannu|solli|irukku|puriy|enna|inga|adutha|konjam/.test(lower)) return 'ta-IN';
      if (/karo|batao|kyu|kaise|samjhao|bada|chhota|agla/.test(lower)) return 'hi-IN';
      if (/cheppu|enti|ela|chudandi|cheyyi/.test(lower)) return 'te-IN';
      return 'en-IN';
    }

    parseIntent(query) {
      if (!query) return { intent: 'EXPLAIN_CONCEPT', lang: this.resolvedLanguage, query: '' };
      const q = query.trim().toLowerCase();
      let lang = this.currentLanguage === 'auto' ? this.detectLanguage(query) : this.resolvedLanguage;

      // Speed slow
      if (/slower|slow|slow down|மெதுவாக|வேகம் குறை|धीरे|धीमी|నెమ్మదిగా|പതുക്കെ|ನಿಧಾನವಾಗಿ|আস্তে|हळू|ધીમે|ਹੌਲੀ|آہستہ|ଧୀରେ/.test(q)) {
        return { intent: 'CHANGE_SPEED_SLOW', lang, query };
      }
      // Speed fast
      if (/faster|fast|speed up|வேகமாக|तेज़|जल्दी|వేగంగా|വേഗത്തിൽ|ವೇಗವಾಗಿ|দ্রুত|जलद|ઝડપી|ਤੇਜ਼|تیز|ଦ୍ରୁତ/.test(q)) {
        return { intent: 'CHANGE_SPEED_FAST', lang, query };
      }
      // Why
      if (/why|reason|ஏன்|எதனால்|காரணம்|क्यों|वजह|ఎందుకు|കారణം|എന്തുകൊണ്ട്|ಏಕೆ|యాకే|কেন|का|શા માટે|ਕੇਮ|ਕਿਉਂ|کیوں|କାହିଁକି/.test(q)) {
        return { intent: 'WHY_CONCEPT', lang, query };
      }
      // Formula
      if (/formula|equation|சூத்திரம்|சமன்பாடு|सूत्र|फॉर्मूला|समीकरण|సూత్రం|സമവാക്യം|ಸೂತ್ರ|সমীকরণ|સૂત્ર|ਸੂਤਰ|فارمولا|ସୂତ୍ର/.test(q)) {
        return { intent: 'SHOW_FORMULA', lang, query };
      }
      // Hint
      if (/hint|clue|help|ஹிண்ட்|குறிப்பு|உதவி|हिंट|इशारा|मदद|సూచన|സൂചന|ಸುಳಿವು|ইঙ্গিত|संकेत|ਸੰਕੇਤ|اشارہ|ସୂଚନା/.test(q)) {
        return { intent: 'GIVE_HINT', lang, query };
      }
      // Challenge
      if (/challenge|predict|quiz|test|சவால்|கணிப்பு|चुनौती|अनुमान|సవాలు|വെല്ലുവിളി|ಸವಾಲು|চ্যালেঞ্জ|आव्हान|પડકાર|ਚੁਣੌਤੀ|چیلنج|ଚ୍ୟାଲେଞ୍ଜ/.test(q)) {
        return { intent: 'START_CHALLENGE', lang, query };
      }
      // Play
      if (/play|start|run|continue|resume|இயக்கு|தொடங்கு|चलाओ|शुरू|ప్లే|തുടങ്ങൂ|ಪ್ರಾರಂಭಿಸಿ|চালাও|सुरू करा|શરૂ કરો|ਚਲਾਓ|چلائیں|ଚଲାନ୍ତୁ/.test(q)) {
        return { intent: 'PLAY_RESUME', lang, query };
      }
      // Pause
      if (/pause|stop|freeze|நிறுத்து|பாஸ்|रोको|पॉज़|ఆపు|നിർത്തൂ|ನಿಲ್ಲಿಸಿ|থামাও|थांबवा|રોકો|ਰੋਕੋ|روکیں|ଅଟକାନ୍ତୁ/.test(q)) {
        return { intent: 'PAUSE_STOP', lang, query };
      }
      // Reset
      if (/reset|restart|start over|மீட்டமை|மறுபடி அமை|रीसेट|फिर से शुरू|రీసెట్|റീസെറ്റ്|ಮರುಹೊಂದಿಸಿ|রিসেট|રીસેਟ|ਰੀਸੈਟ|دوبارہ ترتیب|ରିସେଟ୍/.test(q)) {
        return { intent: 'RESET_VIEW', lang, query };
      }
      // Step Forward
      if (/next step|step forward|forward|அடுத்த படி|முன்னேறு|अगला कदम|आगे बढ़ो|తదుపరి అడుగు|ಮುಂದಿನ ಹೆಜ್ಜೆ|পরের ধাপ|पुढील पायरी|આગળનું પગલું|ਅਗਲਾ ਕਦਮ|اگلا قدم|ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ/.test(q)) {
        return { intent: 'STEP_FORWARD', lang, query };
      }
      // Step Back
      if (/prev step|previous step|step back|backward|முந்தைய படி|பின்னே போ|पिछला कदम|पीछे जाओ|మునుపటి అడుగు|ಹಿಂದಿನ ಹೆಜ್ಜೆ|আগের ধাপ|मागील पायरी|પાછળનું પગલું|ਪਿਛਲਾ ਕਦਮ|پچھلا قدم|ପୂର୍ବ ପଦକ୍ଷେପ/.test(q)) {
        return { intent: 'STEP_BACKWARD', lang, query };
      }
      // Next Lesson
      if (/next lesson|next proof|அடுத்த பாடம்|अगला पाठ|తదుపరి పాఠం|അടുത്ത പാഠം|ಮುಂದಿನ ಪಾಠ|পরের পাঠ|पुढील धडा|આગળનો પાઠ|ਅਗਲਾ ਪਾਠ|اگلا سبق|ପରବର୍ତ୍ତୀ ପାଠ/.test(q)) {
        return { intent: 'NEXT_LESSON', lang, query };
      }
      // Prev Lesson
      if (/prev lesson|previous lesson|முந்தைய பாடம்|पिछला पाठ|మునుపటి పాఠం|മുമ്പത്തെ പാഠം|ಹಿಂದಿನ ಪಾಠ|আগের পাঠ|मागील धडा|પાછળનો પાઠ|ਪਿਛਲਾ ਪਾਠ|پچھلا سبق|ପୂର୍ବ ପାଠ/.test(q)) {
        return { intent: 'PREV_LESSON', lang, query };
      }
      // Repeat
      if (/repeat|again|say again|மறுபடியும்|மீண்டும்|फिर से বলো|दोबारा|మళ్ళీ|ഒരിക്കൽ കൂടി|ಮತ್ತೊಮ್ಮೆ|আবার বলো|पुन्हा सांगा|ફરીથી|ਦੁਬਾਰਾ|دوبارہ|ପୁଣି/.test(q)) {
        return { intent: 'REPEAT', lang, query };
      }
      // Increase variable
      if (/make it bigger|bigger|increase|larger|பெரிதாக்கு|அதிகரி|बड़ा करो|बढ़ाओ|పెద్దది చేయండి|వలుతాക്കൂ|ದೊಡ್ಡದು ಮಾಡಿ|বড় করো|मोठे करा|મોટું કરો|ਵੱਡਾ ਕਰੋ|بڑا کریں|ବଡ଼ କରନ୍ତୁ/.test(q)) {
        return { intent: 'CHANGE_VARIABLE_INCREASE', lang, query };
      }
      // Decrease variable
      if (/make it smaller|smaller|decrease|shrink|சிறிதாக்கு|குறை|छोटा करो|घटाओ|చిన్నది చేయండి|ചെറുതാക്കൂ|ಸಣ್ಣದು ಮಾಡಿ|ছোট করো|लहान करा|નાનું કરો|ਛੋਟਾ ਕਰੋ|چھوٹا کریں|ଛୋଟ କରନ୍ତୁ/.test(q)) {
        return { intent: 'CHANGE_VARIABLE_DECREASE', lang, query };
      }
      // Inspector
      if (/x-ray|xray|labels|measurements|எக்ஸ்ரே|லேபிள்கள்|एक्स-रे|लेबल|ఎక్స్-రే|లేబుల్స్|എക്സ്-റേ|ಎಕ್ಸ್-ರೇ|এক্স-রে|ક્ષ-કિરણ|ਐਕਸ-ਰੇ|ایکس رے|ଏକ୍ସ-ରେ/.test(q)) {
        return { intent: 'TOGGLE_INSPECTOR', lang, query };
      }

      return { intent: 'EXPLAIN_CONCEPT', lang, query };
    }

    // Context-Aware Intent Handler & Visual Action Trigger
    handleStudentInput(rawQuery, fromVoice = false) {
      if (!rawQuery) return;
      const parsed = this.parseIntent(rawQuery);
      const base = getLangBase(parsed.lang);

      // Auto update resolved language if from voice detection
      if (this.currentLanguage === 'auto' && parsed.lang !== this.resolvedLanguage) {
        this.resolvedLanguage = parsed.lang;
        this.updateAllUI(parsed.lang);
      }

      let responseText = '';
      let visualActionName = '';

      // Get lesson metadata from DOM or global
      const titleEl = document.querySelector('.lesson-title');
      const lessonTitle = titleEl ? titleEl.textContent : 'Maths Universe';
      const cueEl = document.getElementById('cueText');
      const currentCue = cueEl ? cueEl.textContent : '';

      switch (parsed.intent) {
        case 'CHANGE_SPEED_SLOW':
          this.setSpeechRate('slow');
          const speed05Btn = document.querySelector('.speed-btn[data-speed="0.5"]');
          if (speed05Btn) speed05Btn.click();
          visualActionName = 'Set Speed to 0.5×';
          if (base === 'ta') responseText = 'வேகம் 0.5x ஆக குறைக்கப்பட்டது. நான் இனி மெதுவாகவும் நிதானமாகவும் பேசுவேன்!';
          else if (base === 'hi') responseText = 'गति 0.5x कर दी गई है। अब मैं आराम से और धीरे-धीरे समझाऊंगा!';
          else if (base === 'te') responseText = 'స్పీడ్ 0.5x కి తగ్గించబడింది. ఇప్పుడు నేను నిదానంగా వివరిస్తాను!';
          else responseText = 'Speed adjusted to 0.5×. Taking it nice and steady!';
          break;

        case 'CHANGE_SPEED_FAST':
          this.setSpeechRate('fast');
          const speed20Btn = document.querySelector('.speed-btn[data-speed="2.0"]');
          if (speed20Btn) speed20Btn.click();
          visualActionName = 'Set Speed to 2.0×';
          if (base === 'ta') responseText = 'வேகம் 2.0x ஆக அதிகரிக்கப்பட்டது!';
          else if (base === 'hi') responseText = 'गति 2.0x बढ़ा दी गई है!';
          else responseText = 'Speed set to fast (2.0×)!';
          break;

        case 'WHY_CONCEPT':
          visualActionName = 'Demonstrated Conserved Invariant';
          // Pulse the why it works section
          const whySec = document.querySelector('.why-it-works-card');
          if (whySec) {
            whySec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            whySec.classList.add('pulse-glow');
            setTimeout(() => whySec.classList.remove('pulse-glow'), 2000);
          }
          if (base === 'ta') {
            responseText = `கவனியுங்கள்: ${lessonTitle} பாடத்தில், உருவங்களை நகர்த்தினாலும் அவற்றின் அடிப்படை பரப்பளவு அல்லது வடிவியல் பண்புகள் ஒருபோதும் மாறுவதில்லை! இதுவே இதன் ஆழமான உண்மை!`;
          } else if (base === 'hi') {
            responseText = `ध्यान से देखिए: ${lessonTitle} में आकृतियों को चाहे जैसे भी स्थानांतरित करें, उनका कुल क्षेत्रफल या संबंध अपरिवर्तनीय रहता है!`;
          } else if (base === 'te') {
            responseText = `గమనించండి: ${lessonTitle} లో ఆకారాలను మార్చినా, వాటి నిష్పత్తి లేదా వైశాల్యం ఎప్పటికీ స్థిరంగా ఉంటుంది!`;
          } else {
            responseText = `Notice the conserved invariant in ${lessonTitle}: the fundamental geometric property or area remains strictly identical across transformations!`;
          }
          break;

        case 'SHOW_FORMULA':
          visualActionName = 'Highlighted Formula Card';
          const formulaPill = document.querySelector('.why-card-formula') || document.querySelector('.card-formula-pill');
          if (formulaPill) {
            formulaPill.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            formulaPill.classList.add('pulse-glow');
            setTimeout(() => formulaPill.classList.remove('pulse-glow'), 2500);
          }
          if (base === 'ta') responseText = 'இதோ இந்த நிரூபணத்தின் முக்கிய சூத்திரம் திரையில் முன்னிலைப்படுத்தப்பட்டுள்ளது!';
          else if (base === 'hi') responseText = 'यहाँ इस प्रमाण का मुख्य सूत्र स्क्रीन पर हाइलाइट किया गया है!';
          else responseText = 'Here is the central formula highlighted on your screen!';
          break;

        case 'GIVE_HINT':
          visualActionName = 'Provided Step Hint';
          const predBox = document.querySelector('.pred-box');
          if (predBox) {
            predBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          if (base === 'ta') responseText = 'ஒரு சிறிய குறிப்பு: உருவங்கள் மாறும்போது எது மாறாமல் நிலையாக இருக்கிறது என்பதை உற்றுப் பாருங்கள்!';
          else if (base === 'hi') responseText = 'एक संकेत: ध्यान दें कि रूपांतरण के दौरान कौन सा भाग पूरी तरह स्थिर और संरक्षित रहता है!';
          else responseText = 'Hint: Look closely at which area or boundary remains strictly invariant throughout the motion!';
          break;

        case 'START_CHALLENGE':
          visualActionName = 'Scrolled to Prediction Challenge';
          const pBox = document.querySelector('.pred-box');
          if (pBox) {
            pBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            pBox.classList.add('pulse-glow');
            setTimeout(() => pBox.classList.remove('pulse-glow'), 2000);
          }
          if (base === 'ta') responseText = 'அருமை! கணிப்பு சவால் தயார். சரியான விடையைத் தேர்ந்தெடுங்கள்!';
          else if (base === 'hi') responseText = 'बढ़िया! भविष्यवाणी चुनौती तैयार है। सही विकल्प चुनें!';
          else responseText = 'Challenge mode active! Predict what happens when you transform the shapes!';
          break;

        case 'PLAY_RESUME':
          const playBtn = document.getElementById('btnPlayPause');
          if (playBtn) playBtn.click();
          visualActionName = 'Triggered Play Animation';
          if (base === 'ta') responseText = 'இயக்கம் தொடங்கப்பட்டது!';
          else if (base === 'hi') responseText = 'एनिमेशन शुरू हो गया है!';
          else responseText = 'Transformation animation playing!';
          break;

        case 'PAUSE_STOP':
          const pauseBtn = document.getElementById('btnPlayPause');
          if (pauseBtn) {
            const playIcon = document.getElementById('playIcon');
            if (playIcon && playIcon.textContent === '⏸') pauseBtn.click();
          }
          visualActionName = 'Paused Animation';
          if (base === 'ta') responseText = 'இயக்கம் தற்காலிகமாக நிறுத்தப்பட்டது.';
          else if (base === 'hi') responseText = 'एनिमेशन रोक दिया गया है।';
          else responseText = 'Transformation paused.';
          break;

        case 'RESET_VIEW':
          const rBtn = document.getElementById('btnReset');
          if (rBtn) rBtn.click();
          visualActionName = 'Reset to Initial Stage';
          if (base === 'ta') responseText = 'தொடக்க நிலைக்கு மீட்டமைக்கப்பட்டது!';
          else if (base === 'hi') responseText = 'प्रारंभिक स्थिति में रीसेट कर दिया गया!';
          else responseText = 'Reset to initial step.';
          break;

        case 'STEP_FORWARD':
          const fwdBtn = document.getElementById('btnStepFwd');
          if (fwdBtn) fwdBtn.click();
          visualActionName = 'Stepped Forward 5%';
          if (base === 'ta') responseText = 'ஒரு படி முன்னேறினோம்!';
          else if (base === 'hi') responseText = 'एक कदम आगे बढ़े!';
          else responseText = 'Stepped forward!';
          break;

        case 'STEP_BACKWARD':
          const backBtn = document.getElementById('btnStepBack');
          if (backBtn) backBtn.click();
          visualActionName = 'Stepped Backward 5%';
          if (base === 'ta') responseText = 'ஒரு படி பின்னே சென்றோம்!';
          else if (base === 'hi') responseText = 'एक कदम पीछे गए!';
          else responseText = 'Stepped backward!';
          break;

        case 'NEXT_LESSON':
          const nextBtn = document.querySelector('.nav-arrow-btn[id="btnNextLesson"]') || document.querySelectorAll('.nav-arrow-btn')[1];
          if (nextBtn && nextBtn.href) {
            visualActionName = 'Navigating to Next Lesson';
            if (base === 'ta') responseText = 'அடுத்த பாடத்திற்குச் செல்கிறோம்!';
            else if (base === 'hi') responseText = 'अगले पाठ की ओर बढ़ रहे हैं!';
            else responseText = 'Moving to next lesson!';
            setTimeout(() => { window.location.href = nextBtn.href; }, 1200);
          } else {
            responseText = 'You are at the final lesson!';
          }
          break;

        case 'PREV_LESSON':
          const prevBtn = document.querySelector('.nav-arrow-btn[id="btnPrevLesson"]') || document.querySelectorAll('.nav-arrow-btn')[0];
          if (prevBtn && prevBtn.href) {
            visualActionName = 'Navigating to Previous Lesson';
            if (base === 'ta') responseText = 'முந்தைய பாடத்திற்குச் செல்கிறோம்!';
            else if (base === 'hi') responseText = 'पिछले पाठ की ओर बढ़ रहे हैं!';
            else responseText = 'Moving to previous lesson!';
            setTimeout(() => { window.location.href = prevBtn.href; }, 1200);
          } else {
            responseText = 'You are at the first lesson!';
          }
          break;

        case 'REPEAT':
          this.repeatLast();
          return;

        case 'CHANGE_VARIABLE_INCREASE':
          const incBtn = document.getElementById('btnParamInc');
          if (incBtn) incBtn.click();
          visualActionName = 'Increased Parameter Slider';
          if (base === 'ta') responseText = 'அளவு அதிகரிக்கப்பட்டது!';
          else if (base === 'hi') responseText = 'मान बढ़ा दिया गया!';
          else responseText = 'Increased parameter value!';
          break;

        case 'CHANGE_VARIABLE_DECREASE':
          const decBtn = document.getElementById('btnParamDec');
          if (decBtn) decBtn.click();
          visualActionName = 'Decreased Parameter Slider';
          if (base === 'ta') responseText = 'அளவு குறைக்கப்பட்டது!';
          else if (base === 'hi') responseText = 'मान घटा दिया गया!';
          else responseText = 'Decreased parameter value!';
          break;

        case 'TOGGLE_INSPECTOR':
          const inspChk = document.getElementById('chkInspector');
          if (inspChk) {
            inspChk.checked = !inspChk.checked;
            inspChk.dispatchEvent(new Event('change'));
          }
          visualActionName = 'Toggled X-Ray Inspector';
          if (base === 'ta') responseText = 'எக்ஸ்ரே அளவீடுகள் மாற்றப்பட்டன!';
          else if (base === 'hi') responseText = 'एक्स-रे माप टॉगल किया गया!';
          else responseText = 'X-Ray inspector toggled!';
          break;

        default: // EXPLAIN_CONCEPT
          visualActionName = 'Explained Current Concept';
          if (currentCue) {
            responseText = currentCue;
          } else {
            if (base === 'ta') responseText = `இந்த ${lessonTitle} பாடத்தில் நாம் காணும் காட்சி கணித நிரூபணத்தை உற்றுப் பாருங்கள். டைம்லைனை நகர்த்தி ஒவ்வொரு மாற்றத்தையும் ஆராயுங்கள்!`;
            else if (base === 'hi') responseText = `इस ${lessonTitle} में दृश्य गणितीय प्रमाण को देखें। टाइमलाइन को आगे-पीछे करके प्रत्येक बदलाव का अन्वेषण करें!`;
            else responseText = `Look closely at this visual transformation for ${lessonTitle}. Drag the scrubber along the timeline to explore how the proof unfolds!`;
          }
          break;
      }

      // Display in Guide Dialog UI
      this.displayGuideInteraction(rawQuery, responseText, visualActionName, parsed.lang);

      // Speak text if responseMode allows voice
      if (this.responseMode !== 'text_only') {
        this.speak(responseText, parsed.lang);
      }
    }

    displayGuideInteraction(query, response, actionName, lang) {
      const modal = document.getElementById('mathsGuideModal');
      const transcriptEl = document.getElementById('guideTranscriptText');
      const responseEl = document.getElementById('guideResponseText');
      const actionBadge = document.getElementById('guideActionBadge');

      if (transcriptEl) transcriptEl.textContent = `“${query}”`;
      if (responseEl) responseEl.textContent = response;
      if (actionBadge) {
        if (actionName) {
          actionBadge.textContent = `✨ ${actionName}`;
          actionBadge.style.display = 'inline-block';
        } else {
          actionBadge.style.display = 'none';
        }
      }

      if (modal && modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
      }
    }

    updateGuideMicUI(isListening) {
      const micBtn = document.getElementById('guideBigMicBtn');
      const micStatus = document.getElementById('guideMicStatus');
      const floatingMic = document.getElementById('floatingGuideMic');

      if (micBtn) {
        micBtn.classList.toggle('listening', isListening);
      }
      if (floatingMic) {
        floatingMic.classList.toggle('listening', isListening);
      }
      if (micStatus) {
        if (isListening) {
          const langObj = SUPPORTED_LANGUAGES.find(l => l.code === this.resolvedLanguage);
          const langName = langObj ? langObj.native : 'your language';
          micStatus.textContent = `Listening in ${langName}... Speak now!`;
          micStatus.classList.add('status-active');
        } else {
          micStatus.textContent = `Tap microphone to speak or type below`;
          micStatus.classList.remove('status-active');
        }
      }
    }

    toggleListening() {
      if (!this.recognition) {
        const msg = this.getText('voiceUnavailable');
        alert(msg);
        const input = document.getElementById('guideTextInput');
        if (input) input.focus();
        return;
      }

      if (this.isListening) {
        try { this.recognition.stop(); } catch(e){}
      } else {
        try {
          this.recognition.lang = this.resolvedLanguage;
          this.recognition.start();
        } catch(e) {
          console.warn('Start recognition error:', e);
        }
      }
    }

    // Dynamic Zero-Reload UI Synchronization across elements
    updateAllUI(langCode) {
      const base = getLangBase(langCode);

      // 1. Language selector element itself
      const sel = document.getElementById('languageSelect');
      if (sel && sel.value !== this.currentLanguage) {
        sel.value = this.currentLanguage;
      }

      // 2. Buttons & Labels
      const btnNotes = document.getElementById('btnOpenNotes');
      if (btnNotes) btnNotes.textContent = this.getText('studentNotes', langCode);

      const btnHelp = document.getElementById('btnHelp');
      if (btnHelp) btnHelp.textContent = this.getText('help', langCode);

      const btnGuide = document.getElementById('btnAskGuide');
      if (btnGuide) btnGuide.innerHTML = `<span>🎤</span> <span>${this.getText('askGuide', langCode)}</span>`;

      const missionLabel = document.querySelector('.mission-label');
      if (missionLabel) missionLabel.textContent = this.getText('mission', langCode);

      const analogyBadge = document.querySelector('.analogy-badge');
      if (analogyBadge) analogyBadge.textContent = this.getText('analogy', langCode);

      const cueBadge = document.querySelector('.cue-badge');
      if (cueBadge) cueBadge.textContent = this.getText('teacherVoice', langCode);

      const cueSpeakBtn = document.getElementById('cueSpeakBtn');
      if (cueSpeakBtn) cueSpeakBtn.textContent = this.getText('listen', langCode);

      const dragHint = document.getElementById('canvasDragHint');
      if (dragHint) dragHint.textContent = this.getText('dragHint', langCode);

      // Play / Pause label
      const playLabel = document.getElementById('playLabel');
      if (playLabel) {
        const isPlaying = document.getElementById('playIcon')?.textContent === '⏸';
        playLabel.textContent = isPlaying ? this.getText('pause', langCode) : this.getText('play', langCode);
      }

      // Loop button
      const loopBtn = document.getElementById('btnLoop');
      if (loopBtn) loopBtn.textContent = this.getText('loop', langCode);

      // Checkbox labels
      const chkGhostLabel = document.querySelector('label[for="chkGhost"]') || document.getElementById('chkGhost')?.parentElement;
      if (chkGhostLabel) {
        const span = chkGhostLabel.querySelector('span');
        if (span) span.textContent = this.getText('ghost', langCode);
      }
      const chkSnapLabel = document.querySelector('label[for="chkSnap"]') || document.getElementById('chkSnap')?.parentElement;
      if (chkSnapLabel) {
        const span = chkSnapLabel.querySelector('span');
        if (span) span.textContent = this.getText('snap', langCode);
      }
      const chkAreaLabel = document.querySelector('label[for="chkAreaLock"]') || document.getElementById('chkAreaLock')?.parentElement;
      if (chkAreaLabel) {
        const span = chkAreaLabel.querySelector('span');
        if (span) span.textContent = this.getText('areaLock', langCode);
      }
      const chkInspLabel = document.querySelector('label[for="chkInspector"]') || document.getElementById('chkInspector')?.parentElement;
      if (chkInspLabel) {
        const span = chkInspLabel.querySelector('span');
        if (span) span.textContent = this.getText('inspector', langCode);
      }

      // Reset button
      const resetBtn = document.getElementById('btnReset');
      if (resetBtn) resetBtn.textContent = this.getText('reset', langCode);

      // Why it works title
      const whyTitle = document.querySelector('.why-title');
      if (whyTitle) whyTitle.textContent = this.getText('whyItWorks', langCode);

      // Prediction Title
      const predTitle = document.querySelector('.pred-title');
      if (predTitle) predTitle.textContent = this.getText('prediction', langCode);

      // Stage Tabs
      const stepTabs = document.querySelectorAll('.step-tab-btn');
      if (stepTabs && stepTabs.length >= 3) {
        const t1 = stepTabs[0].querySelector('.step-name');
        if (t1) t1.textContent = this.getText('stage1', langCode);
        const t2 = stepTabs[1].querySelector('.step-name');
        if (t2) t2.textContent = this.getText('stage2', langCode);
        const t3 = stepTabs[2].querySelector('.step-name');
        if (t3) t3.textContent = this.getText('stage3', langCode);
      }

      // Guide Modal Header Badge
      const guideBadge = document.getElementById('guideActiveLangBadge');
      if (guideBadge) {
        const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
        guideBadge.textContent = langObj ? `${langObj.flag} ${langObj.native}` : langCode;
      }
    }
  }

  // 5. Inject Maths Guide Modal & Floating Trigger into DOM
  function injectMathsGuideUI(manager) {
    // Check if already injected
    if (document.getElementById('mathsGuideModal')) return;

    // Styles for Maths Guide
    const style = document.createElement('style');
    style.id = 'mathsGuideStyles';
    style.textContent = `
      .lang-selector-wrap {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #f8fafc;
        border: 1px solid var(--border-subtle, #e2e8f0);
        border-radius: 10px;
        padding: 4px 10px;
      }
      .lang-select-label {
        font-size: 11px;
        font-weight: 800;
        color: var(--purple-primary, #7c3aed);
        letter-spacing: 0.5px;
        white-space: nowrap;
      }
      .language-select {
        background: transparent;
        border: none;
        font-size: 13px;
        font-weight: 700;
        color: var(--text-main, #0f172a);
        cursor: pointer;
        outline: none;
        padding-right: 4px;
      }
      .language-select option {
        background: #ffffff;
        color: #0f172a;
      }
      .btn-maths-guide {
        background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%) !important;
        color: #ffffff !important;
        border: none !important;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 2px 8px rgba(124, 58, 237, 0.25);
      }
      .btn-maths-guide:hover {
        background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%) !important;
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
      }
      /* Floating Assistant Button */
      .floating-guide-trigger {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
        color: #ffffff;
        border: 2px solid #ffffff;
        border-radius: 9999px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(124, 58, 237, 0.4);
        transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
      }
      .floating-guide-trigger:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 12px 28px rgba(124, 58, 237, 0.5);
      }
      .floating-guide-trigger.listening {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        animation: pulseRing 1.5s infinite;
      }
      @keyframes pulseRing {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
        70% { box-shadow: 0 0 0 16px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      /* Guide Modal Dialog */
      .guide-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        transition: opacity 0.2s ease;
      }
      .guide-modal-overlay.hidden {
        display: none;
      }
      .guide-modal-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        width: 100%;
        max-width: 580px;
        box-shadow: 0 20px 40px -8px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: modalPop 0.25s cubic-bezier(0.2, 0, 0, 1);
      }
      @keyframes modalPop {
        from { opacity: 0; transform: scale(0.95) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .guide-modal-header {
        padding: 16px 22px;
        background: #fafbfc;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .guide-title-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .guide-avatar {
        font-size: 24px;
      }
      .guide-title-box h3 {
        font-size: 16px;
        font-weight: 800;
        color: #0f172a;
      }
      .guide-title-box p {
        font-size: 12px;
        color: #64748b;
      }
      .guide-lang-badge {
        font-size: 11px;
        font-weight: 700;
        color: #7c3aed;
        background: #ede9fe;
        padding: 4px 10px;
        border-radius: 9999px;
      }
      .guide-close-btn {
        background: transparent;
        border: none;
        font-size: 20px;
        color: #64748b;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
      }
      .guide-close-btn:hover {
        background: #f1f5f9;
        color: #0f172a;
      }
      .guide-modal-body {
        padding: 22px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-height: 70vh;
        overflow-y: auto;
      }
      /* Big Mic Hub */
      .guide-mic-hub {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 20px;
        background: #f8fafc;
        border: 1px dashed #cbd5e1;
        border-radius: 16px;
      }
      .guide-big-mic-btn {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
        color: #ffffff;
        border: none;
        font-size: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 18px rgba(124, 58, 237, 0.35);
        transition: all 0.2s;
      }
      .guide-big-mic-btn:hover {
        transform: scale(1.08);
      }
      .guide-big-mic-btn.listening {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        box-shadow: 0 0 0 10px rgba(16, 185, 129, 0.25);
        animation: micPulse 1.2s infinite;
      }
      @keyframes micPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.08); }
        100% { transform: scale(1); }
      }
      .guide-mic-status {
        font-size: 13px;
        font-weight: 600;
        color: #64748b;
        text-align: center;
      }
      .guide-mic-status.status-active {
        color: #059669;
        font-weight: 700;
      }
      /* Chat bubble display */
      .guide-chat-stream {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .guide-user-bubble {
        align-self: flex-end;
        background: #ede9fe;
        color: #5b21b6;
        padding: 10px 14px;
        border-radius: 14px 14px 2px 14px;
        font-size: 13px;
        font-weight: 600;
        max-width: 85%;
      }
      .guide-tutor-bubble {
        align-self: flex-start;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 14px 14px 14px 2px;
        padding: 14px;
        font-size: 13px;
        color: #1e293b;
        line-height: 1.5;
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        max-width: 90%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .guide-action-badge {
        align-self: flex-start;
        font-size: 11px;
        font-weight: 700;
        background: #dcfce7;
        color: #166534;
        padding: 3px 8px;
        border-radius: 6px;
      }
      .guide-audio-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }
      .guide-mini-btn {
        background: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 700;
        color: #475569;
        cursor: pointer;
      }
      .guide-mini-btn:hover {
        background: #e2e8f0;
        color: #0f172a;
      }
      /* Quick suggestions */
      .guide-quick-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .guide-quick-pill {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 9999px;
        padding: 5px 12px;
        font-size: 12px;
        color: #334155;
        cursor: pointer;
        transition: all 0.15s;
      }
      .guide-quick-pill:hover {
        background: #f5f3ff;
        border-color: #7c3aed;
        color: #6d28d9;
      }
      /* Input row */
      .guide-input-row {
        display: flex;
        gap: 8px;
        border-top: 1px solid #e2e8f0;
        padding-top: 14px;
      }
      .guide-text-input {
        flex: 1;
        padding: 10px 14px;
        font-size: 13px;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        outline: none;
      }
      .guide-text-input:focus {
        border-color: #7c3aed;
        box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
      }
      .guide-send-btn {
        background: #7c3aed;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        padding: 0 16px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }
      .guide-send-btn:hover {
        background: #6d28d9;
      }
      /* Voice controls toolbar */
      .guide-controls-strip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: #f8fafc;
        border-radius: 10px;
        font-size: 12px;
        color: #64748b;
      }
      .guide-rate-group {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .rate-pill {
        padding: 2px 8px;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        font-size: 11px;
        cursor: pointer;
      }
      .rate-pill.active {
        background: #7c3aed;
        color: #ffffff;
        border-color: #7c3aed;
      }
      .pulse-glow {
        animation: highlightSection 1.5s ease;
      }
      @keyframes highlightSection {
        0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7); }
        50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0.2); }
        100% { box-shadow: none; }
      }
    `;
    document.head.appendChild(style);

    // Create Modal HTML
    const modal = document.createElement('div');
    modal.id = 'mathsGuideModal';
    modal.className = 'guide-modal-overlay hidden';
    modal.innerHTML = `
      <div class="guide-modal-card">
        <div class="guide-modal-header">
          <div class="guide-title-row">
            <span class="guide-avatar">📐</span>
            <div class="guide-title-box">
              <h3>Maths Guide</h3>
              <p>Multilingual AI Voice & Visual Tutor</p>
            </div>
            <span class="guide-lang-badge" id="guideActiveLangBadge">🌐 Auto</span>
          </div>
          <button class="guide-close-btn" id="guideCloseBtn" title="Close Maths Guide">✕</button>
        </div>

        <div class="guide-modal-body">
          <!-- Voice Recognition Mic Hub -->
          <div class="guide-mic-hub">
            <button class="guide-big-mic-btn" id="guideBigMicBtn" title="Click to Speak">🎙️</button>
            <div class="guide-mic-status" id="guideMicStatus">Tap microphone to speak or type below</div>
          </div>

          <!-- Controls strip (rate & mode) -->
          <div class="guide-controls-strip">
            <div class="guide-rate-group">
              <span>Speed:</span>
              <button class="rate-pill ${manager.speechRate === 'slow' ? 'active' : ''}" data-rate="slow">🐢 Slow</button>
              <button class="rate-pill ${manager.speechRate === 'normal' ? 'active' : ''}" data-rate="normal">🚶 Normal</button>
              <button class="rate-pill ${manager.speechRate === 'fast' ? 'active' : ''}" data-rate="fast">🐇 Fast</button>
            </div>
            <div class="guide-rate-group">
              <span>Level:</span>
              <button class="rate-pill active" data-level="simple">Simple</button>
              <button class="rate-pill" data-level="step">Step-by-Step</button>
            </div>
          </div>

          <!-- Quick Suggestion Prompts -->
          <div class="guide-quick-pills" id="guideQuickPills">
            <button class="guide-quick-pill" data-q="Explain this concept">💡 Explain this</button>
            <button class="guide-quick-pill" data-q="Why does this formula work?">❓ Why does this work?</button>
            <button class="guide-quick-pill" data-q="Make it slower">🐢 Make it slower</button>
            <button class="guide-quick-pill" data-q="Give me a hint">🔍 Give me a hint</button>
            <button class="guide-quick-pill" data-q="Start challenge">🎯 Start challenge</button>
            <button class="guide-quick-pill" data-q="Show formula">📐 Show formula</button>
          </div>

          <!-- Stream chat / Responses -->
          <div class="guide-chat-stream">
            <div class="guide-user-bubble" id="guideTranscriptText">“Explain this mathematical proof”</div>
            <div class="guide-tutor-bubble">
              <span class="guide-action-badge" id="guideActionBadge" style="display:none;">✨ Action</span>
              <div id="guideResponseText">Welcome to Maths Universe! Speak in Tamil, Hindi, Telugu, English, or any supported language, and I will visually explain and guide you!</div>
              <div class="guide-audio-actions">
                <button class="guide-mini-btn" id="guideSpeakAgainBtn">🔊 Speak</button>
                <button class="guide-mini-btn" id="guideRepeatBtn">🔁 Repeat</button>
                <button class="guide-mini-btn" id="guideStopBtn">⏹ Stop</button>
              </div>
            </div>
          </div>

          <!-- Text Input Row -->
          <div class="guide-input-row">
            <input type="text" class="guide-text-input" id="guideTextInput" placeholder="Ask a question in your language or in English...">
            <button class="guide-send-btn" id="guideSendBtn">Send</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Floating trigger button on bottom-right corner
    const floatingBtn = document.createElement('button');
    floatingBtn.id = 'floatingGuideMic';
    floatingBtn.className = 'floating-guide-trigger';
    floatingBtn.innerHTML = `<span>🎤</span> <span>Ask Maths Guide</span>`;
    document.body.appendChild(floatingBtn);

    // Event Listeners for UI
    const openGuide = () => {
      modal.classList.remove('hidden');
      manager.updateGuideMicUI(manager.isListening);
      const input = document.getElementById('guideTextInput');
      if (input) input.focus();
    };

    floatingBtn.addEventListener('click', openGuide);

    const headerBtn = document.getElementById('btnAskGuide');
    if (headerBtn) headerBtn.addEventListener('click', openGuide);

    const closeBtn = document.getElementById('guideCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
      }
    });

    // Big Mic Click
    const bigMic = document.getElementById('guideBigMicBtn');
    if (bigMic) {
      bigMic.addEventListener('click', () => manager.toggleListening());
    }

    // Send Button & Text Input
    const sendBtn = document.getElementById('guideSendBtn');
    const input = document.getElementById('guideTextInput');
    const handleSend = () => {
      if (!input) return;
      const text = input.value.trim();
      if (text) {
        input.value = '';
        manager.handleStudentInput(text, false);
      }
    };
    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    // Quick suggestion pills
    const pillsWrap = document.getElementById('guideQuickPills');
    if (pillsWrap) {
      pillsWrap.addEventListener('click', (e) => {
        const pill = e.target.closest('.guide-quick-pill');
        if (pill && pill.dataset.q) {
          manager.handleStudentInput(pill.dataset.q, false);
        }
      });
    }

    // Audio controls
    const speakAgainBtn = document.getElementById('guideSpeakAgainBtn');
    if (speakAgainBtn) {
      speakAgainBtn.addEventListener('click', () => {
        const respText = document.getElementById('guideResponseText')?.textContent;
        if (respText) manager.speak(respText);
      });
    }
    const repeatBtn = document.getElementById('guideRepeatBtn');
    if (repeatBtn) repeatBtn.addEventListener('click', () => manager.repeatLast());

    const stopBtn = document.getElementById('guideStopBtn');
    if (stopBtn) stopBtn.addEventListener('click', () => manager.stopSpeaking());

    // Speed buttons
    modal.querySelectorAll('.rate-pill[data-rate]').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.rate-pill[data-rate]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        manager.setSpeechRate(btn.dataset.rate);
      });
    });

    // Explanation level
    modal.querySelectorAll('.rate-pill[data-level]').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.rate-pill[data-level]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        manager.setExplanationLevel(btn.dataset.level);
      });
    });
  }

  // 6. Bootstrap on Document Ready
  function init() {
    window.mathsLanguageManager = new MathsLanguageManager();

    // Hook existing or injected <select id="languageSelect">
    const bindSelect = () => {
      const select = document.getElementById('languageSelect');
      if (select) {
        select.value = window.mathsLanguageManager.currentLanguage;
        select.addEventListener('change', (e) => {
          const newLang = e.target.value;
          window.mathsLanguageManager.setLanguage(newLang);
        });
      }
    };

    bindSelect();
    injectMathsGuideUI(window.mathsLanguageManager);

    // Initial UI synchronization
    window.mathsLanguageManager.updateAllUI(window.mathsLanguageManager.resolvedLanguage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
