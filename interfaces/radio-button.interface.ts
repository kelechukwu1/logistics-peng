export interface IRadioButton {
    options: string[];
    selected: string;
    onChange: (value: string) => void;
}