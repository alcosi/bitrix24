<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/timeline.bundle.css',
	'js' => 'dist/timeline.bundle.js',
	'rel' => [
		'main.core',
		'ui.design-tokens',
		'timeman.timeformatter',
		'ui.vue.components.hint',
		'ui.vue',
	],
	'skip_core' => false,
];