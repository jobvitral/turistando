import {useHistory} from "react-router-dom";

export function HelperRedirect(url: string, params: any): void
{
    const history = useHistory();
    history.push(url);
}
