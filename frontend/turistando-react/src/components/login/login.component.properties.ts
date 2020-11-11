import {HelperLogin} from "../../helpers/helper-login";

export interface LoginComponentProperties
{
    email?: string;
    senha?: string;
    updateState(login: HelperLogin): void;
}
