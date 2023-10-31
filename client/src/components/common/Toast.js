
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Toast({message,run}) {

     run = () => toast(message);

    return ( <ToastContainer></ToastContainer> );
}

export default Toast;