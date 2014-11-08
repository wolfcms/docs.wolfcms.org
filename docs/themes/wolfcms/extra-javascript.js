$(document).ready(function() {
    $("p.admonition-title").each(function(index, value) {
        var str = $(this).text();
        var res = '<i class="fa fa-exclamation-circle fa-fm"></i> &nbsp;'.concat(str);
        $(this).html(res);        
    });
});
