'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta' | 'hi';

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        'brand': 'SmartIrrigate',
        'login': 'Log in',
        'get_started': 'Get Started',
        'hero_badge': 'The Future of Farming is Here',
        'hero_title_1': 'Grow More with',
        'hero_title_2': 'Intelligent Irrigation',
        'hero_desc': 'Eliminate the guesswork. SmartIrrigate helps small farmers conserve water and increase crop yields by providing data-driven schedules based on real-time weather and soil conditions.',
        'cta_primary': 'Start Saving Water',
        'cta_secondary': 'See How It Works',
        'challenge_title': 'The Challenge',
        'challenge_1': 'Reliance on strict schedules or manual judgment.',
        'challenge_2': 'Over-irrigation leads to water wastage and increased costs.',
        'challenge_3': 'Unexpected weather causes crop damage and yield loss.',
        'challenge_4': 'Lack of accessible, easy-to-use digital tools for small farmers.',
        'my_farm': 'My Farm',
        'daily_recommendation': 'Daily Recommendation',
        'irrigate_field': 'Irrigate Field',
        'skip_irrigation': 'Skip Irrigation',
        'soil_moisture': 'Soil Moisture',
        'weather_report': 'Weather Report',
        'crop_analytics': 'Crop Growth Analytics',
        'smart_control': 'Smart Irrigation Control',
    },
    ta: {
        'brand': 'ஸ்ார்ட் இரிகேட்',
        'login': 'உள்நுழைய',
        'get_started': 'தொடங்கவும்',
        'hero_badge': 'விவசாயத்தின் எதிர்காலம் இங்கே',
        'hero_title_1': 'அதிக விளைச்சலை பெறுங்கள்',
        'hero_title_2': 'அறிவார்ந்த நீர்ப்பாசனம்',
        'hero_desc': 'யூகிப்பதை நிறுத்துங்கள். ஸ்மார்ட் இரிகேட் சிறு விவசாயிகளுக்கு நீர் சேமிக்கவும், பயிர் விளைச்சலை அதிகரிக்கவும் உதவுகிறது.',
        'cta_primary': 'நீரை சேமிக்க தொடங்குங்கள்',
        'cta_secondary': 'இது எப்படி வேலை செய்கிறது',
        'challenge_title': 'சவால்கள்',
        'challenge_1': 'கடுமையான அட்டவணைகள் அல்லது கைமுறை தீர்ப்பை நம்பியிருத்தல்.',
        'challenge_2': 'அதிகப்படியான நீர்ப்பாசனம் நீர் விரயத்திற்கும் செலவு அதிகரிப்பிற்கும் வழிவகுக்கிறது.',
        'challenge_3': 'எதிர்பாராத வானிலை பயிர் சேதத்தையும் விளைச்சல் இழப்பையும் ஏற்படுத்துகிறது.',
        'challenge_4': 'சிறு விவசாயிகளுக்கு எளிதான டிஜிட்டல் கருவிகள் இல்லை.',
        'my_farm': 'என் பண்ணை',
        'daily_recommendation': 'தினசரி பரிந்துரை',
        'irrigate_field': 'வயலுக்கு நீர் பாய்ச்சவும்',
        'skip_irrigation': 'நீர்ப்பாசனத்தைத் தவிர்க்கவும்',
        'soil_moisture': 'மண் ஈரப்பதம்',
        'weather_report': 'வானிலை அறிக்கை',
        'crop_analytics': 'பயிர் வளர்ச்சி பகுப்பாய்வு',
        'smart_control': 'ஸ்ார்ட் நீர்ப்பாசன கட்டுப்பாடு',
    },
    hi: {
        'brand': 'स्मार्ट इरिगेट',
        'login': 'लॉगिन करें',
        'get_started': 'शुरू करें',
        'hero_badge': 'खेती का भविष्य यहाँ है',
        'hero_title_1': 'अधिक उपज प्राप्त करें',
        'hero_title_2': 'बुद्धिमान सिंचाई',
        'hero_desc': 'अनुमान लगाना बंद करें। स्मार्ट इरिगेट छोटे किसानों को पानी बचाने और वास्तविक समय के मौसम और मिट्टी की स्थिति के आधार पर डेटा-संचालित कार्यक्रम प्रदान करके फसल की पैदावार बढ़ाने में मदद करता है।',
        'cta_primary': 'पानी बचाना शुरू करें',
        'cta_secondary': 'यह कैसे काम करता है',
        'challenge_title': 'चुनौती',
        'challenge_1': 'सख्त कार्यक्रम या मैन्युअल निर्णय पर निर्भरता।',
        'challenge_2': 'अत्यधिक सिंचाई से पानी की बर्बादी और लागत बढ़ती है।',
        'challenge_3': 'अप्रत्याशित मौसम के कारण फसल को नुकसान और उपज की हानि होती है।',
        'challenge_4': 'छोटे किसानों के लिए सुलभ, उपयोग में आसान डिजिटल उपकरणों की कमी।',
        'my_farm': 'मेरा खेत',
        'daily_recommendation': 'दैनिक सिफारिश',
        'irrigate_field': 'खेत की सिंचाई करें',
        'skip_irrigation': 'सिंचाई छोड़ें',
        'soil_moisture': 'मिट्टी की नमी',
        'weather_report': 'मौसम रिपोर्ट',
        'crop_analytics': 'फसल विकास विश्लेषण',
        'smart_control': 'स्मार्ट सिंचाई नियंत्रण',
    }
};

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'ta' || savedLang === 'hi')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('app_language', lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
