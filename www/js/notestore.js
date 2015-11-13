// notestore.js - note factory (angular.module)

angular.module('mynotes.notestore', [])
    .factory('NoteStore', function(){
        // convert notes data from Json when reading from local storage
        // OR create empty array if no data:
        var notes = angular.fromJson(window.localStorage['notes'] || '[]');

        // to store locally
        function persist() {
            //                   // change notes to JSON data
            window.localStorage['notes'] = angular.toJson(notes);
        }

        return {
            list: function() {
                return notes;
            },
            get: function(noteId) {
                for (var i = 0; i < notes.length; i++){
                    if (notes[i].id === noteId){
                        return notes[i];
                    }
                }
                return undefined;
            },
            create: function(note){
                console.log("id = " + note.id);
                notes.push(note);
                persist(); // call local storage
            },
            update: function(note) {
                for (var i = 0; i < notes.length; i++){
                    if (notes[i].id === note.id){
                        notes[i] = note;
                        persist(); // call local storage
                        return;
                    }
                }
            },
            move: function(note, fromIndex, toIndex) {
                notes.splice(fromIndex, 1); // 1 item
                // remove 0 items and insert note:
                notes.splice(toIndex, 0, note);
                persist(); // call local storage
            },
            delete: function(noteId){
                for (var i = 0; i < notes.length; i++){
                    if (notes[i].id === noteId){
                        notes.splice(i, 1);
                        persist();
                        return;
                    }
                }
            }

        };
});
