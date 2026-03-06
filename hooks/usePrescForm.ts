import { useForm } from "react-hook-form";

type formValues = {
    drugName: string;
    drugDose: number;
}

export default function usePrescForm(){

    return useForm<formValues>({
        defaultValues: {
            drugName:'paracetamol',
            drugDose: 300
        },
    })
}