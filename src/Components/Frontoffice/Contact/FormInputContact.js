import { useState } from "react";
import './FormInputContact.css'

const FormInput = ({ errorMessage, onChange, ...inputProps }) => {

    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => setFocused(true);

    return (
        <div className="input-container-signup">
            <input className="last-input-consult"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                required
                focused={focused.toString()}
            />
            <span className="error-message-signup">{errorMessage}</span>
        </div>
    );
};

export default FormInput;