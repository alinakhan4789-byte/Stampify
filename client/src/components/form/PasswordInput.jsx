import { useState } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import IconInput from './IconInput';

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  return (
    <IconInput {...props} icon={KeyRound} type={show ? 'text' : 'password'}
      right={<button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 p-1 text-outline hover:text-on-surface">{show ? <EyeOff size={20} /> : <Eye size={20} />}</button>} />
  );
}
