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
        console.log('user.email', user.email)
        return user.email;
    })

    const handleSubmit = (event: FormEvent) => {
        if(checkEmailsFromData?.includes(email)){
            setErrorMessages('')
            resetForm()
            setIsSubmitted(true)
        } else {
            setErrorMessages('Please enter correct email.')
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

    console.log('user.email', email);
    console.log('checkEmailsFromData', checkEmailsFromData);

    const renderForm = (
        <form onSubmit={(e) => handleSubmit(e)} method="POST">
            <div className="login-container">
                <div className="form-header margin">
                    <div className="title">
                        <span>Please enter your email address to see your recent orders</span>
                    </div>
                </div>
                <div className="form-input">
                    <label htmlFor="email">Email {`(Use test email to test the app)`}</label>
                    <input type="email" placeholder="Test email: test@example.com" value={email} onChange={onEmailChange} required />
                </div>
                <div className="error-message">
                    {errorMessages}
                </div>
           
                <div className="form-button margin">
                    <input className="button" value="SEND" type="submit"/>
                </div>
            </div>
        </form>
     );
    
    return (
        isSubmitted ? <Orders data={data}/> : renderForm
    )
}

export default LogInForm;