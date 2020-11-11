import {EnumDialogType} from "./enum-dialog-type";
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

export class HelperDialog
{
    public static alert(pTitle: string, pMessage: string[], pType: EnumDialogType, pCallback: any): void
    {
        let stringMessage = '';

        pMessage.forEach((err) => {
            stringMessage += "- " + err + "<br>";
        });

        let type: SweetAlertIcon = 'info';
        switch (pType) {
            case EnumDialogType.Sucesso:
                type = "success";
                break;
            case EnumDialogType.Erro:
                type = "error";
                break;
            case EnumDialogType.Info:
                type = "info";
                break;
            case EnumDialogType.Warning:
                type = "warning";
                break;
            default:
                type = "info";
                break;
        }

        let options = {
            title: pTitle,
            html: stringMessage,
            icon: type,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        } as SweetAlertOptions;

        Swal.fire(options)
            .then((result) =>
            {
                if (result.value)
                {
                    if(pCallback != null)
                        pCallback();
                }
            });
    }

    public static confirm(pTitle: string, pMessage: string, acceptCallback: any, rejectCallback: any): void
    {
        let options = {
            title: pTitle,
            text: pMessage,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#4f4f4f',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        } as SweetAlertOptions;

        Swal.fire(options)
            .then((result) =>
            {
                if (result.value)
                {
                    if(acceptCallback != null)
                        acceptCallback();
                }
                else
                {
                    if(rejectCallback != null)
                        rejectCallback();
                }
            });
    }
}
