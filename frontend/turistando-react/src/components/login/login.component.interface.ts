import {HelperLogin} from "../../helpers/helper-login";
import {Usuario} from "../../models/usuario";
import {HelperValidation} from "../../helpers/helper-validation";
import {HelperSessao} from "../../helpers/helper-sessao";

export interface LoginComponentInterface
{
    valida(): HelperValidation;
    efetuaLogin(): Promise<void>;
}
