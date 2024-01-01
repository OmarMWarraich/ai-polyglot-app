import React, { useState } from 'react'
import OpenAI from 'openai';

const InputForm = () => {
    const [textInput, setTextInput] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setTextInput(inputValue);
    }

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    }

    const handleTranslation = async (e) => {
        e.preventDefault();

        if (!textInput || !selectedLanguage) {
            console.error('Please enter text and select a language');
            return;
        }

        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const messages = [
            {
                role: 'system',
                content: `Translate the following text into ${selectedLanguage}: ${textInput}`,
            },
            {   
                role: 'user',
                content: `${textInput}`
            }
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: messages,
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
        })
        setTranslatedText(response.choices[0]?.message.content || 'Translation not available')
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;

        document.getElementById('text-area').value=''
        });
    }

  return (
    <div className="input-form">
        <form onSubmit={handleTranslation}>
            <label 
                htmlFor="text-area"
            >
                What do you want to translate?
            </label>
            <br/>
            <textarea 
                id="text-area" 
                name="text-area" 
                rows="4" 
                cols="50" 
                placeholder="Enter text here..." 
                onChange={handleInputChange}
            />
            <br/>
            <p>Select Language</p>
            <div className="radio-buttons">
                <div>
                    <input 
                        type="radio" 
                        id="french" 
                        name="french" 
                        value="french" 
                        onChange={handleLanguageChange}
                    />
                    <label 
                        htmlFor="french"
                    >
                        French
                    </label>
                    <br/>
                </div>
                <div>
                    <input
                        type="radio" 
                        id="spanish" 
                        name="spanish" 
                        value="spanish"
                        onChange={handleLanguageChange}
                     />
                    <label 
                        htmlFor="spanish"
                    >
                        Spanish
                    </label>
                    <br/>
                </div>
                <div>
                    <input 
                        type="radio" 
                        id="japenese" 
                        name="japenese" 
                        value="japenese" 
                        onChange={handleLanguageChange}
                    />
                    <label 
                        htmlFor="japenese"
                    >
                        Japenese
                    </label>
                    <br/>
                </div>
            </div>
            <button 
                type="submit" 
                className="submit-button"
            >
                Translate
            </button>
            {translatedText && (
                <div className="translated-text">
                    <p>Text: {textInput}</p>
                    <p>Translated Text: {translatedText}</p>
                </div>
            )}
        </form>
    </div>
  )
}

export default InputForm