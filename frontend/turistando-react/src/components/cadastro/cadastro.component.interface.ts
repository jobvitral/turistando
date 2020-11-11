
import {HelperValidation} from "../../helpers/helper-validation";

export interface CadastroComponentInterface
{
    valida(): HelperValidation;
    validaUsuarioExiste(): Promise<boolean>;
    uploadImage(): Promise<string>;
    efetuaCadastro(): Promise<void>;
}
