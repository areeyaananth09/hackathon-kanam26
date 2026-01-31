// Helper function to translate API responses to Tamil/Hindi
// Add this to your LanguageContext.tsx before the speak function

function translateAPIResponse(text: string, targetLang: 'ta' | 'hi'): string {
    if (targetLang === 'ta') {
        // Tamil translations
        return text
            .replace(/Heavy rain forecast/gi, 'பலத்த மழை எதிர்பார்க்கப்படுகிறது')
            .replace(/Saving water/gi, 'தண்ணீரைச் சேமிக்கிறது')
            .replace(/Moisture/gi, 'ஈரப்பதம்')
            .replace(/is sufficient/gi, 'போதுமானது')
            .replace(/is below dynamic threshold/gi, 'மாறும் வரம்புக்குக் கீழே உள்ளது')
            .replace(/Threshold/gi, 'வரம்பு')
            .replace(/for/gi, 'க்கான')
            .replace(/stage/gi, 'நிலை')
            .replace(/Generic Growth/gi, 'பொது வளர்ச்சி')
            .replace(/Germination/gi, 'முளைப்பு')
            .replace(/Vegetative/gi, 'தாவர வளர்ச்சி')
            .replace(/Flowering/gi, 'பூக்கும் நிலை')
            .replace(/Maturation/gi, 'முதிர்ச்சி');
    } else {
        // Hindi translations
        return text
            .replace(/Heavy rain forecast/gi, 'भारी बारिश का पूर्वानुमान')
            .replace(/Saving water/gi, 'पानी बचा रहे हैं')
            .replace(/Moisture/gi, 'नमी')
            .replace(/is sufficient/gi, 'पर्याप्त है')
            .replace(/is below dynamic threshold/gi, 'गतिशील सीमा से नीचे है')
            .replace(/Threshold/gi, 'सीमा')
            .replace(/for/gi, 'के लिए')
            .replace(/stage/gi, 'चरण')
            .replace(/Generic Growth/gi, 'सामान्य विकास')
            .replace(/Germination/gi, 'अंकुरण')
            .replace(/Vegetative/gi, 'वानस्पतिक विकास')
            .replace(/Flowering/gi, 'फूल आना')
            .replace(/Maturation/gi, 'परिपक्वता');
    }
}

// Then in the speak function, replace lines 658-679 with:
if (language !== 'en' && textToSpeak === textOrKey && !translations[language][textOrKey]) {
    textToSpeak = translateAPIResponse(textToSpeak, language);
}
