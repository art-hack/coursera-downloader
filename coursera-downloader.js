(function(){
  "use strict";

  /***********
  * Lecture
  ************/
  var lectureSetup = function() {

    // Video lecture DOM sections
    var listHeaders = $(".course-item-list-header h3");
    var listSectionList = $(".course-item-list-section-list");

    // Video download link template
    var videoDownloadTmpl = _.template(
      "<a href=\"#\" data-placement=\"top\" id=\"section-<%= sectionId %>\" class=\"section-download-link\" rel=\"tooltip\" title=\"Download all videos for <%= header %>\" style=\"float:right;\">" +
        "<i class=\"icon-download-alt resource\"></i>" +
      "</a>"
    );

    // Video download event listener
    var downloadSectionVideos = function(event) {
      var videoDownloadLinks = listSectionList
                    .eq(event.data.sectionId)
                    .find(".course-lecture-item-resource")
                    .find("a:last");
      _.each(videoDownloadLinks, function(elm, idx) {
        window.open($(elm).attr("href"));
      });
      event.stopPropagation(); // Don"t collapse header.
    };

    // Get course item list headers and add a download link next to each
    _.each(listHeaders, function(elm, idx) {
      var title = $(elm).text();
      var $link = $(videoDownloadTmpl({"sectionId" : idx, "header": title}));
      $link.appendTo(elm);
      $link.on("click", {sectionId: idx}, downloadSectionVideos);
    });
  };


  /**********
  * Router
  ***********/
  var sectionPath = window.location.pathname.split("/")[2];

  switch (sectionPath) {
    case "lecture":
      lectureSetup();
      break;
    default:
      alert("Sorry. Coursera Downloader does not support this page.");
      break;
  }

})();
