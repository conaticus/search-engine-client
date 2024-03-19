import { ChangeEventHandler } from "react";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement>;
    input: string;
    placeholder: string;
};

export default function Input({ onChange, input, placeholder }: Props) {
    return <input placeholder={placeholder} onChange={onChange} value={input} />;
}
