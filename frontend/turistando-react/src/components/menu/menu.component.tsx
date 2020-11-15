import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/api';
import { HelperSessao } from '../../helpers/helper-sessao';
import { GlobalService } from '../../services/global.service';
import { useHistory } from 'react-router-dom';
import { EnumTipoUsuario } from '../../helpers/enum-tipo-usuario';
import '../../index.css';
import logo from '../../assets/images/logo.png';

const MenuComponent: React.FC = () => 
{
	const history = useHistory();
	const [sessao, setSessao] = useState<HelperSessao>(GlobalService.getSessao());
	
	const carregaMenu = (): MenuItem[] => 
	{
		let items = new Array<MenuItem>();
		items.push({ label: 'Home', icon: 'pi pi-fw pi-home' });
		
		//mostra item de roteiro somente para o perfil guia
		if(sessao.Tipo === EnumTipoUsuario.Guia)
			items.push({ label: 'Roteiros', icon: 'pi pi-fw pi-compass' });
		
		if(sessao.Tipo === EnumTipoUsuario.Turista)
			items.push({ label: 'Busca', icon: 'pi pi-fw pi-search' });
		
		items.push({ label: 'Cadastro', icon: 'pi pi-fw pi-user' });

		return items;
	}

	const carregaAtual = ():MenuItem => 
	{
		const path = history.location.pathname;
		let menuAtual: MenuItem = menuItems[0];

		if(path.startsWith('/roteiro'))
		{
			menuAtual = menuItems.find(a => a.label === 'Roteiros') as MenuItem;
		}
		else
		{
			if(path.startsWith('/reserva'))
			{
				menuAtual = menuItems.find(a => a.label === 'Busca') as MenuItem;
			}
			else
			{
				switch(path)
				{
					case '/':
						menuAtual = menuItems.find(a => a.label === 'Home') as MenuItem;
						break;
					case '/roteiro':
						menuAtual = menuItems.find(a => a.label === 'Roteiros') as MenuItem;
						break;
					case '/busca':
						menuAtual = menuItems.find(a => a.label === 'Busca') as MenuItem;
						break;
					case '/usuario':
						menuAtual = menuItems.find(a => a.label === 'Cadastro') as MenuItem;
						break;
					default:
						menuAtual = menuItems.find(a => a.label === 'Home') as MenuItem;
						break;
				}
			}
		}

		return menuAtual;
	}
	
	//inicializa o menu
	const [menuItems, setMenuItems] = useState<MenuItem[]>(carregaMenu());
	const [activeItem, setActiveItem] = useState<MenuItem>(carregaAtual());

	//navegacao do menu
	const onMenuItem_Change = (e: any) => 
	{
		setActiveItem(e.value);
		
		switch(e.value.label)
		{
			case 'Home':
				history.push('/');
				break;
			case 'Roteiros':
				history.push('/roteiro');
				break;
			case 'Busca':
				history.push('/busca');
				break;
			case 'Cadastro':
				history.push('/usuario');
				break;
			default:
				history.push('/');
				break;
		}
	}

	return (
		<div className="menu-component">
			<div className="logo">
				<img src={logo} alt="Turistando"/>
			</div>
			<div className="actions">
				<TabMenu model={ menuItems } activeItem={ activeItem } onTabChange={(e) => onMenuItem_Change(e)} />
			</div>
		</div>
	);
}

export default MenuComponent;