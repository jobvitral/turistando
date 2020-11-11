import {Usuario} from "../../models/usuario";

export interface CadastroComponentProperties
{
    updateState?(usuario: Usuario): void;
}
