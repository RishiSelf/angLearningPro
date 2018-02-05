// Copyright (c) 2015, Fujana Solutions - Moritz Maleck. All rights reserved.
// For licensing, see LICENSE.md

CKEDITOR.plugins.add( 'imageuploader', {
    init: function( editor ) {
    	// return false;
        editor.config.filebrowserBrowseUrl = 'http://192.168.1.171/counselorhelp_code_deepak/counselor_api/app/webroot/js/ckeditor/plugins/imageuploader/imgbrowser.php';
    }
});
