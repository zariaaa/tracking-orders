import { FormEvent, FunctionComponent, ReactElement , useState} from "react";
import Orders from "../orders/Orders";
import "./LoginForm.css";
import {Trackings } from "../../../interfaces/InitialData.interface";
export type Props = {
    data: Trackings[],
}

const LogInForm: FunctionComponent<Props> = ({ data }): ReactElement =>{

    const [errorMessages, setErrorMessages] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const checkEmailsFromData = data?.map((user: Trackings) => {
        return user.email;
    })

    const handleSubmit = (event: FormEvent) => {
        if(checkEmailsFromData?.includes(email)){
            setErrorMessages('')
            resetForm()
            setIsSubmitted(true)
        } else {
            setErrorMessages('We couldn\'t find that email. Please try again.')
        }
        event.preventDefault();
    }

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === ''){
            setErrorMessages('')
        }
        const getValue =  event?.target.value;

        setEmail(getValue)
    }

    const resetForm = () => {
        setEmail('')
    };

    const renderForm = (
        <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="login-container">
                <div className="login-hero">
                    <div className="badge">Real-time tracking</div>
                    <h1>Track your orders<br/>in one place</h1>
                    <p>Enter your email to view your recent orders, tracking updates, and delivery status.</p>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="test@example.com"
                        value={email}
                        onChange={onEmailChange}
                        required
                    />
                </div>
                <div className="error-message">
                    {errorMessages}
                </div>

                <div className="form-button margin">
                    <input className="button" value="View My Orders" type="submit"/>
                </div>

                <div className="login-footer">
                    <p>Try it out with the test account</p>
                    <div className="test-hint">test@example.com</div>
                </div>
            </div>
        </form>
     );

    return (
        isSubmitted ? <Orders data={data}/> : renderForm
    )
}

export default LogInForm;