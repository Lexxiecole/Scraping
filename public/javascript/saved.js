
$(document).ready(function() {
 var articleContainer = $(".article-container");
 $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
    $(".clear").on("click", handleArticleClear);
  
    function initPage() {
   $.get("/api/headlines?saved=true").then(function(data) {
        articleContainer.empty();
   if (data && data.length) {
          renderArticles(data);
        } else {
    renderEmpty();
        }
      });
    }
  

articleContainer.append(articleCards);
    }
  
    
      var cardBody = $("<div class='card-body'>").text(article.summary);
  
      card.append(cardHeader, cardBody);
  
card.data("_id", article._id);
return card;
    }
  
    function renderEmpty() {
  
    function renderNotesList(data) {
var notesToRender = [];
      var currentNote;
      if (!data.notes.length) {
currentNote = $("<li class='list-group-item'>No notes for this article yet.</li>");
        notesToRender.push(currentNote);
      } else {
for (var i = 0; i < data.notes.length; i++) {
 currentNote = $("<li class='list-group-item note'>")
            .text(data.notes[i].noteText)
            .append($("<button class='btn btn-danger note-delete'>x</button>"));
currentNote.children("button").data("_id", data.notes[i]._id);
notesToRender.push(currentNote);
        }
$(".note-container").append(notesToRender);
    }
  
    function handleArticleDelete() {
  var articleToDelete = $(this)
        .parents(".card")
        .data();

      $(this)
        .parents(".card")
        .remove();
 $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
      }).then(function(data) {
if (data.ok) {
          initPage();
        }
      });
    }
    function handleArticleNotes(event) {
var currentArticle = $(this)
        .parents(".card")
        .data();

      $.get("/api/notes/" + currentArticle._id).then(function(data) {

        var modalText = $("<div class='container-fluid text-center'>").append(
          $("<h4>").text("Notes For Article: " + currentArticle._id),
          $("<hr>"),
          $("<ul class='list-group note-container'>"),
          $("<textarea placeholder='New Note' rows='4' cols='60'>"),
          $("<button class='btn btn-success save'>Save Note</button>")
        );

        bootbox.dialog({
          message: modalText,
          closeButton: true
        });
        var noteData = {
          _id: currentArticle._id,
          notes: data || []
        };
        $(".btn.save").data("article", noteData);
        renderNotesList(noteData);
      });
    }
  
    function handleNoteSave() {
 var noteData;
      var newNote = $(".bootbox-body textarea")
        .val()
        .trim();
if (newNote) {
        noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
        $.post("/api/notes", noteData).then(function() {

          bootbox.hideAll();
        });
      }
    }
  
    function handleNoteDelete() {

      var noteToDelete = $(this).data("_id");
     
      $.ajax({
        url: "/api/notes/" + noteToDelete,
        method: "DELETE"
      }).then(function() {

        bootbox.hideAll();
      });
    }
  
    function handleArticleClear() {
      $.get("api/clear")
        .then(function() {
          articleContainer.empty();
          initPage();
        });
    }
  });
  