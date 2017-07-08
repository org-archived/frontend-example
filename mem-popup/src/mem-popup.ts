/**
 * @author iamaprin
 */

import $ = require('jquery');
import * as domUtils from './domUtils'
import * as ajax from './ajax'

function init() {
	buildMain();
	initDeptTree();
}

function initDeptTree() : void {

	getDepts().done(_init);

	function _init(resp : ajax.ApiResponse) : void {
		console.log(resp);
	}
}

function getDepts() : JQuery.jqXHR<ajax.ApiResponse> {
	return $.getJSON('./data/tree-dept.json');
}

function buildMain() : void {
	$('head').append(domUtils.buildStylesheet('./style/mem-popup.css'));
	insertNode($('body'), nodes);
}

/**
 * 插入节点
 * @param $container  插入节点的容器
 * @param node  节点数据
 * @todo 移至domUtils
 */
function insertNode($container: JQuery, node: Node) : void {
	let $childNode = $(`<${node.tag}>`).addClass(node.class);

	let value = node.value;
	if (value) {
		$childNode.val(value);
	}

	let text = node.text;
	if (text) {
		$childNode.text(text);
	}

	let childNodes = node.childNodes;
	if (childNodes) {
		childNodes.forEach(element => {
			insertNode($childNode, element);
		});
	}

	$container.append($childNode);
}

interface Node {
	tag: string,
	class: string,
	value?: string,
	text?: string,
	childNodes?: Array<Node>
}

const nodes : Node = {
	tag: 'div',
	class: 'mem-popup',
	childNodes: [
		{
			tag: 'div',
			class: 'mp-header',
		},
		{
			tag: 'div',
			class: 'mp-content',
			childNodes: [
				{
					tag: 'div',
					class: 'mp-content-left',
				},
				{
					tag: 'div',
					class: 'mp-content-middle',
					childNodes: [
						{
							tag: 'div',
							class: 'mp-selectable',
							childNodes: [
								{
									tag: 'ul',
									class: '',
									childNodes: [
										{
											tag: 'li',
											class: '',
											text: 'test1'
										},
										{
											tag: 'li',
											class: '',
											text: 'test2'
										}
									]
								}
							]
						}
					]
				},
				{
					tag: 'div',
					class: 'mp-content-right',
					childNodes: [
						{
							tag: 'div',
							class: 'mp-selectable',
							childNodes: [
								{
									tag: 'ul',
									class: '',
									childNodes: [
										{
											tag: 'li',
											class: '',
											text: 'test1'
										},
										{
											tag: 'li',
											class: '',
											text: 'test2'
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			tag: 'div',
			class: 'mp-footer',
			childNodes: [
				{
					tag: 'div',
					class: 'mp-foot-btns-container',
					childNodes: [
						{
							tag: 'button',
							class: 'mp-foot-btns',
							text: '确定',
						},
						{
							tag: 'button',
							class: 'mp-foot-btns',
							text: '取消',
						}
					]
				}
			]
		}
	]
}

export = {
	init: init
}