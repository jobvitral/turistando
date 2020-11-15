import {Usuario} from "../models/usuario";
import {useHistory} from "react-router-dom";

export class HelperCommons
{
    public static apiHost(endpoint: string): string
    {
        return 'https://turistando-api.ecolinx.com.br/' + endpoint;
    }

    public static wwwHost(): string
    {
        return 'https://turistando-api.ecolinx.com.br';
    }

    public static getEndpoint(item: string): string
    {
        const endpoint = item.replace(/\s+/g, '-').toLowerCase();

        return endpoint;
    }

    public static roundDouble(valor: number): number
    {
        return Math.round(valor * 100) / 100;
    }

    public static getToday(): Date
    {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        return new Date(year, month, day, 0, 0, 0);
    }

    public static getNow(): Date
    {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();
        const hour = new Date().getHours() - 3;
        const minutes = new Date().getMinutes();

        return new Date(year, month, day, hour, minutes, 0);
    }

    public static setDate(data: Date | string): Date | null
    {
        if (data != null)
        {
            data = new Date(data);

            const year = data.getFullYear();
            const month = data.getMonth();
            const day = data.getDate();

            return new Date(year, month, day, 0, 0, 0);
        }
        else
        {
            return null;
        }
    }

    public static getDateString(data: Date | string): string
    {
        if (data != null)
        {
            data = new Date(data);

            const year = data.getFullYear().toString().padStart(4,'0');
            const month = data.getMonth().toString().padStart(2,'0');
            const day = data.getDate().toString().padStart(2,'0');

            return `${day}/${month}/${year}`;
        }
        else
        {
            return '';
        }
    }

    public static calendarLocale(): any
    {
        const ptBr =
            {
                firstDayOfWeek: 0,
                dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
                dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
                monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
                monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
                today: 'Hoje',
                clear: 'Limpar',
                dateFormat: 'dd/mm/yyyy',
                weekHeader: 'Sem'
            };

        return ptBr;
    }

    public static chartColors(): string[]
    {
        return ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
            '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
            '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
            '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
    }

    public static goTop()
    {
        window.scrollTo(0, 0);

    }
}
