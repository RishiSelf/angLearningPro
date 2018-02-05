/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'dialogui,dialog,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,floatingspace,listblock,richcombo,font,fakeobjects,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc,notification,wordcount,lineutils,widget,filetools,notificationaggregator,uploadwidget,symbol,imageresize,imagepaste,eqneditor,chart,base64image,image';
	config.skin = 'moono';
	// %REMOVE_END%
	config.removePlugins = 'elementspath';
	// Define changes to default configuration here. For example:
	config.language = 'sv';
    config.uiColor = '#FAFAFA';
    // config.defaultLanguage = 'de';
	config.font_names = 'Arial; Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif; Hindi/Devlys;';

	config.extraPlugins = 'imageuploader';
	// config.extraPlugins = 'filebrowser';
	// config.filebrowserUploadUrl = 'http://192.168.1.171/counselorhelp_code_deepak/counselor_api/js/ckeditor/plugins/imageuploader/imgbrowser.php';
};
