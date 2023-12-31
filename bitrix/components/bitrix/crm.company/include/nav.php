<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

use Bitrix\Crm\Service\Container;

global $APPLICATION;

if (!isset($arResult['INTERNAL']) || !$arResult['INTERNAL'])
{
	$defaultTitle = '';
	if (isset($arResult['MYCOMPANY_MODE']) && $arResult['MYCOMPANY_MODE'] === 'Y')
	{
		$defaultTitle = GetMessage('CRM_MYCOMPANY_NAV_TITLE_LIST1');
	}
	else
	{
		$defaultTitle = GetMessage('CRM_COMPANY_NAV_TITLE_LIST_SHORT');
		if (empty($defaultTitle))
		{
			$defaultTitle = GetMessage('CRM_CONTACT_NAV_TITLE_LIST');
		}

		if (isset($arResult['CATEGORY_ID']) && $arResult['CATEGORY_ID'] > 0)
		{
			$category = Container::getInstance()
				->getFactory(CCrmOwnerType::Company)
				->getCategory($arResult['CATEGORY_ID'])
			;

			if (isset($category))
			{
				$defaultTitle = htmlspecialcharsbx($category->getName());
			}
		}
	}

	if (isset($arResult['CRM_CUSTOM_PAGE_TITLE']))
	{
		$APPLICATION->SetTitle($arResult['CRM_CUSTOM_PAGE_TITLE']);
	}
	elseif (isset($arResult['ELEMENT']['ID']))
	{
		$APPLICATION->AddChainItem($defaultTitle, $arParams['PATH_TO_COMPANY_LIST']);
		if (!empty($arResult['ELEMENT']['ID']))
		{
			$APPLICATION->SetTitle(
				GetMessage('CRM_COMPANY_NAV_TITLE_EDIT',
				['#NAME#' => $arResult['ELEMENT']['TITLE']])
			);
		}
		else
		{
			$APPLICATION->SetTitle(GetMessage('CRM_COMPANY_NAV_TITLE_ADD'));
		}
	}
	else
	{
		$APPLICATION->SetTitle($defaultTitle);
	}
}
