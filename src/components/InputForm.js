import React from 'react'

const InputForm = () => {
    
  return (
    <div className="input-form">
        <form>
            <label htmlFor="text-area">What do you want to translate?</label>
            <br/>
            <textarea id="text-area" name="text-area" rows="4" cols="50" placeholder="Enter text here..." />
            <br/>
            <p>Select Language</p>
            <div className="radio-buttons">
                <div>
                    <input type="radio" id="french" name="french" value="french" />
                    <label htmlFor="french">French</label><br/>
                </div>
                <div>
                    <input type="radio" id="spanish" name="spanish" value="spanish" />
                    <label htmlFor="spanish">Spanish</label><br/>
                </div>
                <div>
                    <input type="radio" id="japenese" name="japenese" value="japenese" />
                    <label htmlFor="japenese">Japenese</label><br/>
                </div>
            </div>
            <button type="submit" className="submit-button">Translate</button>
        </form>
    </div>
  )
}

export default InputForm