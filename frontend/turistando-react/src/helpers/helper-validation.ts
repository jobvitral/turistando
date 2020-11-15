export class HelperValidation
{
    constructor() {
        this.Valido = true;
        this.Erros = new Array<string>();
    }

    public Valido: boolean;
    public Erros: string[];

    public static setError(error: string): HelperValidation
    {
        let validation = new HelperValidation();
        validation.Valido = false;
        validation.Erros.push(error);

        return validation
    }
}
